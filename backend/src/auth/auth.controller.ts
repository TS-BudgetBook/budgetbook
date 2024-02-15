import { Controller, Get, Req, UseGuards, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @Redirect('') 
  async googleAuthRedirect(@Req() req) {
    
    const jwtToken = this.authService.createJwtToken(req.user);
    return { url: `http://yourfrontend.com/profile?token=${jwtToken}` };
  }

  @UseGuards(AuthGuard('jwt')) 
  @Get('profile')
  getProfile(@Req() req) {
    
    return req.user;
  }
}
