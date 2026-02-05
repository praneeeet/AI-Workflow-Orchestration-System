import { Controller, Get, Post, Param, ParseUUIDPipe } from '@nestjs/common';
import { ExecutionService } from './execution.service';

@Controller()
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  @Post('workflow/run/:workflowId')
  runWorkflow(@Param('workflowId', ParseUUIDPipe) workflowId: string) {
    return this.executionService.run(workflowId);
  }

  @Get('execution/:runId')
  getRun(@Param('runId', ParseUUIDPipe) runId: string) {
    return this.executionService.getRun(runId);
  }
}
