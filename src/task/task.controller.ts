import { Body, Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { getUserTasks } from './dto/task.dto';

@Controller('/workspace')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async getUserTasks(@Param() params: any) {
    return this.taskService.getUsersPosts(params.id)
  }
}
