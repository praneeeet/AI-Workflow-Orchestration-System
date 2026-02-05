import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from './step.entity';
import { CreateStepDto } from '../common/dtos/create-step.dto';
import { AVAILABLE_MODELS } from '../common/constants/models.constant';
import { WorkflowService } from '../workflow/workflow.service';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
    private readonly workflowService: WorkflowService,
  ) {}

  private validateModel(model: string): void {
    if (!AVAILABLE_MODELS.includes(model as (typeof AVAILABLE_MODELS)[number])) {
      throw new BadRequestException(
        `Invalid model: ${model}. Available models: ${AVAILABLE_MODELS.join(', ')}`,
      );
    }
  }

  async addToWorkflow(workflowId: string, dto: CreateStepDto): Promise<Step> {
    await this.workflowService.findOne(workflowId);
    this.validateModel(dto.model);

    const step = this.stepRepository.create({
      ...dto,
      workflowId,
      criteriaValue: dto.criteriaValue ?? null,
    });
    return this.stepRepository.save(step);
  }

  async findByWorkflowId(workflowId: string): Promise<Step[]> {
    await this.workflowService.findOne(workflowId);
    return this.stepRepository.find({
      where: { workflowId },
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Step> {
    const step = await this.stepRepository.findOne({ where: { id } });
    if (!step) {
      throw new NotFoundException(`Step with id ${id} not found`);
    }
    return step;
  }
}
