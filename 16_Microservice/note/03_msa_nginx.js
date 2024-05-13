// Nginx를 API Gateway로 하여 Main / Stock 서비스 분리

//          강의자료에 없는 내용만 필기


//      NginX의 Reverse Proxy

//          다양한 언어가 함께 있을 때 MSA를 어떻게 구성하는지

//          Java/Spring
//              Spring-Cloud-Netflix-Zuul 등을 Gateway로 사용

//          다양한 언어의 서비스 통합하기
//              Nginx, Kong, HAProxy 등을 Gateway로 사용
//              Kong : 가장 유명함, 내부 Nginx로 구현되어 있음
//              Nginx : 무료 버전으로는 기본적인 기능만 사용 가능
//                      MSA 용도 외에도 백엔드에서 많이 사용됨


//  GraphQL MSA 구현 실습

//      수업자료 다운로드

//      수업자료 프로젝트 구조 알아보기

//          api-gateway
//              NestJS가 아님
//              default.conf : Nginx 설정 파일

//          services/auth
//              NestJS 폴더

//          services/stock
//              Express 폴더

//          docker-compose.yaml
`               api-gateway:
                  image: nginx:latest
`//             Nginx 최신 버전을 도커에 설치
//              로컬의 내가 작성한 default.conf 설정 파일이 도커 안의 Nginx에 적용되게 함

//      라이브러리 설치

//          auth 서비스의 라이브러리
`               yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
`
//      aaa api 함수 선언

//          GraphQL은 최소 한개의 쿼리 API가 존재해야지 동작하기 때문에
//          아무 의미 없는 @Query aaa() API 함수를 선언함





// 왜안돼 쓰벌!!!!!!!!!

// 도커 빌드 안됨 실행 안됨 요청 안됨