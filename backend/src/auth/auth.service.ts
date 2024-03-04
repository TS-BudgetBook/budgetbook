import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

import { Customer } from '../entity/customer.entity';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contanst';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async googleLogin(req: Request, res: Response): Promise<void> {
    const customer = req.user as Customer;
    const email = customer.email;
    const firstName = customer.firstName;
    const lastName = customer.lastName;

    const existingCustomerByEmail =
      await this.customerService.findByEmail(email);

    if (existingCustomerByEmail) {
      const token = this.generateToken(existingCustomerByEmail);
      res.cookie('jwt', token);
      jwtConstants.token = token;

      res.redirect(this.configService.get<string>('REDIRECT_HOST') + 'login?token=' + token);
      return;
    } else {
      const newCustomer = await this.customerService.createCustomer({
        email: email,
        firstName: firstName,
        lastName: lastName,
      });
      const token = this.generateToken(newCustomer);

      res.cookie('jwt', token);
      jwtConstants.token = token;

      res.redirect(this.configService.get<string>('REDIRECT_HOST') + 'login?token=' + token);
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('jwt');
    res.redirect('/auth/google');
  }

  generateToken(customer: Customer): string {
    const payload = { sub: customer.id, email: customer.email };
    return this.jwtService.sign(payload);
  }
}
