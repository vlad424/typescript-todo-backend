import { BadGatewayException, GoneException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { deletePostDto, getUserTasks, savePostsDto, updateTaskDto } from './dto/task.dto';

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
  async saveUsersPosts(param: number, data: savePostsDto) {
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
      where: {id: todoID.todoId}
    })

    if(!todo) {
      if(todo === null) throw new GoneException('post already deleted')
      else throw new NotFoundException()
    } // not wok how mind
    await this.prisma.iTask.delete({
      where: {id: todoID.todoId}
    })

    return todo
  }
  async updateTaskById(data: updateTaskDto) {
    const updatedTask = await this.prisma.iTask.update({
      where: { id: +data.todoId },
      data: {
        desc: data.desc,
        text_color: data.text_color
      },
    })

    console.log(updatedTask)

    return updatedTask
  }
}
