// Promise All

//          여러 개의 파일을 업로드하거나 여러 개의 axios.get(), fetch() 등을 통해
//           여러 데이터 접속을 할 때 반복문 안에서 await 를 사용하는 것은 안티 패턴이다

//          (순서가 명확하게 정해진 1번 요청이 끝나고 결과값으로 2번 요청을 해야하는 경우 제외)

//          뒤따라 오는 요청이 앞선 요청과 관련이 없는데도 불구하고 
//           앞선 요청이 끝날 때까지 기다려야하기 때문

//      Promise All

//          여러 데이터에 독립적으로 접속하며 await 를 사용할 수 있는 방법
//          모든 Promise 객체가 동시에 실행되어 가장 오래 걸리는 작업이 끝나면 await가 종료됨

//      Promise.all() 실습은 강의자료 보고 진행

//          이런 식으로 사용
`           const results = await Promise.all([
                new Promise((resolve, reject) => { ~~~ }),
                new Promise((resolve, reject) => { ~~~ }),
                new Promise((resolve, reject) => { ~~~ }),
            ]);
`
//          Promise.all() 앞에 await 붙음 (전부 한번에 기다릴 거여서)
//          new Promise() 앞에는 await 안붙음