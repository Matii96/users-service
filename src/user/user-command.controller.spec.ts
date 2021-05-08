import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCommandController } from './user-command.controller';
import { User } from 'src/entities/user.entity';
import { GetUserDto } from 'src/user-simple/dto/get.dto';

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

describe('UserCommand Controller', () => {
  let controller: UserCommandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [UserCommandController],
      providers: [
        {
          provide: getModelToken(User),
          useValue: { findOne: jest.fn(() => testUser) }
        }
      ]
    }).compile();

    controller = module.get<UserCommandController>(UserCommandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
