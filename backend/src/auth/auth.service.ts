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

  async validateGoogleUser(googleId: string): Promise<User> {
    const user = await this.userService.findByGoogleId(googleId);
    return user;
  }

  async createProfileIfNew(googleId: string, email: string): Promise<User> {
    let user = await this.userService.findByGoogleId(googleId);
    if (!user) {
      
      user = await this.userService.createUser({
          googleId, email,
          id: 0,
          name: undefined,
          payments: []
      });
    }
    return user;
  }

  generateToken(user: User): string {
    const payload = { googleId: user.googleId, email: user.email };
    return this.jwtService.sign(payload); 
  }

  async googleLogin(req: Request): Promise<{ access_token: string }> {
    const user = req.user as User;
    const validatedUser = await this.validateGoogleUser(user.googleId);
    if (!validatedUser) {
      const newUser = await this.createProfileIfNew(user.googleId, user.email);
      if (!newUser) {
        throw new UnauthorizedException('Failed to create user profile');
      }
      return { access_token: this.generateToken(newUser) };
    }
    return { access_token: this.generateToken(validatedUser) };
  }
}

 
    /* googleLogin(req) {
      if (!req.user) {
        return 'No user from google';
      }
  
      return {
        message: 'User information from google',
        user: req.user,
      };
    } */
  
 
 
 
    /* async googleLogin(req: Request<any, any, User>): Promise<{ access_token: string }> {
        const user = req.user as User;
        const validatedUser = await this.validateGoogleUser(user.googleId);
        if (!validatedUser) {
          throw new UnauthorizedException();
        }
        return {
          access_token: this.generateToken(validatedUser),
        };
      }
    } */