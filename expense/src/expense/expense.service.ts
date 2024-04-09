import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entity/expense.entity';
import { InjectMetric } from "@willsoto/nestjs-prometheus";
<<<<<<< HEAD
import { Counter } from "prom-client";
=======
import { Counter, Gauge, Histogram } from "prom-client";
>>>>>>> main

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
<<<<<<< HEAD
    @InjectMetric("bb_expenses_put_count") public counterPut: Counter<string>,
    @InjectMetric("bb_expenses_get_all_count") public counterGet: Counter<string>,
=======
    @InjectMetric("expenses_count") public counter: Counter<string>,
    @InjectMetric("expenses_gauge") public gauge: Gauge<string>,
    @InjectMetric("expenses_histogram") public histogram: Histogram<string>
>>>>>>> main
  ) { }

  async findAll(
    req: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ expense: Expense[]; totalItems: number }> {
    const customerid = req.customer.sub;
    try {
      const [expense, totalItems] = await this.expenseRepository.findAndCount({
        where: { customerid: customerid },
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
    const customerid = req.customer.sub;
    this.counterGet.inc();
    try {
      const expenses: Expense[] = await this.expenseRepository.find({
        where: { customerid: customerid },
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
<<<<<<< HEAD
    const route = req.route.path;
    body.customerid = req.customer.sub;
    const payment = this.expenseRepository.create(body);
    this.counterPut.inc();
=======
    let end = this.gauge.startTimer()
    const route = req.route.path;
    body.customerid = req.customer.sub;
    const payment = this.expenseRepository.create(body);
    this.counter.inc();
    this.histogram.observe(req.customer.sub);
    end({ route })
>>>>>>> main
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
