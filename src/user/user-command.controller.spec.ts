import { Test, TestingModule } from '@nestjs/testing';
import { UserCommandController } from './user-command.controller';

describe('UserCommand Controller', () => {
  let controller: UserCommandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCommandController]
    }).compile();

    controller = module.get<UserCommandController>(UserCommandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
