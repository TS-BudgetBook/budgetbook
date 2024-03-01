import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from '../entity/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() customerData: Customer): Promise<Customer> {
    return await this.customerService.createCustomer(customerData);
  }
}
