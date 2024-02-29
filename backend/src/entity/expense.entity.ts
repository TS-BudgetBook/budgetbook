import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
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
