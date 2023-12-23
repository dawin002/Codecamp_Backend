// 호이스팅 (hoisting)

//      위로 끌어올려 주는 것
//      JS 코드가 실행되기 전에 해석하고 재배열하는 과정에서 일어남


//  변수의 호이스팅

//      let 키워드
//          작성한 순서 그대로 동작
//          변수를 선언하기 전에 사용하면 적절한 에러가 발생

console.log(letKeyword);
let letKeyword = 'let is safe';
// ReferenceError: Cannot access 'letKeyword' before initialization

//      var 키워드
//          호이스팅에 의해 변수 선언부가 최상단으로 올라간 것처럼 동작
//          변수를 선언하기 전에 사용하는 상황에서 적절한 에러가 발생하지 않음

console.log(varKeyword);
var varKeyword = 'var is not safe';
// undefined


// 함수의 호이스팅

//      함수 선언식
//          호이스팅 발생
//          함수를 정의하기 전에 호출한 코드가 작동함

fn1()
function fn1() {
    console.log("hoisting occurred")
}
// hoisting occurred

//      함수 표현식
//          호이스팅 발생하지 않음
//          함술르 정의하기 전에 호출한 경우 정상적인 에러를 반환

// fn2()
const fn2 = function() {
    console.log ("error occurred")
}
// ReferenceError: Cannot access 'fn2' before initialization


// 변수 선언 단계

//      1) 선언 단계
//          선언할 변수를 식별자(변수명)가 담기는 객체에 할당하는 단계
//          변수명들이 담기는 객체가 존재함

//      2) 초기화 단계
//          변수에 할당할 메모리 공간을 부여하는 단계

//      3) 할당 단계
//          정의된 변수에 데이터가 할당되는 단계

// TDZ (Temporal Dead Zone)

//      선언 단계와 초기화 단계 사이에 존재
//      변수에 할당할 메모리가 부여되기 전 단계
//      변수가 이 공간에 위치하는 동안에는 제대로 동작하지 않음
//      메모리가 할당되기 전에 참조를 하기 때문에 에러 발생

//      변수

//      let, const 키워드
//          선언 단계와 초기화 단계가 분리되어 있음
//          선언 단계를 지나고 초기화 단계에 진입 전에 TDZ 공간에 머무름
//          TDZ 공간에 머무르는 동안(초기화 되기 전) 이 변수를 참조하면 에러 발생

//      var 키워드
//          선언 단계와 초기화 단계가 묶어져서 진행
//          TDZ가 존재할 수 없음
//          선언과 동시에 호이스팅에 의해 초기화 단계가 진행
//          데이터가 할당되지 않고 메모리 공간만 할당된 변수를 참조해 undefined 반환

//      함수

//      함수 표현식
//          선언 단계, 초기화 단계, 할당 단계가 분리됨
//          선언 단계 후 TDZ 진입
//          TDZ에 머무르는 동안 함수 호출시 에러 발생(정상 상황)

//      함수 선언식
//          선언 단계, 초기화 단계, 할당 단계가 묶어져서 진행
//          TDZ 존재하지 않음
//          호이스팅에 의해 아직 정의되지 않은 정상 호출됨(비정상 상황)
//          