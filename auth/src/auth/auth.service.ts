import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from './entity/user.entity'
import { UserService } from './user.service'
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { jwtConstants } from './contanst';
import { ConfigService } from '@nestjs/config';
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private logger: Logger,
    @InjectMetric("bb_auth_new_user_count") public newUserCounter: Counter<string>,
    @InjectMetric("bb_auth_existing_user_count") public existingUserCounter: Counter<string>,
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
      this.existingUserCounter.inc();
      const token = this.generateToken(existingUserByEmail);
      jwtConstants.token = token;

      res.redirect(this.configService.get<string>('REDIRECT_HOST') + '/login?token=' + token);
      return;
    } else {
      const newUser = await this.userService.createUser({
        email: email,
        googleid: googleid.toString(),
        firstName: firstName,
        lastName: lastName,
      });
      const token = this.generateToken(newUser);
      this.newUserCounter.inc();

      jwtConstants.token = token;

      res.redirect(this.configService.get<string>('REDIRECT_HOST') + '/login?token=' + token);
    }
  }
  async logout(res: Response): Promise<void> {
    res.redirect('/auth/google');
  }

  generateToken(user: User): string {
    this.logger.log('Generate Token with Secret: ' + jwtConstants.secret, 'AUTH');
    const payload = { sub: user.id, email: user.email };
    const options: JwtSignOptions = {
      secret: jwtConstants.secret
    }
    return this.jwtService.sign(payload, options);
  }
}
