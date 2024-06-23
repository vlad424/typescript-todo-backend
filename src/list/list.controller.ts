import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListService } from './list.service';

@Controller('/workspace/:id/admin')
export class ListController {
  constructor(private readonly listService: ListService) {} 

  @Get()
  async getAdminListsAndTasks(@Param() data: {id: number}) {
    return this.listService.getAdminListsAndTasks(data.id)
  }
  @Post()
  async putListOrComment(@Param() data: {id: number}, @Body() req: {action: 'PUT LIST' | 'PUT COMMENT', data: string}) {
    if(req.action === 'PUT LIST') return this.listService.putListOrComment(data.id, req.data)
  }
}
