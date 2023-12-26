// 인증번호 발급 API 실습

//      파일 이름: index.js (index: 시작점을 의미, 보통 시작 파일 이름으로 많이 사용)


// 안좋은 예시
// const createTokenOfPhone = function(phoneNumber) {  // 매개변수(parameter)
//     // 1. 휴대폰 번호의 자릿수가 맞는지 확인 (10~11자리)
//     if (phoneNumber.length >= 10 && phoneNumber.length <= 11) {

//         // 2. 휴대폰 토큰 6자리 만들기
//         const token = String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");

//         // 3. 휴대폰 번호에 토큰 전송하기
//         console.log(phoneNumber + "번호로 인증번호 " + token + "를 전송합니다.");
//     } else {
//         console.log("ERROR: 휴대폰 번호를 제대로 입력하세요.");
//     }
// };


// 좋은 예시
const createTokenOfPhone = function(phoneNumber) {  // 매개변수(parameter)

    // 1. 휴대폰 번호의 자릿수가 맞는지 확인 (10~11자리)
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        // early-exit 패턴 : 에러 상황을 먼저 검사해 일찍 종료시키는 패턴
        console.log("ERROR: 휴대폰 번호를 제대로 입력하세요.");
        return;
    } 

    // 2. 휴대폰 토큰 6자리 만들기
    const token = String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");

    // 3. 휴대폰 번호에 토큰 전송하기
    console.log(phoneNumber + "번호로 인증번호 " + token + "를 전송합니다.");
};

createTokenOfPhone("01055168448");  // 인자(argument)