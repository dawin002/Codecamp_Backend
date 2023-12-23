// spread 연산자

//      하나로 뭉쳐있는 값들의 집합을 전개해주는 연산자
//      ... <- 이게 spread 연산자

// 배열 spread
let arr = [1, 2, 3, 4, 5];

console.log(arr);    // 결과: [ 1, 2, 3, 4, 5 ]

console.log(...arr); // 결과: 1 2 3 4 5
//      1, 2, 3, 4, 5로 전개됨


//      배열 spread 복사로 두 배열 합치기
let arr2 = [6, 7, 8];

let arr3 = [...arr, ...arr2];

console.log(arr3); // 결과: [1, 2, 3, 4, 5, 6, 7, 8]


// 문자열 spread
let str = "Hello";

console.log(str);    // Hello

console.log(...str); // H e l l o
//      "H", "e", "l", "l", "o"로 전개됨


// 객체 spread
const obj = {name: 'otter', gender: 'male'};

//      아래 방식으로는 사용 불가, 에러 발생
// console.log(...obj);   // TypeError: Found non-callable @@iterator
// const newObj = ...obj; // SyntaxError: Unexpected token '...'

//      아래 방식으로 사용해야 함
//      중괄호 내 데이터를 spread로 중괄호를 벗겨주고 다시 중괄호를 씌워 새롭게 할당
const copyObj = {...obj};
console.log(copyObj); // { name: 'otter', gender: 'male' }


//      spread 연산자로 객체 복사
copyObj.gender = 'female';

console.log(obj.gender);     // male
console.log(copyObj.gender); // female
//      원시형 프로퍼티 변수들은 원본과 복사본에 상호 영향 없음


//      spread 이용한 객체 복사의 한계 (참조형 프로퍼티 변수의 얕은 복사)
obj.hobby = {one: 'shopping', two: 'game'}; // hobby 객체 프로퍼티 추가

const newCopyObj = {...obj};

newCopyObj.hobby.two = 'study'; // hobby 프로퍼티 객체의 프로퍼티 수정

console.log(obj.hobby); // 결과: { one: 'shopping', two: 'study' }
//      spread 한 데이터 중 참조형 변수가 존재하면 주소값이 복사되어 원본에 영향 생김
//      -> 얕은 복사
