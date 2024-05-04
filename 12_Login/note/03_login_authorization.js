// 로그인 API - Authorization 인가

//      전략패턴

//          07_03_class_strategy(전략패턴).js 복습

//          객체가 할 수 있는 행위들 각각을 전략으로 만들어 놓고, 
//          전략의 변경을 통해 객체의 행위를 수정할 수 있는 디자인패턴

//          전략패턴은 상속과는 다르게 각 전략에 따라 행위를 다르게 만들어두고 
//          클래스의 객체를 생성할 때 전략을 선택해 전략에 해당하는 행위를 수행하게 함

//      passport 와 전략패턴의 관련성

//          passport 는 인가 라이브러리이다

//          passport 객체를 생성할 때 JWT를 인자로 넣어주면 JWT 전략에 맞게 인가해주고
//          구글 로그인을 인자로 넣어주면 구글 로그인 전략에 맞게 인가해줌

//          => 전략 패턴이 적용된 라이브러리


// 로그인 인가 API 구현

//          12-02-login-authentication 프로젝트 복제 후 진행

//      1. 인가가 필요한 API 정하기

//          로그인 인가가 필요한 API와 아닌 API를 구분해야 함

//          1) fetchUser() API
//              로그인한 사용자가 자신의 프로필 정보를 가져오는 API
//              => 인가가 필요함

//          2) fetchBoard() API
//              DB에 저장된 게시글을 조회
//              => 인가가 필요하지 않음

//      2. Passport 설치 및 적용

//          인가를 위해서는 JWT 라이브러리 말고도 Passport 라이브러리도 따로 설치해줘야함

//          1) Passport 라이브러리 설치
`               yarn add @nestjs/passport passport
`

//      3. 회원정보 조회 API 만들기

//          1) UsersResolver 에 fetchUser() API 선언
`               @Query(() => String) 
                fetchUser(): string {
                  return '인가에 성공했습니다.';
                }
`//             일단 DB에서 실제로 조회해 가져오는 건 생략
//              인가 과정 위주로 실습 진행
//              @Query 데코레이터는 반드시 @nestjs/graphql(두번째꺼)에서 import 해야함

//          2) AuthGuard 사용 설정 (데코레이터 추가)
`               @UseGuards(AuthGuard('access'))
                @Query(() => String) 
                fetchUser(): string {
                  return '인가에 성공했습니다.';
                }
`//             @UseGuards(AuthGuard())
//              : API 요청의 생명 주기에 가드를 통과하는 부분이 있음
//                가드를 통과하며 검증을 할 때 AuthGuard 를 사용하겠다는 의미
//                Passport 라이브러리 설치해야 AuthGuard 사용 가능

//              AuthGuard('access')
//              : 등록된 'access'라는 인가 방식을 전략으로 선택하는 것

//      4. 인가 처리 전략 수행

//          'access' 전략을 만들어 AuthGuard 가 이 전략에 따라 인가를 처리하게 구현
//          API 요청이 검증을 통과하면 fetchUser 기능이 수행되게 구현

//          1) JWT 인가 전략 파일 생성
`               auth/strategies 폴더 생성
                jwt-access.strategy.ts 파일 생성
`
//          2) JWT 인가 전략 클래스 선언
`               export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    
                }
`//             JWT 인가 전략을 처리하는 JwtAccessStrategy 클래스 선언
//              Passport 전략 클래스 PassportStrategy 를 상속
//              Strategy 인자를 넣어 jwt 기반의 전략을 처리하게 함

//              만약에 jwt가 아닌 다른 토큰으로 인가를 처리하려면
//              import { KakaoStrategy } from 'passport-kakao'; 로 임포트한 다음
//              상속받는 PassportStrategy 의 인자로 KakaoStrategy 를 넣어줌

//          3) JwtAccessStrategy 클래스 의존성 주입

//              상속받는 PassportStrategy 클래스는 어디에 의존성을 주입해도 전역으로 작동
//              AuthModule 클래스의 providers 에서 JwtAccessStrategy 의존성 주입해주기
`               @Module({
                  imports: [ ~~~ ],
                  providers: [
                    JwtAccessStrategy,
                    ~~~,
                  ],
                })
                export class AuthModule {}
`
//          4) 검증할 데이터를 부모 클래스로 전달

//              생성자에서 부모 클래스 PassportStrategy 의 생성자에게 
//               검증할 accessToken 과 비밀번호 전달

//              부모 생성자 인자
//              - jwtFromRequest : accessToken 필드
//              - secretOrKey    : 비밀번호 필드

//              super 의 파라미터 jwtFromRequest 에 accessToken 넣어줌
//              super 의 파라미터 secretOrKey 에는 '나의비밀번호' 넣어줌

//              방법1 (실제로 안함!!)
`               constructor() {
                  super({
                    jwtFromRequest: (req) => {  
                      const temp = req.headers.Authorization;
                      const accessToken = temp.toLowercase().replace('bearer ', '');
                      return accessToken;
                    },
                    secretOrKey: '나의비밀번호',
                  });
                }
`//             accessToken을 API 요청의 헤드의 Authorization 필드에서 뽑아
//               bearer 문자열을 제거하고 전달

//              방법2 (실제로 함)
`               constructor() {
                  super({
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    secretOrKey: '나의비밀번호',
                  });
                }
`//             'passport-jwt' 모듈이 제공하는 ExtractJwt 객체의 
//               fromAuthHeaderAsBearerToken() 함수 이용해 자동으로 accessToken 전달

//              fromAuthHeaderAsBearerToken() 함수 내용 확인하려면 
//               > node_modules/passport-jwt/lib.extract_jwt.js 파일 확인

//          5) 검증 통과시 유저 ID를 fetchUser API 함수로 전달

//              PassportStrategy 에서
//               1 - accessToken 이 비밀번호와 일치하는지 검증
//               2 - 만료시간이 지나지 않았는지 검증

//              검증을 통과하면 JwtAccessStrategy 클래스에 오버라이딩한 validate() 실행됨

`               validate(payload) {
                  console.log(payload);
                  return {
                    id: payload.sub, // req.user = { id: payload.sub }
                  };
                }
`//             payload 객체의 sub 필드에 유저ID가 전달됨

//              return 으로 id 필드를 채운 객체를 넘겨주면 
//               API 요청 req 객체에 user 필드가 생성되고 
//               user 필드는 return 한 { id: payload.sub } 객체로 초기화되고
//               검증이 끝나 fetchUser() API 함수로 되돌아감

//      5. fetchUser() 에서 인가된 유저ID 전달받아 처리

//          1) 인가된 유저ID 전달받기
//              AuthGuard 에서 validate 함수가 반환한 유저ID 받기
`               @UseGuards(AuthGuard('access'))
                @Query(~~~)
                fetchUser(
                  @Context() context: IContext, //
                ): ~~~ {
                  ~~~;
                }
`//             @Context() context: IContext
//              : @Args 가 아니라 @Context 데코레이터로 인자 받음
//                Context 에는 req, res, header 등을 받을 수 있음

//          2) IContext, IAuthUser 인터페이스 타입 선언

//              IContext 와 IAuthUser 타입은 어디서든 사용될 수 있음
//              src/commons/interfaces/context.ts 에 선언

//              fetchUser()의 인자 context 의 타입스크립트를 선언
`               export interface IContext {
                  req: Request & IAuthUser;
                  res: Response;
                }
`//             Request 와 Response 는 express 모듈에서 import 해야함 
//              - NestJS는 express 기반으로 동작하기 때문

//              Request & IAuthUser;
//              : Request 에 IAuthUser 타입의 필드가 존재한다는 것을 명시

//              context의 Request의 user 타입스크립트를 선언
`               export interface IAuthUser {
                  user?: {
                    id: string;
                  };
                }
`//             IAuthUser 타입은 nullable 인 user 필드를 가지고,
//              user 객체는 id 필드를 가짐

//          3) 유저 ID 출력
`               @UseGuards(AuthGuard('access'))
                @Query(~~~)
                fetchUser(
                  @Context() context: IContext,
                ): ~~~ {
                  console.log(context.req.user);

                  return ~~~;
                }
`//             Context 인자로 받은 유저ID는 context.req.user 에 저장됨
//              콘솔로 출력해서 확인해보기

//      6. GraphQL API로 받은 리퀘스트를 REST 방식으로 변환하기

//          AuthGuard 는 Rest API Request 기준으로 만들어져 있어서
//           GraphQL 로 받은 Request 를 그대로 전달하면 에러 발생

//          Request 를 REST 방식으로 변환해줘야함

//          AuthGuard 를 상속받은 GqlAuthAccessGuard 클래스 만들어
//           req 를 REST 방식의 req 로 바꿔치기

//          1) 가드 파일 생성
`               src/apis/auth/guards 폴더 생성
                gql-auth.guard.ts 파일 생성
`
//          2) 가드 클래스 선언
`               export class GqlAuthAccessGuard extends AuthGuard('access') {

                }
`//             AuthGuard('access') 클래스를 상속받음

//          3) getRequest() 함수 오버라이딩
`               getRequest(context: ExecutionContext) {
                  const gqlContext = GqlExecutionContext.create(context);
                  return gqlContext.getContext().req;
                }
`//             인자 ExecutionContext 
//              : 일반적으로 REST API 에서 받는 컨텍스트

//              GqlExecutionContext.create(context)
//              : context 를 Gql 용으로 변환

//              return gqlContext.getContext().req 
//              : gql 용으로 변환한 context 에서 req(요청)만 뽑아서 반환

//          4) fetchUser() 함수에서 AuthGuard 대신 GqlAuthAccessGuard 가드 사용
`               @UseGuards(GqlAuthAccessGuard)
                @Query(~~~)
                fetchUser(
                  @Context() ~~~: ~~~,
                ): ~~~ {
                  ~~~;
                  return ~~~;
                }
`

//      7. fetchUser() GraphQL API 요청 실습

//      7-1. HTTP HEADERS 없이 fetchUser() 요청

//          1) fetchUser() 요청
`               query {
                  fetchUser
                }
`
//          2) fetchUser() 응답
`               {
                  "errors": [
                    {
                      "message": "Unauthorized",
                      "locations": [ ~~~ ],
                      "path": [
                        "fetchUser"
                      ],
                      "extensions": {
                        "code": "UNAUTHENTICATED",
                        "stacktrace": ~~~
`
//              "code": "UNAUTHENTICATED",
//              : 인증조차 되지 않았음


//      7-1. accessToken과 함께 fetchUser()

//          로그인한 후 accessToken 문자열을 복사해 
//           HTTP HEADERS 에 넣고 fetchUser() 요청

//          1) fetchUser() 요청
`               query {
                  fetchUser
                }
`
//              HTTP HEADERS 내용
`               {
                  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTg1NzM2ZC1mY2M1LTRjNGUtYWU2OC00MzQ4Y2NhZGUwMjIiLCJpYXQiOjE3MTQ4MzQ2MzAsImV4cCI6MTcxNDgzODIzMH0.XGd3KOXtxqMg4-ll8kBMUjsl4rRn57MEqpNmIiufGKA"
                }
`//           * accessToken 앞에 Bearer 안붙이면 에러남;;;;
//              이거 때문에 두시간 날림;;

//          2) fetchUser() 응답
`               {
                  "data": {
                    "fetchUser": "인가에 성공했습니다."
                  }
                }
`

//          3) fetchUser() 터미널 출력
`               {
                  sub: 'd2cbe346-2290-4e35-b710-3202a0f44a22',
                  iat: 1714839486,
                  exp: 1714843086
                }
                ===============
                { id: 'd2cbe346-2290-4e35-b710-3202a0f44a22' }
                ===============
`