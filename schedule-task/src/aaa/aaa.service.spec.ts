import { Test, TestingModule } from '@nestjs/testing';
import { AaaService } from './aaa.service';

describe('AaaService', () => {
  let service: AaaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AaaService],
    }).compile();

    service = module.get<AaaService>(AaaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
