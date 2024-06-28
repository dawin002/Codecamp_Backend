import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Starbucks {
  @PrimaryGeneratedColumn('increment')
  number: number;
}
