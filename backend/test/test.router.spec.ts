import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('PaymentController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new payment', () => {
    return request(app.getHttpServer())
      .post('/payment')
      .send({ /* body für die neue Zahlung */ })
      .expect(201); 
  });

  it('should get all payments', () => {
    return request(app.getHttpServer())
      .get('/payment')
      .expect(200) 
      .expect('Content-Type', /json/); 
  });

  it('should get a single payment by ID', () => {
    return request(app.getHttpServer())
      .get('/payment/1') 
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('should update a payment by ID', () => {
    return request(app.getHttpServer())
      .put('/payment/1') // Beispiel-ID
      .send({ /* aktualisierte Zahlungsinformationen */ })
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('should delete a payment by ID', () => {
    return request(app.getHttpServer())
      .delete('/payment/1') // Beispiel-ID
      .expect(200);
  });
});
