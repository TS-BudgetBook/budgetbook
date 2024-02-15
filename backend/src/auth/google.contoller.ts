// google.controller.ts

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class GoogleController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    const user = req.user;
    // Generieren Sie das JWT-Token mit den Benutzerinformationen und senden Sie es zurück
    const token = await this.authService.generateToken(user);
    // Weiterleiten oder senden Sie den Token zurück an den Client
  }
}
