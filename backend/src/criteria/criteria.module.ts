import { Module } from '@nestjs/common';
import { CriteriaService } from './criteria.service';

@Module({
  providers: [CriteriaService],
  exports: [CriteriaService],
})
export class CriteriaModule {}
