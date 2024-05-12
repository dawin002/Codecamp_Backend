import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
  // TypeORM 과 연결
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  // Product 엔티티를 관측
  listenTo() {
    return Product;
  }

  // 등록 이후에 등록된 데이터 로그 처리하기
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log(event);

    const id = event.entity.id;
    const name = event.entity.name;
    const description = event.entity.description;
    const price = event.entity.price;
    const isSoldout = event.entity.isSoldout;

    console.log(`${id} ${name} ${description} ${price} ${isSoldout}`);
    // 실제 로그는 빅쿼리 또는 엘라스틱서치 에 담기

    // 1. 트리거는 언제 사용하면 안될까?
    //    트랜잭션으로 연결된 중요한 내용들...
    //    트리거로 구현된줄 모르고 중복으로 구현할 수 있기 때문

    // 2. 어떤 것들을 사용하면 좋을까?
    //    메인 로직에 큰 피해를 끼치지 않는 로직들...(통계 계산하기, 로그 쌓기)
  }
}
