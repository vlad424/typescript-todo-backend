import { Injectable, Post } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    
    async createUser() {
        
    }
}