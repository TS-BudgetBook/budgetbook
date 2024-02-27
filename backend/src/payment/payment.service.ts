import {
  Injectable,
  ExecutionContext,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entity/payment.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/auth/contanst';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private jwtService: JwtService,
  ) {}
  // constructor(@InjectRepository(Payment)private paymentRepository: Repository<Payment>,private readonly authService: AuthService){}

  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  findOne(id: number): Promise<Payment> {
    const payment = this.paymentRepository.findOneBy({ id: id });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async create(req: Request, body: any): Promise<Payment[]> {
    console.log("++++++++++++++++++++++++++++++++")
    console.log(req.headers)
    const token = req.headers.authorization?.split(' ')[1];
    //const token = req.cookies.jwt;

    // JWT TOKEN VERYFICATION //
    //const token = jwtConstants.token;
    const customer = this.jwtService.verify(token);
    body.customerid = customer.sub; 
    // body.customerid = 1;
    const payment = this.paymentRepository.create(body);
    return this.paymentRepository.save(payment);
  }

  async update(id: number, body: any): Promise<Payment> {
    await this.paymentRepository.update(id, body);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
