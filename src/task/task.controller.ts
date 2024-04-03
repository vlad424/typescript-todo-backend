import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { deletePostDto, getUserTasks, savePostsDto, updateTaskDto } from './dto/task.dto';

@Controller('/workspace')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @HttpCode(200)
  @Get(':id')
  async getUserTasks(@Param() params: any) {
    return this.taskService.getUsersPosts(params.id)
  }
  @HttpCode(200)
  @Post(':id')
  async saveUsersPosts(@Param('id') id: number, @Body() data: savePostsDto) {
    return this.taskService.saveUsersPosts(id, data)
  }
  @HttpCode(200)
  @Delete(':id')
  async deleteTaskById(@Body() todoID: deletePostDto) {
    return this.taskService.deleteTaskById(todoID)
  }
  @HttpCode(200)
  @Put(':id')
  async updateTaskById(@Body() data: updateTaskDto, @Req() request) {
    return this.taskService.updateTaskById(data)
  }
}
