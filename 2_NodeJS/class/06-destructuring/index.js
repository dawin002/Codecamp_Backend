// 구조분해할당 예제

const profile = {
    name: "철수",
    age: 12,
    school: "다람쥐초등학교",
};

// 1. 일반 변수 전달하기
const func1 = function (aaa) {
    // const aaa = "사과";
    console.log(aaa); // 사과
};

func1("사과");

// 2. 객체 전달하기
const func2 = function (aaa) {
    // const aaa = basket;
    console.log(aaa); // 객체
};

const basket = {
    apple: 3,
    banana: 5,
};

func2(basket);

// 3. 객체 전달하기 => 구조분해할당 방식
const func3 = function ({ apple, banana }) {
    // const {apple, banana} = basket;
    console.log(apple);
    console.log(banana);
};

const basket2 = {
    apple: 3,
    banana: 5,
};

func3(basket2);
