import { ExpenseService } from './expense.service';
import { Expense } from 'src/entity/expense.entity';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    findAll(req: Request, page?: number, limit?: number): Promise<{
        expense: Expense[];
        totalItems: number;
    }>;
    findAllElements(req: Request): Promise<Expense[]>;
    findOne(id: string): Promise<Expense>;
    update(req: any, body: any): Promise<Expense[]> | Promise<Expense>;
    remove(id: string): Promise<void>;
}
