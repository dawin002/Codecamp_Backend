import { Injectable } from '@nestjs/common';
import { IStarbucksServiceCreate } from './interfaces/starbucks-service.interface';
import { Starbucks } from './entities/starbucks.entity';

@Injectable()
export class StarbucksService {
  findAll(): Starbucks[] {
    const coffeeTestData: Starbucks[] = [
      {
        number: 0,
        name: '아이스 아메리카노',
        price: 4500,
        kcal: 20,
        saturatedFat: 0,
        protein: 0,
        salt: 0,
        sugars: 0,
        caffeins: 5,
      },
      {
        number: 1,
        name: '에스프레소',
        price: 2500,
        kcal: 20,
        saturatedFat: 0,
        protein: 0,
        salt: 0,
        sugars: 0,
        caffeins: 5,
      },
      {
        number: 2,
        name: '카페라떼',
        price: 5500,
        kcal: 100,
        saturatedFat: 60,
        protein: 0,
        salt: 10,
        sugars: 50,
        caffeins: 5,
      },
      {
        number: 3,
        name: '초콜릿라떼',
        price: 5500,
        kcal: 200,
        saturatedFat: 80,
        protein: 0,
        salt: 15,
        sugars: 100,
        caffeins: 5,
      },
      {
        number: 4,
        name: '로즈마리티',
        price: 5000,
        kcal: 45,
        saturatedFat: 0,
        protein: 0,
        salt: 0,
        sugars: 0,
        caffeins: 0,
      },
    ];

    return coffeeTestData;
  }

  create({ createStarbucksInput }: IStarbucksServiceCreate): string {
    console.log('createSatrbucks API 실행 결과 출력');
    console.log(`음료이름: ${createStarbucksInput.name}`);
    console.log(`가격: ${createStarbucksInput.price}`);
    console.log(`1회당 제공량 (kcal): ${createStarbucksInput.kcal}`);
    console.log(`포화지방 (g): ${createStarbucksInput.saturatedFat}`);
    console.log(`단백질 (g): ${createStarbucksInput.protein}`);
    console.log(`나트륨 (mg): ${createStarbucksInput.salt}`);
    console.log(`당류 (g): ${createStarbucksInput.sugars}`);
    console.log(`카페인 (mg): ${createStarbucksInput.caffeins}`);

    return '등록에 성공하였습니다.';
  }
}
