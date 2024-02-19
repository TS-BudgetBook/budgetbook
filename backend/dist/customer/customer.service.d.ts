import { Repository } from 'typeorm';
import { Customer } from '../entity/customer.entity';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    createCustomer(customerData: Customer): Promise<Customer>;
    findByEmail(email: string): Promise<Customer | null>;
}
