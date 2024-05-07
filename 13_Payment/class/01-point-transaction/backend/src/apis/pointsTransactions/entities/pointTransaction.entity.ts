import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  impUid: string;
}
