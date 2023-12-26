// Shorthand Property

//      객체에서 key와 value명이 같은 경우 축약해서 사용할 수 있게 만들어주는 문법
//      프로퍼티의 key와 value에 할당할 변수명이 동일한 경우 value를 생략해 선언

// 다음 데이터를 담은 객체를 생성하려 함
let name = "철수";
let age = 12;

// 기존 객체 생성 방식
const obj = {
    name: name,
    age: age
};

// shorthand property 사용 객체 생성 방식
const shorthand = {
    name,
    age
};

// 더 짧게 한 줄로 쓰기도 함
const shortShorthand = {name, age};