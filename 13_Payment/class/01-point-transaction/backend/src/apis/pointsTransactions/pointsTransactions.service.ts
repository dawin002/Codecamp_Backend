import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({
    impUid,
    amount,
    user: _user, // user 매개변수의 이름을 _user 로 바꿔 사용
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {

    // this.pointsTransactionsRepository.create(); // 등록을 위한 빈 객체 만들기
    // this.pointsTransactionsRepository.insert(); // 결과는 못 받는 등록 방법
    // this.pointsTransactionsRepository.update(); // 결과는 못 받는 수정 방법

    // 1. PointTransaction 테이블에 거래기록 1줄 생성

    // 객체를 만들어 나중에 저장하고 싶을 때 (create: 등록을 위한 빈 객체 만들기)
    // await 안붙음 -> 붙는지 확인하려면 함수에 마우스 올려서 반환 타입 Promise 인지 확인
    const pointTransaction = this.pointsTransactionsRepository.create({
      impUid, // 키와 밸류 이름이 같아 밸류 생략
      amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    // 만든 객체 저장하기
    await this.pointsTransactionsRepository.save(pointTransaction);

    // 2. 유저의 잔고 조회
    // 여기서는 임시로 UsersService.findOne 사용 안함 (뒤쪽의 다른 코드 때문에 예외적으로)
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    // 3. 유저의 잔고 업데이트
    // 업데이트 결과를 돌려받을 필요 없기 때문에 save 대신 update 함수 사용
    // await로 업데이트 결과를 기다렸다가 리턴 (에러 발생시 에러 결과가 응답되어야 하기 때문)
    await this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    // 4. 최종결과 브라우저에 돌려주기
    return pointTransaction;
  }
}
