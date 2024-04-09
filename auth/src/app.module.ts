import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entity/user.entity';
import { PrometheusModule } from '@willsoto/nestjs-prometheus'

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      }
    }),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env.' + process.env.NODE_ENV,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true, // wird auf false gesetzt, wenn wird das deployen werden
    }),
    TypeOrmModule.forFeature([User]),
  ]
})
export class AppModule { }
