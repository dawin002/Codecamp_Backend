// RefreshToken 생성 및 쿠키에 저장하기

//      JavaScript 접근 제한하기

//          accessToken 은 브라우저에 전달해주면 브라우저에서 알아서 저장할 수 있음
//          refreshToken 은 보안이 중요하기 때문에 JavaScript 접근을 제한해야함

//          refreshToken 의 httpOnly 옵션과 secure 옵션을 설정해서 넘겨줘야함
//          httpOnly 옵션 : JS 코드에서는 건드릴 수 없게 만드는 것
//          secure 옵션   : HTTPS 에서만 허용하는 것

//          httpOnly 옵션을 설정하면 애초에 refreshToken 을 API 응답에 담을 수 없음
//          => 백엔드에서 refreshToken 을 쿠키에 담고 쿠키 자체를 브라우저에 전달

//      구현 목록

//          1. 로그인 API에서 RefreshToken 생성

//          2. RefreshToken을 쿠키에 넣고 쿠키를 응답에 담아 전송

//      Cookie

//          백엔드와 브라우저가 데이터를 주고받는 용도로 사용되는 저장소

//          쿠키는 API 요청을 보낼 때마다 딸려 들어감
//          따로 설정하지 않아도 아무 API 요청에 포함되어 있음