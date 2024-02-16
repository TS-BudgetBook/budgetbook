import { Payment } from './payment.entity';
export declare class User {
    id: number;
    email: string;
    name: string;
    googleId: string;
    payments: Payment[];
}
