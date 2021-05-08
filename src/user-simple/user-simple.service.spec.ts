import { ConfigModule } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize, FindOptions } from 'sequelize';
import { Request } from 'express';
import { LoginHistory } from 'src/entities/user-login-history.model';
import { User } from 'src/entities/user.entity';
import { GetUserDto } from './dto/get.dto';
import { ModifyUserDto } from './dto/modify.dto';
import { UserLoginHistoryDto } from './dto/login-history.dto';
import { UserSimpleService } from './user-simple.service';
import config from 'config';

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
const testUserEntity = { ...testUser, ComparePassword: (password: string) => password === 'password' };
const testLoginHistory: UserLoginHistoryDto = { address: '127.0.0.1', browser: 'chrome' };

describe('UserSimpleService', () => {
  let service: UserSimpleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [() => config] })],
      providers: [
        UserSimpleService,
        {
          provide: Sequelize,
          useValue: { transaction: jest.fn(async cb => await cb()) }
        },
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn((options: FindOptions) => [testUser]),
            findByPk: jest.fn((identifier: number, options: FindOptions) => testUser),
            findOne: jest.fn(() => testUserEntity),
            create: jest.fn(() => testUser),
            update: jest.fn(() => testUser),
            destroy: jest.fn(() => undefined)
          }
        },
        {
          provide: getModelToken(LoginHistory),
          useValue: {
            findAll: jest.fn(() => [testLoginHistory]),
            create: jest.fn(() => testLoginHistory)
          }
        }
      ]
    }).compile();

    service = module.get<UserSimpleService>(UserSimpleService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD', () => {
    it('should get one user', async () => {
      expect(await service.GetUser(<User>testUser)).toEqual(testUser);
    });
    it('should get all users', async () => {
      expect(await service.List()).toEqual([testUser]);
    });
    it('should get login history', async () => {
      expect(await service.GetLoginHistory(5)).toEqual([testLoginHistory]);
    });
    it('should create user', async () => {
      expect(await service.CreateUser(testUserInput)).toEqual(testUser);
    });
    it('should update user', async () => {
      expect(await service.UpdateUser(1, testUserInput)).toEqual(testUser);
    });
    it('should remove user', async () => {
      expect(await service.RemoveUser(1)).toBeUndefined();
    });
  });

  describe('Login', () => {
    it('should get login info with token', async () => {
      const { jwt, ...login } = await service.Login(
        <Request>{ headers: {}, connection: { remoteAddress: '127.0.0.1' } },
        {
          nameOrEmail: 'Foo',
          password: 'password'
        }
      );
      expect(login).toEqual({
        name: testUser.name,
        fullName: testUser.fullName,
        email: testUser.email,
        lang: testUser.lang
      });
      expect(jwt).toMatch(/^eyJ.*$/);
    });
    it('should fail to login', async () => {
      await expect(
        service.Login(<Request>{ headers: {}, connection: { remoteAddress: '127.0.0.1' } }, {
          nameOrEmail: 'Foo',
          password: 'bad-password'
        })
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
