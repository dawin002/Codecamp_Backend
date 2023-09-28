// 함수

// 함수 작성 방법

// 함수 선언식
// 함수를 만들 때 함수 이름을 같이 선언
function hello(name) {
    alert(name + "님, 안녕하세요!");
}

// 함수 표현식
// 익명 함수를 변수나 상수에 담는 방법
let hello2 = function(name) {   // let 대신 const 써도 상관 없음
    alert(name + "님, 안녕하세요!");
}

// 화살표 함수
// 함수 표현식의 변형 ( 더 간단하게 )
let hello3 = (name) => {
    alert(name + "님, 안녕하세요!");
}

// 세 가지 모두 동일하게 호출 및 동작

