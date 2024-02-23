import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entity/customer.entity';
import { Payment } from 'src/entity/payment.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>, 
  ) {}

  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customerData);
    return await this.customerRepository.save(newCustomer);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({ where: { email } });
  }
  async getCustomersWithexpenses(): Promise<Customer[]> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .innerJoinAndSelect('customer.payments', 'payment')
      .getMany();
  }
}
