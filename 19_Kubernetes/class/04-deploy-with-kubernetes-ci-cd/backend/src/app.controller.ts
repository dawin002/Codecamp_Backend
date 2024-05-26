import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/')
    getHello() {
        return '헬스체커야 나 상태 좋음~';
    }
}