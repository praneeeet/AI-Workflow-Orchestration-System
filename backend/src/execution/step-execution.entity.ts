import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExecutionRun } from './execution-run.entity';
import { Step } from '../step/step.entity';

@Entity('step_executions')
export class StepExecution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'text', nullable: true })
  output: string | null;

  @Column({ type: 'int', default: 0 })
  attemptCount: number;

  @Column({ type: 'uuid' })
  runId: string;

  @Column({ type: 'uuid' })
  stepId: string;

@Column({ type: 'text', nullable: true })
errorMessage?: string | null;

@Column({ type: 'text', nullable: true })
failureReason?: string | null;


  @ManyToOne(() => ExecutionRun, (run) => run.stepExecutions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'runId' })
  run: ExecutionRun;

  @ManyToOne(() => Step, (step) => step.stepExecutions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stepId' })
  step: Step;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
