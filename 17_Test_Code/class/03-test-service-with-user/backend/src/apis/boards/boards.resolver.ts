import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class BoardsResolver {
  // 생성자에서 appService 인스턴스 의존성 주입받음
  constructor(
    private readonly boardsService: BoardsService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // Redis 연습을 위해 잠시 주석 처리
  // @Query(() => [Board], { nullable: true })
  // async fetchBoards(): Board[] {
  @Query(() => String, { nullable: true })
  async fetchBoards(): Promise<string> {
    // 1. 캐시에서 조회하기 연습
    const mycache = await this.cacheManager.get('qqq');
    console.log(mycache);

    // 2. 조회완료 메시지 전달
    return '캐시에서 조회 완료!';

    // Redis 연습을 위해 잠시 주석 처리
    // return this.boardsService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string, // GraphQL에서 데이터를 전달받을 수 있음
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 1. 캐시에 등록하기 연습
    await this.cacheManager.set('qqq', createBoardInput, 300);

    // 2. 등록완료 메시지 전달
    return '캐시에 등록 완료!';

    // Redis 연습을 위해 잠시 주석 처리
    // return this.boardsService.create({ createBoardInput });
  }
}
