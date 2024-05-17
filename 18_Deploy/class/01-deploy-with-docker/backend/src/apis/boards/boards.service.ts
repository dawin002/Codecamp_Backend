import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  findAll(): Board[] {
    // 1. DB 접속해 데이터 조회했다고 가정
    const result = [
      {
        number: 1,
        writer: '짱구',
        title: '제목 1',
        contents: '1번 글의 내용입니다!!',
      },
      {
        number: 2,
        writer: '철수',
        title: '제목 2',
        contents: '2번 글의 내용입니다!!',
      },
      {
        number: 3,
        writer: '유리',
        title: '제목 3',
        contents: '3번 글의 내용입니다!!',
      },
    ];

    // 2. DB에서 꺼내온 결과 응답
    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate): string {
    // 1. 브라우저의 요청 데이터 확인
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. DB 접속해 데이터 저장했다고 가정

    // 3. DB에 저장한 결과 응답
    return '게시물 등록에 성공했습니다.';
  }
}
