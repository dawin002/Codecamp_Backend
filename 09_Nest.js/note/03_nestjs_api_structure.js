// NestJS API 구조

//      API 폴더 구조

//          src 폴더에 API 관련 코드가 저장됨

//          app.controller.spec.ts (테스트 코드)

//          app.controller.ts
//          app.module.ts (express의 index.js 역할, 의존성을 넣어줌)
//          app.service.ts

//              controller 와 service 가 module 에서 합쳐짐

//          main.ts
//              최종 결과물을 실행시켜주는 역할
//              컴포넌트를 메인으로 불러와 실행
//              * 컴포넌트 : 부품, app.module.ts 의 app 에 해당


//      API 동작 흐름

//          Express와 거의 동일함

//          Express에서는 index.js에서 new 를 사용해 서비스 클래스의 의존성을 컨트롤러 클래스로
//          주입해야하는데

//          NestJS에서는 controllers에 컨트롤러 클래스, providers에 서비스 클래스만 적어주면
//          자동으로 인스턴스를 생성해 의존성을 주입해 줌

//          1) main.ts 에서 컴포넌트 실행
//              NestFactory 사용해 모듈 생성 후 실행
//              listen()으로 api 요청 대기

//          2) app.module.ts 에서 모듈 생성
//              컨트롤러에 서비스 의존성을 주입
//              컨트롤러 클래스는 controllers 에 작성
//              서비스 클래스는 providers 에 작성

//          3) app.controller.ts 에서 api 함수 실행
//              작성된 api 함수의 동작 코드 실행
//              의존성 주입받은 서비스 인스턴스 사용 가능

//          4) app.service.ts 에서 서비스 함수 실행
//              자주 사용되는 함수를 service 클래스에 작성
//              컨트롤러에서 호출되면 계산 결과 반환


// API 실습

//      getHello API 요청 후 응답 받아보기

//          1) 프로젝트 통합 터미널에서 열기

//          2) 서버 실행
`               yarn start:dev
`
//          3) 터미널에 Mapped {/, GET} route 뜨는지 확인
//              API가 매핑되었는지 확인하는 것
//              엔드포인트 주소 '/'로 api 요청할 수 있음

//          4) Postman 실행해 API 요청 보내기
`               GET, http://localhost:3000/
`//             입력 후 Send 버튼 누르기

//          5) API 응답 확인하기
`               Hello World!
`//             제대로 출려 되는지 확인하기
