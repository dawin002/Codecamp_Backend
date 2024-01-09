// Rest API 에서 SMS 전송하기

//          외부 사이트와 연결 해야함
//          대표적인 사이트 : coolsms (https://coolsms.co.kr)

// coolsms

//          문자 메시지 발송할 수 있는 서비스
//          sms 메시지 발송 Rest api 제공
//          유료 서비스인데 가입시 무료 포인트 지급

// coolsms 사용법

//      1. 모듈 설치
//          npmjs.com 의 coolsms-node-sdk 문서에서 설치 명령어 확인
//          : yarn add coolsms-node-sdk

//      2. 모듈 가져오기
            import coolsms from 'coolsms-node-sdk';

//      3. coolsms.default로 mysms 받기
            const mysms = coolsms.default;

//      4. apiKey, apiSecret 설정
            const messageService = new mysms('내_API_KEY', '내_API_SECRET');
//          api key : 환경변수 파일에 저장(.env)
//          api pw  : 환경변수 파일에 저장(.env)

//      5. 메시지 발송하기
//          sendMany() : 2건 이상의 메시지 발송 함수
//          sendOne()  : 단일 건 메시지 발송 함수

// 메시지 발송 예시
        messageService.sendMany([
            {
                to: '01000000001',
                from: '01012345678', // 인증된 내 번호로만 발송 가능
                text: '한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 발송됩니다.',
            },
            {
                to: '01000000002',
                from: '01012345678',
                text: '한글 45자, 영자 90자 이상 입력되면 자동으로 LMS타입의 문자메시지가 발송됩니다. 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            },
            // 1만건까지 추가 가능
        ])
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

// 실행 방법

//      1. 백엔드 서버 실행
//          node index.js 또는 yarn start:dev
//      2. 프론트엔드 파일 실행
//          signup.html 파일 Open with Live Server
//      3. 프론트엔드에서 인증번호 버튼 클릭시 api 요청 전송됨