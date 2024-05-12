// NestJS 와 TypeORM 을 연결하기

//      TypeORM

//          Typescript에서 ORM을 사용할 수 있도록 만든 프레임워크

//          ORM
//              Object-Relational Mapping
//              객체지향 명령어를 복잡한 데이터베이스의 명령어로 맵핑해 자동으로 변환해주는 도구

//              백엔드(JavaScript) -> ODM (Mongoose) -> NoSQL 데이터베이스 (MongoDB)
//              백엔드(JavaScript) -> ORM (Sequelize) -> SQL 데이터베이스 (MySQL)
//              백엔드(TypeScript) -> ORM (TypeORM) -> SQL 데이터베이스 (MySQL)

//              JavaScript 에서 가장 유명한 ORM : Sequelize
//              TypeScript 에서 가장 유명한 ORM : TypeORM


//      TypeORM 과 Mongoose 차이

//          Mongoose에서 만든 스키마가 MongoDB에 생성되진 않음
//          TypeORM에서 만든 엔티티는 MySQL에 테이블로 생성됨

//          MongoDB는 스키마 리스
//          MongoDB에서는 스키마 필터링을 Mongoose에서 하기 때문에 MongoDB Compass를
//           직접 조작해서 스키마에 없는 필드를 추가할 수 있었음 => 스키마 리스

//          MySQL는 스키마 구조
//          MySQL은 명확하게 구조가 잡혀있고, TypeORM이 MySQL과 동기화되기 때문에 
//           엔티티가 정의되면 엔티티에 없는 새로운 속성의 데이터를 넣을 수 없음
//           => SQL은 NoSQL과 달리 명확하게 스키마가 존재하는 구조

//          MongoDB는 데이터를 유연하게 관리 가능
//          MySQL은 데이터를 안전하고 정적으로 관리 가능


// TypeORM 실습

//      0. 프로젝트 복제

//          1) 04-nestjs-with-graphql 프로젝트 복제하기


//      1. TypeORM 설치

//          1) NestJS 공식 사이트에서 TypeORM 관련 설치 명령어 확인
//              -> nestjs.com 접속
//              -> Documentation 클릭
//              -> TECHNIQUES 클릭
//              -> Database 클릭
//              -> TypeORM Integration 단락에서 npm 설치 명령어 확인

`               npm install --save @nestjs/typeorm typeorm mysql2
`//             @nestjs/typeorm 와 typeorm 와 mysql2 다운받는다는 뜻
//              * mysql2 는 MySQL이 아닌 MySQL에 연결하는 것을 도와주는 도구

//          2) 현재 프로젝트 폴더 터미널에서 열어 설치 명령어 입력
`               yarn add --save @nestjs/typeorm typeorm mysql2
`
//          3) 아오 썅 @nestjs/typeorm 이 계속 설치가 안되는 문제 해결

//              위 명령어로 @nestjs/typeorm을 설치했을 때 import문에서 
//               해당 모듈을 찾을 수 없다는 에러가 발생

//              @nestjs/typeorm 모듈이 package.json에 추가되어 있지 않았음

//              위 설치 명령어에서 나머지 다 빼고 설치해봐도 안됐음

//              챗지피티에게 물어본 결과 --save 옵션을 빼고 해보래서 
//               yarn add @nestjs/typeorm 명령어로 설치하니까 됐음

//      TypeORM 사용 방법은 NestJS 공식 사이트의 TypeORM 관련 문서에 가이드 나와 있음


//      2. TypeORM 접속하기(세팅하기?)

//          1) src/app.module.ts 열기

//          2) TypeOrmModule 추가
//              @Module 의 imports 안에 TypeOrmModule 코드 추가하기
`               TypeOrmModule.forRoot({
                  type: 'mysql',
                  host: 'localhost',
                  port: 3306,
                  username: 'root',
                  password: '1804',
                  database: 'myproject',
                  entities: [],
                  logging: true,
                }),
`//             type: 'mysql', : mysql DB 사용하겠다. 이외에 다른 DB도 사용가능
//              host: 'localhost', : 내 컴퓨터에 있는 MySQL에 접속하겠다
//                                   도커로 할 때는 도커 네임 리졸루션 이름 넣음
//              database: 'myproject', : 사용할 데이터베이스 이름(없으면 만들어야함)
//              entities: [], : 사용할 테이블, 아직 없기 때문에 빈칸으로 둠
//              logging: true, : 어떤 명령어로 변환되는지 로그로 보여주는 옵션


//      3. database 추가하기

//          아직 MySQL에 내가 사용할 database가 없으므로 직접 만들어줘야함
//          만들어줘야 TypeORM에서 사용 가능
//          DBeaver 이용하면 쉽게 만들 수 있음

//          1) DBeaver에서 MySQL 접속

//          2) Databases 에 database 추가하기
//              Databases 마우스 우클릭
//              -> Create New Database
//              -> 'myproject' 생성 (TypeOrmModule에 입력한 DB 이름)

//          => 접속할 수 있는 빈 데이터베이스 생성


//      4. DB 테이블 만들기

//          게시판 API에서 사용할 테이블 만들기
//          잘 모르겠으면 NestJS 홈페이지의 샘플 코드 중 TypeORM 샘플 코드 참고

//          1) 테이블 저장할 폴더 생성
//              src/apis/boards/entities

//          2) 테이블 파일 생성
`               board.entity.ts
`//             * boards 아니고 board! : 데이터베이스 관련 명명에서는 복수형 안씀
//                                      (이 자체가 테이블 이름이 될 거여서)
//          3) 테이블 파일 작성
//              테이블 또한 NestJS의 다른 파일들처럼 클래스로 만듬
//              테이블 이름, 사용할 속성 정의
`               @Entity() // 테이블
                export class Board {
                  @PrimaryGeneratedColumn('increment') // 1씩 증가하는 고유 id
                  number: number;

                  @Column() // 콜룸(속성)
                  writer: string;

                  @Column()
                  title: string;

                  @Column()
                  contents: string;
                }
`//             Board 만 정의하면 그냥 클래스임
//              @Entity() 데코레이터를 붙여 테이블로 만듬

//              writer, title 만 적으면 그냥 필드임
//              @Column() 데코레이터를 붙여 Column(테이블의 속성)으로 만듬

//              number 에 @Column 붙이면 그냥 속성임
//              @PrimaryGeneratedColumn() 데코레이터 붙여 자동 생성되는 프라이머리 속성으로 만듬

//              @PrimaryGeneratedColumn() 의 괄호 안에 생성 규칙 넣음
//                  'increment': 1부터 1씩 증가하는 번호
//                  'uuid': 유니버셜리 유니크 id (고유 아이디)
//                  'identity', 'rowid'는 다른 DB에서 사용되는 규칙

//              export: app.module.ts에서 Board를 import하기 위해 내보내기


//      5. 테이블 적용하고 DB에 동기화시키기

//          1) app.module.ts 파일 열기

//          2) TypeOrmModule 에 엔티티(테이블) 추가하기
//              TypeOrmModule 의 forRoot 설정 중 entities 에 엔티티 넣기
`               entities: [Board],
`//             Board 클래스는 import 해야함

//              만약에 import가 안되는 경우 Board 클래스가 export 안돼있는 것

//          3) DB에 동기화시키기
//              TypeOrmModule의 forRoot 설정에 synchronize 옵션 추가하기
`               synchronize: ture,
`

//      6. 서버 실행해 DB 변동 확인하기

//          1) 서버 실행하기
`               yarn start:dev
`
//          2) TypeORM이 출력하는 로그 확인하기
//              query: ... 이라고 적혀있는 SQL 쿼리문(테이블 생성) 확인 가능

//          3) DBeaver에서 테이블 생성 확인하기
//              myproject(작업한 DB) 우클릭해서 새로고침 하면 생성한 테이블 나옴
//              board 테이블 클릭시 Column도 확인 가능
