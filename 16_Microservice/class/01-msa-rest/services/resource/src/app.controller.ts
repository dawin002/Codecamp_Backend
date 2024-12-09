import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}

  @MessagePattern({ cmd: 'fetchBoards' }) // cmd: 'fetchBoards' : api-gateway 컨트롤러에서 이 함수를 찾기 위한 메세지 패턴
  fetchBoards() {
    // 데이터 조회
    return '게시글 데이터 보내주기';
  }
}
