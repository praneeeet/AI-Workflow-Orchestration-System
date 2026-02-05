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
import { StepExecution } from '../execution/step-execution.entity';

@Entity('steps')
export class Step {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'text' })
  prompt: string;

  @Column({ type: 'varchar', length: 100 })
  criteriaType: string;

  @Column({ type: 'text', nullable: true })
  criteriaValue: string | null;

  @Column({ type: 'int', default: 0 })
  retryLimit: number;

  @Column({ type: 'uuid' })
  workflowId: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.steps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workflowId' })
  workflow: Workflow;

  @OneToMany(() => StepExecution, (stepExecution) => stepExecution.step)
  stepExecutions: StepExecution[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
