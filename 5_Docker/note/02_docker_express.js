// Docker 컴퓨터에서 express 백엔드 서버 실행하기

// 실습

//      전에 만들었던 express 프로젝트를 Docker 안으로 복사해 Docker로 실행시키기

//      실습 목표

//          1. express 프로젝트 Docker 안으로 옮기기
//          2. node modules 는 Docker 복사 안해야함

// Docker 파일 생성

//      1. 전에 만들었던 express 프로젝트 복제
//          4_API_Implement_Basic/class/10-rest-api-with-email 폴더 복사해서
//          5_Docker/class 에 넣고 02-docker-with-express 로 이름 변경

//      2. Docker 파일 생성(복제)
//          5_Docker/class/01-docker/Dockerfile 복사해 backend 폴더에 붙여넣기

//      3. node_modules 도커 COPY에서 제외시키기
//          1) .dockerignore 파일 생성
//              Dockerfile이 있는 폴더에 .dockerignore 파일 생성
//          2) 무시할 폴더명 추가
//              .dockerignore 파일에 node_modules 입력 후 저장

//      3. backend 폴더의 모든 파일(폴더) Docker 안으로 옮기기

//          1) Docker 컴퓨터 내 새로운 폴더 생성
                `RUN mkdir myFolder`
//              - mkdir : 폴더 생성
//              사실 이 코드 생략 가능(아래에서 COPY 할때 폴더 없으면 자동 생성됨)

//          2) 현 위치의 모든 파일 복사해 Docker 안으로 옮기기
                `COPY . /myFolder/`
//              - . : 현 위치의 모든 파일
//              - /myFolder/ : 현 위치의 myFolder 폴더 안으로

//      4. express 프로그램을 저장한 폴더로 이동하기

//          방법 1. RUN cd 로 이동한 상태로 빌드하기(이거 안쓸거)
                `RUN cd ./myFolder/`
//              - 이동한 상태로 저장(이미지 빌드)하는 방법

//          방법 2. WORKDIR 로 작업 디렉토리 전환하기(이걸로 하기)
                `WORKDIR /myFolder/`
//              - WORKDIR : 작업 디렉토리 전환
//              - 작업 디렉토리가 지정한 폴더로 설정됨

//      5. Docker 안에서 node_modules 설치하기
                `RUN yarn install`
//              - 설치한 상태로 도커 이미지를 빌드해야하기 때문에 RUN 명령어 사용

//      6. express 서버 실행하기
                `CMD yarn start:dev`
//              - 도커 이미지를 빌드할 때가 아닌 실행했을 때 서버가 실행되어야 하므로 CMD 사용
//              - yarn start:dev : package.json에서 정의한 index.json 실행 함수

// Docker 이미지 빌드하기

// Docker 이미지 실행하기