import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entity/expense.entity'
import { Repository } from 'typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from "prom-client";
@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    private jwtService: JwtService,
    @InjectMetric("bb_aufrufe_statistics_count") public statisticsCounter: Counter<string>,
    private logger: Logger,
  ) { }
  async getStatistics(customerId: number): Promise<any> {
    this.logger.log('STATISTICS', 'Statistics Counter')
    this.statisticsCounter.inc();
    try {
      const totalsQuery = `
                SELECT
                    SUM(IF(type = 'expense', amount, 0)) AS totalExpenses,
                    SUM(IF(type = 'income', amount, 0)) AS totalIncome
                FROM expense
                WHERE customerid = ?
            `;

      const totalsResult = await this.expenseRepository.query(totalsQuery, [
        customerId,
      ]);
      const totals = totalsResult[0];

      const expensesQuery = `
                SELECT category, SUM(amount) AS total
                FROM expense
                WHERE customerid = ? AND type = 'expense'
                GROUP BY category
            `;

      const expensesResult = await this.expenseRepository.query(expensesQuery, [
        customerId,
      ]);

      const expensesByCategory = {};
      expensesResult.forEach((expense) => {
        expensesByCategory[expense.category] = expense.total;
      });

      const incomeQuery = `
                SELECT category, SUM(amount) AS total
                FROM expense
                WHERE customerid = ? AND type = 'income'
                GROUP BY category
            `;

      const incomeResult = await this.expenseRepository.query(incomeQuery, [
        customerId,
      ]);

      const incomeByCategory = {};
      incomeResult.forEach((income) => {
        incomeByCategory[income.category] = income.total;
      });

      const balance = totals.totalIncome - totals.totalExpenses;
      return {
        totalExpenses: totals.totalExpenses,
        totalIncome: totals.totalIncome,
        balance: balance,
        expensesByCategory: expensesByCategory,
        incomeByCategory: incomeByCategory,
      };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }
}
