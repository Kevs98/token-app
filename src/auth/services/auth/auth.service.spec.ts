import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common';
import { AuthController } from 'src/auth/controllers/auth/auth.controller';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy/jwt.strategy';
import { RedisService } from 'src/redis/services/redis/redis.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
          secret: 'tokenTestSonarQ',
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy, RedisService],
      exports: [AuthService, JwtModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
