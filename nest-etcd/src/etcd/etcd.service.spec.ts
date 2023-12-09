import { Test, TestingModule } from '@nestjs/testing';
import { EtcdService } from './etcd.service';

describe('EtcdService', () => {
  let service: EtcdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtcdService],
    }).compile();

    service = module.get<EtcdService>(EtcdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
