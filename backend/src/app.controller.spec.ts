import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AppService],
    }).compile();

    appController = app.get<AuthController>(AuthController);
  });
});
