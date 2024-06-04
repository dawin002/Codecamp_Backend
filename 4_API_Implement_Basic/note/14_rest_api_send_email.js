// Rest API 에서 이메일 전송하기

//      라이브러리 사용해 NodeJS로 이메일을 전송할 수 있음

// Nodemailer (노드 메일러)

//          가장 유명한 Node.js 이메일 전송 라이브러리
//          nodemailer.com 공식 사이트 또는 npmjs.com에서 설치 가능
//          고급 기능이나 심화 적용 방법 등은 공식 사이트에서 확인할 것

// Nodemailer 사전 준비

//      Nodemailer에서 사용할 수 있는 내 구글 계정 비밀번호를 만드는 것

//      1. 구글 로그인

//      2. 2단계 인증 설정
//          1) '구글'에서 '구글 계정' 접속
//          2) '보안' 메뉴 클릭
//          3) '2단계 인증' 항목 클릭 
//          4) '시작하기' 버튼 클릭
//          5) '사용' 버튼 클릭

//      3. 앱 비밀번호 발급
//          1) '보안' 메뉴 클릭
//          2) 상단 검색창에 '앱 비밀번호' 검색해 항목 클릭
//          2) 앱 비밀번호를 식별하기 위한 앱과 기기 선택
//              내가 식별하기 쉬운 이름으로 지정하면 됨
//          3) 생성 버튼 클릭
//          4) 16글자의 '앱 비밀번호'가 발급됨

//      4. 환경 변수에 '앱 비밀번호' 추가하기

// Nodemailer 사용 방법

//      1. 모듈 다운로드
//          1) npmjs.com 에서 nodemailer 검색 후 문서 클릭
//          2) vscode 에서 설치 명령어 입력 : yarn add nodemailer

//      2. vscode에서 사용하기
//          1) nodemailer 공식 문서(https://nodemailer.com)에서 사용법 코드 확인하기

//          2) nodemailer 모듈 가져오기
                import nodemailer from "nodemailer";
                import { sendTemplateToEmail } from "../class/10-rest-api-with-email/backend/email";

//          3) transporter(전송자) 생성하기
                const transporter = nodemailer.createTransport({
                    host: "smtp.forwardemail.net",
                    port: 465,
                    secure: true,
                    auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM", // 구글 이메일 주소
                    pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",   // 구글 2차비밀번호
                    },
                });

//          4) 전송자를 사용해 메일 보내기
                const info = await transporter.sendMail({
                    from: '"Fred Foo 👻" <foo@example.com>', // 보내는 사람 주소
                    to: "bar@example.com, baz@example.com", // 받는 사람 리스트(배열 아님! 문자열)
                    subject: "Hello ✔", // 제목
                    text: "Hello world?", // plain text body (텍스트 내용)
                    html: "<b>Hello world?</b>", // html body (html 내용, css 사용 가능)
                    // 내용은 text 또는 html 로 보낼 수 있음
                });

// 기타 설정해야 하는 것

//      1. api 응답 확인하기(nodemailer api 응답)

//          전송 요청이 잘 되었는지 확인하기 위해 response를 지정해 출력해볼 것
//          response를 출력하기 위해 동기 작업으로 수행해야함(await, async)

//          이 res는 nodemailer의 sendMail api의 응답을 돌려받아 확인하는 것
//          
            const sendTemplateToEmail = async function () {
                const res = await transporter.sendMail({ /*...*/ });
                console.log(res);
            }

//      2. Google 아이디와 앱 비밀번호 환경변수로 설정하기

//          실제 아이디와 비밀번호를 사용해야하기 때문에 환경변수로 설정하고 github에 올리지 않기

//          1) 터미널에서 yarn add dotenv
//          2) .env 파일에 아이디 비밀번호 선언
//          3) js 파일에서 import 'dotenv.config';
//          4) process.env.GMAIL_ID 와 process.env.GMAIL_PW 로 환경변수에서 가져오기
//          5) gitginore 파일에 .env 추가

//      3. api 응답 돌려주기(내가 구현한 api 응답)

//          회원 가입 성공 여부 응답 돌려주기

//          이 res는 내가 구현한 app.post('/users', ...) api의 응답을 돌려주는 것
//          
            appendFile.post("/users", function(req, res) {
                /*...*/
                sendTemplateToEmail(/*...*/);
                res.send("가입이 완려되었습니다.");
            });

//      4. 이메일 템플릿에 css 적용하기

//          email.js 의 getWelcomeTemplate() 에서 welcomeTemplate 변수 수정하면 됨

//          예시)
//              <div style="width: 500px;">
//              <div style="color: red;">이름: ${name}</div>
//          
//          주의할 점
//              이메일 서비스에서 html, css 최신 문법을 지원하지 않을 수도 있음(Gmail)
//              따라서 이메일 템플릿은 가급적 구버전 html, css 문법을 사용할 것

// email 전송 테스트하기

//      html 만들어서 테스트 하면 됨
//      간단한 테스트를 위해 postman 이용

//      Postman api 요청하기
//          1) http 메서드 설정 : POST
//          2) api 주소 입력 : http://localhost:3000/users
//          3) body 데이터 입력
//              Body -> raw -> JSON
                {
                    "name": "짱구",
                    "age": 5,
                    "school": "떡잎유치원",
                    "email": "dawin002@naver.com"
                }
//          4) api 요청 전송하기 : Send 버튼 클릭

// email 전송 결과

//      api 응답 결과

//          {
//              accepted: [ 'dawin002@naver.com' ],
//              rejected: [],
//              ehlo: [
//              'SIZE 35882577',
//              '8BITMIME',
//              'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
//              'ENHANCEDSTATUSCODES',
//              'PIPELINING',
//              'CHUNKING',
//              'SMTPUTF8'
//              ],
//              envelopeTime: 678,
//              messageTime: 598,
//              messageSize: 851,
//              response: '250 2.0.0 OK  1704818028 ks5-20020a056a004b8500b006d9b2694b0csm1870208pfb.200 - gsmtp',
//              envelope: { from: 'daiwn002@gamil.com', to: [ 'dawin002@naver.com' ] },
//              messageId: '<5cfde64d-701b-3d29-a93c-d81569c0c120@gamil.com>'
//          }

//      이메일 수신 결과

//          제목 : [백엔드] 가입을 축하합니다!!!
//          보낸사람 : dawin002@gmail.com
//          받는사람 : dawin002@naver.com
//          2024년 1월 10일 (수) 오전 1:33
//          짱구님, 가입을 환영합니다!
//          이름: 짱구
//          나이: 5
//          학교: 떡잎유치원
//          가입일: 2024-0-10