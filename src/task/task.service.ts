import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getUsersPosts(dto: number) {
    const user = this.prisma.user.findUnique({
      where: { id: +dto },
      include: {
        posts: {
          include: {
            todos: true,
          },
        },
      },
    });

    return user;
  }
}
