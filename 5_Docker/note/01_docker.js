// Docker

// Docker란?
//          가상 컴퓨터(== 가상 머신, 버추얼 머신)
//          커널(부팅 등 운영체제 핵심기능)을 실제 컴퓨터와 공유하는 가상머신
//          다른 os에서 동일한 개발 환경을 사용하기 위해서 사용

//      리눅스 환경
//          docker는 리눅스 환경으로 설정되어 있음
//          맥은 리눅스와 코어가 동일하기 때문에 바로 사용 가능
//          윈도우는 WSL(Window Subsystem for Linux) 추가로 설치해야함

//      장점
//          개발/배포 환경 통일
//          가벼운 가상 컴퓨터(os 전체를 설치하는게 아니라서)
//          개발 환경 미리 세팅 가능(노드, DB 등 설치된 도커를 파일로 주고 받을 수 있음)

// Docker 설치

//          구글에 Docker 검색해서 맞는 os로 설치하면 됨

// Docker 가상 머신 만들어 JS 파일 실행하기

//      ( Dockerfile 생성 -> node 이미지 설치 -> 내 컴퓨터의 JS파일 복사 -> JS파일 실행 코드 작성 -> 이미지 빌드 -> 이미지 실행 )

//      1. Docker 파일 생성
//          1) vscode 에서 Dockerfile 이라는 이름으로 파일 생성

//      2-1. 운영체제 및 개발 환경 설치 (실습 아님! 개념 설명! 실습은 2-2.으로 넘어갈 것)

//          Docker 파일에 명령어를 작성해서 설치
//          명령어 입력시 Docker Hub 에서 다운로드 받아옴

//          * Docker Hub
//              hub.docker.com
//              github, npm 과 마찬가지로 오픈 소스를 제공하는 곳
//              사람들이 올린 이미지(가상 머신)를 다운받을 수 있음
//              git을 설치해 사용하는 것과 마찬가지로 docker를 설치후 
//                docker pull(== FROM), docker push 명령어 사용해 이미지 공유

//          1) Ubuntu 설치
                `FROM ubuntu:22.04`
//              -> 우분투가 다운받아지고 우분투 가상 머신 터미널이 하나 생성됨
//              -> CLI 명령어를 이용해 폴더/파일 조작, 프로그램 다운로드 가능

//          2) Node.js 설치
                `RUN sudo apt install nodejs`
//              - RUN : 가상 머신에서 명령어 실행
//              - sudo : 관리자 권한 실행
//              - apt : 우분투 os의 패키지 관리자, 맥 os는 brew
//              -> 우분투 가상 머신에 nodejs가 설치됨

//          3) NPM 설치
//              npm은 nodejs를 설치하면 자동 설치

//          4) Yarn 설치
                `RUN sudo npm install -g yarn`
//              - npm : npm을 이용해 설치
//              - -g : 글로벌 설치
//              -> 우분투 가상 머신에 yarn이 설치됨

//      2-2. 이미 만들어진 node 이미지 설치
//          Ubuntu, Node.js, Yarn이 설치된 이미지(가상 머신) 다운받기
//          Docker Hub 에서 node 라는 이미지를 다운받는 것
                `FROM node:14`
//              - FROM : 이미지(가상 머신) 다운로드
//              - node:14 : node 라는 이미지의 14버전

//      3. Docker로 내 컴퓨터의 JS 파일 옮기기
//          1) Dockerfile 과 같은 폴더에 index.js 파일 생성
//          2) 바깥의 index.js 파일을 Docker 머신으로 복사
                `COPY ./index.js index.js`
//              - COPY : 바깥의 파일을 Docker 내부로 복사
//              - ./index.js : 복사할 파일의 경로와 파일명
//              - index.js : 생성할 파일의 경로와 파일명
//                           현재 작업 공간(최상단 폴더)에 index.js라는 이름으로 생성

//      4. Docker 안에서 JS 파일 실행 코드 작성하기
//          1) RUN 대신 CMD 명령어 이용해 파일 실행 코드 작성
                `CMD node index.js`
//              - CMD : 이미지 빌드 과정에서 실행되지 않는 실행 명령어

//          * RUN, CMD 차이
//              - RUN : 이미지 빌드 과정에서 실행되어 결과가 이미지로 저장됨
//              - CMD : 저장된 이미지를 실행시킬 때 실행됨, 이 docker 파일에서 한번밖에 못씀

//      5. index.js 파일 내용 채우기
//          1) 간단한 출력
                `console.log('이 파일은 도커에서 실행됩니다.');`
//          2) Docker 컴퓨터 종료 방지하기
                `while(true){ }`
//              도커 컴퓨터는 명령어가 끝나면 자동으로 종료됨
//              도커 컴퓨터가 종료되지 않게 하기 위한 임시 방편

//      6. Docker 이미지 빌드하기

//          * 도커 이미지 빌드
//              내가 만든 가상 머신을 저장 및 최적화 하는 작업
//              내가 쓴 코드가 모두 실행된 다음에 하나의 파일(도커 이미지)로 저장됨
//              도커 이미지를 만들어 Docker Hub에 업로드할 수 있음

//          1) Dockerfile 이 저장된 폴더 통합 터미널에서 열기

//          2) 도커 이미지 빌드 명령어 입력
                `docker build .`
//              - docker build : 도커 파일을 빌드한다
//              - . : 현 위치에 있는 도커 파일을 의미

//              * ERROR: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
//                라는 에러가 발생하는 경우 Docker가 안켜져있어서 그런거임 ㅋㅋ

//      7. 이미지 실행하기
//          1) 내가 만든 Docker 이미지 ID 확인하기
                `docker images`
//              방금 생성된 이미지의 IMAGE ID 복사하기
//          2) 이미지 ID로 이미지 실행하기
                `docker run ${"이미지 아이디"}`
//              아이디는 대략 1ad60d7e41f8 이런 형식임

//      8. 실행 결과 확인
//          터미널에 "이 파일은 Docker 안에서 실행됩니다."가 출력되고 다음 라인에서 커서가 멈춰있음(무한 반복중)
//          -> 도커 가상 머신이 실행되어 있는 상태

//      9. 도커 상태 확인하기
//          1) 터미널 위의 대문 모양 버튼 눌러 터미널 하나 더 열기
//          2) 새 터미널에서 도커 상태 확인 명령어 입력
                `docker ps`
//              - ps : process(실행중인 도커 프로세스 정보 확인)
//          3) 출력 결과
//              CONTAINER ID   IMAGE          COMMAND                   CREATED         STATUS         PORTS     NAMES
//              276b68fb7bfe   1ad60d7e41f8   "docker-entrypoint.s…"    4 minutes ago   Up 4 minutes             practical_wescoff

//      10. 실제 도커 컨테이너에 들어가보기
//          1) 새로 연 터미널에서 명령어 입력
                `docker exec -it ${"컨테이너 아이디"} /bin/bash`
//              - exec : 컨테이너 접속
//              - -it : 접속해서 수정하는 옵션
//              - 컨테이너 아이디 : docker ps 명령어 입력 후 CONTAINER ID 로 확인 가능
//              - /bin/bash : 명령어 입력기 실행
//          2) 터미널 형식이 바뀜
//              root@276b68fb7bfe:/#   이런 형태로 바뀜, 명령어 입력 가능
//              -> 현재 docker 컴퓨터(컨테이너) 내로 진입한 것
//              리눅스 CLI 명령어 이용해 조작 가능
//          3) 명령어 입력기(쉘) 종료하기
                `exit`

//      11. 도커 컨테이너 종료하기
//          1) 도커 컨테이너 종료 명령어 입력
                `docker stop ${"컨테이너 아이디"}`
//          2) 종료 확인하기
//              docker 이미지 실행했던 터미널의 무한반복 중이던 프로세스가 종료됨
//              도커 상태 확인 명령어로도 종료 확인 가능
                `docker ps`
//              CONTAINER ID   IMAGE   ... 이 줄 아래에 아무 것도 출력되지 않으면 종료된 것