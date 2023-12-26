// 토큰 생성 함수
const getToken = function() {
    const token = String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
    console.log(token);
};

getToken();

// Math.random() : 0~1 사이의 랜덤한 소수 생성
// Math.random() * 1_000_000 : 랜덤한 소수에 1백만을 곱해 소수점 위 6자리 수로 변환
// Math.floor() : 소수점 아래 숫자 버림
// String() : 숫자를 문자열로 변환
// String().padStart(6, "0") : 문자열의 길이가 6 미만이라면 6이 될 때까지 문자열 앞을 "0"으로 채움