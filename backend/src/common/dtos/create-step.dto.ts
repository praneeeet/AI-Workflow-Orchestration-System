import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  MaxLength,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AVAILABLE_MODELS } from '../constants/models.constant';

export class CreateStepDto {
  @IsInt()
  @Min(0)
  @Type(() => Number)
  order: number;

  @IsString()
  @IsNotEmpty()
  @IsIn([...AVAILABLE_MODELS])
  @MaxLength(255)
  model: string;

  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  criteriaType: string;

  @IsString()
  @IsOptional()
  criteriaValue?: string;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  retryLimit: number;
}
