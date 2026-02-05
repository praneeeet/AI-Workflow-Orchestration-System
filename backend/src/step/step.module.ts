import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './step.entity';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { WorkflowModule } from '../workflow/workflow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Step]),
    WorkflowModule,
  ],
  controllers: [StepController],
  providers: [StepService],
  exports: [StepService],
})
export class StepModule {}
