// 1. 문자/숫자/불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("aaa", 12, true);

//
//
// 2. any 타입
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); // 여기에 뭐가 들어갈지 몰라서 에러 발생 가능
  return [arg3, arg2, arg1];
};

const resultAny = getAny("aaa", 12, true);

//
//
// 3. unknown 타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  // 뭔지 모르기 때문에 더할 수 없다
  // console.log(arg1 + 100);

  // 타입이 숫자라면 더할 수 있음
  if (typeof arg1 === "number") console.log(arg1 + 100);

  return [arg3, arg2, arg1];
};

const resultUnknown = getAny("aaa", 12, true);

//
//
// 4. generic 타입 (일반 함수, 화살표 말고)
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const resultGeneric = getGeneric<number, boolean, string>(12, false, "aaa");

//
//
// 4. generic 타입 - 2 (조금 줄임)
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

//
//
// 4. generic 타입 - 3 (조금 더 줄임)
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}

//
//
// 4. generic 타입 - 4 (화살표 함수)
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};
