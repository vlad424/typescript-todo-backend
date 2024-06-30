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
      where: {id: +data.addr}
    })

    const findComment = await this.prisma.comment.findMany({
      where: { todoId: +task.id}
    })

    if(!findComment) {
      const comment = await this.prisma.comment.create({
        data: {
          message: data.msg,
          todoId: +data.addr
        }
      })
      const changedTask = await this.prisma.iTask.update({
        where: {id: +data.addr},
        data: {
          commentId: comment.id
        }
      })

      return changedTask
    }
    else {
      const comment = await this.prisma.comment.updateMany({
        data: {
          message: data.msg,
          todoId: +data.addr
        }
      })

      return comment
    }
  }
}
