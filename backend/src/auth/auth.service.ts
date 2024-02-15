import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../entity/user.entity';



@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateGoogleUser(googleId: string): Promise<any> {
    
    const user = await this.userService.findByGoogleId(googleId);
    if (!user) {
     
      throw new UnauthorizedException('Google user not found');
    }
    return user;
  }

  generateToken(user: any): string {
    const payload = { googleId: user.googleId, email: user.email };
    return this.jwtService.sign(payload); 
  }

  async googleLogin(req: Request<any, any, User>) {
    const user = req.user as User;
    const validatedUser = await this.validateGoogleUser(user.googleId); //
    if (!validatedUser) {
      throw new UnauthorizedException();
    }
    return {
      access_token: this.generateToken(validatedUser),
    };
  }
}
