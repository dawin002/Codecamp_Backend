import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';

@Resolver()
export class BoardsResolver {
  // 생성자에서 appService 인스턴스 의존성 주입받음
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    // fetchBoards 복수형: 목록을 부를 때 주로 사용
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string, // GraphQL에서 데이터를 전달받을 수 있음
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardsService.create({ createBoardInput });
  }
}
