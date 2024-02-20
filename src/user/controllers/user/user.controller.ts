import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../../../src/user/dto/user.dto/user.dto';
import { User } from '../../../../src/user/schema/user.schema';
import { UserService } from '../../../../src/user/services/user/user.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    try {
      return await this.userService.createUser(userDto);
    } catch (error) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
