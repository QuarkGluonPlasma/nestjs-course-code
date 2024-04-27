import { Test, TestingModule } from '@nestjs/testing';
import { AaaController } from './aaa.controller';
import { AaaService } from './aaa.service';

describe('AaaController', () => {
  let controller: AaaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AaaController],
      providers: [AaaService],
    }).compile();

    controller = module.get<AaaController>(AaaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
