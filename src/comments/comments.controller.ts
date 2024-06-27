import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('/workspace/:id/lists')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
    
  }
  @Get()
  async GetUserLists(@Param() data : {id: number}) {
    return this.commentsService.GetUserLists(data.id);    
  }
  @Delete()
  async DeleteUserList(@Body() data : {id: number}) {
    console.log(data.id)
  }
  @Post()
  async PostComment(@Body() data: {msg: string, addr: number}) {
    console.log(data.msg)
  }
}

