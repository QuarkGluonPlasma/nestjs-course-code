import { Test, TestingModule } from '@nestjs/testing';
import { Lib1Service } from './lib1.service';

describe('Lib1Service', () => {
  let service: Lib1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Lib1Service],
    }).compile();

    service = module.get<Lib1Service>(Lib1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
