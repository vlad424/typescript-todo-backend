import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot(), AuthModule, TaskModule, ListModule, CommentsModule],
})
export class AppModule {}
