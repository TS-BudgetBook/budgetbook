import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

import { Customer } from '../entity/customer.entity';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contanst';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

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

      res.redirect('http://localhost:4200/login?token=' + token);
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

      res.redirect('http://localhost:4200/login?token=' + token);
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
