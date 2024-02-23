import {
  Column,
  Entity,
  JoinTable,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
}from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
// import { jwtDecode } from "jwt-decode";

;


import { Customer } from './customer.entity';
import { jwtDecode } from 'jwt-decode';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: 'income' | 'expense';

  @Column()
  category: string;

  @Column()
  jwtToken: string;

  @Column()
  customerid: number;
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, 
  ) {}
  @BeforeInsert()
  async assignCustomerId() {
    if (!this.jwtService) {
      throw new Error('JwtService not provided');
    }
    // const decodedToken =jwtDecode(this.jwtToken);
    const decodedToken = this.jwtService.decode(this.jwtToken) as any;
    if (decodedToken && decodedToken.customerid) {
      this.customerid = decodedToken.customerid;
    } else {
      throw new Error('Unable to decode JWT token or customerId missing');
    }
    }
  }


  // @ManyToOne(() => Customer, (customer) => customer.payments)
  // @JoinColumn({name :'customerid'})
  // customer: Customer;
