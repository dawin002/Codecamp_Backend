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

//      * 에러 발생

//          윈도우에서 docker-compose build 시 다음 에러 발생

//              => ERROR [my-backend 5/6] RUN yarn install
//              ------
//               > [my-backend 5/6] RUN yarn install:
//              0.438 yarn install v1.22.19
//              0.481 [1/4] Resolving packages...
//              0.548 [2/4] Fetching packages...
//              10.50 error mongoose@8.1.1: The engine "node" is incompatible with this module. Expected version ">=16.20.1". Got "14.21.3"
//              10.51 error Found incompatible module.
//              10.51 info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
//              ------
//              failed to solve: process "/bin/sh -c yarn install" did not complete successfully: exit code: 1