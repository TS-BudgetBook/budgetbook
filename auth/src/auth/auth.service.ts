import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from './entity/user.entity'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contanst';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async googleLogin(req: any, res: Response): Promise<void> {
    const user = req.user as User;
    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const googleid = user.id;

    const existingUserByEmail =
      await this.userService.findByEmail(email);

    if (existingUserByEmail) {
      const token = this.generateToken(existingUserByEmail);
      jwtConstants.token = token;

      res.redirect(this.configService.get<string>('REDIRECT_HOST') + 'login?token=' + token);
      return;
    } else {
      const newUser = await this.userService.createUser({
        email: email,
        googleid: googleid.toString(),
        firstName: firstName,
        lastName: lastName,
      });
      const token = this.generateToken(newUser);

      jwtConstants.token = token;

      res.redirect(this.configService.get<string>('REDIRECT_HOST') + 'login?token=' + token);
    }
  }
  async logout(res: Response): Promise<void> {
    res.redirect('/auth/google');
  }

  generateToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
