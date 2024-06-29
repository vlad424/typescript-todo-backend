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
        role: {id: 1},
      },
      include: {
        posts: {
          include: {
            todos: true,
          },
        },
      },
    });
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
  async deleteListEl(data: number) {
    const deletedListEl = await this.prisma.iList.delete({
      where: {
        id: +data
      }
    })
    return {
      status: HttpStatus.OK,
      msg: `list with id: ${data} deleted`,
      deletedListEl,
    };
  }
  async patchList(listId: number, data : {desc: string, dateAt: string, text_color: string, userIdAddr: Array<string>}) {
    const updateListEl = await this.prisma.iList.update({
      where: {id: +listId},
      data: {
        dateAt: data.dateAt,
        desc: data.desc,
        text_color: data.text_color
      }
    })

    if(data.userIdAddr.length !== 0) {
      let userIds = []
      
      for(let i = 0; i < data.userIdAddr.length; i++) {
        const userId = this.prisma.user.findUnique({
          where: {email: data.userIdAddr[i]},
          select: {
            id: true
          }
        })
        userIds.push((await userId).id)
      }
      const updateList = await this.prisma.iLists.update({
        where: { id: +updateListEl.IListsId },
        data: {
          addressee: userIds
        }
      })
      return {
        status: HttpStatus.OK,
        msg: `eilement list with id: ${updateListEl.id} patched & list moved to users ${data.userIdAddr}`,
        data: {
          updateListEl,
          updateList
        }
      }
    }
    return {
      status: HttpStatus.OK,
      msg: `eilement list with id: ${updateListEl.id} patched`,
      data: {
        updateListEl
      }
    }
  }
}
