import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../entity/expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MetricsService } from 'src/metrics/metrics/metrics.service';
import { MetricsController } from 'src/metrics/metrics/metrics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]),
  JwtModule.register({
    global: true,
    secret: '829c4db7e4615364b0d31422c5ab536ec5d3542ceb26a25f2b68da527cfa8ba2',
    signOptions: { expiresIn: '3d' },
  }),],
  controllers: [ExpenseController, MetricsController],
  providers: [ExpenseService, JwtService, ConfigService, Logger, MetricsService],
})
export class ExpenseModule { }
