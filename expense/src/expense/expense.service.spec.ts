import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { describe, beforeEach } from 'mocha';


describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
