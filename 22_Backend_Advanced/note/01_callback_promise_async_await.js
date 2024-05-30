// Callback / Promise / Async Await

//      Callback -> Promise -> Async Await 로 발전함
//      기존 방식에 어떤 문제가 있어 개선한 방법을 계속 만든 것


//      학습 목표

//          Callback이란 무엇인지, 어떤 문제가 있어서 Promise로 발전되었는지 알아보기

//          Promise란 무엇인지, 어떤 문제가 있어서 async await로 발전되었는지 알아보기

//          async await 란 무엇인지 알아보기

//          이미 async와 await으로 발전되었는데 Callback과 Promise는 왜 아직도 쓰는지 알아보기


// 각각에 대한 자세한 설명과 실습은 강의자료에 다 있음


// Callback 요약

//      Callback 함수란?

//          함수의 인자로 넘겨주는 함수

//          A 함수에 B 함수를 콜백함수로 넘겨주면 A 함수가 B 함수의 실행 권한을 가짐
//          A 함수에서 필요할 때 B 함수를 실행 가능

//      Callback 함수 썼던 이유

//          axios 함수에게 api 요청이 끝나면 실행할 함수를 콜백함수로 넘겨줌
//          axios 함수는 api 요청이 끝나면 그 결과로 내가 넘겨준 콜백함수를 실행

//          그때는 비동기 처리 방법이 없었기 때문에 api 요청 결과를 백엔드에서
//          제때 받을 수 없었고, 콜백함수를 사용해 axios 함수가 내 함수를 실행하게 만든 것

//      Callback 실습

//          강의자료 보고 진행

//      Callback 함수 문제점

//          여러 API를 연달아서 사용할 경우 콜백 함수가 점점 깊이 들어감
//          프로그램이 커지게 될수록 점점 더 깊어짐 
//          좋은 구조가 아님
//          => Callback 지옥


// Promise 요약

//      Axios 설치

//          Promise를 사용해 API 요청을 보내려면 Axios를 사용해야 함

//      Promise가 제공하는 기능

//          .then() : API 요청이 성공했을 때 실행할 함수
//          .catch() : API 요청이 실패했을 때 실행할 함수

//      Promise Chaining

//          Promise 규칙으로 .then()을 체인처럼 계속 엮어서 내려가는 것

//          Promise 안에서 다른 Promise를 사용할 때 사용할 Promise 객체를 return 하면
//           앞의 Promise 객체 뒤에 .then()과 .catch()를 이어서 사용할 수 있음

//          이 방식으로 callback 지옥을 해결

//      Promise 문제점

//          코드의 실행 순서를 예측하기 힘듬

//          Promise 객체의 api 요청 결과가 돌아오기 전에 다음 코드가 실행될 수도 있어서
//          코드의 실행 순서가 뒤죽박죽 될 수도 있음


// Await Async 요약

//      장점
//          callback 지옥이 발생하지 않음
//          실행 순서가 직관적임

//      규칙
//          await 뒤에는 반드시 Promise 객체가 있어야 함
//          Promise 객체는 axios 객체 또는 fetch 등이 해당됨