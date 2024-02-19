import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../entity/customer.entity';
export declare class AuthService {
    private customerService;
    private jwtService;
    constructor(customerService: CustomerService, jwtService: JwtService);
    validateCustomerByEmail(email: string): Promise<Customer>;
}
