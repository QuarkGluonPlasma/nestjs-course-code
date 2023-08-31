import { Test, TestingModule } from '@nestjs/testing';
import { App2Controller } from './app2.controller';
import { App2Service } from './app2.service';

describe('App2Controller', () => {
  let app2Controller: App2Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [App2Controller],
      providers: [App2Service],
    }).compile();

    app2Controller = app.get<App2Controller>(App2Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(app2Controller.getHello()).toBe('Hello World!');
    });
  });
});
