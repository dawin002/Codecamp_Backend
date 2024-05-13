// 간단한 마이크로서비스 REST API 구현

//          강의자료에 없는 내용만 필기


//      마이크로서비스 실습

//          수업자료 다운로드
//              인증 서비스, 상품 서비스, API Gateway 서비스를 담당하는 NestJS 폴더로 구성
//              3개의 NestJS 폴더를 각각의 도커로 감싸 3개의 도커를 연결시키는 디폴트 페이지 있음

//          아키텍쳐 구조 알아보기

//              Gateway
//                  API 요청을 받아 트래픽을 각각의 서비스로 전달하는 서버

//              서비스
//                  각각의 API 그룹을 모은 하나의 서버
//                  ex) auth 서비스 : 인증 관련된 API를 모아둔 서버
//                      resource 서비스 : 이외 자원에 관련된 API를 모아둔 서버

//                  기본적인 모듈, 리졸버, 서비스 클래스로 구성

//              도커
//                  각각의 NestJS 서버(서비스)를 도커로 감싸 Docker-compose 로 실행시켜
//                  네임 리졸루션(name resolution)으로 연결시킴

//                  docker-compose.yaml 파일에서 각 서비스의 도커파일을 실행시키고
//                  코드를 새로고침 할 때마다 노드몬이 작동할 수 있게 volumes 를 공유

//                  게이트웨이에서 API 요청을 받아 트래픽을 전달할 것이기 때문에 
//                  게이트웨이 컴퓨터만 포트포워딩 해둠


//          API 구현할때 ~~~.service.ts 코드는 있다고 가정하기

//              service/auth/src/app.controller.ts 파일에 login API 구현
//              여기에서 API 함수에 대한 서비스 함수 코드는 당분간 생략하기
//              아키텍쳐를 중점으로 실습할 것이기 때문
`               @Post('/auth/login')
                login() {
                  // 로그인 진행
                  return 'accessToken!!!';
                }
`//             이런식으로 생략


//          API Gateway 컨트롤러에서 각 서비스의 컨트롤러로 API 트래픽 넘겨주기

//              각 서비스의 컨트롤러에 있는 API 함수를 API Gateway 컨트롤러에서도 똑같이 선언
//              그리고 API 함수의 html 메서드와 엔드포인트 주소를 잘라내 Gateway 컨트롤러에
//              선언한 API 함수에 붙이기

//              => 브라우저로부터 요청이 들어오면 Gateway 컨트롤러에서 엔드포인트로 요청을 받아
//                  각 서비스의 컨트롤러로 넘겨줌

//              API 트래픽을 받는 각 서비스의 API 함수는 @MessagePattern 데코레이터로 받음


//      @nestjs/microservices 버전 문제

//          프로젝트 시작하며 설치한 @nestjs/microservices 라이브러리가 최신 버전에 에러가 있음

//          package.json 에서 버전 수정하지 말고 
`           yarn add @nestjs/microservices@9.2.1
`//         명령어로 직접 설치하기

//          package.json 에서 버전을 "^9.2.1" 로 수정하고 yarn install 하더라도
//          실제 yarn.lock 에서 설치된 @nestjs/microservices 버전을 보면
`           "@nestjs/microservices@^9.2.11":
              version "9.3.9"
              ~~~
`//         라고 적혀있는데, 9.2.1 깔래~ 해놓고 9.3.9 설치한 거임

//          => 코드의 버전 표기법에서 "^9.2.1" 처럼 ^ 가 있는 경우에는
//              제일 앞자리(9) 빼고 전부(.2.1) 최신 버전(.3.9)으로 설치하라는 의미

//          => 따라서 ^9.2.1 설치는 실제로 9.3.9를 설치하라는 의미임

//          => 정확히 9.2.1 버전을 설치하려고 할 때는 ^ 를 빼고 yarn install 해야함