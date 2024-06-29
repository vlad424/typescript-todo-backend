import { Body, Controller, Get, HttpCode, Post, Redirect, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoAuth, AuthDtoRegister } from './dto/auth.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Get('/')
  async serverUp() {
    return {
      msg: "server up"
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/register')
  async register(@Body() dto: AuthDtoRegister) {
    return this.authService.register(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @Post('/login/access-token') 
  async getNewToken(@Body() dto: refreshTokenDto) {
    return this.authService.getNewToken(dto.refreshToken)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/')
  async login(@Body() dto: AuthDtoAuth) {
    return this.authService.login(dto)
  }
}