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

/*   async validateCustomerByEmail(email: string): Promise<Customer> { 
    const customer = await this.customerService.findByEmail(email); 
    return customer;
  } */

  async googleLogin(req: Request, res: Response): Promise<void> {
    const customer = req.user as Customer;
    const email = customer.email;
    const firstName = customer.firstName ;
    const lastName = customer.lastName ;
    const googleId = customer.id;

    console.log("customer", customer);

    const existingCustomerByEmail = await this.customerService.findByEmail(email);

    if (existingCustomerByEmail) {
      
      res.redirect('http://localhost:4200');
      return;
    } else {
      
      await this.customerService.createCustomer({
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googleId
      });

    
      res.redirect('http://localhost:4200');
    }
  }
}


