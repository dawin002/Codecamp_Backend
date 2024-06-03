// 마이크로큐와 Await의 관계

//      학습 목표

//          Async Await의 동작 과정이 마이크로큐와 어떻게 연결되어 있는지 학습

//          마이크로큐와 관련이 높은 Await가 Promise 객체를 기다리는 원리 이해하기

//          await와 try-catch를 통해 어떻게 에러를 잡을 수 있을지 학습

// 퀴즈 실습

//      퀴즈1

//          실행 순서 예측

//              시작
//              aaa시작
//              bbb시작
//              철수
//              aaa끝
//              끝

//          실행 순서 정답

//              시작
//              aaa시작
//              bbb시작
//              aaa끝
//              끝
//              철수

//          await 와 마이크로큐

//              코드 실행중 await을 만나면 async 가 붙은 함수가 Promise로 변화,
//              함수가 즉시 중단되고, 실행되지 못한 나머지 함수들은 마이크로 태스크큐로 진입
//              실행중이던 해당 함수가 콜스택에서 제거됨

//          await 를 포함한 함수에 async 붙어야 하는 이유

//              await를 만났을 때 중단하고 마이크로큐에 넣을 코드의 범위를 지정하기 위해서

//          await 가 적용되는 시점

`               const res = await qqq();
`//             인 경우에 일단 qqq()가 실행되고 그 결과를 await 하는것이기 때문에
//              qqq()는 정상적으로 시작됨, 이후 async 함수가 마이크로큐에서 꺼내졌을 때
//              결과를 res 변수에 저장하는 작업부터 다시 시작됨

//      퀴즈2

//          실행 순서 예측

//              시작
//              aaa시작
//              bbb시작
//              ccc시작
//              aaa끝
//              끝
//              철수
//              bbb끝

//          실행 순서 정답

//              정답 맞춤

//          헷갈릴 수 있는거

//              ccc가 bbb보다 먼저 마이크로 큐에 들어감

//              ccc와 bbb가 모두 마이크로 큐에 들어가 중단되면 
//              bbb를 호출했던 aaa가 마저 실행됨
//              => console.log("aaa-끝");


// await와 마이크로큐에 기반한 try~catch 동작 원리 

//      자세한 설명은 강의자료에 있음

//      onClickCatchFail 함수

//          try-catch 문에서 실패하는 axios 요청을 보내는데 async await 없이 보냄
//          axios 요청 바로 아래줄의 "철수"이 출력될지 catch문의 "에러"가 출력될지

//          await async 가 없어서 마이크로큐에 넣을 범위를 지정하지 못함
//          axios 요청을 보내는 라인만 마이크로큐에 들어가서 "철수"가 출력됨

//          => try-catch 문으로 에러를 못잡음


//      onClickCatchSuccess 함수

//          try-catch 문에서 실패하는 axios 요청을 보내는데 async await 써서 보냄
//          axios 요청 바로 아래줄의 "철수"이 출력될지 catch문의 "에러"가 출력될지

//          await async 덕분에 await 이후의 전체 함수가 마이크로큐에 들어감
//          마이크로큐의 onClickCatchSuccess 함수가 콜스택으로 나온 후 axios 요청
//          결과에 따라 try 인지 catch 인지 결정됨

//          => try-catch 문으로 에러 잡힘