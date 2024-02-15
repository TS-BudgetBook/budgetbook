import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(body: any): Promise<import("../entity/payment.entity").Payment[]>;
    findAll(): Promise<import("../entity/payment.entity").Payment[]>;
    findOne(id: string): Promise<import("../entity/payment.entity").Payment>;
    update(id: string, body: any): Promise<import("../entity/payment.entity").Payment>;
    remove(id: string): Promise<void>;
}
