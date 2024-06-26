import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
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
}

