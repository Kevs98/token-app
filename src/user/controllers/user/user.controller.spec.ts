import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../../../src/user/services/user/user.service';
import { UserModule } from '../../../../src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../../../src/auth/auth.module';
import { UserSchema } from 'src/user/schema/user.schema';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        AuthModule,
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
