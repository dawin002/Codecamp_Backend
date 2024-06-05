export class CoffeeDatabase {
  coffeeData = [
    { name: '아메리카노', kcal: 1 },
    { name: '카페라떼', kcal: 2 },
    { name: '콜드브루', kcal: 3 },
    { name: '돌체라떼', kcal: 4 },
    { name: '카페모카', kcal: 5 },
    { name: '카라멜라떼', kcal: 6 },
    { name: '바닐라라떼', kcal: 7 },
    { name: '에스프레소', kcal: 8 },
    { name: '디카페인', kcal: 9 },
    { name: '오트라떼', kcal: 100 },
  ];

  getCoffees = () => {
    return this.coffeeData;
  };
}
