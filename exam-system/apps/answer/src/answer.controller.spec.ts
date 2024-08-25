import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

describe('AnswerController', () => {
  let answerController: AnswerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [AnswerService],
    }).compile();

    answerController = app.get<AnswerController>(AnswerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(answerController.getHello()).toBe('Hello World!');
    });
  });
});
