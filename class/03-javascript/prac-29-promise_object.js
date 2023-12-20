
// 응답 반환과 처리

//      JS가 코드를 실행하는 속도보다 
//      서버와의 통신(요청, 응담)은 느릴 수밖에 없음

//      서버에 요청을 보냈을 때 
//       응답이 돌아오는 것보다 
//       응답을 처리하는 코드 실행이 더 빨리 시작됨
//      -> 응답을 처리하는 코드를 비동기적으로 동작시켜줘야 함

//      응답 반환전 처리한 경우
//          1. 비동기 함수인 fetch()는 callback queue로 들어감
//          2. 동기 함수인 console.log()는 call stack으로 들어감
//          3. fetch()가 반환한 응답이 response에 저장되기 전에
//              console.log(response)로 response 출력
//          4. Promise 객체가 출력됨

// Promise 객체

//      아직 통신이 완료되지 않아 응답받지 못했으나, 언젠가 받아온다는 약속 객체

//      현재는 얻을 수 없지만, 추후 작업이 완료되면 받아올 수 있는 
//       데이터에 대한 접근 수단

//      Promise 상태 3단계
//          fulfilled : 요청이 성공한 상태
//          pending   : 요청에 대한 응답을 기다리고 있는 상태
//          rejected  : 요청이 실패한 상태


// Promise fulfilled 상태 테스트

const promiseTest_fulfilled = function() {
    return new Promise((resolver, reject) => {
        // resolver 실행
        resolver(100);  // 매개변수(100)이 응답으로 담기고 fulfilled 상태가 됨
    });
};

console.log(promiseTest_fulfilled());  
// 결과: Promise {<fulfilled>: 100}


// Promise pending 상태 테스트

const promiseTest_pending = function() {
    return new Promise((resolver, reject) => {
        // 2초 지연 후 resolver 실행
        setTimeout(() => {
            resolver(100);
            // 지연 시간 동안은 응답에 100이 담기지 않음, pending 상태
        }, 2000);
    });
};

console.log(promiseTest_pending());  
// 결과: Promise {<pending>}


// Promise rejected 상태 테스트

const promiseTest_rejected = function() {
    return new Promise((resolver, reject) => {
        // reject 실행 : promise 객체가 에러를 발생했을 때 사용
        reject('my error');
    });
}

console.log(promiseTest_rejected());  
// 결과: Promise {<rejected>: 'my error'}
//      Uncaught (in promise) my error


// then() 함수 테스트

//      then : promise 객체가 fulfilled 상태가 될 때까지 기다렸다가 
//             매개변수로 전달된 콜백 함수 실행

const promiseTest_then = function() {
    return new Promise((resolver, reject) => {
        // 2초 지연 후 resolver 실행
        setTimeout(() => {
            resolver(100);
            // 지연 시간 동안은 응답에 100이 담기지 않음, pending 상태
        }, 2000);
    });
};

promiseTest_then().then((response) => {
    console.log(response);  // 결과: 100 (2초 지연되었다가 출력됨)
});


// catch() 함수 테스트

//      catch : 보낸 요청이 제대로 이루어지지 않았다면 실행되는 함수
//              발생한 에러를 출력하는 코드나 에러를 처리하는 코드를 넣어 사용

fetch(
    'https://api.dawin.org/data/?appid=1234'
)
.then((response) => {
    // 이렇게 .then()은 줄바꿔서 사용해도 됨
    return response.json();
})
.then((json) => {
    console.log(json);
})  // 요청이 제대로 이루어지지 않았다면 catch 함수 실행
.catch((err) => {
    // 발생한 에러 내용 출력
    console.log(err);
    // console.error(err);
    // : 에러를 출력하는 방식
});

// 결과 :
// -> 일단 에러 발생으로 인해 콘솔창에 에러 내용이 출력됨
//    GET https://api.dawin.org/data/?appid=1234 401 (Unauthorized)
// -> 그 후 catch문 내의 코드로 에러 내용이 한번 더 출력됨
//    TypeError: Cannot read properties of undefined (reading '0')
//    파일이름.js:112(에러문 출력 줄)
//      at 파일이름.js:108(에러 발생 줄):15(에러 발생 칸)


// -> 서버에서 받은 응답을 사용할 때 Promise 객체와 then() 함수를 적절히 사용해야 함