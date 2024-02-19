import { Controller, Post, Get, Body, Req} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from '../entity/customer.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() customerData: Customer): Promise<Customer> {
    return await this.customerService.createCustomer(customerData);
  }
  
}
