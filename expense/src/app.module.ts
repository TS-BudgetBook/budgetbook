import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.' + process.env.NODE_ENV,
    }),
    ExpenseModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER ,
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_NAME ,
      autoLoadEntities: true,
      synchronize: true, // wird auf false gesetzt, wenn wird das deployen werden
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
