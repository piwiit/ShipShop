import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    return { email: body.email, password: hashedPassword };
  }

  @Get('login')
  async login(@Body() body: { email: string; password: string }) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    return { email: body.email, password: hashedPassword };
  }
}
