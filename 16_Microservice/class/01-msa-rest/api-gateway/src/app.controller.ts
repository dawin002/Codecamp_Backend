import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy, //

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  @Post('/auth/login')
  login() {
    // auth-service로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { cmd: 'login' }, // 첫 번째 인자: 트래픽을 받을 함수의 설정된 메세지 패턴
      { email: 'a@a.com', password: '1234' }, // 두 번째 인자: 트래픽과 함께 전달될 api 바디 인자
    );
  }

  @Get('/boards')
  fetchBoards() {
    // resource-service로 트래픽 넘겨줌
    return this.clientResourceService.send(
      { cmd: 'fetchBoards' }, //
      {}, // 넘겨줄 인자 없으면 빈 중괄호 사용
    );
  }
}
