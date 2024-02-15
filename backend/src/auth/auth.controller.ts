import { Controller, Get, Req, UseGuards, Redirect, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    
    const jwtToken = this.authService.generateToken(req.user);

    
    const redirectUrl = `http://3.72.72.216/=${jwtToken}`;
    res.redirect(redirectUrl);
  } 

  @UseGuards(AuthGuard('jwt')) 
  @Get('profile')
  getProfile(@Req() req) {
    
    return req.user;
  }
}
