import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from 'src/entities/user.entity';
import { GetUserDto } from 'src/user-simple/dto/get.dto';
import { UserQueryController } from './user-query.controller';

const userBase = {
  name: 'Foo',
  fullName: 'Bar',
  description: 'Test user',
  email: 'foo@bar.com',
  lang: 'en',
  active: true,
  emailNotification: true
};
const testUser: GetUserDto = { id: 1, ...userBase, createdAt: new Date(), updatedAt: new Date() };

describe('UserQuery Controller', () => {
  let controller: UserQueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [UserQueryController],
      providers: [
        {
          provide: getModelToken(User),
          useValue: { findOne: jest.fn(() => testUser) }
        }
      ]
    }).compile();

    controller = module.get<UserQueryController>(UserQueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
