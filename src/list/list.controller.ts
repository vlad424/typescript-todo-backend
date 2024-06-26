import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { updateListDto } from './list.dto';

@Controller('/workspace/:id/admin')
export class ListController {
  constructor(private readonly listService: ListService) {} 

  @HttpCode(200)
  @Get()
  async getAdminListsAndTasks(@Param() data: {id: number}) {
    return this.listService.getAdminListsAndTasks(data.id)
  }
  @HttpCode(200)
  @Post()
  async putListOrComment(@Param() data: {id: number}, @Body() req: {action: 'PUT LIST' | 'PUT COMMENT' | 'PUT LIST EL', data: string | {name: string, listId: number}}) {
    if(req.action === 'PUT LIST') return this.listService.putList(data.id, req.data as string)
    if(req.action === 'PUT LIST EL') return this.listService.putListEl(req.data)
  }
  @HttpCode(200)
  @Delete()
  async deleteListOrComment(@Param() data: {id: number}, @Body() req: {action: 'DELETE LIST' | 'DELETE COMMENT' | 'DELETE LIST EL', data: number}) {
    if(req.action === 'DELETE LIST') return this.listService.deleteListOrComment(req.data)
    if(req.action === 'DELETE LIST EL') return this.listService.deleteListEl(req.data)
  }
  @HttpCode(200)
  @Patch()
  async patchList(@Body() req: updateListDto) {
    return this.listService.patchList(req.listId, req.data)
  }
}