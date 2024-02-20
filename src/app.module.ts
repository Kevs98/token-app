import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisService } from './redis/services/redis/redis.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs'),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {
  constructor() {}
}
