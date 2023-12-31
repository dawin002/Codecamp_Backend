// 서버와 포트

// 서버

//      누군가의 접속을 위해 포트 번호를 가지고 24시간 켜진 상태로 기다리는 프로그램이나 컴퓨터

//      1) 백엔드 서버 : express 등
//      2) 프론트엔드 서버 : react 등
//      3) 데이터베이스 서버 : mysql 등


// 클라이언트

//      서버에 접속해 데이터를 요청하는 쪽

//      1) 브라우저가 백엔드에 데이터를 요청하는 경우
//          클라이언트 : 브라우저
//          서버     : 백엔드

//      2) 백엔드가 데이터베이스에 데이터를 요청하는 경우
//          클라이언트 : 백엔드
//          서버     : 데이터베이스


// 포트

//      누군가의 접속을 기다리기 위해서 필요함
//      0 ~ 65535 번까지 존재
//      프로그램에서 지정한 기본 포트번호를 사용하기도 하고 임의로 지정해 사용하기도 함
//          DB 프로그램마다 기본 포트번호가 다름

//      하나의 컴퓨터에서 동일한 포트번호로 다른 서버를 중복 실행할 수 없음
//          백엔드 서버 : 포트번호 3000 사용 중
//          데이터베이스 서버 : 포트번호 3000 사용 불가능


//      기본 포트
//          네이버 등 웹사이트에 접속할 때 포트번호 사용하지 않음
//          기본 포트번호를 사용해서 그럼
//          디폴트 포트는 생략 가능
//          ex) HTTP  : 디폴트 포트가 80번
//              HTTPS : 디폴트 포트가 433번


// 클라이언트, 서버 관계

//      브라우저 컴퓨터
//          사용자가 서비스를 제공받는 컴퓨터
//          클라이언트

//      백엔드 컴퓨터
//          백엔드 서버 실행(24시간)
//          브라우저의 접속(API 요청)을 기다림
//          데이터를 브라우저에 제공

//      프론트엔드 컴퓨터
//          프론트엔드 서버 실행(24시간)
//          브라우저의 접속(주소창 입력)을 기다림
//          html, css, js 코드를 브라우저에 제공

//      데이터베이스 컴퓨터
//          데이터베이스 서버 실행(24시간)
//          백엔드 서버의 접속(데이터 요청 등)을 기다림


// 클라이언트, 서버 작동(서빙) 흐름

//      1. 브라우저로 주소 이동
//      2. 프론트엔드 컴퓨터에 접속해 html, css, js 코드를 받아옴
//      3. 브라우저가 프론트엔드 코드로 화면을 그림
//      4. 버튼 등 클릭시 백엔드 컴퓨터로 api 요청
//      5. 백엔드 컴퓨터에서 api 미들웨어 함수 실행
//      6. 데이터베이스 조작이 필요한 경우 데이터베이스 수정 등 수행
//      7. 백엔드 컴퓨터가 수행 결과를 브라우저로 api 응답