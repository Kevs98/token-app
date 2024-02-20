import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from '../auth/services/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { RedisService } from 'src/redis/services/redis/redis.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'tokenTestSonarQ',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RedisService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
