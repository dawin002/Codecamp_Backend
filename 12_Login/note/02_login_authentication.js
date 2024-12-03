// Login API 인증 인가 구현

//          Auth API 구조 생성
//          UserService 의 함수 활용해 회원조회, 회원검사
//          bcyript 라이브러리로 비밀번호검사
//          JWT 모듈 설치 후 accessToken 생성해 반환

//      Module에 대하여

//          Module 클래스를 보면 imports에서 여러 모듈을 불러옴

//          AppModule 의 imports
`               imports: [
                  ~~~,
                  ConfigModule.forRoot(),

                  TypeOrmModule.forRoot({
                    ~~~,
                  }),
                ],
`
//          UsersModule 의 imports
`               imports: [
                  TypeOrmModule.forFeature([
                    ~~~,
                  ]),
                ],
`
//          여기서 import 되는 Module 뒤에 함수가 붙는 것들이 있음
//          이 함수들은 Module을 불러오며 해당 Module을 일부 변형하는 것

//          ~Module.forRoot()
//          : 모듈을 가져올 때 모듈의 설정을 변경
//            변경한 설정이 프로젝트의 모든 영역에 적용됨

//          ~Module.forFeature() 
//          : forRoot()로 변경한 설정의 세부 설정을 추가로 변경하는 것

//          ~Module.register()
//          : forRoot()와 거의 같은 역할. 모듈을 가져올 때 모듈의 설정을 변경
//            forRoot()와의 차이점은 변경한 설정이 현재 위치에만 적용됨


// Login API 실습

//          12-01-signup 프로젝트 복제해 진행


//      1. 인증 API 레이어드 아키텍쳐 구조 생성

//          auth API는 users API와 별개
//          새로운 폴더 구조 생성해야 함

//          1) auth 폴더 생성
//              src/apis/auth

//          2) 레이어드 아키텍쳐(모듈, 리졸버, 서비스) 파일 생성
`               auth.module.ts
                auth.resolver.ts
                auth.service.ts
`
//          3) AuthModule 클래스 선언
`               @Module({})
                export class AuthModule {}
`
//          4) AuthResolver 클래스 선언
`               @Resolver()
                export class AuthResolver {}
`
//          5) AuthService 클래스 선언
`               @Injectable()
                export class AuthService {}
`

//      2. 모듈, 리졸버, 서비스 클래스 의존성 주입

//          1) AppModule 에 AuthModule 의존성 주입
`               @Module({
                  imports: [
                    ~~~,
                    AuthModule,
                    ~~~,
                    }),
                  ],
                })
                export class AppModule {}
`
//          2) AuthModule 에 AuthResolver, AuthService 의존성 주입
`               @Module({
                  providers: [
                    AuthResolver, //
                    AuthService,
                  ],
                })
                export class AuthModule {}
`
//          3) AuthResolver 에 AuthService 의존성 주입
`               export class AuthResolver {
                  constructor(
                    private readonly authService: AuthService, //
                  ) {}
                }
`

//      3. 로그인 함수 선언

//          1) AuthResolver 에 login() API 함수 선언
`               @Mutation(() => String)
                login(
                  @Args('email') email: string, //
                  @Args('password') password: string,
                ) {
                  this.authService.login({ email, password });
                }
`

//          2) AuthService 에 login() 서비스 함수 선언
`               login({ email, password }: IAuthServiceLogin) {
                }
`
//          3) login() 서비스 함수의 인자 타입스크립트 인터페이스 선언
//              src/apis/auth/interfaces/auth-service.interface.ts 파일에 선언
`               export interface IAuthServiceLogin {
                  email: string;
                  password: string;
                }
`

//      4. (실제로 안함!) User 관련 클래스 의존성 주입하기 

//          DB에서 일치하는 회원이 있는지 조회하려면
//          UsersService 의 findOne() 함수를 사용해야 하는데
//          UsersService 의존성을 주입하고 User DB를 사용 설정해야함

//          1) AuthModule 에서 UsersService 주입받기 
`               실제로 안함!!
                @Module({
                  providers: [
                    ~~~,
                    UsersService,
                  ],
                })
                export class AuthModule {}
`
//          2) AuthModule 에서 User DB 접근 설정하기 (실제로 안함)
`               실제로 안함!!
                @Module({
                  imports: [
                    TypeOrmModule.forFeature([
                      User, //
                    ]),
                  ],
                  providers: [
                    ~~~,
                  ],
                })
                export class AuthModule {}
`//             imports 에 TypeOrmModule 과 User 의존성을 주입해야
//              주입된 UsersService의 함수가 UsersRepository를 사용할 수 있음


//      4. User 관련 의존성 한번에 주입하기

//          AuthModule에 UsersModule을 통째로 의존성으로 주입하면
//          UsersService의 함수, UsersRepository 사용 함수 등을 모두 사용할 수 있음

//          1) UsersModule 내보내기 설정
`               @Module({
                  imports: [ ~~~ ],
                  providers: [ ~~~ ],
                  exports: [
                    UsersService,
                  ],
                })
                export class UsersModule {}
`//             exports 에 내보낼 아키텍쳐를 작성, 
//              UsersService가 UsersModule에 담겨서 내보내짐
//              User DB (UsersRepository)는 UsersModule 자체에 담겨 있음

//          2) AuthModule 에서 UsersModule 주입받기
`               @Module({
                  imports: [
                    UsersModule, //
                  ],
                  providers: [ ~~~ ],
                })
                export class AuthModule {}
`//             UsersModule을 통째로 주입받으면 UsersService 의존성 주입과
//              TypeOrmModule의 User 테이블 사용 설정 등을 하지 않아도 됨

//          3) AuthService 에서 UsersService 주입받기
`               export class AuthService {
                  constructor(
                    private readonly usersService: UsersService, //
                  ) {}
                }
`

//      5. 회원 조회하기

//          1) findOneByEmail() 함수로 회원 조회하기
`               async login({ email, password }: IAuthServiceLogin) {
                  const user = await this.usersService.findOneByEmail({ email });
                }
`//             DB의 회원객체를 가져와 바로 사용하므로 비동기 처리

//          2) 이메일이 존재하지 않으면 예외 발생 (검증)
`               async login({ email, password }: IAuthServiceLogin) {
                  const user = ~~~.usersService.findOneByEmail(~~~);

                  if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
                }
`//             회원 객체가 비어있다면 UnprocessableEntityException 예외 발생시킴


//      6. 비밀번호 검사하기

//          Bcrypt로 해쉬된 비밀번호와의 일치 여부를 확인하려면
//          Bcrypt 라이브러리의 compare() 함수를 사용

//          1) bcrypt 라이브러리 임포트
`               import * as bcrypt from 'bcrypt';
`
//          2) bcrypt로 비밀번호 비교하기
`               async login({ email, password }: IAuthServiceLogin) {
                  const user = ~~~.usersService.findOneByEmail(~~~);
                  ~~~

                  const isAuth = await bcrypt.compare(password, user.password);
                }
`//             bcrypt.compare(): 1번 파라미터를 해쉬하면 2번 파라미터와 같아지는지 비교
//              password: API 함수에서 전달한 입력 비밀번호
//              user.password: DB에 저장되어있는 해쉬된 비밀번호

//          3) 비밀번호가 일치하지 않으면 예외 발생 (검증)
`               async login({ email, password }: IAuthServiceLogin) {
                  ~~~
                  const isAuth = ~~~.bcrypt.compare(~~~);

                  if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
                }
`

//      7. accessToken (JWT 토큰) 만들어 브라우저로 응답

//          1) JWT 라이브러리 설치
`               yarn add @nestjs/jwt passport-jwt
`//             @nestjs/jwt : 인증 관련 JWT 라이브러리
//              passport-jwt : 인가 관련 JWT 라이브러리

//          2) TypeScript용 JWT 인가 라이브러리를 Dev-Dependency에 추가
`               yarn add --dev @types/passport-jwt
`
//          3) AuthModule에서 JWT 모듈 임포트
`               @Module({
                  imports: [
                    JwtModule.register({}),
                    ~~~,
                  ],
                  providers: [ ~~~ ],
                })
                export class AuthModule {}
`//             JwtModule 안에 JWT 관련 기능 내장
//              JwtModule.register()의 인자는 설정을 넣는 부분, 비워둬도 됨

//          4) AuthService에서 JwtService 의존성 주입
`               export class AuthService {
                  constructor(
                    private readonly jwtService: JwtService,
                    ~~~,
                  ) {}
                  ~~~
                }
`//             생성자에서 JwtService 의존성 주입

//          5) AuthService에 accessToken 생성 함수 선언
`               getAccessToken({ user }: IUsersServiceGetAccessToken): string {
                  return this.jwtService.sign(
                    { sub: user.id },                          // 1번 파라미터
                    { secret: '나의비밀번호', expiresIn: '1h' },  // 2번 파라미터
                  );
                }
`//             jwtService.sign(): 서명 함수, 토큰을 만듬
//              1번 파라미터로 데이터, 2번 파라미터로 비밀번호가 들어감
//              sub: 유저 아이디 필드, NestJS에서 sub 필드명을 권장
//              secret: 토큰 비밀번호(서명)
//              expiresIn: 만료 기간, '1h': 1시간, '30m': 30분, '60s': 60초
//              accessToken은 문자열로 나오기 때문에 반환값 타입스크립트에 string 명시

//          6) getAccessToken() 함수 타입스크립트 인터페이스 선언
`               export interface IUsersServiceGetAccessToken {
                  user: User;
                }
`
//          7) accessToken 생성 후 반환
//              AuthService.login() 서비스 함수
`               async login({ ~~~ }: ~~~): Promise<string> {
                  const user = ~~~.findOneByEmail(~~~);
                  ~~~
                  // 비밀번호 검사까지 통과

                  return this.getAccessToken({ user });
                }
`//             accessToken은 문자열을 반환하는데 비동기 처리이기 때문에
//              함수 반환값 타입스크립트 Promise<string> 명시
//              await는 getAccessToken() 함수 위쪽에서 사용됨

//          8) accessToken 브라우저로 응답
//              AuthModule.login() API 함수
`               @Mutation(() => String)
                login(
                  @Args(~~~) ~~~: ~~~,
                  ~~~,
                ): Promise<string> {
                  return this.authService.login( ~~~ );
                }
`//             accessToken을 비동기 처리로 반환하기 때문에 
//              함수 반환 타입스크립트 Promise<string> 명시


//      8. 로그인 API 요청 실습

//          1) login() API 요청
`               mutation {
                  login(email: "b@b.com", password: "1234")
                }
`
//          2) login() API 응답
`               {
                  "data": {
                    "login": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTg1NzM2ZC1mY2M1LTRjNGUtYWU2OC00MzQ4Y2NhZGUwMjIiLCJpYXQiOjE3MTQ4MTIwODYsImV4cCI6MTcxNDgxNTY4Nn0.Upcm0x1lIlYm0WBdELfr0ad3YhhkkGTICCJbJTSRZxA"
                  }
                }
`