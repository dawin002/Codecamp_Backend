// NestJS API 구현한거 Docker 로 감싸기

//      1. 프로젝트 복제하기

//          1) 직전 프로젝트 복제

//          2) Docker 복제
//              05_Docker/class/05-docker...mongoose/backend 폴더에서 아래 파일 복사
//                  .dockerignore
//                  docker-compose.yaml
//                  Dockerfile
//                  .env

//              .env 파일은 사실 없음, 그냥 하나 만들어서 빈 파일로 두기

//              복사한 파일들 현재 프로젝트에 붙여넣기

//          3) .dockerignore 확인
//              node_modules 있는지 확인

//      2. docker-compose.yaml 수정

//          1) my-backend 컴퓨터

//              포트포워딩 3000(기본값)으로 수정
`               ports: 
                  - 3000:3000
`
//              소스코드 동기화 기능 추가
`               volumes:
                  - ./src:/myfolder/src
`//             로컬의 ./src 폴더와 도커의 /myfolder/src 폴더를 동기화
//              소스코드 동기화 + 노드몬 => 로컬 코드 저장시 자동 동기화 및 서버 재실행

//          2) my-database 컴퓨터

//              MySQL 로 데이터베이스 변경
`               image: mysql:latest
`//             (원래 mongodb:5 였음)

//              MySQL 실행시 DB 자동 생성
`               environment:
                  MYSQL_DATABASE: 'mydocker'
`//             도커의 MySQL 실행하며 mydocker DB 자동 생성

//              MySQL 실행시 비밀번호 입력
`               environment:
                  ...
                  MYSQL_ROOT_PASSWORD: 'root'
`//             도커의 MySQL 실행하며 비밀번호로 root 자동 입력

//              MySQL 포트번호 설정
`               ports:
                  - 3306:3306
`
//              ** 혹시나 DB 실행 안되면
//                  버전, 사양, CPU 문제로 DB 실행 안되면 이 코드 추가해보기
`                   platform: linux/86_64
`

//      3. 데이터베이스 환경변수 추가

//          1) .env 파일에 로컬 데이터베이스용 환경변수 추가

//              app.module.ts에 있는 TypeOrmModule의 속성을 환경변수로 추가
`               DATABASE_TYPE=mysql
                DATABASE_HOST=localhost
                DATABASE_PORT=3306
                DATABASE_USERNAME=root
                DATABASE_PASSWORD=1804
                DATABASE_DATABASE=myproject
`

//          2) .env.docker 파일 생성해 도커 데이터베이스용 환경변수 추가

//              위에 작성한 .env 환경변수 복제 후 몇 가지 변수 수정
`               DATABASE_TYPE=mysql
                DATABASE_HOST=my-database
                DATABASE_PORT=3306
                DATABASE_USERNAME=root
                DATABASE_PASSWORD=root
                DATABASE_DATABASE=mydocker
`
//              DATABASE_HOST 변수 값이 my-database 로 변경됨
//              DATABASE_PASSWORD 변수 값이 root 로 변경됨
//              DATABASE_DATABASE 변수 값이 mydocker 로 변경됨

//          3) Docker 에 .env.docker 파일 넣어주기

//              docker-compose.yaml 파일에 환경 변수 추가 코드 추가
`               my-backend:
                  ...
                  env_file:
                    - ./.env.docker
`//             : 환경변수로 현재 위치의 .env.docker 파일 사용하겠다

//          4) TypeOrmModule 에 환경변수 사용

//              app.module.ts 의 TypeOrmModule 속성들 .env 환경변수로 대치
//              값에 해당하는 부분들 .env의 환경변수로 전부 바꿔주면 됨
//              .env 파일임! .env.docker 아님!

`               TypeOrmModule.forRoot({
                  type: process.env.DATABASE_TYPE as 'mysql', // 특이한 부분
                  host: process.env.DATABASE_HOST,
                  port: Number(process.env.DATABASE_PORT), // 특이한 부분
                  username: process.env.DATABASE_USERNAME,
                  password: process.env.DATABASE_PASSWORD,
                  database: process.env.DATABASE_DATABASE,
                  ...
                }),
`//             그냥 환경변수명으로 대치하는 게 아니라 precess.env.환경변수명 으로 대치해야 함

//              port 속성은 숫자만 가질 수 있는데, 환경변수는 항상 문자열이어서 Number()로 변환

//              type 속성은 Union 타입이라 특정 값 중에서만 고를 수 있는데, DATABASE_TYPE
//               환경 변수가 어떤 값인지 몰라 에러 뜸
//              => as 'mysql' 로 이 변수의 값은 'mysql'이야 라고 강제해 줌으로써 에러 잡음

//          5) @nestjs/config 설치

//              .env 파일을 생성만 했다고 해서 사용할 수 있는 게 아님
//              Node Express 에서는 .env 라이브러리를 설치해 사용했었음
//              NestJS 에서도 @nestjs/config 라이브러리를 설치해 사용해야 함

//              @nestjs/config 설치
`               yarn add @nestjs/config
`
//          6) @nestjs/config 적용 (AppModule)

//              @nestjs/config 라이브러리 가젹오기
`               import { ConfigModule } from '@nestjs/config';
`
//              ConfigModule 추가
`               @Module({
                  imports: [
                    ... ,
                    ConfigModule.forRoot(),
                    ... ,
                  ],
                })
`//             app.module.ts 의 @Module 의 imports 안에 추가해야 함

//             * 주의할 점!!!
//                process.env.환경변수 를 사용하는 코드보다 위에 추가해야함!
//                즉, TypeOrmModule 보다 위에 ConfigModule 을 적어야 함


//      4. 도커 실행해보기

//          1) 로컬에 켜둔 MySQL, DBeaver 종료
//              MySQL과 DBeaver를 둘 다 꺼야지 3306 포트가 해제됨

//              Windows PowerShell 관리자 권한으로 열어 MySQL 종료 명령어 입력

//              * MySQL 서비스 종료 명령어
`                   net stop mysql
`//             * MySQL 서비스 시작 명령어
`                   net start mysql
`
//              DBeaver은 프로그램 종료

//          2) 도커 빌드
`               docker-compose build
`
//          ** 에러 발생
//              @angular-devkit/core 패키지가 Node.js 버전 "^18.13.0 || >=20.9.0"을 요구하는데, 
//               현재 사용 중인 Node.js 버전이 "16.20.2"이기 때문에 호환되지 않습니다.

//              => Dockerfile의 FROM node:16 부분을 FROM node:18 로 수정
//              에러 해결 완료!

//          3) 도커 실행
`               docker-compose up
`
//              데이터베이스 켜지는 시간이 오래 걸려서 Retrying (1)... 같은 에러가 나올 수 있음
//              my-backend-1 관련 코드가 마지막에 나와야 하고, 마지막이 아니면 데이터베이스가
//               켜지기 전에 도커 실행 프로세스가 끝나서 DB가 덜 만들어진 것이므로 재실행해야함

//      5. DBeaver 에서 mydocker 데이터베이스 접속 확인하기

//          1) DBeaver 프로그램 실행

//          2) 새로운 연결 만들기
//              왼쪽 위에 파란색 플러그 버튼 클릭
//              MySQL 선택 -> 다음 ->
//              Database: mysql -> Password: root -> Test Connection 클릭 -> 확인 -> 완료

//           * 에러 발생
//              Test Connection시 "Public Key Retrieval is not allowed" 뜨면서 접속 안됨

//              에러 해결 방법
//              : DB 접속 정보 입력 창에서 Driver properties 탭으로 이동
//                -> Driver properties 항목에서 두 속성 값 변경
//                -> allowPublicKeyRetrieval : true
//                -> useSSL : false
//                -> Test Connection 부터 진행하기

//          3) 연결 확인하기

//              Docker 안에서 실행된 MySQL 인데 어떻게 로컬 DBeaver 에서 열리는가?
//              -> 포트포워딩을 통해 연결됨

//              mysql 2 로 데이터베이스 생성됨
//              Databases 안에 도커의 MySQL에 만들었던 mydocker database 확인 가능
//              mydocker database 안에 board 테이블과 Column들 확인 가능