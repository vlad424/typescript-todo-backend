import { Body, Controller, Get, HttpCode, Post, Redirect, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoAuth, AuthDtoRegister } from './auth.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes()
  @HttpCode(200)
  @Post('/')
  async register(@Body() dto: AuthDtoRegister) {
    return this.authService.register(dto)
  }
}
