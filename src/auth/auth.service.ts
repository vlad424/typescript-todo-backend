import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDtoAuth, AuthDtoRegister } from './auth.dto';
import { hash } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDtoRegister) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        login: dto.login,
      },
    });
    if (oldUser) throw new BadRequestException('user already exists');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        last_name: dto.last_name,
        first_name: dto.first_name,
        login: dto.login,
        password: await hash(dto.password),
      },
    });

    const token = await this.issueToken(user.id);

    return {user: 	this.returnFields(user), token};
  }

  private async issueToken(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '30m',
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '1d',
    });

    return { accessToken, refreshToken };
  }
  private returnFields(user: User) {
    return {
			email: user.email,
			login: user.login,
			id: user.id
		}
  }
}
