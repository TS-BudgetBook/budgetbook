import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('Payments', () => {
  let app: INestApplication;
  let expenseRepository;

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

    expenseRepository = moduleFixture.get('ExpenseRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/payment (PUT)', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoib25zLmJlbi15b3Vzc2VmQGRvY2MudGVjaHN0YXJ0ZXIuZGUiLCJpYXQiOjE3MDkxMTg2NDAsImV4cCI6MTcwOTEyMjI0MH0.ce1DpU_s3mUQoLgGXFs-dUQ56tYphE8-RSBGsbOTqlw';
    await request(app.getHttpServer())
      .put('/payment')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: '10',
        name: 'Payment 1',
        date: '2024-02-27',
        amount: 100.0,
        type: 'income',
        category: 'Salary',
        customerid: '5',
      })
      .expect(200);
  });
  it('/payment (Get)', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoib25zLmJlbi15b3Vzc2VmQGRvY2MudGVjaHN0YXJ0ZXIuZGUiLCJpYXQiOjE3MDkxMjQzNTcsImV4cCI6MTcwOTM4MzU1N30.3iDth7_3a1oac8jM0ATvJIuvVeSRsOC7GxuUR9P1zrU';
    await request(app.getHttpServer())
      .get('/payment')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
  it('/payment (Get by id)', async () => {
    await request(app.getHttpServer())
      .get('/payment/10')

      .expect(200);
  });
  it('/payment (Delete)', async () => {
    await request(app.getHttpServer()).delete('/payment/10').expect(200);
  });
});
