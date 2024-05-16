// 컨트롤러 테스트

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    // 실패 케이스
    // it('이 테스트의 검증 결과는 Hello Dawin을 리턴해야함', () => {
    //   expect(appController.getHello()).toBe('Hello Dawin!');
    // });
  });

  //   describe('fetchBoards', () => {});

  //   describe('createBoard', () => {});
});
