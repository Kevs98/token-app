import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../../src/user/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: { username: string; id: string }) {
    // search user in database using username or id
    const user = await this.userService.findUser(payload.username);

    // check if user is fine and if the id match
    if (user && user.id === payload.id) {
      // return the user
      return user;
    }

    // if user not found or id doesn`t match throw null
    return null;
  }

  async login(username: string, password: string) {
    // find user by username
    const user = await this.userService.findUser(username);

    // check if user exist and his password matches
    if (!user || !(await this.userService.validatePassword(user, password))) {
      // generate JWT token
      const payload = { username: user.username, id: user.id };
      const access_token = this.jwtService.sign(payload);

      // return the JWT token
      return { access_token: access_token };
    }

    // if user not exist or the password is incorrect throw an exception
    throw new UnauthorizedException('INVALID CREDENTIALS');
  }

  async refreshToken(oldToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(oldToken);
      if (!payload) {
        throw new UnauthorizedException('INVALID TOKEN');
      }

      if (payload.exp) {
        return this.jwtService.sign(payload);
      } else {
        // generate a new token whit the same payload
        const newToken = this.jwtService.sign(payload, { expiresIn: '30m' });
        return newToken;
      }
    } catch (error) {
      console.error(error);
    }
  }

  privateContent(token: string): string {
    try {
      const payload = this.jwtService.verify(token);
      if (!payload) {
        throw new UnauthorizedException('INVALID TOKEN');
      }
      return 'THIS STRING IS ONLY ACCESSIBLE BY A VALID TOKEN IF YOU SEE THIS YOU ARE A VALID USER';
    } catch (error) {
      throw new UnauthorizedException('INVALID TOKEN');
    }
  }
}
