import { Test, TestingModule } from '@nestjs/testing';
import { GrpcServerController } from './grpc-server.controller';
import { GrpcServerService } from './grpc-server.service';

describe('GrpcServerController', () => {
  let grpcServerController: GrpcServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GrpcServerController],
      providers: [GrpcServerService],
    }).compile();

    grpcServerController = app.get<GrpcServerController>(GrpcServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(grpcServerController.getHello()).toBe('Hello World!');
    });
  });
});
