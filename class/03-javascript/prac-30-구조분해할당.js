// 구조분해할당

//      구조화 되어 있는 배열, 객체와 같은 데이터의 구조를 분해시켜 각각의 변수에 담는 것
//      원본 데이터를 훼손하지는 않음. 데이터의 값만 복사해오는 것이기 때문.


// 배열의 구조분해할당

//      배열의 구조를 분해해 각각의 변수에 할당
//      이더러블(순회하는) 데이터에만 사용 가능
//      대괄호[]를 이용

//      예시
let arr = [1, 2, 3, 4];

//      a1 ~ a4 변수에 arr의 요소들 나누어 할당됨
let [a1, a2, a3, a4] = arr;  
console.log(a1, a2, a3, a4); // 결과: 1 2 3 4

//      할당할 변수를 더 적게 선언하면 앞에서부터 차례대로 분해되어 할당됨
let [b1, b2] = arr;
console.log(b1, b2); // 결과: 1 2

//      할당할 변수를 더 많이 선언하면 할당할 데이터가 없는 변수는 undefined로 할당됨
let [c1, c2, c3, c4, c5, c6] = arr;
console.log(c1, c2, c3, c4, c5, c6); // 1 2 3 4 undefined undefined


// 객체의 구조분해할당

//      객체의 구조를 분해해 각각의 변수에 할당
//      객체 타입의 데이터에만 사용 가능
//      중괄호{}를 이용
//      프로퍼티 키와 동일한 이름만 변수명으로 사용 가능
//      중괄호 안의 키 이름에 해당하는 프로퍼티 값이 해당 키 변수에 할당

//      예시
let obj = {name: 'Julia', gender: 'female'};

//      객체의 프로퍼티를 나누어 변수에 할당
let {gender, name} = obj;
console.log(name, gender); // 결과: Julia female

//      존재하지 않는 프로퍼티 키에 할당하는 경우 undefined 할당
let {age} = obj;
console.log(age); // 결과: undefined

//      새로운 변수명으로 할당받을 수도 있음
let {name: newName, gender: newGender} = obj;
console.log(newName, newGender); // 결과: Julia female