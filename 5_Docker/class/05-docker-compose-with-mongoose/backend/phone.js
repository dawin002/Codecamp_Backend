// dotenv(환경변수) 모듈 가져오기
import 'dotenv/config';

// coolsms 모듈 가져오기
import coolsms from 'coolsms-node-sdk';

// coolsms default 객체 가져오기
const mysms = coolsms.default;

export const checkPhoneNumber = function(phoneNumber) {
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        console.log("ERROR: 휴대폰 번호를 제대로 입력하세요.");
        return false;
    }
    return true;
}

export const createToken = function() {
    const token = String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
    return token;
}

export const sendTokenToSMS = async function(phoneNumber, token) {
    // .env 파일에서 환경변수 가져오기
    const API_KEY = process.env.SMS_API_KEY;
    const API_SECRET = process.env.SMS_API_PW;
    const SMS_SENDER = process.env.SMS_SENDER;

    // api key, api secret 설정
    const messageService = new mysms(API_KEY, API_SECRET);

    // 한명에게 메시지 발송
    const res = await messageService.sendOne({
        to: phoneNumber,
        from: SMS_SENDER,
        text: `[인증번호 테스트] 요청하신 인증번호는 ${token} 입니다.`,
    });

    // 결과 출력해보기
    console.log(res);
    // {
    //     groupId: 'G4V20240109191902QJGTF6XQOLQWTW1',
    //     to: '01055168448',
    //     from: '01055168448',
    //     type: 'SMS',
    //     statusMessage: '정상 접수(이통사로 접수 예정) ',
    //     country: '82',
    //     messageId: 'M4V20240109191902RSH4MYBSB0Y7B1U',
    //     statusCode: '2000',
    //     accountId: '24010935101680'
    // }
}
