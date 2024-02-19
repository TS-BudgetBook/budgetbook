import { Payment } from './payment.entity';
export declare class Customer {
    id: number;
    email: string;
    name: string;
    googleId: string;
    payments: Payment[];
}
