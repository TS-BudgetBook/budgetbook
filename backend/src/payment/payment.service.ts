import { Injectable,ExecutionContext, NotFoundException, Req  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entity/payment.entity';
import { AuthService } from 'src/auth/auth.service';
//import { AuthService } from 'src/auth/auth.service';
// import { AuthService } from '../auth/auth.service';

@Injectable()
export class PaymentService {
constructor(@InjectRepository(Payment)private paymentRepository: Repository<Payment>) {}
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

        
  async create(body): Promise<Payment[]> {
    // const decodedToken = this.AuthService.decodeJWT(jwtToken);
    // const payment = this.paymentRepository.create({
    //   customerid: decodedToken.customerId,
    //   name: body.name,
    //   date: body.date,
    //   amount: body.amount,
    //   type: body.type,
    //   category: body.category,
    // });
    //const token = this.extractTokenFromHeader(request);
    // const customerId = req.user.customerId;
    // body.customerid = 1;
    
    // body.customerid=this.authService.getActiv();
    // console.log(this.authService.getActiv());
    // const decodedToken: any = jwt.verify(token, secretKey);
    console.log(body.customerid);
    const payment = this.paymentRepository.create(body);
    return this.paymentRepository.save(payment);
  }
        
  async update(id: number, body: any): Promise<Payment> {
    await this.paymentRepository.update(id, body);
    return this.paymentRepository.findOneBy({ id: id });
  }
        
  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
