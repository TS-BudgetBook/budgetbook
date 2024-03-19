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
  makeGaugeProvider,
  makeHistogramProvider
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
      name: "expenses_count",
      help: "Count all Request against PUT /expanses",
    }),
    makeGaugeProvider({
      name: "expenses_gauge",
      help: "Gauge Request against PUT /expanses",
      labelNames: ['route'],
    }),
    makeHistogramProvider({
      name: "expenses_histogram",
      help: "Histogram Request against PUT /expanses",
      labelNames: ['route'],
      buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
    })
  ],
})
export class ExpenseModule { }
