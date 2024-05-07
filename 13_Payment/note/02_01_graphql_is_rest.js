// GraphQL 의 실체

//      GraphQL은 사실 문제점을 개선한 REST API

//      REST API 문제점

//          1. 엔드포인트를 줄일 수 없을까?
//              하나의 API에 엔드포인트가 최소 5개씩 필요함

//          2. REST API 의 언더페칭 문제점
//              여러 개의 데이터를 한 화면에서 보여주고 싶으면
//              각각의 데이터 종류마다 API 요청을 따로따로 보내야 함

//          3. REST API 의 오버페칭 문제점
//              불필요한 데이터까지 강제로 전부 다 받아와야함
//              백엔드에서 반환 타입에 대한 데이터를 지정해놓기 때문

//      GraphQL 원리

//          1. 엔드포인트 단일화
//              POST/graphql 이라는 엔드포인트로 통합함
//              graphql 엔드포인트 뒤에 모든 API 함수를 맵핑
//              요청이 들어가면 맵핑된 전체 함수에서 요청된 함수를 골라서 실행시킴

//          2. REST의 언더페칭 문제 해결
//              API 요청 바디에 GraphQL query문을 작성
//              바디의 query 필드에 실행하고자 하는 함수 호출문을 문자열로 작성
//              mutation query 할 때의 query 아님. sql의 query와 비슷함
//              API 요청 한번에 여러 함수를 실행시켜 여러 데이터를 한번에 받아올 수 있음

//          3. REST의 오버페칭 문제 해결
//              GraphQL query문에 함수를 작성할 때 돌려받을 데이터를 지정
//              필요없는 데이터를 받지 않아도 되어 네트워크 비용을 줄임

//          => GraphQL 은 REST 의 POST 방식임
//          => GraphQL 의 엔드포인트는 graphql 로 통일

//          4. 요청이 실패해도 상태코드 200을 반환
//              query문으로 전송한 GraphQL 함수 중 어떤 것이 성공하고 
//              어떤 것이 실패했는지 알 수 없음
//              따라서 요청에서 타입에러가 발생한 것이 아니면 성공으로 처리 (단점)

//          5. 항상 POST 메서드 사용
//              fetchBoards API를 요청해도 POST 메서드를 사용해 요청 전송

//          => axios 나 postman 에서도 GraphQL API 요청 가능

//      GraphQL 단점

//          1. 아직까지 회사에서 REST API 를 사용하는 경우가 많음

//          2. 오픈API는 대부부닝 REST API 임

//          3. GraphQL은 캐시(임시저장)이 어려움
//              캐시는 요청한 데이터를 엔드포인트 주소와 함께 백엔드 서버의 메모리에 놔뒀다가
//               동일한 엔드포인트 요청이 들어온 경우 DB까지 안가고 메모리에서 꺼내주는 것
//              GraphQL은 엔드포인트 주소가 /graphql 하나여서 동일한 요청인지 확인하기 어려움

//      GraphQL 요청을 REST 에서 보내기

//          엔드포인트 주소로 POST/graphql 작성

//          요청 바디에 GraphQL 쿼리문 작성
//          {
//              "query": `
//                query {
//                  fetchBoards {
//                    number, 
//                    writer, 
//                    title 
//                  } 
//                } 
//              `
//          }