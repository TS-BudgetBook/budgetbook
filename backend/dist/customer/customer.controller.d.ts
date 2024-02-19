import { CustomerService } from './customer.service';
import { Customer } from '../entity/customer.entity';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    createCustomer(customerData: Customer): Promise<Customer>;
}
