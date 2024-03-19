import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../entity/expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MetricsService } from 'src/metrics/metrics.service';
import { MetricsController } from 'src/metrics/metrics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]),
  JwtModule.register({
    global: true,
    secret: '58e75a3e1aeb0820452c346aec8469e0cdc61f80d519e1fc24ae0d1e514c5835',
    signOptions: { expiresIn: '3d' },
  }),],
  controllers: [ExpenseController, MetricsController],
  providers: [ExpenseService, JwtService, ConfigService, Logger, MetricsService],
})
export class ExpenseModule { }
