// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async googleLogin(googleId: string): Promise<{ access_token: string }> {
    // Überprüfen Sie, ob ein Benutzer mit der Google-ID bereits vorhanden ist
    const user = await this.usersService.findByGoogleId(googleId);
    if (!user) {
      // Wenn der Benutzer nicht existiert, werfen Sie eine Ausnahme
      throw new UnauthorizedException('Google user not found');
    }
    createJwtToken(user: any) {
        const payload = { googleId: user.googleId, email: user.email };
        return this.jwtService.sign(payload); // Erzeugt den JWT-Token
      }
