// 결제 서비스 구현

//      포인트 거래 방식

//          포인트를 결제한 뒤 포인트로 상품을 구매하는 방식


// 포인트 거래 방식 결제 서비스 구현 실습

//          프론트엔드와 백엔드 나눠서 진행

//          프론트엔드에서 결제 진행

//          백엔드에서 결제 정보 DB에 저장

// 실습 - 프론트엔드

//      결제하기 버튼
//          버튼 클릭시 결제창이 나오게 구현
//          포트원 결제 페이지 요청

//      포트원 연결
//          포트원 v1 독스 참고해서 만들 것
//          강의자료 옛날거라 포트원 라이브러리 다운 주소가 좀 다름

//      결제하기
//          만든 결제 버튼으로 실제 결제 진행
//          카카오페이 테스트결제 창 뜸
//          브라우저의 개발자모드 콘솔에 보면 결제 응답 반환됨

// 실습 - 백엔드

//      API 요청 보내기
//          payment.html 에서 결제 성공시 백엔드로 API 요청 전송
//          가드를 통과하기 위해서 accessToken 함께 보냄

//      API 구현
//          PointsTransactionsResolver 클래스에 createPointTransaction() 구현
//          결제 정보에 대한 데이터 인자로 받음
//          PointsTransactionsService 클래스의 create() 함수로 결제 정보 전달

//      서비스 함수 구현
//          PointsTransactionsService 클래스에 create() 서비스 함수 구현
//          pointsTransactionsRepository 사용해 결제 정보를 DB에 저장

//      포인트 결제 엔티티 정의
//          PointTransaction 엔티티 클래스 정의
//          DB에 PointTransaction 테이블 생성해 결제 정보를 저장할 수 있게 함
//          Insert Only 테이블로 구현
//              추가만 가능하고 수정은 불가능한 테이블
//              updatedAt 필드가 존재하면 안됨
//          상태 필드는 이넘 타입으로 정의

// 실습 - 프론트엔드 백엔드 연결

//      결제완료후 백엔드에 데이터 보내주기
//          axios로 GraphQL 요청 보내기
//          ??? : 사실 GraphQL은 효율적으로 개조한 REST API임
//                그래서 REST 방식인 axios 로도 GraphQL 요청을 보낼 수 있음
//          html에서 script로 브라우저에 axios 라이브러리 설치하기

//      CORS 에러 해결하기
//          테스트 결제 페이지에서 DB로 결제정보 저장 요청 보낼때 Cors 에러 발생시
//          main.ts 에서 아래 코드 추가해서 Cors 허용해주기
`           app.enableCors({
              origin: 'http://127.0.0.1:5500',
            });
`//         http://127.0.0.1:5500 에서만 콜스를 허용한다는 뜻
//          credentials: true 속성이 들어간 것인데 쿠키를 받아준다는 뜻인 것 같음