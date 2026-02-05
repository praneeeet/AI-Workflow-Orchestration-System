import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Workflow } from '../workflow/workflow.entity';
import { StepExecution } from './step-execution.entity';

@Entity('execution_runs')
export class ExecutionRun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'int', default: 0 })
  currentStepIndex: number;

  @Column({ type: 'uuid' })
  workflowId: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.executionRuns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workflowId' })
  workflow: Workflow;

  @OneToMany(() => StepExecution, (stepExecution) => stepExecution.run, {
    cascade: true,
  })
  stepExecutions: StepExecution[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
