import {
  Column,
  Entity,
  JoinTable,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Customer } from './customer.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, default: 'Default Name' })
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('decimal', { precision: 10, scale: 2})
  amount: number;

  @Column()
  type: 'income' | 'expense';

  @Column()
  category: string;

  @Column()
  customerid: number;


  @ManyToOne(() => Customer, (customer) => customer.payments)
  @JoinColumn({name :'customerid'})
  customer: Customer;
}
