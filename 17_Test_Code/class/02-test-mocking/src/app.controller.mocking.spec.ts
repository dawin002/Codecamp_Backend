// 가짜 AppService 를 만들어 TestingModule 에 의존성 주입하기

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

class MockAppService {
  getHello(): string {
    return '나는 가짜다!!!';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        // 사실 providers 안에는 이런 객체가 들어감
        {
          provide: AppService, //   // AppService 가 들어갈 자리에
          useClass: MockAppService, // MockAppService 를 넣어줌
        },
        // => AppController 의 AppService 의존성을 주입하는 자리에 MockAppService 의존성이 주입됨
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
