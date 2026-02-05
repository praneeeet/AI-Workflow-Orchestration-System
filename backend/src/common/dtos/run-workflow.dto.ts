import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RunWorkflowDto {
  @IsOptional()
  @IsUUID()
  workflowId?: string;

  @IsOptional()
  @IsString()
  initialInput?: string;
}
