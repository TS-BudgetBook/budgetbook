import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../entity/expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  PrometheusModule,
  makeCounterProvider,
} from "@willsoto/nestjs-prometheus";

@Module({
  imports: [TypeOrmModule.forFeature([Expense]),
  PrometheusModule.register({
    defaultMetrics: {
      enabled: false,
    }
  }),
  JwtModule.register({
    global: true,
    secret: '829c4db7e4615364b0d31422c5ab536ec5d3542ceb26a25f2b68da527cfa8ba2',
    signOptions: { expiresIn: '3d' },
  }),],
  controllers: [ExpenseController],
  providers: [ExpenseService, JwtService, ConfigService, Logger,
    makeCounterProvider({
      name: "bb_expenses_put_count",
      help: "Count all Request against PUT /expanses",
    }),
    makeCounterProvider({
      name: "bb_expenses_get_all_count",
      help: "Gauge Request against GET /expanses/all",
    })
  ],
})
export class ExpenseModule { }
