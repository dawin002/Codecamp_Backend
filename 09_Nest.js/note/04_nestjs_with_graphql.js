// NestJS 에서 GraphQL 사용해보기

//      NestJS GraphQL 장점

//          따로 하지 않아도 자동으로 되는 것들이 많음


// Schema-First & Code-First

//      Schema First (스키마 우선)

//          스키마(구조)를 먼저 정의하고, 그 스키마에 맞게 코드를 작성하는 방식

//          GraphQL의 Apollo Server를 이용한 API 구현이 Schema First 방식

//          * Apollo Server 에서는 typeDefs(사용할 데이터의 타입 정의) 와 
//           resolvers(API 구현)을 모두 작성해야지 서버 실행 가능

//      Code First (코드 우선)

//          타입스크립트를 적용해 API 함수를 만들면 함수 이름과 타입스크립트의 타입을
//           보고 자동으로 스키마(typeDefs)를 만들어줌

//          NestJS의 GraphQL API 구현은 Code First 방식을 따름

//          * Code First 라고 해서 typeDefs 파일이 필요 없는게 아님! 자동 생성일 뿐!

// NestJS Docs 살펴보기

//      NestJS Docs

//          1) nestjs.com 접속
//          2) Documentation 에서 기본적인 사용 방법 확인

//      NestJS 샘플 코드

//          1) nestjs.com 접속

//          2) Source code 로 NestJS 깃허브 접속

//          3) sample 에서 폴더 구성, 샘플 코드 확인
//              샘플 코드를 통해 폴더 구조나 소스 코드 기준 등을 잡으면 됨

//      샘플 코드 구조 예시

//          샘플 코드중 23-graphql-code-first 확인하기

//          src 파일 구조
//              app.module.ts는 있는데 app.controller.ts와 app.service.ts는 없음
//              하위 폴더 recipes에는 recipes.로 시작하는 module, controller, service 파일 있음
//              -> recipes.파일들이 recipes.module.ts 로 합쳐지고
//              -> (모듈명).module.ts 파일들이 app.module.ts 로 합쳐짐

//          controller 가 아닌 resolver
//              GraphQL에서는 (...).controller.ts 가 아니라 (...).resolver.ts 라고 부름

//          app.module.ts
//              @Module({ }) 안에 imports:[] 안에 RecipesModule, 이라고 되어 있는데
//               나중에 모듈이 더 추가되면 그 옆에 , UsersModule, ProductsModule, 이렇게 붙음


// NestJS GraphQL 실습

//      1. 프로젝트 복제 생성

//          1) 기존 프로젝트의 node_modules, dist 폴더 지우기
//          2) 프로젝트 복제
//          3) node_modules 생성 (yarn install)

//      2. 게시글 API 기본 구조 생성

//          1) 게시글 모듈 폴더 생성
//              src 폴더 안에 boards 폴더 생성
//              (셀 수 있는 명사는 복수형으로 폴더명 생성)

//          2) API 소스파일 3개 생성
//              boards.module.ts
//              boards.resolver.ts  (controller가 아닌 resolver 사용)
//              boards.service.ts

//          3) 소스파일 기본 구조 작성
//              app.controller.ts 코드 복사해 boards.resolver.ts 에 붙여넣기
//              app.module.ts 코드 복사해 boards.module.ts 에 붙여넣기
//              app.service.ts 코드 복사해 boards.service.ts 에 붙여넣기

//          4) 필요 없는 파일 삭제
//              app.controller.spec.ts 파일(테스트 관련) 일단 삭제
//              app.controller.ts 파일 삭제
//              app.service.ts 파일 삭제

//      3. 게시판 API 작성 1 (GraphQL 설치 전)

//          1) class 이름 변경

//              [boards.module.ts]
`                   AppModule -> BoardsModule
`
//              [boards.resolver.ts]
`                   AppController -> BoardsResolver
`
//              [boards.service.ts]
`                   AppService -> BoardsService
`
//          2) 데코레이터 수정

//              * 데코레이터 역할
//                  타입스크립트에서 어노테이션과 같은 역할을 하는 것 (@Controller 등)

//              [boards.module.ts]
//                  @Module : 아래의 코드를 모듈로 만들어줌
//                  의존성 주입하는 역할
//                  컨트롤러, 프로바이더, 서비스 등을 하나로 합치는 역할

//              [boards.resolver.ts]
//                  @Controller 주석 처리 : controller 가 아니라 resolver 사용할 거라서
//                  @Get 주석 처리        : Get은 REST 문법. GraphQL은 Query 써야함
//                  GraphQL을 설치한 뒤에 GraphQL용 데코레이터를 달 것

//              [boards.resolver.ts]
//                  @Injectable : 의존성으로 주입할 수 있는 서비스 클래스로 만듬

`                   @Injectable({ scope: Scope.DEFAULT })
`//                 인젝션 스코프 달아줌

//                  * 인젝션 스코프 (Injection scope)
//                      @Injection 의 매개변수로 scope를 달아 싱글톤으로 할지 결정할 수 있게 하는 것
//                      @Injection 이 달린 클래스의 인스턴스를 언제 생성할지 설정

//                      @Injection() : (== Scope.DEFAULT) 디폴트 값 싱글톤, 인스턴스 한번 생성해 재사용
//                      @Injection({ scope: Scope.REQUEST }) : 요청이 올 때마다 인스턴스 생성
//                      @Injection({ scope: Scope.TRANSIENT }) : 의존성이 주입될 때마다 인스턴스 생성

//          3) Module 코드 수정 - boards.module.ts

//              providers 변경
`                   providers: [BoardsResolver, BoardsService],
`//                 AppService 지우고 BoardsResolver, BoardsService 추가
//                  BoardsResolver는 컨트롤러가 아니기 때문에 controllers가 아닌 providers에 추가

//                  * 꿀팁
//                      providers: [BoardsResolver, BoardsService], 너무 길어서 여러 줄로 쓰려함
//                      근데 prettier 때문에 여러 줄로 나눠도 다시 한 줄로 되돌아감
`                       BoardsResolver, // `// 첫번째 요소 뒤에 빈 주석 붙이면 여러 줄로 유지됨

//              controllers 제거
//                  controllers:[] 와 AppController 코드 제거
//                  GraphQL에서는 controller가 아닌 resolver 사용하기 때문


//      4. GraphQL 설치

//          1) GraphQL 다운로드 방법 확인
//              nestjs.com -> Documents -> GRAPHQL -> Quick start
`               yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql
`
//          2) 현재 프로젝트에 GraphQL 설치
//              프로젝트 폴더 통합 터미널에서 열기 (package.json 있는지 확인)
//              설치 코드 입력


//      5. 게시판 API 작성 2 (GraphQL 설치 후)

//          1) 데코레이터 수정 - boards.resolver.ts

`               @Controller() -> @Resolver()
`//             @Resolver import할 때 @nestjs/graphql 에서 제공하는 걸 가져와야 함

`               @Get() -> @Query()
`//             @Query import할 때 @nestjs/graphql 에서 제공하는 걸 가져와야 함

//          * 쿼리 반환 타입 지정

`               @Query(() => String)
`//             String 타입으로 반환
//              반환값이 null일 수 없음
//              String 첫글자 대문자임 오타주의 (GraphQL에서는 첫글자 대문자여서)

`               @Query(() => String, { nullable: true })
`//             null 반환을 허용하는 String 타입 반환

//          2) AppModule 수정 - app.module.ts

`               controllers:[], providers:[] 코드 제거
`//             더 이상 사용하지 않음

//              AppModule 은 이제 단순히 합치는 용도로 사용
//              앱에서 사용하는 모듈을 imports: [] 에 모두 작성
`               imports: [ BoardsModule ],
`
//              사용하는 모듈이 여러 개라면 모두 작성
`               imports: [ 
                  BoardsModule, //
                  UsersModule, 
                  ProductsModule,
                ],
`//             각각의 모듈을 임포트해서 합침

//          3) AppModule에 GraphQL Module 추가
`               imports: [ 
                  모듈들 ,

                  GraphQLModule.forRoot<ApolloDriverConfig>({
                    driver: ApolloDriver,
                  }),
                ],
`//             GraphQLModule : 추가해야 GraphQL 실행 가능
//              forRoot 함수 : nestjs docs graphql에 나오는 초기 설정, 똑같이 하면됨

//          3) AppModule에 autoSchemaFile 추가
`               imports: [ 
                  모듈들 ,

                  GraphQLModule.forRoot<ApolloDriverConfig>({
                    driver: ApolloDriver,

                    autoSchemaFile: 'src/commons/graphql/schema.gql',
                  }),
                ],
`//             autoSchemaFile : 자동으로 스키마 파일을 추가해주는 모듈
//                               없으면 스키마 파일 자동 생성 안함, Code First 안됨

//              .../schema.gql : 스키마 파일을 생성할 경로와 파일명
//                               파일 확장자는 .gql (graphql)로 설정해야함

//              경로 폴더 만들어두기
//                  src/commons/graphql

//          4) src 폴더 안 모듈 폴더들 한 폴더에 정리
//              src 안에 apis 폴더 생성
//              boards, products, users 하나씩 apis 안으로 이동 


//      6. NestJS GraphQL 실행

//          1) 프로젝트 통합 터미널 열기
//              package.json 있는 폴더 열기

//          2) 실행 명령 입력
`               yarn start:dev
`
//          3) 스키마 파일 생성 확인하기
//              commons/graphql/schema.gql 파일 열기
`               type Query {
                  fetchBoards: String!
                }
`//             위처럼 스키마가 생성되었는지 확인

//          4) 플레이그라운드에서 접속해보기
`               http://localhost:3000/graphql
`
//          5) API Docs 확인하기
//              DOCS 에 쿼리에 대한 설명서 있는지 확인
//              스키마가 자동 생성되어 설명서가 만들어진 것

//          6) API 요청 보내보기
//              Playground의 입력 창에 쿼리문 작성 후 실행
`               query {
                  fetchBoards
                }
`//             "Hello World!" 라는 문자열이 정상적으로 반환됨