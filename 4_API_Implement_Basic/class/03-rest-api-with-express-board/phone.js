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

export const sendTokenToSMS = function(phoneNumber, token) {
    console.log(phoneNumber + "번호로 인증번호 " + token + "를 전송합니다.");
}
