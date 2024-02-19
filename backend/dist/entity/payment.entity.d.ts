import { Customer } from './customer.entity';
export declare class Payment {
    id: number;
    description: string;
    date: Date;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    customer: Customer;
    userId: number;
}
