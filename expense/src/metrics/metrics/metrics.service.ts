import { Counter, register } from 'prom-client';

import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
  private readonly newExpenseCounter: Counter;
  private newExpenseCount: number = 0;

  constructor() {
    this.newExpenseCounter = new Counter({
      name: 'newExpense_total',
      help: 'Total number of expenses to the BudgetBOOK app',
    });

    register.clear();
  }

  incrementnewExpenseCounter(): void {
    this.newExpenseCounter.inc();
    this.newExpenseCount++;
  }

  getMetrics(): any {
    return {
      service: 'expense',
      newExpenses: this.newExpenseCount,
    };
  }
}
