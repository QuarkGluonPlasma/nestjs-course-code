import { Test, TestingModule } from '@nestjs/testing';
import { BbbService } from './bbb.service';

describe('BbbService', () => {
  let service: BbbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BbbService],
    }).compile();

    service = module.get<BbbService>(BbbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
