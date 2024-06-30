import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('/workspace/:id/lists')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
    
  }
  @HttpCode(200)
  @Get()
  async GetUserLists(@Param() data : {id: number}) {
    return this.commentsService.GetUserLists(data.id);    
  }
  @HttpCode(200)
  @Delete()
  async DeleteUserList(@Body() data : {id: number}) {
    console.log(data.id)
  }
  @HttpCode(200)
  @Post()
  async PostComment(@Body() data: {msg: string, addr: number}) {
    return this.commentsService.PostComment(data)
  }
}

