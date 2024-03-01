import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
import request, { SuperTest, Test as STest } from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/auth/google/redirect (GET)', async () => {

  //   const token = '1234';

  //   return request(app.getHttpServer())
  //     .get('/auth/google/redirect')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200);
  // });
});
