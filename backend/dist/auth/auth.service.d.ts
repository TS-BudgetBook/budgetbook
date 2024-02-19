import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Customer } from '../entity/customer.entity';
export declare class AuthService {
    private customerService;
    private jwtService;
    constructor(customerService: CustomerService, jwtService: JwtService);
    validateCustomerByEmail(email: string): Promise<Customer>;
    googleLogin(req: Request, res: Response): void;
    generateToken(user: any): string;
}
