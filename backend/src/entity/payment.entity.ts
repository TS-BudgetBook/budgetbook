import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne } from 'typeorm';
import { User } from './user.entity';

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


  

   @ManyToOne(() => User, user => user.payments) 
  user: User; 
  
  @Column({ nullable: true })
  userId: number;
  
  
  /* @JoinTable()
  @ManyToOne(type=> user, user => user.Entity, {cascade:true})
  user:user[];
 */
}
