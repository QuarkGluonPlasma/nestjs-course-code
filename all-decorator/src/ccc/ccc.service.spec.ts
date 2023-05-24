import { Test, TestingModule } from '@nestjs/testing';
import { CccService } from './ccc.service';

describe('CccService', () => {
  let service: CccService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CccService],
    }).compile();

    service = module.get<CccService>(CccService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
