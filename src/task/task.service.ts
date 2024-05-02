import { BadGatewayException, GoneException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { deleteArrayDto, deletePostDto, getUserTasks, saveArrayBasic, savePostsDto, updateTaskDto } from './dto/task.dto';
import { ITask } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getUsersPosts(param: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: +param },
      include: {
        posts: {
          include: {
            todos: true,
          },
        },
      },
    });

    if(!user) throw new NotFoundException()

    return user.posts;
  }
  async saveUserArray(param: number, data: any) {
    const addArray = await this.prisma.iArrayTasks.create({
      data: {
        name: data.name,
        userId: +param,
      }
    })
    return addArray
  }
  async saveUsersPosts(param: number, data: any) {
    const todo = data.post
    const userArrayTasks = await this.prisma.user.findUnique({
      where: {id: +param},
      include: {
        posts: {
          where: {userId: +param, name: data.arrayName}
        }
      }
    })

    if(!userArrayTasks) throw new NotAcceptableException()

    const addTodo = await this.prisma.iTask.create({
      data: {
        name: todo.name,
        desc: todo.desc,
        date: todo.date,
        text_color: todo.text_color,
        iArrayTasksId: +userArrayTasks.posts[0].id
      }
    })
    return addTodo
  }
  async deleteTaskById(todoID: deletePostDto) {
    const todo = await this.prisma.iTask.findUnique({
      where: {id: +todoID.todoId}
    })
    if(todo === null) throw new NotFoundException()
    await this.prisma.iTask.delete({
      where: {id: +todoID.todoId}
    })

    return todo
  }
  async deleteArrayByName(todoID: deleteArrayDto) {
    const response = await this.prisma.iArrayTasks.findFirst({
      where: {
        userId: +todoID.id,
        name: todoID.todoId
      }
    })
    await this.prisma.iTask.deleteMany({
      where: {
        iArrayTasksId: response.id
      }
    })
    if(response === null) throw new NotFoundException()
    await this.prisma.iArrayTasks.delete({
      where: {
        id: response.id
      }
    })

    return response
  }
  async updateTaskById(data_req: updateTaskDto) {
    const response = await this.prisma.iTask.update({
      where: {id: +data_req.todoId},
      data: {
        desc: data_req.desc,
        text_color: data_req.text_color
      }
    })

    return response
  }
}