import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(paymentData: any): void;
    getAllPayments(): void;
    getPaymentById(id: string): void;
    updatePayment(id: string, updateData: any): void;
    deletePayment(id: string): void;
}
