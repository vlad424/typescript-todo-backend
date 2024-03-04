import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}
    
    async getUsersPosts(dto: number) {
        const posts_array = await this.prisma.iArrayTasks.findMany({
          where: { userId: +dto },
        });

        let posts = []

        for(let i = 0; i < posts_array.length; i++) {
            posts.push(await this.prisma.iTask.findMany({
                where: {iArrayTasksId: posts_array[i].id}
            }))
        }
        
        if(!posts_array) throw new NotFoundException('not found')
 
        return {
            array: posts_array,
            todos: posts
        };
      }
}
