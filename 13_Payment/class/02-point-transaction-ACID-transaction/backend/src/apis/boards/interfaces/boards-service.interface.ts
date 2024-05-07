import { CreateBoardInput } from '../dto/create-board.input';

// create 함수의 인자로 사용될 Board 타입 인터페이스 정의
export interface IBoardsServiceCreate {
  createBoardInput: CreateBoardInput;
}
