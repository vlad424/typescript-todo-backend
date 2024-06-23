import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async getAdminListsAndTasks(id: number) {
    const adminLists = await this.prisma.iLists.findMany({
      where: {
        userId: +id
      },
      include: {
        lists: true
      }
    })
    const users = await this.prisma.user.findMany({
      where: {
        role: "user"
      },
      include: {
        posts: {
          include: {
            todos: true
          }
        }
      }
    })
    //admin comments

    return {adminLists, users}
  }
  async putListOrComment(id: number, data: string) {
    const createList = await this.prisma.iLists.create({
      data: {
        name: data,
        userId: +id,
        addressee: []
      }
    })
    return {
      status: HttpStatus.CREATED,
      msg: 'list created',
      data: {
        createList
      }
    }
  }
}
