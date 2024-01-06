// Express로 API 서버 구현

// 게시판 api

import express from 'express';

const app = express();

//      JSON 적용시키기
app.use(express.json());
//          Express 자체는 JSON 타입을 읽지 못함
//          express 객체에 JSON 해석 기능을 적용시켜야 함

app.post('/boards', function (req, res) {
    const body = req.body; // 요청 데이터 조회
    
    const result = body; // 데이터 처리 작업
    
    res.send(result); // 작업 수행 결과 응답 보내기
});

//      '/boars'
//          endpoint
//          api 요청 주소의 endpoint 주소 설정

//      req 
//          request
//          브라우저가 보낸 요청이 들어옴
//          요청의 헤더와 바디가 모두 포함되어 있음
//          바디에 접근하기 위해서는 .body를 붙여야 함

//      res
//          : response
//            res 응답을 만들어 보내면 됨


// 게시판 목록 조회(GET) api

//      DB에 접속해 데이터를 가져오고
//      가져온 데이터 응답으로 전송

app.get('/boards', function (req, res) {
    // DB 접속 후 데이터 조회
    const result = [{}, {}, {}];    // 조회했다고 가정

    // 조회한 데이터 응답으로 전송
    res.send(result);
})


// 게시판 등록(POST) api

//      요청 데이터 읽고
//      데이터 DB에 저장
//      DB에 저장한 결과 응답

app.post('/boards', function (req, res) {
    // 요청 데이터 읽기
    
    // 데이터 DB에 저장하기

    // DB 저장 결과 응답 보내기
    res.send(result);
})

// Postman으로 API 서버 테스트하기

//      GET 요청
//          1) http://localhost:(포트번호)(endpoint 주소) 입력
//          2) GET 메서드 선택
//          3) Send 버튼 클릭
//          4) 아래쪽 응답 Body 데이터 확인

//      POST 요청
//          1) http://localhost:(포트번호)(endpoint 주소) 입력
//          2) POST 메서드 선택
//          3) 주소 입력창 아래의 Body 클릭 -> raw 선택 -> JSON 선택
//          4) JSON 형식으로 등록 요청할 게시글 데이터 입력
//          3) Send 버튼 클릭

//          POST Body JSON 데이터 예시
//          {
//              "writer": "철수",
//              "title": "철수 제목",
//              "contents": "안녕하세요, 철수입니다."
//          }