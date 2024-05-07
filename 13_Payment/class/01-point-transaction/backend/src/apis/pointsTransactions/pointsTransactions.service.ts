import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointTransaction } from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
  ) {}

  create({ impUid }: IPointsTransactionsServiceCreate): void {
    //
  }
}
