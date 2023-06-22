import { Test, TestingModule } from '@nestjs/testing';
import { BbbController } from './bbb.controller';
import { BbbService } from './bbb.service';

describe('BbbController', () => {
  let controller: BbbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BbbController],
      providers: [BbbService],
    }).compile();

    controller = module.get<BbbController>(BbbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
