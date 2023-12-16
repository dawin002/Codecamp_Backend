// 동기, 비동기

// 동기
//      서버에 요청을 보냈을 때, 응답을 받아야 다음 동작을 수행할 수 있는 것
//      A 작업 요청을 보내면 A의 응답을 받을 때까지 B 작업은 대기하는 것

// 비동기
//      서버에 요청을 보냈을 때, 응답과 관계 없이 다음 동작을 수행할 수 있는 것
//      A 작업이 시작되었다면 B 작업도 시작될 수 있는 것

// JavaScript
//      기본적으로 동기적으로 동작
//      비동기 작업도 가능함

//      비동기 작업 예시
setTimeout(() => {
    console.log('456');
}, 1000)
console.log('123');

//      실행 결과
//      123
//      456

//      123이 먼저 출력되고 456이 1초 뒤에 출력됨


//  call stack

//      함수의 실행 순서가 담겨지는 공간
//      JS 실행 환경(크롬 브라우저)에 call stack 공간이 존재
//      동작 흐름이 연결된 함수들이 호출되는 순서를 관리
//      연결된 함수의 전체 작업이 끝나면 stack이 완전히 비워짐
//      stack이 완전히 비워져야 다음 함수의 작업이 stack에 쌓임

//      실행 예시
const func3 = function () {
    console.log("func3 call")
}
const func2 = function () {
    func3()
    console.log("func2 call")
}
const func1 = function () {
    func2()
    console.log("func1 call")
}
func1()

//      실행 결과
//      func3 call
//      func2 call
//      func1 call

//      call stack으로 처리되는 함수 순서
//      push(1) -> push(2) -> push(3) -> pop(3) -> pop(2) -> pop(1)


// callback queue

//      비동기 함수(코드)들이 저장되는 공간
//      비동기 함수들의 실행 순서를 관리
//      call stack이 비워지면 queue의 가장 앞 비동기 함수를 stack에 넣어줌

//      JS에서 비동기 작업이 처리되는 방식

//      Web APIs
//          JS 실행 환경에서 제공하는 함수들
//          DOM 조작, setTimeout(), setInterval() 등이 비동기적으로 작동

//      실행 흐름 예시
//          call stack에서 비동기 함수 setTimeout(func, 1000)이 호출
//          call stack의 다음 동작이 실행되며 1초 타이머 흘러감
//          1초 타이머가 종료되면 비동기 함수의 코드가 callback queue에 진입
//          call stack이 빌 때까지 기다림
//          callback queue의 함수가 call stack으로 진입