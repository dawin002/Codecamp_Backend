// 간단한 마이크로서비스 GraphQL API 구현

//          강의자료에 없는 내용만 필기


//      GraphQL MSA

//          Rest MSA와의 차이점

//              Rest API MSA 에서는 Gateway에서 서비스의 api 함수를 맵핑해두고
//              API 요청이 들어오면 트래픽을 전달해줬음

//              GraphQL API MSA 에서는 각각 독립적인 서버를 Gateway가 하나로 연결해줄 뿐
//              직접적인 api 함수 맵핑이나 트래픽 전달은 없음


//      GraphQL MSA API 구현 실습

//          수업자료 다운로드

//          설치할 라이브러리 알아보기

//              Federation
//                  nestjs.com -> docs -> Federation
//                  독립적인 마이크로 서비스를 GraphQL로 만들 때 사용하는 서비스


//          GraphQL MSA 구조 알아보기

//              Gateway
//                  각각의 서비스 서버를 연결하는 역할만 하는 서버

//          서비스의 app.module.ts 에 GraphQLModule 추가

//              imports 목록에 GraphQLModule 모듈 추가하는데
//               driver 는 ApolloFederationDriver 로 설정하고
//               타입스크립트는 <ApolloFederationDriverConfig> 로 명시할 것

//          게이트웨이의 app.module.ts 에 GraphQLModule 추가
`               @Module({
                  imports: [
                    =====< 여기부터 >====
                    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
                      driver: ApolloGatewayDriver,
                      gateway: {
                        supergraphSdl: new IntrospectAndCompose({
                          subgraphs: [
                            { name: 'qqq', url: 'http://auth-service:3001/graphql' },
                            { name: 'zzz', url: 'http://resource-service:3001/graphql' },
                          ],
                        }),
                      },
                    }),
                    =====< 여기까지 >====
                  ],
                  controllers: [AppController],
                  providers: [AppService],
                })
                export class AppModule {}
`//             imports 목록에 GraphQLModule 모듈 추가
//              driver: ApolloGatewayDriver 로 설정
//              GraphQLModule의 타입스크립트: <ApolloGatewayDriverConfig> 로 명시
//              gateway: 게이트웨이 연결하는 옵션
//              IntrospectAndCompose: 서비스를 묶어주는 객체
//              subgraphs: 하위 자식 서비스 목록
//              { name: 'qqq', url: 'http://auth-service:3001/graphql' },
//              : 연결할 컴퓨터 이름과 주소 작성 (네임 리졸루션)
//                컴퓨터 결합할 때 이름도 안중요해서 아무렇게나 지은 것

//          게이트웨이 app.controller.ts, app.service.ts 삭제

//              게이트웨이의 역할이 서비스를 결합하는 것밖에 없기 때문에
//               게이트웨이의 컨트롤러, 서비스 삭제해도 무관

//              두 파일 삭제하고 
//               app.module.ts 의 두 파일 import 문은 주석 처리
//               controllers: 와 providers: 코드 주석 처리 

//          playground 에서 API 요청 보내기

`               mutation {
                  login
                }
`
`               query {
                  fetchBoards
                }
`

//      에러 해결 (안됨)

//          Gateway 서버가 실행되지 않음
//          강의 질의응답에 버전 문제라고 나옴

//          설치버전 변경하기
`               "@apollo/gateway": "2.2.2",
                "apollo-server-express": "3.11.1",
                "@nestjs/apollo": "10.1.7",
                "@nestjs/graphql": "10.1.7",
                "graphql": "^16.6.0",

                "resolutions": {
                  "string-width": "4.2.3"
                }
`//         package.json 에서 이렇게 수정한 후
//          node_modules 와 yarn.lock 지우고
//          yarn install 재실행 (각 폴더 yarn install 동시에 하니까 에러남)

//          => 이렇게 해봤는데 빌드 fail
`               => ERROR [auth-service 5/6] RUN yarn install                                                                                                                                                                   70.1s 
                => ERROR [resource-service 5/6] RUN yarn install                                                                                                                                                               70.1s 
                => ERROR [api-gateway 5/6] RUN yarn install     

                ------
                 > [auth-service 5/6] RUN yarn install:
                0.629 yarn install v1.22.19
                0.776 [1/4] Resolving packages...
                1.052 [2/4] Fetching packages...
                33.71 error @angular-devkit/core@16.0.1: The engine "node" is incompatible with this module. Expected version "^16.14.0 || >=18.10.0". Got "14.21.3"
                33.71 error Found incompatible module.
                33.71 info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
                ------
                ------
                 > [resource-service 5/6] RUN yarn install:
                0.829 yarn install v1.22.19
                0.890 [1/4] Resolving packages...
                1.181 [2/4] Fetching packages...
                34.61 error @angular-devkit/core@16.0.1: The engine "node" is incompatible with this module. Expected version "^16.14.0 || >=18.10.0". Got "14.21.3"
                34.61 error Found incompatible module.
                34.61 info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
                ------
                ------
                 > [api-gateway 5/6] RUN yarn install:
                0.828 yarn install v1.22.19
                0.893 [1/4] Resolving packages...
                0.988 warning Resolution field "string-width@4.2.3" is incompatible with requested version "string-width@^5.1.2"
                0.993 warning Resolution field "string-width@4.2.3" is incompatible with requested version "string-width@^5.0.1"
                1.244 [2/4] Fetching packages...
                1.257 warning Pattern ["wrap-ansi@^7.0.0"] is trying to unpack in the same destination "/usr/local/share/.cache/yarn/v6/npm-wrap-ansi-cjs-7.0.0-67e145cff510a6a6984bdf1152911d69d2eb9e43-integrity/node_modules/wrap-ansi-cjs" as pattern ["wrap-ansi-cjs@npm:wrap-ansi@^7.0.0"]. This could result in non-deterministic behavior, skipping.
                39.41 error @angular-devkit/core@16.0.1: The engine "node" is incompatible with this module. Expected version "^16.14.0 || >=18.10.0". Got "14.21.3"
                39.41 error Found incompatible module.
                39.41 info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
                ------
                failed to solve: process "/bin/sh -c yarn install" did not complete successfully: exit code: 1
`