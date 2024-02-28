import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './auth.dto';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
		if(oldUser) throw new BadRequestException('user already exists')

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				last_name: dto.last_name,
				first_name: dto.first_name,
				login: dto.login,
				password: await hash(dto.password)
			}
		})

		return user
  }
}
