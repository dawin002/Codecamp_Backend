import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() // type Board 가 생성됨
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int) // Int 타입 GraphQL 필드로 정의
  number: number;

  @Column()
  @Field(() => String) // String 타입 GraphQL 필드로 정의
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
