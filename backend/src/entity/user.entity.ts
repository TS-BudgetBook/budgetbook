import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from './payment.entity'; 

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string; 

  @Column()
  name: String

  @Column({ nullable: true })
  googleId: string; 

  @OneToMany(() => Payment, payment => payment.user)
  payments: Payment[];
}
