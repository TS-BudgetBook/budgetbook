import {
  Injectable,
  ExecutionContext,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entity/expense.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/auth/contanst';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    private jwtService: JwtService,
  ) {}
  // constructor(@InjectRepository(Payment)private paymentRepository: Repository<Payment>,private readonly authService: AuthService){}

  async findAll(req: Request): Promise<Expense[]> {
    const token = req.headers.authorization?.split(' ')[1];
    /* const token = jwtConstants.token; */
    const customer = this.jwtService.verify(token);
    const customerid = customer.sub;

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

  async create(req: Request, body: any): Promise<Expense[]> {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token', req.headers);
    //const token = req.cookies.jwt;

    // JWT TOKEN VERYFICATION //
    //const token = jwtConstants.token;
    const customer = this.jwtService.verify(token);
    body.customerid = customer.sub;
    // body.customerid = 1;
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
