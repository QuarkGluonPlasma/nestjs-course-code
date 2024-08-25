import { Test, TestingModule } from '@nestjs/testing';
import { AnalyseController } from './analyse.controller';
import { AnalyseService } from './analyse.service';

describe('AnalyseController', () => {
  let analyseController: AnalyseController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AnalyseController],
      providers: [AnalyseService],
    }).compile();

    analyseController = app.get<AnalyseController>(AnalyseController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(analyseController.getHello()).toBe('Hello World!');
    });
  });
});
