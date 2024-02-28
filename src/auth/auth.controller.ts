import { Body, Controller, Get, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes()
  @HttpCode(200)
  @Post('/')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }
  @Get('/')
  async getter() {
    return 1
  }
}
