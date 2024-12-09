import { Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}

  @MessagePattern({ cmd: 'login' }) // cmd: 'login' : api-gateway 컨트롤러에서 이 함수를 찾기 위한 메세지 패턴
  login(data) {
    // 로그인 진행
    console.log(data);
    return 'accessToken!!!';
  }

  logout() {
    // 로그아웃 진행
  }

  restoreAccessToken() {
    // 토큰 재발급
    return 'accessToken';
  }
}
