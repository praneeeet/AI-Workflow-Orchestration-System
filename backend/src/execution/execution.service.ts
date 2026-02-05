import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecutionRun } from './execution-run.entity';
import { StepExecution } from './step-execution.entity';
import { WorkflowService } from '../workflow/workflow.service';
import { StepService } from '../step/step.service';
import { LlmService } from '../llm/llm.service';
import { CriteriaService } from '../criteria/criteria.service';
import { buildPrompt } from '../common/utils/prompt-builder.util';
import {
  RUN_STATUS,
  STEP_EXECUTION_STATUS,
} from '../common/constants/execution-status.constant';

@Injectable()
export class ExecutionService {
  constructor(
    @InjectRepository(ExecutionRun)
    private readonly executionRunRepository: Repository<ExecutionRun>,
    @InjectRepository(StepExecution)
    private readonly stepExecutionRepository: Repository<StepExecution>,
    private readonly workflowService: WorkflowService,
    private readonly stepService: StepService,
    private readonly llmService: LlmService,
    private readonly criteriaService: CriteriaService,
  ) {}

  async run(workflowId: string): Promise<ExecutionRun> {
    await this.workflowService.findOne(workflowId);
    const steps = await this.stepService.findByWorkflowId(workflowId);

    if (steps.length === 0) {
      const run = this.executionRunRepository.create({
        workflowId,
        status: RUN_STATUS.SUCCESS,
        currentStepIndex: 0,
      });
      return this.executionRunRepository.save(run);
    }

    const executionRun = this.executionRunRepository.create({
      workflowId,
      status: RUN_STATUS.RUNNING,
      currentStepIndex: 0,
    });
    const run = await this.executionRunRepository.save(executionRun);

    let previousOutput: string | null = null;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const prompt = buildPrompt(step.prompt, previousOutput);

      let output: string = '';
      let attemptCount = 0;
      const maxAttempts = step.retryLimit + 1;
      let valid = false;

      while (attemptCount < maxAttempts) {
        attemptCount++;
        try {
          output = await this.llmService.chatCompletion({
            model: step.model,
            prompt,
          });
          valid = this.criteriaService.validate(
            output,
            step.criteriaType,
            step.criteriaValue,
          );
          if (valid) break;
        } catch {
          // Swallow LLM/validation errors and retry up to retryLimit
        }
      }

      const stepStatus = valid
        ? STEP_EXECUTION_STATUS.SUCCESS
        : STEP_EXECUTION_STATUS.FAILED;
      await this.stepExecutionRepository.save(
        this.stepExecutionRepository.create({
          runId: run.id,
          stepId: step.id,
          status: stepStatus,
          output: output || null,
          attemptCount,
        }),
      );

      await this.executionRunRepository.update(run.id, {
        currentStepIndex: i + 1,
      });

      if (!valid) {
        await this.executionRunRepository.update(run.id, {
          status: RUN_STATUS.FAILED,
        });
        return this.getRun(run.id);
      }

      previousOutput = output;
    }

    await this.executionRunRepository.update(run.id, {
      status: RUN_STATUS.SUCCESS,
    });
    return this.getRun(run.id);
  }

  async getRun(runId: string): Promise<ExecutionRun> {
    const run = await this.executionRunRepository.findOne({
      where: { id: runId },
      relations: { workflow: true, stepExecutions: { step: true } },
    });
    if (!run) {
      throw new NotFoundException(`Execution run with id ${runId} not found`);
    }
    return run;
  }
}
