import { Repository } from 'typeorm';
import { Expense } from '../entity/expense.entity';
export declare class ExpenseService {
    private expenseRepository;
    constructor(expenseRepository: Repository<Expense>);
    findAll(req: any, page?: number, limit?: number): Promise<{
        expense: Expense[];
        totalItems: number;
    }>;
    findAllElements(req: any): Promise<Expense[]>;
    findOne(id: number): Promise<Expense>;
    create(req: any, body: any): Promise<Expense[]>;
    update(id: number, body: any): Promise<Expense>;
    remove(id: number): Promise<void>;
}
