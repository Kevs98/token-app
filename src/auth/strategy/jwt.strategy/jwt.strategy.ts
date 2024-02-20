import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../../../src/auth/services/auth/auth.service';

export class JwtStrategy {
  constructor(private readonly authService: AuthService) {}

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
