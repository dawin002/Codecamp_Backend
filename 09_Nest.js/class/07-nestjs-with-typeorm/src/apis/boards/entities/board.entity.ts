import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 테이블
export class Board {
  @PrimaryGeneratedColumn('increment') // 1씩 증가하는 고유 id, 값이 자동 생성됨
  number: number;

  @Column() // 콜룸(속성)
  writer: string;

  @Column()
  title: string;

  @Column()
  contents: string;
}
