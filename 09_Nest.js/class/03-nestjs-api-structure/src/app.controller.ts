import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 생성자에서 appService 인스턴스 의존성 주입받음
  constructor(private readonly appService: AppService) {}

  // getHello 라는 API 함수 (Get 메서드)
  //
  @Get() // 엔드포인트 주소는 괄호 안에 작성('/products/buy') 처럼
  getHello(): string {
    const qqq = 3;
    qqq;

    let a = 0;
    a = 1;
    console.log(a);

    const abc = 'asdf';
    abc;

    const profile = {
      age: 3,
      school: '다람쥐초등학교',
    };

    // appService 인스턴스의 getHello() 메서드 사용
    return this.appService.getHello();
  }
}
