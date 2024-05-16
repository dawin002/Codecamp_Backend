// 컨트롤러 테스트

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    // nest에서 제공하는 TestingModule 사용해 의존성 주입하기
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile(); // 컴파일해서 최종적으로 의존성 주입하기

    // 의존성 주입한 앱 객체에서 앱컨트롤러 가져오기
    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  //   describe('fetchBoards', () => {});

  //   describe('createBoard', () => {});
});
