import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Request } from 'express';
import { IRequestUserSimple } from './interfaces/request.interface';
import { GetUserDto } from './dto/get.dto';
import { UserLoginHistoryDto } from './dto/login-history.dto';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginDto } from './dto/login.dto';
import { ModifyUserDto } from './dto/modify.dto';
import { UserSimpleController } from './user-simple.controller';
import { UserSimpleService } from './user-simple.service';
import { User } from 'src/entities/user.entity';

const userBase = {
  name: 'Foo',
  fullName: 'Bar',
  description: 'Test user',
  email: 'foo@bar.com',
  lang: 'en',
  active: true,
  emailNotification: true
};
const testUserInput: ModifyUserDto = { ...userBase, password: 'password' };
const testUser: GetUserDto = { id: 1, ...userBase, createdAt: new Date(), updatedAt: new Date() };
const testLoginHistory: UserLoginHistoryDto = { address: '127.0.0.1', browser: 'chrome' };
const testLogin: LoginDto = {
  name: testUser.name,
  fullName: testUser.fullName,
  email: testUser.email,
  lang: testUser.lang,
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRm9vIiwiZnVsbE5hbWUiOiJCYXIiLCJlbWFpbCI6ImZvb0BiYXIuY29tIiwibGFuZyI6ImVuIiwiaWF0IjoxNjIwNDkyMTAzLCJleHAiOjE2MjEwOTY5MDN9.2OpWP9rCpsvYeTM2bx6XBS_V9Aw_BFzJFikZjwXxsjo'
};

class UserSimpleServiceStub {
  public async GetUser(user: GetUserDto) {
    return testUser;
  }

  public async List(): Promise<GetUserDto[]> {
    return [testUser];
  }

  public async GetLoginHistory(userId: number): Promise<UserLoginHistoryDto[]> {
    return [testLoginHistory];
  }

  public async Login(req: Request, data: LoginInputDto): Promise<LoginDto> {
    return testLogin;
  }

  public async CreateUser(data: ModifyUserDto): Promise<GetUserDto> {
    return testUser;
  }

  public async UpdateUser(userId: number, data: ModifyUserDto): Promise<GetUserDto> {
    return testUser;
  }

  public async RemoveUser(userId: number) {
    return;
  }

  public HandleDatabaseError(err: any): void {
    return;
  }
}

describe('UserSimple Controller', () => {
  let controller: UserSimpleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSimpleController],
      providers: [
        {
          provide: getModelToken(User),
          useValue: { findOne: jest.fn(() => testUser) }
        },
        {
          provide: UserSimpleService,
          useClass: UserSimpleServiceStub
        }
      ]
    }).compile();

    controller = module.get(UserSimpleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should get all users', async () => {
    expect(await controller.List()).toEqual([testUser]);
  });
  it('should get one user', async () => {
    expect(await controller.GetUser(<IRequestUserSimple>{ user: testUser })).toEqual(testUser);
  });
  it('should get login history', async () => {
    expect(await controller.GetLoginHistory(<IRequestUserSimple>{ user: testUser })).toEqual([testLoginHistory]);
  });
  it('should get login', async () => {
    expect(
      await controller.Login(<Request>{ headers: {}, connection: { remoteAddress: '127.0.0.1' } }, {
        nameOrEmail: 'Foo',
        password: 'password'
      })
    ).toEqual(testLogin);
  });
  it('should create user', async () => {
    expect(await controller.CreateUser(testUserInput)).toEqual(testUser);
  });
  it('should update user', async () => {
    expect(await controller.UpdateUser(<IRequestUserSimple>{ user: testUser }, testUserInput)).toEqual(testUser);
  });
  it('should remove user', async () => {
    expect(await controller.RemoveUser(<IRequestUserSimple>{ user: testUser })).toBeUndefined();
  });
});
