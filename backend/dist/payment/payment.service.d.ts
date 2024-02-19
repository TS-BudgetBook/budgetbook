import { Repository } from 'typeorm';
import { Payment } from '../entity/payment.entity';
export declare class PaymentService {
    private paymentRepository;
    constructor(paymentRepository: Repository<Payment>);
    findAll(): Promise<Payment[]>;
    findOne(id: number): Promise<Payment>;
    create(body: any): Promise<Payment[]>;
    update(id: number, body: any): Promise<Payment>;
    remove(id: number): Promise<void>;
}
