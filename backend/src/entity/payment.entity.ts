import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';
import { Customer  } from './customer.entity'; 

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  description: string;

  @Column()
  date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: 'income' | 'expense';

  @Column()
  category: string;

  @ManyToOne(() => Customer, customer => customer.payments) 
  @JoinTable() 
  customer: Customer;

  @Column({ nullable: true })
  userId: number;
}

  
  /* @JoinTable()
  @ManyToOne(type=> user, user => user.Entity, {cascade:true})
  user:user[];
 */

