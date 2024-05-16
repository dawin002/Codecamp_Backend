import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get()
  // fetchBoards(): string {
  //   return '게시글 조회 성공!!';
  // }

  // @Post()
  // createBoard(): string {
  //   return '게시글 등록 성공!!';
  // }
}
