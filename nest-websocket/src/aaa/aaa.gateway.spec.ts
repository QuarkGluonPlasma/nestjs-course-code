import { Test, TestingModule } from '@nestjs/testing';
import { AaaGateway } from './aaa.gateway';
import { AaaService } from './aaa.service';

describe('AaaGateway', () => {
  let gateway: AaaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AaaGateway, AaaService],
    }).compile();

    gateway = module.get<AaaGateway>(AaaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
