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

//      1. Docker 빌드하기
//          1) Dockerfile이 저장된 폴더 통합 터미널에서 열기
//          2) Docker 빌드 명령어 입력
                `docker build .`
//          => 도커 이미지 생성됨

//      2. 빌드한 Docker 이미지 확인
//          1) 터미널에 도커 이미지 목록 조회 명령어 입력
                `docker images`
//          *  도커 이미지 삭제 명령어
                `docker rmi ${"이미지 아이디"}`
//          2) 도커 이미지 아이디 확인
//              가장 최근에 생성된 IMAGE ID 확인

// Docker 이미지 실행하기

//      1. 빌드한 Docker 이미지 실행하기
//          1) 확인한 이미지 아이디로 도커 이미지 실행하기
                `docker run ${"이미지 아이디"}`

//      2. 실행중인 컨테이너 확인하기
//          1) 새 터미널 열어서 도커 프로세스 조회 명령어 입력
                `docker ps`
//          *  전체 컨테이너 확인 명령어
                `docker ps -a`
//          *  컨테이너 삭제 명령어
                `docker rm ${"컨테이너 아이디"}`

//          2) 컨테이너 아이디 확인
//              가장 최근에 생성된 CONTAINER ID 확인

// Docker express 서버에 API 요청하기 (안되는데 왜 안되는지가 중요)

//      1. Postman 실행

//      2. app.get('/boards, ...) api 요청하기
//          1) GET 메서드 선택
//          2) api 주소 입력
                `http://localhost:3000/boards`

//      => Could not send request
//          Error: connect ECONNREFUSED 127.0.0.1:3000 발생
//          : express는 도커에서 켜져있는데 요청을 받을 api는 내 컴퓨터
//            (localhost)에서 찾고 있어서
//          -> 포트 포워딩 해줘야함

//      3. 도커 컨테이너 종료하기
//          1) 새로운 터미널에서 도커 컨테이너 종료 명령어 입력
                `docker stop ${"컨테이너 아이디"}`

// Port forwarding 해서 docker 이미지 실행하기

//      포트를 전달해주는 것
//      도커를 실행시킬 때 포트 포워딩으로 내 컴퓨터에서 도커 컴퓨터로 포트를 전달

//      내 컴퓨터에서 api 요청이 전달되는 포트를 도커 컴퓨터로 연결해주고
//        도커 컴퓨터 내에서 api를 요청받을 수 있는 포트를 지정해주는 것

//      localhost -> docker 로 가는 포트 번호(2500)와
//        docker -> express 로 가는 포트 번호(3000)를 다르게 설정할 수 있음

//      1. 현재 docker 내에서 실행중인 express는 3000번 포트로 실행중

//      2. localhost -> docker 로 가는 포트번호 포트 포워딩 해주기
//          1) docker 이미지 실행 명령어에 포트 포워딩 옵션 추가
                `docker run -p 2500:3000 ${"이미지 아이디"}`
//              - -p : 포트 포워딩 옵션
//              - 2500 : localhost에서 api 요청할 포트번호
//              - 3000 : express가 api 요청받을 포트번호

//      3. 컨테이너 정보 확인하기
//          1) 새로운 터미널 열기
//          2) 컨테이너 정보 조회 명령어 입력
                `docker ps`
//          => PORTS 항목에 0.0.0.0:2500->3000/tcp 라고 적혀있음
//              0.0.0.1 : 누구나
//              2500->3000 : 2500을 3000으로 포트 포워딩했다

// 포트 포워딩한 Docker express 서버에 API 요청하기

//      1. Postman 실행

//      2. app.get('/boards, ...) api 요청하기
//          1) GET 메서드 선택
//          2) api 주소 입력
                `http://localhost:2500/boards`
//              - 2500 : 포트 포워딩으로 docker에 연결시킨 포트번호

//      => 게시판 글 목록 조회 응답이 정상적으로 돌아옴


// 퀴즈 : localhost -> docker 접속할 때는 2500 포트로, 
//         docker 안의 express는 4000번 포트로 실행되게 수정하기

//      vscode의 index.js를 3000 -> 4000 으로 수정해도 도커에는 즉시 적용 안됨

//      * docker 접속 명령어
            `docker exec -it ${"컨테이너 아이디"} /bin/bash`
//      * 리눅스 파일 열기 명령어
            `cat ${"파일 이름"}`

//      다시 빌드해야함, 수정한 index.js 파일로 빌드만 하면 될듯?
//          1) index.js 수정
//          2) docker 컨테이너 종료
//          3) docker 컨테이너 삭제
//          4) docker 이미지 삭제
//          5) docker 이미지 빌드
//          6) docker 이미지 실행
//          7) postman 에서 2500번 포트로 api 요청 전송