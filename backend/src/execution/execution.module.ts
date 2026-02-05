import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionRun } from './execution-run.entity';
import { StepExecution } from './step-execution.entity';
import { ExecutionService } from './execution.service';
import { ExecutionController } from './execution.controller';
import { WorkflowModule } from '../workflow/workflow.module';
import { StepModule } from '../step/step.module';
import { LlmModule } from '../llm/llm.module';
import { CriteriaModule } from '../criteria/criteria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExecutionRun, StepExecution]),
    WorkflowModule,
    StepModule,
    LlmModule,
    CriteriaModule,
  ],
  controllers: [ExecutionController],
  providers: [ExecutionService],
  exports: [ExecutionService],
})
export class ExecutionModule {}
