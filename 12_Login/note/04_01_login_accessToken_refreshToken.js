// 로그인 만료시간 연장 - AccessToken, RefreshToken

//      AccessToken

//          로그인 API 요청을 보냈을 때 백엔드에서 DB의 ID와 PW를 확인하고
//          유저ID와 인증 정보를 accessToken에 담아 브라우저로 전송
//          브라우저에서 변수 / 로컬 스토리지 / 세션 스토리지 / 쿠키 에 accessToken을 저장
//          => 인증 Authentication

//          인증이 필요한 API 요청을 보낼 때 accessToken을 요청 헤더에 담아 전송
//          백엔드에서 accessToken을 확인해 요청한 데이터를 응답
//          => 인가 Authorization

//      로그인 세션의 저장 위치 변화

//          사용자가 많아지면서 액세스 세션을 저장하는 백엔드 메모리가 부족
//          => 백엔드 컴퓨터 사양을 높이는 scale-up

//          scale-up 을 통해 백엔드 사양을 무한정 높이는 것은 한계가 있음
//          => 백엔드 컴퓨터 대수를 늘리고 세션을 나누어 저장하는 scale-out

//          세션 상태를 가지는 stateful 방식으로 백엔드를 구현하니 특정 세션을
//           가지고 있지 않은 백엔드에서는 인가가 안되는 문제 발생
//          => 세션을 DB에 저장하고 백엔드는 상태를 가지지 않는 stateless 방식 scale-out 적용

//          DB에 모든 세션을 저장하니 DB에서 부하가 생기고 병목현상 발생
//          => DB를 나누는 수평 파티셔닝 (샤딩) 적용

//          세션을 확인하기 위해 DB에 접속해야하니 디스크 IO가 발생, 속도 느림
//          => 세션을 메모리 기반 데이터베이스 Redis 에 저장

//          세션을 확인하기 위해 Redis에 접속하는 것도 오버헤드
//          => 세션을 암호화해서 JWT 토큰 만들고 브라우저가 저장하게 함
//             인가 요청을 보낼 때마다 요청 헤더에 토큰을 담아서 전달

//          로그인을 위해 만들어지는 JWT 토큰 
//          => AccessToken

//      RefreshToken

//          로그인을 하지 않고도 로그인 만료 시간을 연장시키는 토큰

//          1. 인증 과정에서 JWT 토큰을 2개를 만듬 - accessToken, refreshToken
//          2. accessToken 은 만료시간을 짧게(1h), refreshToken 은 만료시간을 길게(2w) 만듬
//          3. accessToken 과 refreshToken 모두 브라우저에게 전달
//          4. accessToken 은 변수에 저장, refreshToken 은 쿠키에 저장 (보안 옵션 줌)
//          5. 인가가 필요한 API 요청 보냄 (accessToken 헤더에 전달)
//          6. accessToken 의 만료시간이 지나 복호화 안되면 Unauthenticated(토큰만료에러) 던짐
//          7. 브라우저에서 3가지 처리를 함
//              1) 토큰만료에러 캐치
//              2) accessToken 재발급
//              3) 실패 쿼리(api) 재시도
//          8. accessToken 재발급 처리도 백엔드에 토큰재발급 API 요청을 보내는데
//              요청과 함께 refreshToken 을 보냄
//          9. 토큰재발급 API 요청에서는 refreshToken 을 복호화해 인가를 시도하고
//              인가에 성공하면 새 accessToken 을 만들어 브라우저로 전송
//          10. 브라우저는 재발급된 accessToken 저장 후 실패했던 쿼리(API) 요청 재시도
//              요청의 헤더에 재발급받은 accessToken 을 전달

//          => Silent-auth
//              유저가 모르는 사이에 조용히 다시 인증하는 것

//      RefreshToken 사용 실습

//          1. 로그인 API에서 RefreshToken 만들어 브라우저에 반환

//          2. RefreshToken 을 보고 AccessToken 재발급 해주는
//              restoreAccessToken API 구현


// 프로젝트 아키텍쳐

//      AuthService 와 ResourceService 분리

//          AuthService
//              로그인, 로그아웃, 토큰재발급 등 로그인 관련된 API 서비스

//          ResourceService
//              회원생성, 회원조회, 게시글조회 등 자원을 가진 API 서비스

//      MSA (Micro Service Architecture)

//          서비스를 더 세분화하고 각각 독립적인 NestJS 프로젝트로 만드는 것
//          AuthService, UserService, BoardService 처럼 관련된 것들로 나눔

//      OAuth (Open Authentication)

//          == 소셜 로그인
//          각 IT 회사(구글, 카카오, ...)에서 AuthService 관련 기능을 제공해주는 것
//          구글 아이디로 로그인해서 구글 accessToken을 발급받아 사용