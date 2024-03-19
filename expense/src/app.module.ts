import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './expense/expense.controller';
import { MetricsController } from './metrics/metrics.controller';
import { ExpenseService } from './expense/expense.service';
import { MetricsService } from './metrics/metrics.service';
import { Expense } from './entity/expense.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.' + process.env.NODE_ENV,
    }),
    ExpenseModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Expense],
      synchronize: true, // wird auf false gesetzt, wenn wird das deployen werden
    }),
    TypeOrmModule.forFeature([Expense]),
  ],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class AppModule { }
