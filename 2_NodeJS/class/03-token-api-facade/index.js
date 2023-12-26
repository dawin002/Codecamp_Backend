// Facade Pattern을 적용한 Token API 함수 리팩토링

const createTokenOfPhone = function(phoneNumber) {
    // 1. 휴대폰 번호의 자릿수가 맞는지 확인 (10~11자리)
    if (!isValidPhoneNumber(phoneNumber)) return;

    // 2. 휴대폰 토큰 6자리 만들기
    const token = createToken();

    // 3. 휴대폰 번호에 토큰 전송하기
    sendTokenToSMS(phoneNumber, token);
};

const isValidPhoneNumber = function(phoneNumber) {
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        console.log("ERROR: 휴대폰 번호를 제대로 입력하세요.");
        return false;
    }
    return true;
}

const createToken = function() {
    const token = String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
    return token;
}

const sendTokenToSMS = function(phoneNumber, token) {
    console.log(phoneNumber + "번호로 인증번호 " + token + "를 전송합니다.");
}

createTokenOfPhone("01055168448");