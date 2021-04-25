import { Test, TestingModule } from '@nestjs/testing';
import { UserSimpleService } from './user-simple.service';

describe('UserSimpleService', () => {
  let service: UserSimpleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSimpleService],
    }).compile();

    service = module.get<UserSimpleService>(UserSimpleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
