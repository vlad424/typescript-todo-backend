import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { getUserTasks, savePostsDto } from './dto/task.dto';

@Controller('/workspace')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @HttpCode(200)
  @Get(':id')
  async getUserTasks(@Param() params: any) {
    return this.taskService.getUsersPosts(params.id)
  }
  @HttpCode(200)
  @Put(':id')
  async saveUsersPosts(@Param('id') id: number, @Body() data: savePostsDto) {
    return this.taskService.saveUsersPosts(data)
  }
}
