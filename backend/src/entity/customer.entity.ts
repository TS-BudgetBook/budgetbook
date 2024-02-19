import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from './payment.entity'; 

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string; 

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  googleId: string; 

  @OneToMany(() => Payment, payment => payment.customer)
  payments: Payment[];
}
