// 데이터 통신 실습

//      API 연습, API 설명서 사용해보기

//      Rest-API
//          포스트맨(API 연습) : 다운로드
//          스웨거(API 설명서) : 주소 접속

//      GraphQL-API
//          플레이그라운드(API 연습 & 설명서) : 주소 접속


// Rest-API 실습

// Swagger

//      API Docs 서비스 제공 웹사이트

//      전체 API 목록 확인 가능

//      각 API의 CRUD 메서드 정보 확인 가능

//      각 메서드의 다음 정보 확인 가능
//          요청 함수 이름,
//          요청 함수 파라미터,
//          응답 데이터 타입,
//          응답 형식 예시

//      API docs 예시
//          http://backend-example.codebootcamp.co.kr/api-docs/
//          https://koreanjson.com (스웨거 아님)

//      Endpoint

//          API 주소 이름
//          API의 이름이자 API를 사용하기 위한 주소

//          예시
//              /users              : 유저에 관련된 기능
//              /users/:id          : ":id" 부분의 값이 바뀔 수 있음
//              /posts              : 게시글에 관련된 기능
//              /posts?userId={id}  : "{id}" 부분의 값이 바뀔 수 있음


// Postman

//      API 연습 서비스 제공 프로그램

//      API 요청을 보내고 응답을 받는 것을 연습할 수 있음

//      https://koreanjson.com API 사용해보기

//          1. 메서드 선택
//              GET, POST, PUT, DELETE 등 메서드를 선택

//          2. API 주소 입력
//              API 주소는 API 제공 웹사이트 주소 + Endpoint 로 구성됨
//              입력창에 API 주소 입력
//              (예시: https://koreanjson.com/users)

//          3. Send 버튼 클릭
//              요청을 보내는 동작
//              아래에서 응답이 출력됨


// GraphQL-API 실습

// Playground

//      API docs + API 연습 서비스 제공

//      Playground 예시
//          http://backend-example.codebootcamp.co.kr/graphql

//      API 설명서
//          DOCS 버튼 클릭해 확인 가능
//          QUERIES, MUTATIONS 로 분류됨

//          API 이름 목록 확인 가능

//          API 이름 클릭시 매개변수 리스트, Return 타입

//          매개변수가 없을 때는 함수 이름 뒤 괄호 적으면 안됨
//          리턴타입이 객체가 아닐 때는 함수 이름 뒤 중괄호 적으면 안됨

//          API 이름 예시

//          fetchBoard(...): BoardReturn    
//              게시글 상세 조회 API
//              (...) 파라미터가 있고
//              BoardReturn 객체가 응답으로 반환됨

//          fetchBoards(...): [BoardReturn!]
//              게시글 목록 조회 API
//              BoardReturn 객체가 배열로 반환됨
//              ! 는 필수로 받아야 하는 반환 데이터라는 의미
//              [] 는 배열로 반환되는 데이터라는 의미

//          fetchBoardsCount: Int!
//              게시글 개수 조회 API
//              요청 함수의 매개변수가 없음 -> 함수 이름 뒤 괄호 적으면 안됨
//              리턴 타입이 객체가 아님 -> 함수 이름 뒤 중괄호 쓰면 안됨
//              Int 데이터가 응답으로 반환됨


//      API 연습
//          왼쪽 입력창에 API 요청 함수 작성
//          중앙의 재생 버튼 클릭해 실행
//          오른쪽 출력창에서 API 응답 확인
//          상단 탭 추가해 다른 API 함수 동시 실행 가능

//      API 요청 함수 작성법

//          1. query 또는 mutation 작성 후 중괄호 열기

//          2. 사용할 API 함수 이름 작성 후 괄호 안에 파라미터 작성
//              파라미터는 키 : 값 형식으로 작성하며 쉼표(,)로 파라미터 구분

//          3. 괄호 끝나면 중괄호 안에 응답으로 받을 리턴 데이터의 키 작성
//              입력한 키에 해당하는 리턴 데이터만 반환됨
//              키는 쉼표(,)로 구분하거나 줄바꿈으로 구분

//          예시

//          mutation {
//              createBoard(name: "다윈", title: "자기소개", content: "안녕하세요") {
//                  number, message, __typename
//              }
//          }