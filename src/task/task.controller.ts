import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { deletePostDto, getUserTasks, saveArrayDto, savePostsDto, updateTaskDto } from './dto/task.dto';
import { TaskGuard } from './task.guard';

@Controller('/workspace')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //@UseGuards(TaskGuard)
  @HttpCode(200)
  @Get(':id')
  async getUserTasks(@Param() params: any) {
    return this.taskService.getUsersPosts(params.id)
  }
  @HttpCode(200)
  @Post(':id')
  async saveUsersPosts(@Param('id') id: number, @Body() data: savePostsDto | saveArrayDto) {
    if(data.action === "PUT_ARRAY") return this.taskService.saveUserArray(id, data.post)
    if(data.action === "PUT_TODO") return this.taskService.saveUsersPosts(id, data.post)
  }
  @HttpCode(200)
  @Delete(':id')
  async deleteTaskById(@Body() todoID: deletePostDto) {
    if(todoID.action === "DELETE_ARRAY") return this.taskService.deleteArrayByName(todoID)
    if(todoID.action === "DELETE_TODO") return this.taskService.deleteTaskById(todoID)
  }
  @HttpCode(200)
  @Put(':id')
  async updateTaskById(@Body() data: updateTaskDto, @Req() request) {
    return this.taskService.updateTaskById(data)
  }
}