import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './auth-utils/google-oauth.guard';
import { AuthService } from './auth.service';
/* import { MetricsService } from 'src/metrics/metrics.service'; */

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    /* private readonly metricsService: MetricsService, */
  ) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  getGoogle() {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res);
  }

  @Get('logout')
  logout(@Res() res: any) {
    return this.authService.logout(res);
  }

  /*  @Get('metrics')
  getHello(): string {
    this.metricsService.incrementNewUserCounter();
    this.metricsService.incrementExistingUserCounter();
    return 'Hello, Prometheus!';
  } */
}
