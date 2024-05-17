import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 이넘 타입 생성
export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

// GraphQL 에 이넘 타입 등록
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM }) // 엔티티 이넘 타입 적용법
  @Field(() => POINT_TRANSACTION_STATUS_ENUM) //                 // GraphQL 이넘 타입 적용법
  status: POINT_TRANSACTION_STATUS_ENUM; // 이넘 타입으로 하드코딩된 값 교체

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn() // 자동 생성되는 날짜 필드
  @Field(() => Date)
  createdAt: Date;
}
