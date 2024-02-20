import { Entity, PrimaryGeneratedColumn, Column, OneToMany, IntegerType } from 'typeorm';
import { Payment } from './payment.entity'; 

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string; 

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  googleId: string; 

  @OneToMany(() => Payment, payment => payment.customer)
  payments: Payment[];
}
