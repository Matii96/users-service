import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryController } from './user-query.controller';

describe('UserQuery Controller', () => {
  let controller: UserQueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserQueryController],
    }).compile();

    controller = module.get<UserQueryController>(UserQueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
