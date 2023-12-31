// 게시판 Rest api 만들기

import express from 'express';
import { checkPhoneNumber, createToken, sendTokenToSMS } from './phone.js'; // export 가져오기
// import express from 'express';                                           // export default 가져오기
// import darwin from 'express';                                            // export default 이름 바꿔 가져오기


const app = express();
app.use(express.json());

// 게시판 조회(목록) api
app.get('/boards', function (req, res) {
    // 1. DB에 접속후, 데이터 조회 => 데이터를 조회했다고 가정
    const result = [
        { number: 1, writer: "짱구", title: "제목 1", contents: "1번 글의 내용입니다!!" },
        { number: 2, writer: "철수", title: "제목 2", contents: "2번 글의 내용입니다!!" },
        { number: 3, writer: "유리", title: "제목 3", contents: "3번 글의 내용입니다!!" }
    ];

    // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
    res.send(result);
})

// 게시판 등록 api
app.post('/boards', function (req, res) {
    // 1. 브라우저에서 보낸 데이터 확인하기
    console.log(req);
    console.log("============================")
    console.log(req.body);  
    // body가 안들어옴(undefined): express가 JSON 타입을 읽지 못해서

    // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정


    // 3. DB에 저장한 결과를 브라우저에 응답(response) 주기
    res.send('게시물 등록에 성공했습니다.');
})






// 2_NodeJS / class / 03-token-api-facade API 실습

app.post('/tokens/phone', function(req, res) {
    // 1. 휴대폰 번호 요청에서 읽어오기
    const phoneNumber = req.body.phoneNumber;

    // 2. 휴대폰 번호의 자릿수가 맞는지 확인 (10~11자리)
    const isValid = checkPhoneNumber(phoneNumber);
    if (!isValid) return;

    // 3. 휴대폰 토큰 6자리 만들기
    const token = createToken();

    // 4. 휴대폰 번호에 토큰 전송하기
    sendTokenToSMS(phoneNumber, token);

    // 5. 처리 결과 응답하기
    res.send("인증 번호 전송 완료!!!");
});




// 3000번 포트로 대기하기
app.listen(3000)
