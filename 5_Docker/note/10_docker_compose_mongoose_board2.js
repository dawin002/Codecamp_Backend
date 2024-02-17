// Docker Volumes

//      Nodemon (복습)

//          프로그램의 소스코드가 수정되었을 경우 자동으로 프로그램을 재실행해주는 툴

//      Docker에서 Nodemon이 작동하지 않음

//          Nodemon이 안되어 소스코드를 수정할 때마다 계속 다시 빌드를 해야함

//      Docker에서 Nodemon 작동하지 않는 이유

//          내 컴퓨터의 vscode로 수정한 index.js 는 docker 컴퓨터 안의 index.js와 다른 파일임
//          따라서 내 컴퓨터의 index.js 를 수정하더라도 docker 안으로 COPY 하지 않으면
//          docker 안의 index.js 파일은 수정되지 않은 상태

//      Volumes

//          docker 에서 설정 가능한 내 컴퓨터와 도커 컴퓨터의 저장공간을 공유하는 속성

//          내 컴퓨터의 파일과 docker 컴퓨터 내부의 파일을 동기화해줌
//              내 컴퓨터의 파일 수정 -> docker 컴퓨터의 파일 수정됨
//              docker 컴퓨터의 파일 수정 -> 내 컴퓨터의 파일 수정됨

//      Volumes 와 Nodemon 둘 다 사용하면

//          Volumes 가 내 컴퓨터의 수정된 소스파일을 docker 컴퓨터에 동기화 해주고
//          Nodemon 이 docker 컴퓨터의 수정된 소스코드를 감지해 자동으로 프로그램을 빌드, 실행해줌

// Volumes, nodemon 사용하기

//      1. volumes 로 특정 파일 공유
//          docker-compose.yaml 파일 코드 수정
//          my-backend 컴퓨터 코드의 build: 와 ports: 사이에 volumes: 코드 추가
`               volumes:
                  - ./index.js:/myFolder/index.js
`//             내 컴퓨터의 ./index.js 와 docker 컴퓨터의 /myFolder/index.js 를 volume 으로 공유

//      * volumes 로 특정 폴더 공유하는 방법
`               volumes:
                  - ./scr:/myFolder/src
`//             내 컴퓨터의 src 폴더와 docker 컴퓨터의 /myFolder/src 폴더를 volume 으로 공유

//      2. docker 컴퓨터 빌드 및 실행
//          1) docker-compose build
//          2) docker-compose up

//      3. volumes 로 공유한 파일의 소스코드 수정해보기
//          1) 내 컴퓨터의 index.js 소스코드 일부 수정
//          2) refresh 되는지 확인

// nodemon 리프레시 안되는 문제 해결

//      문제 상황
//          위 방법대로 volumes, nodemon 을 적용했으나
//          volume을 통해 공유한 소스파일을 수정해도 서버가 재시작되지 않음
//          docker 컴퓨터를 실행해 소스파일 확인 결과 volume을 통해 소스파일은 공유되는 것을 확인
//          하지만 소스파일이 수정되어도 nodemon을 통한 프로그램 재시작이 작동하지 않음

//      문제 해결
//          package.json 파일의 프로그램 실행 명령어를 수정
//          원본 : 
`               "scripts": {
                  "start:dev": "nodemon index.js"
                },
`
//          수정 :
`               "scripts": {
                  "start:dev": "nodemon -L index.js"
                },
`
//          nodemon 실행 명령어에 -L 옵션(플래그)을 추가함
//          참고 블로그 : https://jonyo.tistory.com/154

//      nodemon 의 -L 플래그
//          'Legacy'로, nodemon이 옛날 방식으로 파일의 변화를 포착한다는 의미
//          자세한 정보는 블로그 참고 : https://velog.io/@412/Docker%EC%97%90%EC%84%9C-Nodemon-React-CRA%EA%B0%80-%EC%95%88-%EB%8F%BC%EC%9A%94

// mongoose로 변경된 쿼리문 보는법

//      디버그 모드로 확인하기

//          디버그 모드로 열면 MongoDB 명령어가 어떻게 전달되고 있는지 확인 가능

//          1) index.js 파일에 코드 추가
//              mongoose.connect() 코드 위에 추가
                `mongoose.set("debug", true);`

//          2) docker 빌드 및 실행

//          3) Postman 으로 api 요청 보내기

//          4) 터미널에 출력되는 MongoDB 쿼리문 확인하기

//              조회 api 쿼리문
                `my-backend-1   | Mongoose: boards.find({}, {})`

//              등록 api 쿼리문
                `my-backend-1   | Mongoose: boards.insertOne({ writer: '영희', title: '짱구 ㅎㅇ', 
                contents: '짱구 방구 뿡~', _id: ObjectId("65c64a12b100d3bb955ba32d"), __v: 0}, {})`