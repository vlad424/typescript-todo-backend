import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}
}
