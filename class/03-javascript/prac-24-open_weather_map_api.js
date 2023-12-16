// Open Weather Map API

//      날씨 정보 제공 API

// 홈페이지에서 api key 받아오기
let key = "3b27ee52a6e2c2453328d0db9f28269c";

// 현재 위도, 현재 경도 준비하기
let lat = 37.567234;
let lon = 128.346346;

// API call url
let API_call_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_key}`;

// fetch 함수에 url 넣어서 요청, 결과값 받기
const response = fetch(API_call_url);