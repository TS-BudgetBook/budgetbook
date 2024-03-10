import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../entity/expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]),
  JwtModule.register({
    global: true,
    secret: 'It3n4FJ2uO8VJhMXLQobzIyqKvWMnI',
    signOptions: { expiresIn: '3d' },
  }),],
  controllers: [ExpenseController],
  providers: [ExpenseService, JwtService, ConfigService, Logger],
})
export class ExpenseModule { }
