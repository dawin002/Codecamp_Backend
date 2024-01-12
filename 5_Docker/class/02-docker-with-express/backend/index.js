import express from 'express';
import { checkPhoneNumber, createToken, sendTokenToSMS } from './phone.js';

// email.js에서 함수 가져오기
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {options} from './swagger/config.js';
import cors from 'cors';

const app = express();
const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cors());

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

    // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정


    // 3. DB에 저장한 결과를 브라우저에 응답(response) 주기
    res.send('게시물 등록에 성공했습니다.');
})

// 휴대폰 인증번호 전송 api
// 2_NodeJS / class / 08-welcome-template-api-import 의 API 구현하기
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
    res.send("인증 완료");
});



// 회원 등록 api
app.post("/users", function(req, res) {

    // 0. 요청 바디 데이터 받기
    // const name = req.body.name;
    // const age = req.body.age;
    // const school = req.body.school;
    // const email = req.body.email;

    // 위 4 줄을 구조분해할당 이용해 한 줄로 작성
    const { name, age, school, email } = req.body;

    // 1. 이메일이 정상인지 확인하기(빈칸 여부, '@'포함 여부)
    const isValid = checkEmail({ email });
    if (!isValid) return;

    // 2. 가입환영 템플릿 만들기
    const welcomeTemplate = getWelcomeTemplate({
        name,
        age,
        school,
    });

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail({ email, welcomeTemplate });

    // 4. api 응답 보내기
    res.send("가입이 완료되었습니다.");  // 이 res 는 내 app.post('users', ...) api에 대한 응답
})




// 3000번 포트로 대기하기 -> 4000번으로 수정
app.listen(4000)
