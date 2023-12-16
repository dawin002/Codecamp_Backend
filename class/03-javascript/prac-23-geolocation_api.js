// Geolocation

//      현재 위치 정보 api
//      Geolocation API 사용하기 MDN Web Docs 문서 참고
//      https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API

// 위치 접근에 성공했을 때 실행되는 함수
const accessToGeo = function(position) {
    // 매개변수 position 에 현재 위치 정보가 담김

    // 위치 정보를 담는 객체
    const positionOBJ = {
        latitude: position.coords.latitude,     // 위도
        longitude: position.coords.longitude,   // 경도
    }

    // 위도와 경도 
    return positionOBJ;
}

// 위치 접근에 실패했을 때 실행되는 함수
const error1 = function(err) {
    console.log(err);
}

const askForLocation = function() {
    // geolocation으로 현재 위치 정보 가져오기
    navigator.geolocation.getCurrentPosition(accessToGeo, error1);
}

// getCurrentPosition() 함수
//      현재 위치를 받아옴

//      매개변수
//      1. success(콜백함수 1)
//          position 데이터를 받아 처리함
//      2. error(콜백함수 2)
//          