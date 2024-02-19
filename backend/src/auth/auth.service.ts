import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service'; 
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Customer } from '../entity/customer.entity'; 
import { request } from 'http';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService, 
    private jwtService: JwtService
  ) {}

  async validateCustomerByGoogleId(googleId: number): Promise<Customer> { 
    const customer = await this.customerService.findByGoogleId(googleId); 
    return customer;
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    
    const customer = req.user as Customer;
    const googleId = customer.id;
    const email = customer.email;
    console.log("customer",customer );


    const existingCustomer = await this.customerService.findByGoogleId(googleId);
    if (existingCustomer) {
      
      res.redirect('http://localhost:4200');
      return;
    }

    
    const newCustomer = await this.customerService.createCustomer({
      email: customer.email,
      googleId: customer.id,

     
    });

    
    res.redirect('http://localhost:4200');
  }
}
  


