// Rest Parameter


// 필요 없는 프로퍼티를 제거해 새로운 객체 만들기
const origin = {
    name: "otter",
    age: 25,
    petName: "cherry",
    hobby: "playing game"
};

//      기존 방식
const essentialData = {
    name: origin.name,
    age: origin.age
};

//      Rest parameter 사용한 방식

//      구조분해할당을 활용해 필요 없는 키들과 rest 파라미터에 할당
//      rest 파라미터는 마지막 순서에 spread 연산자를 사용해 넣어야 함
//      rest는 키워드가 아닌 변수명이라 다른 이름(any, other 등)을 사용해도 무관
const {petName, hobby, ...rest} = origin;
const essentialData2 = {...rest}