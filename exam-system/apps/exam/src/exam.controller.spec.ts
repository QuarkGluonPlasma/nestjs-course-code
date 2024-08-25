import { Test, TestingModule } from '@nestjs/testing';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';

describe('ExamController', () => {
  let examController: ExamController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExamController],
      providers: [ExamService],
    }).compile();

    examController = app.get<ExamController>(ExamController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(examController.getHello()).toBe('Hello World!');
    });
  });
});
