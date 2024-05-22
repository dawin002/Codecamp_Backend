import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user']; // id 필드만 가지는 user 객체 타입
}
