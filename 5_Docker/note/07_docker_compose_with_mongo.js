// Docker compose

//      MongoDB를 Docker와 함께 사용하려면 두 대의 Docker 컴퓨터가 필요함
//          Express 서버를 실행하는 Docker 컴퓨터 한 대
//          MongoDB 서버를 실행하는 Docker 컴퓨터 한 대

//      Docker 컴퓨터 여러대 실행시킬 때는 Docker 들을 그룹핑해서 실행할 수 있음
//      Docker 들을 그룹핑(연결)하는 것이 Docker compose

// Docker MongoDB

//      내 컴퓨터에 설치한 MongoDB는 사용 안함
//      Docker 내부에 MongoDB 설치해 데이터베이스 서버 사용

// 내 컴퓨터에 실행중인 MongoDB 종료하기

//      Mac

//      1. MongoDB 종료
//          1) 터미널에 MongoDB 종료 명령어 입력
                `brew services stop mongodb-community`

//      2. MongoDB가 종료되었는지 확인
//          1) brew 서비스 목록 조회 명령어 입력
                `brew services`
//          2) mongodb-community 의 Status 가 none 이 맞는지 확인

//      Windows

//      1.  MongoDB 켜져있는지 확인
//          1) PowerShell 에서 MongoDB Shell 실행되는지 확인
                `mongosh`
//          2) 정상 실행되면 MongoDB 가 켜져있는 것이므로 아래 순서대로 종료하기

//      2. MongoDB Shell 열어서 MongoDB 종료
//          1) MongoDB shell 실행
                `mongosh`
//          2) admin 데이터베이스로 변경
                `use admin`
//          3) MongoDB 서버 종료
                `db.shutdownServer();`
//          4) MongoDB shell 종료
                `exit`

//      * MongoDB 재실행시 발생하는 에러
//          shutdown 이후 mongod 입력해도 MongoDB 실행 안됨 (이유는 모름)
//          MongoDB 재실행하려면 컴퓨터 다시 시작 하고난 후 다시 mongod 로 실행

// Docker에 MongoDB 설치하기

//      1. MongoDB 실행할 Dockerfile 생성
//          1) 백엔드 폴더에서 Dockerfile.mongo 파일 생성
//          2) Dockerfile 명령어 작성
                `FROM mongo:5`
//              : MongoDB 설치된 리눅스 운영체제 다운로드

//          MongoDB Docker 컴퓨터 작업 끝!

//      ** 한 줄짜리 Dockerfile 생략하기
//          1) Dockerfile.mongo 파일 제거
//          2) docker-compose.yaml 파일 수정
                `my-database:` // 에서
                  `build:` // 부분 모두 지우고
                  `image: mongo:5` // 로 수정
//          Dockerfile 내용이 한 줄인 경우에만 사용 가능      

// Docker Compose 사용하기

//      매번 Express, Mongo, ... 를 실행할 Dockerfile들을 따로따로 빌드, 실행, 
//        종료하기 번거롭기 때문에 Docker Compose를 사용해 한번에 실행, 종료하는 방법 사용

//      1. Docker Compose 설정파일 생성
//          1) backend 폴더에 docker-compose.yaml 파일 생성
//              확장자 yaml, yml 둘 다 사용 가능

//      2. Docker Compose 설정파일 명령어 작성
//          1) 버전 입력
                `version: '3.7'`
//          2) 컴퓨터 목록 입력
                `
                services:           // 컴퓨터 목록

                  my-backend:       // 컴퓨터 이름 변수명 : 백엔드 컴퓨터
                    build:          // 빌드에 대한 정보:
                      context: .    // 경로명 : .(현재 위치)
                      dockerfile: Dockerfile    // 파일 이름 : Dockerfile
                    ports:          // 포트포워딩
                      - 4000:4000   // 4000번 포트를 받아서 4000번 포트로 연결해라

                  my-database:      // 컴퓨터 이름 변수명 : 데이터베이스 컴퓨터
                    build:
                      context: .
                      dockerfile: Dockerfile.mongo // 파일 이름 : Dockerfile.mongo
                    ports:
                      - 27017:27017 // 27017번 포트를 받아서 27017번 포트로 연결해라
                `

//      3. 모든 Dockerfile 빌드
//          1) 백엔드 폴더 통합 터미널 열기
//              docker-compose.yaml 파일이 있는 위치에서 열어야 함
//          2) Docker Compose 빌드 명령어 입력
                `docker-compose build`
//              docker Compose 설정파일에 등록된 모든 도커파일이 이미지로 빌드됨

//      4. 모든 이미지 파일 실행
//          1) Docker Compose 실행 명령어 입력
                `docker-compose up`
//              Docker Compose 설정파일에서 생성된 모든 이미지 파일이 실행됨
//              현재 실습에서는 express, mongoDB가 설치된 이미지들이 각각 실행됨

//      5. 실행중인 Docker 컴퓨터 확인하기
//          1) 새 터미널 열어서 도커 프로세스 명령어 입력
                `docker ps`
//          2) 실행 상태의 컨테이너 두 개인지 확인
//          3) NAMES (컨테이너 이름) 확인
//              backend-my-backend-1, backend-my-database-1
//          4) IMAGE (이미지 이름) 확인
//              backend-my-backend, backend-my-database
//          5) PORTS (포트 포워딩) 확인
//              0.0.0.0:4000->4000/tcp, 0.0.0.0:27017->27017/tcp

//      6. 실행중인 Docker 컴퓨터 모두 종료하기
//          * 컴퓨터 실행된 터미널에서 종료하는 방법
//              docker-compose up 한 터미널에서 '컨트롤 + C' 누르기
                    `^C`
//          * 다른 터미널에서 종료하는 방법
//              docker-compose.yaml이 저장된 폴더의 터미널에서 종료 명령어 입력
                    `docker-compose stop`

// Docker 컴퓨터에서 MongoDB 접속하기 (MongoDB Shell)

//      Shell을 통한 CLI 접속 방식

//      1. Docker 컴퓨터 접속하기
//          1) 새 터미널 열기
//          2) MongoDB Docker 컨테이너 아이디 확인
                `docker ps`
//              backend-my-database-1 가 이름인 컨테이너 ID 확인
//          3) Docker 컴퓨터 접속하기
                `docker exec -it (컨테이너 아이디) /bin/bash`

//      2. MongoDB 사용하기
//          1) MongoDB Shell 접속 명령어 입력
                `mongo`
//          2) DB 목록 조회
                `show databases;`
//          3) 특정 DB 사용
                `use (DB 이름);`
//          4) collection 목록 조회
                `show collections;`
//          5) document 조회
                `db.(컬렉션 이름).find();`
//          6) MongoDB Shell 종료
                `exit;`

//      3. Docker 컴퓨터 빠져나오기
//          1) Docker shell(터미널) 종료 명령어 입력
                `exit`

// Docker 컴퓨터에서 MongoDB 접속하기 (MongoDB Compass)

//      MongoDB Compass를 통한 GUI 접속 방식

//      1. MongoDB Compass를 Docker 내부의 MongoDB 서버와 연결
//          1) 내 컴퓨터의 MongoDB Compass 실행
//          2) localhost:27017 인 상태로 connect
//              내 컴퓨터에는 27017 포트번호를 사용하는 MongoDB가 없지만
//              Docker에서 포트포워딩 해뒀기 때문에 Docker 내부의 MongoDB와 연결됨
//          -> docker-compose up 한 터미널에 로그가 찍힘

//      2. MongoDB Compass를 사용해 DB 조작하기
//          GUI 사용하기 때문에 알아서 해볼 것