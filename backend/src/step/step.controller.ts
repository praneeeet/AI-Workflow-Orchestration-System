import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StepService } from './step.service';
import { CreateStepDto } from '../common/dtos/create-step.dto';

@Controller('workflows/:workflowId/steps')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  addStep(
    @Param('workflowId', ParseUUIDPipe) workflowId: string,
    @Body() dto: CreateStepDto,
  ) {
    return this.stepService.addToWorkflow(workflowId, dto);
  }

  @Get()
  findSteps(@Param('workflowId', ParseUUIDPipe) workflowId: string) {
    return this.stepService.findByWorkflowId(workflowId);
  }
}
