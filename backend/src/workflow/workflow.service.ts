import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './workflow.entity';
import { CreateWorkflowDto } from '../common/dtos/create-workflow.dto';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}

  async create(dto: CreateWorkflowDto): Promise<Workflow> {
    const workflow = this.workflowRepository.create({ name: dto.name });
    return this.workflowRepository.save(workflow);
  }

  async findAll(): Promise<Workflow[]> {
    return this.workflowRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({ where: { id } });
    if (!workflow) {
      throw new NotFoundException(`Workflow with id ${id} not found`);
    }
    return workflow;
  }

  async delete(id: string): Promise<void> {
    const result = await this.workflowRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Workflow with id ${id} not found`);
    }
  }
}
