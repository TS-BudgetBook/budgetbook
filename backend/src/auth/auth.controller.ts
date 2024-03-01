import { Controller, Get, Req, UseGuards, Res, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleOAuthGuard } from './auth-utils/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res);
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}

// @Get()
// @UseGuards(GoogleOAuthGuard)
// async googleAuth(@Req() req) {

// }
// @Get('redirect')
// @UseGuards(AuthGuard('google'))
// googleAuthRedirect(@Req() req) {
//   return this.authService.googleLogin(req)

// }

/*  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const { access_token } = await this.authService.googleLogin(req);
    
     return res.redirect(`http://localhost:3000/auth/success?token=${access_token}`); 
  }
} */

/* @Get('google/redirect')
@UseGuards(AuthGuard('google'))
async callback(@Req() req, @Res() res) {
  const jwt = await this.authService.login(req.user);
  res.set('Authorization', jwt.access_token);
  res.json(req.user);
}
 */

/* 
  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
   
    const jwtToken = this.authService.generateToken(req.user);
     */

//const redirectUrl = `http://localhost:3000=${jwtToken}`;
//res.redirect(redirectUrl);

/*   @UseGuards(AuthGuard('jwt')) 
  @Get('profile')
  getProfile(@Req() req) {
    
    return req.user;
  } 

}
 */

/*   @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    const jwt = await this.authService.login(req.user);
    res.set('Authorization', jwt.access_token);
    res.json(req.user);
  }

  @Get('test123')
  @UseGuards(AuthGuard('jwt'))
  async test123(@Res() res) {
    res.json({ success: true });
  }
} */
