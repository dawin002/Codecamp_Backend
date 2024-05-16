import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';

// 테스트용 데이터베이스 만들기
class MockUsersRepository {
  // 가짜 UsersRepository 를 만드는데 필요한 함수만 구현하면 됨

  // 테스트용 가짜 DB 만들기
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'qqq@qqq.com', password: '1234', name: '철수', age: 12 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      // 진짜 TypeOrmModule 을 이용해 DB에 접속하는게 아니기 때문에 주석 처리
      // imports: [TypeOrmModule...],
      // controllers: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // User 레파지토리 들어갈 자리에
          useClass: MockUsersRepository, //  // 가짜로 만든 MockUsersRepository 넣기
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  //   DB 접속을 필요로 하기 때문에 실제로 테스트는 안함. 그냥 예제로 알려준 것
  //   describe('findOneByEmail', () => {
  //     const result = usersService.findOneByEmail({ email: 'a@a.com' });

  //     // 객체끼리는 주소값으로 비교되기 때문에 toStrictEqual 로 객체를 문자열로 만들어서 비교
  //     expect(result).toStrictEqual({
  //       email: 'a@a.com',
  //       name: '짱구',
  //     });
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증', async () => {
      const myData = {
        email: 'a@a.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        // 중복된 이메일을 찾아 ConflictException 에러가 발생한 경우 테스트 성공
        expect(error).toBeInstanceOf(ConflictException);
        // expect(error).toBeInstanceOf(UnprocessableEntityException); // 잘 작동하는지 확인용 실패 케이스
      }
    });

    it('회원 등록 잘 됐는지 검증', async () => {
      const myData = {
        email: 'b@b.com',
        password: '1234',
        name: '유리',
        age: 13,
      };

      const result = await usersService.create({ ...myData });

      // password 는 DB에 해쉬된 값이 들어가기 때문에 제외해야 함
      const { password, ...rest } = result; // password 제외하기
      expect(rest).toStrictEqual({
        email: 'b@b.com',
        // password: '1234', // password 제외하기
        name: '유리',
        age: 13,
      });
    });
  });
});
