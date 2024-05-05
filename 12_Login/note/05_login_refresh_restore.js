// AccessToken 재발급 받기

//      질문: AccessToken은 왜 보안이 뛰어난 쿠키에 저장하지 않는가?

//          CORS와 연관이 있음

//          CORS는 다른 도메인 사이트에서 백엔드 서버로 보낸 API 요청을 막아주는 거였음 
//          (CORS가 걸려있을 땐 막고, 허용일 땐 막지 않음)

//          예를 들면 CORS 가 허용일 때는 구글에서 네이버 게시글을 검색할 수 있는 것

//          CORS 가 허용인 상태에서 AccessToken 을 쿠키에 저장하면
//          해킹 사이트에서 보낸 API 요청에 AccessToken 이 자동으로 빨려들어가서
//          인가 처리가 되어버릴 수 있기 때문에 AccessToken 는 쿠키에 저장하지 않음


// 로그인 연장 실습

//      1. accessToken 재발급 요청을 받아줄 restoreAccessToken API 구현

//          1) refreshToken 인가

//              가드에서 받아서 검증해야함
//              GqlAuthGuard 클래스 리팩토링

//              jwt strategy 에서 인가 처리
//              refreshToken 을 헤더에 있는 쿠키에서 꺼내와야함

//          2) accessToken 재발급

//              만들어놓은 getAccessToken 함수 재사용
//              user 인자 타입 주의

//      2. 로그인 연장 테스트

//          1) accessToken 만료기간 10초로 수정

//          2) 만료시킨 다음 만료된 accessToken으로 fetchUser() 해서 재발급되는지 테스트
