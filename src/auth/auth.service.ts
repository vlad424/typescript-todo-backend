import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDtoAuth, AuthDtoRegister } from './dto/auth.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: AuthDtoAuth) {
    const user = await this.prisma.user.findUnique({
      where: { login: dto?.login},
    });

    if(!user) throw new NotFoundException('user not found')

    const isValid = await verify(user.password, dto.password)
    
    if(!isValid) throw new UnauthorizedException('invalid password')

    const tokens = await this.issueToken(user.id)

    return {user: user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken}
  }

  async getNewToken(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('invalid token');

    const user = await this.prisma.user.findUnique({
      where: { id: result.id },
    });

    const tokens = this.issueToken(user.id);

    return { user: user, tokens };
  }

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
        role: 'user',
        posts: {
          create: [
            {
              name: 'Today',
              todos: {
                create: [
                  {
                    name: 'make together',
                    desc: 'desc',
                    date:
                      new Date().toLocaleDateString().toString() +
                      ' ' +
                      new Date().toLocaleTimeString().toString(),
                    text_color: '#000',
                  },
                ],
              },
              
            },
            {
              name: 'Tommorow',
              todos: {
                create: [
                  {
                    name: 'make another',
                    desc: 'desc',
                    date:
                      new Date().toLocaleDateString().toString() +
                      ' ' +
                      new Date().toLocaleTimeString().toString(),
                    text_color: '#000',
                  },
                ],
              },
              
            }
          ],
        },
      },
    });

    const token = await this.issueToken(user.id);

    return { user: this.returnFields(user), accessToken: token.accessToken, refreshToken: token.refreshToken };
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
      id: user.id,
    };
  }
}
