// Mongoose

//      ODM (Object-Document Mapper) 의 한 종류
//      문서형 데이터베이스에서 사용되는 쿼리문을 백엔드에서 쉽게 사용할 수 있게
//      쉬운 명령어로 맵핑해주는 NoSQL용 툴

// Mongoose 설치 및 적용

//      1. Mongoose 설치

//          1) package.json 파일이 있는 폴더 통합 터미널 열기
//          2) yarn 으로 mongoose 설치
                `yarn add mongoose`

//      2. Mongoose import 하기

//          백엔드 컴퓨터에 mongoose import 하기

//          1) 백엔드 서버 index.js 파일 열기
//          2) mongoose import문 추가
                `import mongoose from 'mongoose';`

//      3. 데이터베이스에 Mongoose 연결

//          1) 백엔드 서버 index.js 파일 열기
//          2) app.listen(4000) 코드 위에 연결 코드 삽입
                `mongoose.connect("mongodb://localhost:27017/mydocker")
                    .then(() => console.log("db 접속 성공"))
                    .catch(() => console.log("db 접속 실패"))`
//              - connect : db 연결 메서드, 인자로 연결할 db 주소 받음
//              - mydocker : db 이름 (없는 경우 새로 생성함)
//              - then : db 연결 성공시 실행문
//              - catch : db 연결 실패시 실행문

//      4. docker 실행

//          1) Docker desktop 프로그램 실행
//          2) docker compose 로 한꺼번에 빌드
                `docker-compose build`
//          3) docker compose 로 한꺼번에 실행
                `docker-compose up`

//      5. 데이터베이스 접속 실패 (정상)

//          백엔드 서버에서 데이터베이스에 접속을 못함

//          이유
//              express 도커 컴퓨터는 4000번  포트로 듣고 있고 4000/4000 포트포워딩 상태
//              mongodb 도커 컴퓨터는 27017번 포트로 듣고 있고 27017/27017 포트포워딩 상태
//              express 도커 컴퓨터의 index.js에는 mongoose가 localhost로 연결 시도
//              근데 mongoose가 연결을 시도한 localhost는 express 도커 컴퓨터를 의미
//              따라서 express 도커 컴퓨터에서 27017 포터번호로 실행중인 mongoDB가 없기 때문에
//              찾을 수 없다는 에러가 발생한 것

//          해결 방법
//              docker-compose 로 도커를 실행하면 도커들 간에 그룹핑이 되어 연결 통로가 생김
//              이 연결된 통로를 통해 mongoose 와 DB를 연결할 수 있음
//              Docker 이름을 가지고 연결 (my-database:27017)
//              => Name Resolution 방식

//      6. Name Resolution

//          mongoose가 실행되는 express 서버 도커와 mongoDB가 실행되는 DB 서버 도커를
//          mongoose.connect()로 연결할 때 localhost가 아닌 도커 컴퓨터 이름으로 연결

//          포트포워딩 필요 없어짐 
//              mongoDB-compass를 사용하기 위해 localhost -> docker 로 접속할 때 필요한 거라서


//          1) mongoose.connect() 의 DB 주소 수정
//              localhost -> my-database 로 컴퓨터 이름을 변경

//              기존 : "mongodb://localhost:27017/mydocker"
               `수정 : "mongodb://my-database:27017/mydocker" `
//              - my-database : docker-compose.yaml 파일에서 정의한 컴퓨터 이름

//          2) 포트포워딩 지워보기
//              안지워도 되지만 이번 실습에서는 한번 지워보자
//              docker-compose.yaml 의 my-database 컴퓨터의 ports 부분 모두 주석 처리
//              => mongodb-compass 에서는 접속 안됨
//              => 하지만, name resolution 으로 express 서버에서는 접속 가능

//      7. docker 빌드 및 실행

//          1) 실행 결과
                `my-backend-1   | db 접속 성공` // 라고 정상 출력됨


// MongoDB 와 Mongoose 명령어

//      MongoDB 명령어

//          MongoDB 공식 문서에서 확인 가능
//          mongodb.com -> Resources -> Documentation -> Use MongoDB -> MongoDB CRUD Operations

//      Mongoose 명령어

//          Mongoose 공식 문서에서 확인 가능
//          mongoose.com -> read the docs -> Queries


// build 시 에러 발생 (4.에서 발생)

//      docker-compose build 시 다음 에러 발생

//          => ERROR [my-backend 5/6] RUN yarn install
//          ------
//           > [my-backend 5/6] RUN yarn install:
//          0.438 yarn install v1.22.19
//          0.481 [1/4] Resolving packages...
//          0.548 [2/4] Fetching packages...
//          10.50 error mongoose@8.1.1: The engine "node" is incompatible with this module. Expected version ">=16.20.1". Got "14.21.3"
//          10.51 error Found incompatible module.
//          10.51 info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
//          ------
//          failed to solve: process "/bin/sh -c yarn install" did not complete successfully: exit code: 1

//      Dockerfile (express 서버용) 내부에 설치된 node 버전이 mongoose 버전과 맞지 않아서
//      yarn install 과정에서 문제가 생긴 것으로 보임

//      직전 수업의 Dockerfile 빌드, 실행 후 우분투 쉘을 열어서 node 버전을 확인한 결과
//      node 버전이 mongoose 설치를 위해 요구되는 버전보다 낮은 것이 확인됨

//      해결 : Dockerfile 의 node 버전을 14 -> 16 으로 바꾸고 다시 build 하면 정상 빌드됨
