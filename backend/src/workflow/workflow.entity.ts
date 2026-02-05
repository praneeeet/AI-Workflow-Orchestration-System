import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Step } from '../step/step.entity';
import { ExecutionRun } from '../execution/execution-run.entity';

@Entity('workflows')
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Step, (step) => step.workflow, { cascade: true })
  steps: Step[];

  @OneToMany(() => ExecutionRun, (run) => run.workflow)
  executionRuns: ExecutionRun[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
