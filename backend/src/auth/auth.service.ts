import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service'; 
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Customer } from '../entity/customer.entity'; 

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService, 
    private jwtService: JwtService
  ) {}

 async validateCustomerByEmail(email: string): Promise<Customer> { 
    const customer = await this.customerService.findByEmail(email); 
    return customer;
  }
googleLogin(req: Request, res: Response){
    console.log(req.user);
}
generateToken(user: any): string {
  const payload = { googleId: user.googleId, email: user.email };
  return this.jwtService.sign(payload); 
}

  
  // googleLogin(req, res) {
  //   if (!req.user) {
  //     return 'No user from google';
  //   }

  //   return {
  //     message: 'User information from google',
  //     user: req.user,
  //   };
  // }

}
  
/*   async createProfileIfNew(email: string): Promise<Customer> { 
    let customer = await this.customerService.findByEmail(email); 
    if (!customer) {
      customer = await this.customerService.createCustomer({ 
        email,
        id: 0,
        name: undefined,
        payments: []
      });
    }
    return customer;
  }
  
  generateToken(customer: Customer): string { 
    const payload = { email: customer.email }; 
    return this.jwtService.sign(payload); 
  } */
  
/*   async googleLogin(req: Request): Promise<{ access_token: string }> {
    const customer = req.customer as Customer; 
    const validatedCustomer = await this.validateCustomerByEmail(customer.email); 
    if (!validatedCustomer) {
      const newCustomer = await this.createProfileIfNew(customer.email); 
      if (!newCustomer) {
        throw new UnauthorizedException('Failed to create customer profile'); 
      }
      return { access_token: this.generateToken(newCustomer) }; 
    }
    return { access_token: this.generateToken(validatedCustomer) }; 
  }
}
 */
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