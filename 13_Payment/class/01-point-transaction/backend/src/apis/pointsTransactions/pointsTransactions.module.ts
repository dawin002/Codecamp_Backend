import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsTransactionsResolver } from './pointsTransactions.resolver';
import { PointsTransactionsService } from './pointsTransactions.service';
import { PointTransaction } from './entities/pointTransaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
    ]),
  ],
  providers: [
    PointsTransactionsResolver, //
    PointsTransactionsService,
  ],
})
export class PointsTransactionsModule {}
