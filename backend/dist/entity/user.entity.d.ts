import { Payment } from './payment.entity';
export declare class User {
    id: number;
    email: string;
    name: String;
    googleId: string;
    payments: Payment[];
}
