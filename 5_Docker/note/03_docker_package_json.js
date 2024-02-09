// Docker 와 package.json

// 효율적인 도커 세팅

//      도커 빌드에서의 캐시 사용

//          도커를 빌드할 때 이미 다운받은 것들을 다시 다운받지 않기 위해 캐시(임시 저장공간)에 저장
//          캐시에 저장된 파일(node:14)은 도커 빌드시 캐시에서 빠르게 가져올 수 있음(0.0초)
//          (도커 빌드시 => CACHED 라고 적힘)

//          하지만 yarn install 작업은 빌드할 때마다 캐시에서 가져오지 않고 매 빌드마다 
//           node_modules를 새롭게 다운받으며 10초 이상씩 걸림

//      Dockerfile 빌드시 캐시에 저장되는, 캐시에서 가져오는 것들

            `FROM node:14`          // node:14 이미지가 캐시에 저장, 다시 빌드시 캐시에서 가져옴

            `COPY . /myFolder/`     // 소스코드가 캐시에 저장, 캐시에서 못가져옴(. 의 내용이 바뀌어서:index.js)
            `WORKDIR /myFolder/`    // !!! 여기서부터 캐시에서 못가져옴 : COPY한 소스코드에서 뭐가 바뀌었을지 모르니까, 위험해서!
            `RUN yarn install`      //     그래서 yarn install을 캐시에서 가져오지 않고 전부 새로 다운받음

            `CMD yarn start:dev`

//      이미지 빌드시 캐시에서 가져오는 기준
//          Dockerfile 코드의 위에서부터 캐시에서 가져올 수 있으면 가져옴
//          그러다 한번 변동사항이 생겨 캐시가 깨지면 그 아래 줄부터 캐시에서 가져오지 않음

//      효율적인 도커 세팅 방법
//          모듈 설치를 캐시가 깨지기 전에 실행
//          아래 코드를 소스코드 복사(COPY) 코드보다 위로 옮기기

//          1) 패키지 정보 COPY
                `COPY ./package.json /myFolder/`
                `COPY ./yarn.lock /myFolder/`
//          2) 커서 위치 옮기기
                `WORKDIR /myFolder/`
//          2) yarn install
                `RUN yarn install`

//      이미지 빌드 결과
            `=> CACHED [2/6] COPY ./package.json /myFolder/                 0.0s`
            `=> CACHED [3/6] COPY ./yarn.lock /myFolder/                    0.0s`
            `=> CACHED [4/6] WORKDIR /myFolder/                             0.0s`
            `=> CACHED [5/6] RUN yarn install                               0.0s`
            `=> [6/6] COPY . /myFolder/                                     0.0s`
//          RUN yarn install 명령어까지 캐시에서 가져오기로 실행됨

// Docker 삭제 관련 명령어

//      Docker 컨테이너 삭제
            `docker rm ${"컨테이너 아이디"}`
//          - rm : remove

//      Docker 이미지 삭제
            `docker rmi ${"이미지 아이디"}`
//          - rmi : remove image

//      Docker 정지된 컨테이너 아이디 한번에 가져오기
            `docker ps -a -q`
//          - -a : 전체 컨테이너 옵션
//          - -q : 꺼져있는 컨테이너 옵션

//      Docker 정지된 컨테이너 한번에 삭제하기
            " docker rm `docker ps -a -q` "
//          - docker ps -a -q 를 백틱(`)으로 감싸면
//            감싼 부분이 먼저 실행되어 컨테이너 아이디들이 rm의 인자로 전달됨
//          => 정지된 컨테이너들이 모두 삭제됨

//          * 윈도우는 `` 대신 $() 사용함!
                `docker rm $(docker ps -a -q)`

//      Docker 사용하지 않는 이미지 아이디 한번에 가져오기
            `docker images -q`
//          - -q : 사용하지 않는 옵션

//      Docker 사용하지 않는 이미지 한번에 삭제하기
            " docker rmi `docker images -q` "
//          - docker images -q 를 백틱(`)으로 감싸면
//            감싼 부분이 먼저 실행되어 이미지 아이디들이 rmi의 인자로 전달됨
//          => 사용하지 않는 이미지들이 모두 삭제됨

//          * 윈도우는 `` 대신 $() 사용함!
                `docker rmi $(docker images -q)`

//      Docker 정지된 컨테이너와 이미지 한번에 삭제하기
            `docker system prune -a`
//          삭제할 컨테이너, 이미지, 캐시 보여주며 한번 더 물어봄
//          `y` 입력 후 엔터 치면 모두 삭제됨

//      만약 현재 실행중인 이미지나 컨테이너가 있다면 제외하고 삭제됨