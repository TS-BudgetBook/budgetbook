import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('Payments', () => {
  let app: INestApplication;
  let paymentRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    paymentRepository = moduleFixture.get('PaymentRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/payment (POST)', async () => {
    await request(app.getHttpServer())
      .post('/payment')
      .send({ name: 'Payment 1', date: '2024-02-20', amount: 100.0, type: 'income', category: 'Salary' })
      .expect(201);

    const payments = await paymentRepository.find();
    expect(payments.length).toBe(1);
    expect(payments[0].name).toBe('Payment 1');
  });

  
});
