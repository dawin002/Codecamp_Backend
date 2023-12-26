// Facade Pattern

//      퍼사드 : '건물의 정면'이라는 뜻

//      안에 여러가지 복잡한 로직이 있더라도, 
//       밖에서 보이는 정면에 있는 함수에서는 비교적 간단하게 흐름을 파악할 수 있게 하는 것

//      코드를 이해하기 쉽게 리팩토링하는 방법 중 하나

//      예시

// 토큰 API
const TokenAPI = function() {
    // 휴대폰 번호 검증하기
    validatePhoneNumber();

    // 토큰 생성하기
    createToken();

    // 토큰 전송하기
    transferToken();
}

const validatePhoneNumber = function() {
    return;
}

const createToken = function() {
    return;
}

const transferToken = function() {
    return;
}

TokenAPI();