// HTTP 프로토콜

//      Hypertext Transfer Protocol
//      서버와 클라이언트가 통신하기 위해 정의된 규약


// HTTP 요청

//      사용자가 서버로 보내는 데이터
//      fetch() 함수로 요청 전송
//      Request message 전송
//          : start-line + Request Header + Request Body

//      Request message 예시
//          GET /data/2.5/weather? HTTP/1.1
//          Content-Type: application/json;
//          Access-Control-Allow-Origin: *
//          Access-Control-Allow-Credentials: true
//          (빈 줄)
//          (Request Body)

//      start-line
//          Request message의 첫 줄
//          사용한 HTTP Method, 요청 URI, HTTP의 버전 포함

//      Request Header
//          Request message의 둘째 줄 ~ 빈 줄 전
//          요청을 받는 서버의 이름, 요청하는 서버의 주소(HOST) 서버의 버전, 
//           전달하는 컨텐츠의 타입, 요청 날짜, 요청 컴퓨터의 정보(User-Agent), 
//           사용자 언어(Accept-Language)등 많은 정보 존재
//          header의 내용이 모두 종료되면 하나의 빈 줄로 body와 구분

//      Request Body
//          우리가 서버로 혹은 다른 사용자가 우리의 서버로 전달하고자 하는 컨텐츠
//          요청 메서드의 종류에 따라 Request body를 담을 수 있는지, 없는지가 결정


// HTTP 응답

//      서버가 사용자에게 보내는 데이터
//      Response message 받음
//          : status-line + Response Header + Response Body

//      Response message 예시
//          HTTP/1.1 200 OK
//          Content-Type: application/json;
//          Access-Control-Allow-Origin: *
//          Access-Control-Allow-Credentials: true
//          (빈 줄)
//          (Response Body)

//      status-line
//          Response message의 첫 줄
//          HTTP 버전, 상태 코드(Status code), 응답 메세지
//          - Status code: 보낸 요청이 제대로 동작했는지/에러 났는지 등 여부

//      Response Header
//          Response message의 둘째 줄 ~ 빈 줄 전
//          응답 날짜, 응답을 전달한 서버의 이름, 서버의 버전, 컨텐츠의 타입 등 존재
//          - Content-Type: 돌려받는 응답의 타입(데이터 타입 종류)
//          - Access-Control-Allow-Origin: 현재 서버에 접근할 수 있는 타 사이트의 정보 (*: 와일드 카드, 모든 사이트의 접근 허용)
//          - Access-Control-Allow-Credentials: 쿠키 (true: 허용)
//          header의 내용이 모두 종료되면 하나의 빈 줄로 body와 구분

//      Response Body 포함 데이터
//          - 응답 리소스 데이터가 담겨서 들어옴
//          - (Content-Type 에 적힌 데이터 타입으로 반환됨)

// API Method
//      - GET 
//          서버의 데이터를 조회하는 Method
//          데이터를 서버로 전달할 필요가 없으므로 요청 바디 없음
//      - POST
//          서버에 데이터를 등록하는 Method
//          데이터를 등록해야 하기 때문에 요청 바디가 필요함
//      - PUT
//          서버 내 데이터를 수정하는 Method
//          요청 바디가 필요함
//      - PATCH
//          데이터를 일부 수정하는 Method
//      - DELETE
//          서버의 데이터를 삭제하는 Method
//      - OPTIONS
//          서버가 허용하는 Method를 확인하기 위한 Method
//          서버의 응답으로 위 Method 중 사용 가능한 것들이 반환됨

// 상태 코드 ( Status code )

//      요청에 대한 응답의 결과
//      세자리의 번호로 나타냄

//      1XX : 요청을 정상적으로 받은 것을 응답, 계속해서 작업중임
//      2XX : 클라이언트의 요청을 수신, 승낙하였고, 정상적으로 요청이 수행될 것임
//      3XX : Redirection과 관련한 동작이 수행 되었음
//      4XX : 클라이언트가 보낸 요청이 잘못 되었음
//      5XX : 서버에서 요청을 받아 로직을 수행하는 과정에서 문제가 발생

//      상태 코드 목록 : https://developer.mozilla.org/ko/docs/Web/HTTP/Status