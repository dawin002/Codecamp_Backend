import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

@Resolver()
export class BoardsResolver {
  // 생성자에서 appService 인스턴스 의존성 주입받음
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @Query(() => String, { nullable: true })
  fetchBoards(): string {
    return this.boardsService.getHello();
  }
}
