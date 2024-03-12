import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // const qqq = 3; // 원래 qqq에 eslint 에러(노란줄, 선언은 되었으나 사용되지 않았음) 떠야함

    const qqq = 3;

    let a = 0;

    console.log(a);

    const abc = 'asdf';

    return this.appService.getHello();
  }
}
