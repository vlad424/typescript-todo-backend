import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}