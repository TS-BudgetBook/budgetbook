import {
  Column,
  Entity,
  JoinTable,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
// import { jwtDecode } from "jwt-decode";

import { Customer } from './customer.entity';
import { jwtDecode } from 'jwt-decode';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, default: 'Default Name' })
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: 'income' | 'expense';

  @Column()
  category: string;

  @Column()
  customerid: number;
}
