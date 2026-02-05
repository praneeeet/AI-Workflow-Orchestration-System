import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './database/typeorm.config';
import { WorkflowModule } from './workflow/workflow.module';
import { StepModule } from './step/step.module';
import { ExecutionModule } from './execution/execution.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WorkflowModule,
    StepModule,
    ExecutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
