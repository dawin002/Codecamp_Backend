import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello 라는 서비스 함수
  getHello(): string {
    return 'Hello World!';
  }
}
