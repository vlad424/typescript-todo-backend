import { Body, Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { getUserTasks } from './dto/task.dto';

@Controller('/workspace')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  async getUserTasks(@Body() dto: getUserTasks) {
    return this.taskService.getUsersPosts(dto.userId)
  }
}
