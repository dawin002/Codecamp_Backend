// 브라우저 저장소와 쿠키

// JWT 토큰

//      JSON Web Token

//          공식 문서: jwt.io
//          세션 데이터를 암호화해 브라우저에 저장할 수 있게한 것

//          Encoded
//              로그인 토큰을 암호화한 것
//              이렇게 암호화된 문자열이 JWT 토큰
//              닷(.)을 기준으로 3 부분으로 나누어짐 

//          Decoded
//              JWT 토큰을 복호화한 것
//              복호화된 객체 코드가 인가 과정에서 작동

//              헤더: 타입과 암호화 알고리즘
//              페이로드: 실제 데이터가 들어가는 부분
//              시그니처: 서명(비밀번호)

//      액세스 토큰 AccessToken

//          로그인 접근 용도의 JWT 토큰
//          email과 password를 요청으로 보내면 accessToken 반환


//      JWT 토큰의 올바른 사용

//          JWT 토큰은 왜 복호화가 되지?

//              아무나 로그인하지 못하게 암호화 해서 JWT 토큰으로 만들어뒀는데 
//              JWT 사이트에서 복호화가 되면 암호화하는게 의미가 있나?

//              JWT 토큰은 누구나 복호화는 할 수 있음
//              하지만 수정할 수는 없음 (비밀번호 필요함)

//          => JWT 토큰에 중요한 데이터는 저장하면 안됨
//          => 백엔드에서는 JWT 토큰이 조작되었는지 비밀번호로 확인해야함


//      JWT 토큰이 저장되는 곳

//          JWT 토큰은 브라우저의 저장 공간에 저장됨

//          Local Storage

//              키 밸류 객체 형태로 저장
//              브라우저 console 에서 js 코드로 접근 가능
//              브라우저를 껐다 켜도 데이터가 유지됨
`               localStorage.setItem('qqq', '짱구');
                localStorage.qqq  // => '짱구'
`
//          Session Storage

//              키 밸류 객체 형태로 저장
//              브라우저 console 에서 js 코드로 접근 가능
//            * 브라우저를 껐다 키면 데이터가 삭제됨
`               sessionStorage.setItem('aaa', '맹구');
                sessionStorage.qqq  // => '맹구'
`
//          Cookies

//              키, 밸류 객체 형태로 저장
//              브라우저 console 에서 js 코드로 접근 가능
//              브라우저를 껐다 켜도 데이터가 유지됨
//            * 도메인, 만료기간, 보안, ... 데이터가 함께 브라우저에
//               저장되어 있다가 백엔드에 API를 요청할 때 같이 전달됨
`               쿠키의 데이터 접근 코드는 좀 어려움
`

// JWT 토큰 연습

//          코드캠프에서 제공하는 playground에서 실습 가능
//          backend-practice.codebootcamp.co.kr/graphql

//          loginUser API
//              email 과 password 를 전달하면 accessToken 을 반환

//      1. 회원가입 API

//          로그인에 필요한 회원 정보 등록하기

//          1) createUser() 요청
`               mutation {
                  createUser(createUserInput: {
                    email: "a@test.com",
                    password: "1234",
                    name: "다윈"
                  }) {
                    _id
                  }
                }
`
//          2) createUser() 응답
`               {
                  "data": {
                    "createUser": {
                      "_id": "66347ba15d6eaa0029f7efeb"
                    }
                  }
                }
`
//      2. 로그인 API (인증)

//          1) loginUser() 요청
`               mutation{
                  loginUser(email: "a@test.com", password: "1234"){
                    accessToken
                  }
                }
`
//          2) loginUser() 응답
`               {
                  "data": {
                    "loginUser": {
                      "accessToken": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM0N2JhMTVkNmVhYTAwMjlmN2VmZWIiLCJwZXJtaXNzaW9uIjowLCJpYXQiOjE3MTQ3MTU3NzksImV4cCI6MTcxNDcxOTM3OSwic3ViIjoiYWNjZXNzVG9rZW4ifQ.XEHntmxlxEy0c1a3paEeiJD9ZbQPqouCFYHUl3BrHnkFwBYD4c1ayN-faWFIsgoS1E9HsVkKp51VuAlfOPbVJg"
                    }
                  }
                }
`//             accessToken 필드로 반환된 것이 로그인용 JWT 토큰

//      3. JWT 복호화 해보기

//          1) JWT 공식 사이트 접속

//          2) Encoded 입력창에 액세스 토큰 입력

//          3) Decoded 출력창에 복호회된 액세스 토큰이 출력됨
`               HEADER
                {
                  "alg": "ES256",       // 알고리즘
                  "typ": "JWT"          // 타입
                }
`
`               PAYLOAD
                {
                  "_id": "66347ba15d6eaa0029f7efeb",    // 유저 아이디
                  "permission": 0,          // 유저 타입
                  "iat": 1714715779,        // issued At: 발행 시간
                  "exp": 1714719379,        // expired At: 만료 시간
                  "sub": "accessToken"      // 주제
                }
`//             액세스 토큰의 만료시간이 지나면 다시 인증을 받아야 함

`               VERIFY SIGNATURE
                ECDSASHA256(
                  base64UrlEncode(header) + "." +
                  base64UrlEncode(payload),
                  ~~~,
                  ~~~,
                )
`//             시그니처(비밀번호)는 제대로 보여주지 않음
//              시그니처를 알면 마음대로 JWT 토큰을 조작할 수 있기 때문


//      4. 브라우저에 저장된 JWT 토큰 확인

//          1) 브라우저의 개발자 도구 진입
//          2) 위쪽 탭의 Application(애플리케이션) 진입
//          3) 왼쪽 탭의 Local Storage, Session Storage, Cookies 확인


//      5. 회원정보 조회 API (인가)

//          로그인이 필요한 API 요청을 보낼 때는 액세스 토큰을 함께 보내줘야함

//        * fetchUserLoggedIn API에 인자가 없음
//          => 인가에 필요한 액세스 토큰은 API 요청 바디가 아니라 헤더에 넣어줘야함

//          1) fetchUserLoggedIn() 요청
`               요청 바디
                query {
                  fetchUserLoggedIn {
                    _id
                    email
                    name
                  }
                }
`
`               요청 헤더
                {
                  "Authorization": "Bearer 액세스 토큰 문자열"
                }
`//             Authorization: 인가 필드
//              Bearer: 관례상 액세스 토큰 앞에 붙이는 문자열

//              * 백엔드에서 Authorization 필드의 값을 가져와 'Bearer' 문자열을 지우고
//                액세스 토큰만 남긴 후 시그니처가 맞는지 검사

//          2) fetchUserLoggedIn() 응답
`               {
                  "data": {
                    "fetchUserLoggedIn": {
                      "_id": "66347ba15d6eaa0029f7efeb",
                      "email": "a@test.com",
                      "name": "다윈"
                    }
                  }
                }
`//             인가 처리가 성공해 회원 정보가 반환됨

//          3) 실제 HTTP 요청 헤더 확인

//              개발자도구의 네트워크 탭에서 실제 fetchUserLoggedIn 요청의 헤더 확인

//              개발자도구의 네트워크 탭 들어간 상태로 fetchUserLoggedIn 요청 보내면
//              fetchUserLoggedIn API 가 네트워크 탭에 뜨는데 해당 요청의 헤더를 보면
//              Authorization 필드에 액세스 토큰 문자열이 들어가있음
