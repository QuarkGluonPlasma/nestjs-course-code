import { Test, TestingModule } from '@nestjs/testing';
import { OtherService } from './other.service';

describe('OtherService', () => {
  let service: OtherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherService],
    }).compile();

    service = module.get<OtherService>(OtherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
