import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Customer } from '../entity/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService
  ) {}

  async googleLogin(req: Request, res: Response): Promise<void> {
    const customer = req.user as Customer;
    const email = customer.email;
    const firstName = customer.firstName;
    const lastName = customer.lastName;
    const googleId = customer.id;

    const existingCustomerByEmail = await this.customerService.findByEmail(email);

    if (existingCustomerByEmail) {
      const token = this.generateToken(existingCustomerByEmail);
      res.cookie('jwt', token); 
      res.redirect('http://localhost:4200');
      return;
    } else {
      const newCustomer = await this.customerService.createCustomer({
        email: email,
        firstName: firstName,
        lastName: lastName,
        
      });
      const token = this.generateToken(newCustomer);
      res.cookie('jwt', token); 
      res.redirect('http://localhost:4200');
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



