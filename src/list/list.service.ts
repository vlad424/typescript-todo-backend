import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async getAdminListsAndTasks(id: number) {
    const adminLists = await this.prisma.iLists.findMany({
      where: {
        userId: +id,
      },
      include: {
        lists: true,
      },
    });
    const users = await this.prisma.user.findMany({
      where: {
        role: 'user',
      },
      include: {
        posts: {
          include: {
            todos: true,
          },
        },
      },
    });
    //admin comments

    return { adminLists, users };
  }
  async putList(id: number, data: string) {
    const createList = await this.prisma.iLists.create({
      data: {
        name: data,
        userId: +id,
        addressee: [],
      },
    });
    return {
      status: HttpStatus.CREATED,
      msg: 'list created',
      data: {
        createList,
      },
    };
  }
  async putListEl(req: any) {
    const list = await this.prisma.iList.create({
      data: {
        name: req.name,
        dateCreate:
          new Date().toLocaleDateString().toString() +
          ' ' +
          new Date().toLocaleTimeString().toString(),
        dateAt:
          new Date().toLocaleDateString().toString() +
          ' ' +
          new Date().toLocaleTimeString().toString(),
        desc: 'Описание',
        text_color: '#000',
        IListsId: +req.listId
      },
    });

    return {
      status: HttpStatus.OK,
      msg: `list el with id: ${list.id} created`,
      list
    }
  }
  async deleteListOrComment(data: number) {
    const deletedList = await this.prisma.iLists.delete({
      where: { id: +data },
      include: {
        lists: true,
      },
    });

    return {
      status: HttpStatus.OK,
      msg: `list with id: ${data} deleted`,
      deletedList,
    };
  }
}
