import { Test, TestingModule } from '@nestjs/testing';
import { CccController } from './ccc.controller';
import { CccService } from './ccc.service';

describe('CccController', () => {
  let controller: CccController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CccController],
      providers: [CccService],
    }).compile();

    controller = module.get<CccController>(CccController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
