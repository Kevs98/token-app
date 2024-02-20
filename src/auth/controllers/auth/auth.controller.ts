import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../../../src/auth/dto/login.dto/login.dto';
import { AuthService } from '../../../../src/auth/services/auth/auth.service';
import { RedisService } from '../../../../src/redis/services/redis/redis.service';
import { RefreshTokenDto } from '../../../../src/token/dto/token.dto/refresh-token.dto';
import { TokenDto } from '../../../../src/token/dto/token.dto/token.dto';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.username, loginDto.password);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<any> {
    const oldToken = refreshTokenDto.oldToken;
    // check if token is blacklisted
    const isBlacklisted = await this.redisService.isInBlacklist(oldToken);
    if (isBlacklisted) {
      throw new UnauthorizedException('TOKEN HAS BEEN BLACKLISTED');
    }

    const newToken = await this.authService.refreshToken(oldToken);

    // add the previous token to blacklist whit a time expiration
    await this.redisService.addToBlacklist(oldToken);
    return { access_token: newToken };
  }

  @Post('secret-info')
  getProtectedString(@Body() tokenDto: TokenDto): string {
    return this.authService.privateContent(tokenDto.token);
  }
}
