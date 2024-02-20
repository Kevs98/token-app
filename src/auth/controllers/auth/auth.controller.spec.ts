import { AuthService } from '../../../auth/services/auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RedisService } from '../../../../src/redis/services/redis/redis.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../../src/user/services/user/user.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, RedisService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    redisService = module.get<RedisService>(RedisService);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const loginDto = { username: 'kevin.estrada', password: 'test' };
      jest
        .spyOn(authService, 'login')
        .mockResolvedValueOnce({ access_token: 'testAccessToken' });

      const result = await controller.login(loginDto);
      expect(result).toEqual({ access_token: 'testAccessToken' });
    });
  });

  describe('refreshToken', () => {
    it('should return a new access token', async () => {
      const refreshTokenDto = { oldToken: 'testOldToken' };
      jest.spyOn(redisService, 'isInBlacklist').mockResolvedValueOnce(false);
      jest
        .spyOn(authService, 'refreshToken')
        .mockResolvedValueOnce('testNewToken');

      const result = await controller.refreshToken(refreshTokenDto);
      expect(result).toEqual({ access_token: 'testNewToken' });
    });

    it('should throw UnauthorizedException if old token is blacklisted', async () => {
      const refreshTokenDto = { oldToken: 'testOldToken' };
      jest.spyOn(redisService, 'isInBlacklist').mockResolvedValueOnce(true);

      await expect(controller.refreshToken(refreshTokenDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('getProtectedString', () => {
    it('should return protected string', () => {
      const tokenDto = { token: 'testToken' };
      jest
        .spyOn(authService, 'privateContent')
        .mockReturnValueOnce('testProtectedString');

      const result = controller.getProtectedString(tokenDto);
      expect(result).toEqual('testProtectedString');
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
