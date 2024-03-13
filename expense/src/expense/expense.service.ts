import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entity/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) { }

  async findAll(
    req: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ expense: Expense[]; totalItems: number }> {
    const userid = req.user.sub;
    try {
      const [expense, totalItems] = await this.expenseRepository.findAndCount({
        where: { userid: userid },
        take: limit,
        skip: (page - 1) * limit,
      });

      return { expense, totalItems };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllElements(req: any): Promise<Expense[]> {
    const userid = req.user.sub;
    try {
      const expenses: Expense[] = await this.expenseRepository.find({
        where: { userid: userid },
      });
      return expenses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findOne(id: number): Promise<Expense> {
    const payment = this.expenseRepository.findOneBy({ id: id });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async create(req: any, body: any): Promise<Expense[]> {
    body.userid = req.user.sub;
    const payment = this.expenseRepository.create(body);
    return this.expenseRepository.save(payment);
  }

  async update(id: number, body: any): Promise<Expense> {
    await this.expenseRepository.update(id, body);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }
}
