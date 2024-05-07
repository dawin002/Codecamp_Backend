import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user, // user 매개변수의 이름을 _user 로 바꿔 사용
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    // 쿼리 러너 생성 :
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // 쿼리 러너를 DB와 연결
    await queryRunner.startTransaction(); // 트랜잭션 시작

    // try-catch 문으로 트랜잭션이 성공하면 commit, 실패하면 rollback
    try {
      // 1. PointTransaction 테이블에 거래기록 1줄 생성

      // 객체를 만들어 나중에 저장하고 싶을 때 (create: 등록을 위한 빈 객체 만들기)
      // await 안붙음 -> 붙는지 확인하려면 함수에 마우스 올려서 반환 타입 Promise 인지 확인
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid, // 키와 밸류 이름이 같아 밸류 생략
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      // DB 저장은 하나의 트랜잭션으로 독립 실행되어 트랜잭션 진행중 실행돼버림
      // await this.pointsTransactionsRepository.save(pointTransaction);

      // 쿼리러너를 통해 저장하면 트랜잭션이 커밋된 이후 DB에 저장됨
      await queryRunner.manager.save(pointTransaction);

      // 트랜잭션 실패 태스트를 위한 강제 에러 발생
      // throw new Error('예기치 못한 실패!! (트랜잭션 실패 테스트)');

      // 2. 유저의 잔고 조회

      // 조회 도중 DB가 변경되면 변경된 DB가 조회됨
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });

      // 쿼리러너를 통해 조회해 트랜잭션이 시작될 때의 DB 상태로 조회
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
      });

      // 3. 유저의 잔고 업데이트

      // 업데이트 결과를 트랜잭션이 끝나고 저장해야 하기 때문에 update 대신 create 사용
      const updatedUser = await this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);

      // 트랜잭션의 결과 저장
      await queryRunner.commitTransaction();
      // 커밋이 되며 queryRunner.manager.save() 했던 것들이 DB에 저장됨

      // 4. 최종결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (error) {
      // 트랜잭션 중 하나라도 실패한 경우 원래대로 rollback
      await queryRunner.rollbackTransaction();

      // finally : 성공하든 실패하든 마지막에 실행할 코드
    } finally {
      // 쿼리 러너와 DB와의 연결 끊기
      queryRunner.release();
    }
  }
}
