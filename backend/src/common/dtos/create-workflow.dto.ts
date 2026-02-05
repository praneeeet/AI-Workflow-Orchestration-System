import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
