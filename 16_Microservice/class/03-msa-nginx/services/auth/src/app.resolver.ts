// import { Controller, Get } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Mutation(() => String)
  login() {
    return 'accessToken!!!';
  }

  @Query(() => String)
  aaa() {
    // GraphQL은 API 목록에 최소 한개의 쿼리 API가 존재해야 작동함
    return 'aaa';
  }
}
