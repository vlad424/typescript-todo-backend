import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { getUserTasks, savePostsDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getUsersPosts(param: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: +param},
      include: {
        posts: {
          include: {
            todos: true,
          },
        },
      },
    });

    return user.posts;
  }
  async saveUsersPosts(data: savePostsDto) {
    const id = data.userId
    const post = data.post

    const user = await this.prisma.user.findUnique({
      where: {id}
    })

    return user
  }
}
