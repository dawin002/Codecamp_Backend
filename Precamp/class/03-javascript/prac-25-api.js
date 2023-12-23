// API 란?
//      어떤 프로그램에서 제공하는 기능을 사용자가 활용할 수 있게 만들어 둔 인터페이스

// API 명세서
//      API doc
//      요청할 수 있는 API의 목록

// 요청
//      Request
//      사용자가 데이터 제공을 요청하는 것

// 응답
//      Response
//      사용자가 요청한 데이터를 제공하는 것

// API의 역할
//      사용자로부터 받은 요청을 서버에 전달해줌
//      서버로부터 받은 응답을 사용자에게 전달해줌



// JS에서 요청 보내기

// fetch() 함수를 이용한 방법
//      fetch 매개변수에 API call url 전달해 호출
//      필요한 값들(중괄호 내부) 채우기

// API call url에 필요한 값들
let lat = 37.567234;
let lon = 128.346346;
let API_key = '3b27ee52a6e2c2453328d0db9f28269c';

// API call url
let API_call_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_key}`;

// fetch 함수에 url 넣어서 요청, 결과값 받기
const response = fetch(API_call_url);