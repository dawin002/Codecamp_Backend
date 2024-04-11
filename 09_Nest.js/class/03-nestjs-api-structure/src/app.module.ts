import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService], // index.js 의 new AppController(new AppService);와 같음
})
export class AppModule {}
