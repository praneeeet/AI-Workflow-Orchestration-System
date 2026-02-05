import { Injectable, BadRequestException } from '@nestjs/common';

export const CRITERIA_TYPES = ['CONTAINS', 'REGEX', 'JSON_VALID'] as const;
export type CriteriaType = (typeof CRITERIA_TYPES)[number];

@Injectable()
export class CriteriaService {
  validate(
    output: string,
    criteriaType: string,
    criteriaValue: string | null,
  ): boolean {
    const type = criteriaType.toUpperCase();

    switch (type) {
      case 'CONTAINS':
        return this.validateContains(output, criteriaValue);
      case 'REGEX':
        return this.validateRegex(output, criteriaValue);
      case 'JSON_VALID':
        return this.validateJsonValid(output);
      default:
        throw new BadRequestException(
          `Unknown criteria type: ${criteriaType}. Supported: ${CRITERIA_TYPES.join(', ')}`,
        );
    }
  }

  private validateContains(output: string, criteriaValue: string | null): boolean {
    if (criteriaValue === null || criteriaValue === undefined) {
      throw new BadRequestException('CONTAINS requires criteriaValue');
    }
    return output.includes(criteriaValue);
  }

  private validateRegex(output: string, criteriaValue: string | null): boolean {
    if (criteriaValue === null || criteriaValue === undefined) {
      throw new BadRequestException('REGEX requires criteriaValue');
    }
    try {
      const regex = new RegExp(criteriaValue);
      return regex.test(output);
    } catch {
      throw new BadRequestException(`Invalid REGEX pattern: ${criteriaValue}`);
    }
  }

  private validateJsonValid(output: string): boolean {
    try {
      JSON.parse(output);
      return true;
    } catch {
      return false;
    }
  }
}
