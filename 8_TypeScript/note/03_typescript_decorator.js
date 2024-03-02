// TypeScript Decorator

//      Decorator (데코레이터)란?

//          NestJS 에서 많이 사용하게 될 것
//          함수 앞에 붙어있는 '@' 이런거

//      Decorator 알아보기

//          1) class 선언
`               class CatsController { }
`
//          2) class 바로 위 줄에 데코레이터 작성
`               @Controller
                class CatsController {
`//             @Controller 가 데코레이터 함수(?)

//          3) Controller 함수 구현
`               function Controller(aaa: any) {
                    console.log(aaa)
                }
`//             Controller 함수가 인자로 어떤 값을 받는지 찍어보기

//          4) 데코레이터 사용 설정하기
//              현재 CatsController 클래스명에 에러 발생한 상태
//              tsconfig.json 파일에 데코레이터 사용 설정 추가하기
`               "experimentalDecorators": true
`
//          5) index.ts 실행하기 (안됨)
`               node index.ts
`//             ㄴ> 로 실행하면 에러남!!!!
//                  node 명령어는 js 파일을 실행시키는 명령어이기 때문

//              => ts-node 라는 .ts 전문 실행 프로그램 필요

//          6) ts-node 설치하기
`               yarn add ts-node
`
//          7) index.ts 실행하기 (또안됨)
`               ts-node index.ts
`//             ㄴ> 로 실행하면 에러남!!!!
//                  ts-node 는 내 컴퓨터 전체에 설치된 모듈이 아니어서
//                  터미널이 ts-node 명령어를 인식하지 못함

//              => package.json 파일에 script로 ts-node 실행 명령어를 추가해야 함
//                  nodemon 실행 명령어 추가해줬던 것처럼

//          8) ts-node 실행 yarn 명령어 생성하기
//              package.json에 다음 설정 추가
`               "scripts": {
                  "start:dev": "ts-node index.ts"
                },
`//             yarn 이 ts-node 를 내 컴퓨터가 아닌 node_modules 에서 찾아서
//               ts-node index.ts 명령어를 실행

//          9) start:dev 로 index.ts 실행하기
`               yarn start:dev
`
//          10) 실행 결과
`               [class CatsController]
`//             ㄴ> 가 출력됨
//              => 데코레이터 함수의 인자로 CatsController 클래스 자체가 전달됨

//          ** NestJS 에서 어떻게 쓰이나?

//              데코레이터 함수 아래에 작성된 클래스나 함수가 데코레이터 함수에 전달되면
//               전달된 함수나 클래스를 API 또는 NestJS에 맞게끔 변형해줌