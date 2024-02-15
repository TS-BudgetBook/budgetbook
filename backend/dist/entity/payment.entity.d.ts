import { User } from './user.entity';
export declare class Payment {
    id: number;
    description: string;
    date: Date;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    user: User;
    userId: number;
}
