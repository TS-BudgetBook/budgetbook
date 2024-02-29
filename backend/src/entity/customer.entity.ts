import { Entity, PrimaryGeneratedColumn, Column, OneToMany, IntegerType } from 'typeorm';

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


}