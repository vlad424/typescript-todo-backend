import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async GetUserLists(userId : number) {
    const lists = await this.prisma.iLists.findMany({
      where: {
        addressee: {
          has: +userId
        }
      },
      include: {
        lists: true
      }
    })

    return lists
  }
  async PostComment(data: {msg: string, addr: number}) {
    const task = await this.prisma.iTask.findUnique({
      where: {id: data.addr}
    })

    return task
  }
}
