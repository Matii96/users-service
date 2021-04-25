import { Test, TestingModule } from '@nestjs/testing';
import { UserSimpleController } from './user-simple.controller';

describe('UserSimple Controller', () => {
  let controller: UserSimpleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSimpleController],
    }).compile();

    controller = module.get<UserSimpleController>(UserSimpleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
