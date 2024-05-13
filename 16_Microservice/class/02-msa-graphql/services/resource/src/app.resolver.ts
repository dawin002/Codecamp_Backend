// import { Controller, Get } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Query(() => String) // @nestjs/graphql 의 Query 임포트!
  fetchBoards() {
    return '게시글 데이터 보내기';
  }
}
