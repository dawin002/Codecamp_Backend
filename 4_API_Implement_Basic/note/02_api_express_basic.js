// Express 문서

//      1. npmjs.com 에 접속
//      2. express 검색
//      3. express 항목 클릭

// Express 설치

//      1. package.json 파일 생성
//          package.json : 패키지의 기능을 관리하는 파일
//          1) 프로젝트 폴더 통합 터미널에서 열기
//          2) yarn init 명령어 실행
//          3) 엔터엔터엔터엔터엔터

//      2. import 명령어 인식시키기
//          1) package.json 파일 열기
//          2) 중괄호 안에 "type": "module" 코드 추가

//      3. express 설치하기
//          1) 터미널에 yarn add express 명령어 실행
//             원래는 npm install express 이지만 npm 느려서 yarn 사용
//             npm으로 설치할 수 있는 파일은 yarn으로 설치 가능
//          2) package.json 파일에 다음 코드 추가되었는지 확인
//             "dependencies": {
//                 "express": "^4.18.2"
//             }
//             dependencies
//                 : 설치했던 목록(히스토리 파일)
//                   지금 설치가 안되어있을 수도 있음
//                   버전 때문에 기록하는 것


// Express 적용

//      1. 다음 명령어 복사해 프로젝트에 붙여넣기
```
        // const express = require('express') // 예전 방식 : common js
        import express from 'express'         // 최신 방식 : module
        const app = express()

        app.get('/', function (req, res) {
        res.send('Hello World')
        })

        app.listen(3000)
```

// Express로 API 서버 만들기

//      express 적용
import express from 'express'
const app = express()

//      api 생성
app.get('/', function (req, res) {
    res.send('Hello World')
})
//      .get(...)
//          : get 메서드의 api를 만든다
//      '/'
//          : endpoint 이름 지정
//            ('/posts', '/users' 등으로 지정하면 됨)
//            /users endpoint로 요청했을 때 실행될 api
//      function (...) {...}
//          : 미들웨어 함수
//            요청이 왔을 때 실제 실행되는 함수
//      req 
//          : request
//            req 매개변수로 전달된 요청 데이터를 처리하면 됨
//      res
//          : response
//            res 응답을 만들어 보내면 됨

//      요청 대기
app.listen(3000)
//      .listen()
//          : api 요청이 들어오는 것을 기다림
//      3000
//          : 포트 번호


// NodeJS로 API 서버 실행하기

//      1. 실행
//          1) 저장된 폴더의 통합 터미널에서 열기
//          2) node ./(파일 이름).js 명령어 입력

//      2. API 요청 대기 상태
//             파일 실행시 터미널이 멈춤
//             api 요청이 들어올 때까지 기다리는 것
//             listen() 함수가 제대로 동작하고 있는 것

//      3. 종료
//          1) 터미널에 control + C 입력


//      * 주의할 점
//          api 구현 파일의 코드를 수정 후 저장해도 현재 api가 실행중이라면 적용 안됨
//          => api 파일 저장 후 터미널에서 종료(^C) 재실행 해야 적용


// Postman으로 API 서버 테스트하기

//      1. API 서버 실행

//      2. Postman으로 API 요청 보내기
//          1) http://localhost:(포트번호)(endpoint 주소) 입력
//          2) 메서드 선택 (GET, POST, ...)
//          3) Send 버튼 클릭

//      3. Postman 하단에서 Response 확인