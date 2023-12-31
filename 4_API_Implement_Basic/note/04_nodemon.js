// Nodemon

//      노드몬
//      Express 서버 코드를 저장했을 때 자동으로 서버를 refresh 해주는 기능
//      (기존 방식으로는 코드 저장 -> 서버 종료 -> 서버 실행 했어야 함)

//      node 가 아닌 nodemon 으로 파일 실행해야 함


// Nodemon 설치

//      1. 프로젝트 폴더 통합 터미널에서 열기
//      2. yarn add nodemon
//      3. 설치 확인
//          1) package.json 파일 열기
//          2) "dependencies" 에 "nodemon": "^3.0.2" 코드 포함되었는지 확인


// Nodemon 적용

//      nodemon (파일 이름).js로 실행 안되는 이유
//          node와 다르게 nodemon은 내 컴퓨터 전체에 설치되지 않았음
//          -> 터미널에서 nodemon 명령어 인식 불가

//      해결 방법:
//          yarn 이나 npm은 node_modules를 기반으로 동작
//          -> yarn은 nodemon을 알고 있음
//          => node_modules에 있는 nodemon을 통해 파일을 실행시키는 명령어를 만들어줘야 함

//      package.json 파일의 "scripts"
//          scripts로 사용자 정의 명령어 만들 수 있음
//          package.json은 npm 이나 yarn 을 통해 작동
//          명령어 정의:
//              "scripts": {
//                  "(사용자 정의 명령어)": "(수행할 명령어 코드)"
//              },
//          명령어 호출:
//              yarn (사용자 정의 명령어) 형식으로 명령어 입력

//      nodemon 명령어 정의
//          보통 start:dev 라는 명령어로 정의(개발자 모드로 시작한다는 의미)

//          package.json 파일에 다음 명령어 추가
//              "scripts": {
//                  "start:dev": "nodemon index.js"
//              },

//      nodemon 명령어 호출
//          터미널에서 정의한 명령어 앞에 yarn 붙여서 입력
//          ex) yarn start:dev

// Nodemon 실행 상태

//      파일이 실행된 경우
//          [nodemon] starting `node index.js`

//      파일 저장시 재실행되는 경우
//          [nodemon] restarting due to changes...
//          [nodemon] starting `node index.js`