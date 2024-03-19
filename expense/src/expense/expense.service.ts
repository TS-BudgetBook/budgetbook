import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entity/expense.entity';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    private metricsService: MetricsService
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
    const expense = this.expenseRepository.findOneBy({ id: id });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  async create(req: any, body: any): Promise<Expense[]> {
    body.userid = req.user.sub;
    const expense = this.expenseRepository.create(body);
    this.metricsService.incrementnewExpenseCounter();
    return this.expenseRepository.save(expense);

  }
  // async create(req: any, body: any): Promise<Expense[]> {
  //   body.userid = req.user.sub;
  //   const expense = this.expenseRepository.create(body);
  //   await this.expenseRepository.save(expense);
  //   this.metricsService.incrementnewExpenseCounter();
  //   // this.metricsService.incrementTotalExpenseCounter();
  //   return expense;
  // }

  


  async update(id: number, body: any): Promise<Expense> {
    await this.expenseRepository.update(id, body);
    return this.findOne(id);
  }
  // async update(id: number, body: any): Promise<Expense> {
  //   const result = await this.expenseRepository.update(id, body);
  //   if (result.affected > 0) {
  //     this.metricsService.incrementTotalExpenseCounter();
  //   }
  //   return this.findOne(id);
  // }

  

  async remove(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }
}
