import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entity/expense.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    private jwtService: JwtService,
  ) {}

  async findAll(req: any): Promise<Expense[]> {
    const customerid = req.customer.sub;

    try {
      const payments = await this.expenseRepository.find({
        where: { customerid: customerid },
      });
      console.log(payments);
      return payments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findOne(id: number): Promise<Expense> {
    const payment = this.expenseRepository.findOneBy({ id: id });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async create(req: any, body: any): Promise<Expense[]> {
    body.customerid = req.customer.sub;
    const payment = this.expenseRepository.create(body);
    return this.expenseRepository.save(payment);
  }

  async update(id: number, body: any): Promise<Expense> {
    await this.expenseRepository.update(id, body);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }
}
