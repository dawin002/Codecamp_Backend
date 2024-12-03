// 회원가입 API - 암호화(Hash)

//          로그인 인증, 인가를 위한 회원가입 API 구현

//          1. 기본적인 회원가입 기능을 구현

//          2. 이메일 중복 확인 (검증)

//          3. 비밀번호를 암호화해서 저장

// 비밀번호 암호화

//      비밀번호를 암호화하는 이유

//          DB 관리자가 유저의 비밀번호를 임의로 조회 가능
//          DB 가 해킹당했을 경우 비밀번호가 유출될 수 있음

//      비밀번호 암화화 방식

//          양방향 암호화
//              비밀번호를 암호화한 결과를 복호화할 수 있음
//              암호화된 결과에 특정 패턴이 있기 때문
//              알고리즘이 유출되거나 해독되면 해킹의 위험이 있음

//          단방향 암호화 (Hash)
//              비밀번호를 암호화한 결과를 복호화 할 수 없음
//              암호화된 결과로 만들어질 수 있는 원본 값이 여러 개 존재
//              복호화가 안되는 암호화 방식이라 안전함

//          Hash 와 SALT

//              암호와 많은 복호화된 값을 모아둔 테이블(== 레인보우 테이블)을
//              가지고 모든 경우를 때려넣는 방식으로 해킹함
//              => 브루트 포스 어택 Brute Force Attack

//              해쉬한 결과에 SALT(임의의 값)를 더해 다시 해쉬하는 과정을
//              많이 반복한 뒤 DB에 저장해 해킹을 방지
//              => 키스트레칭 (해쉬에 솔트 더하는 과정)

//              bcrypt 라이브러리를 사용해 비밀번호를 해싱할 수 있음


// 회원가입 API 구현 실습

//          11-08-typeorm-crud-many-to-many 프로젝트 복사해 실습 진행

//      1. users API 구조 생성

//          1) 모듈, 리졸버, 서비스 파일 생성
//              src/apis/users 폴더에 생성
`               users.module.ts
                users.resolver.ts
                users.service.ts
`
//          2) UsersModule 클래스 선언
`               @Module({})
                export class UsersModule {}
`
//          3) UsersResolver 클래스 선언
`               @Resolver()
                export class UsersResolver {}
`
//          4) UsersService 클래스 선언
`               @Injectable()
                export class UsersService {}
`
//      2. 모듈, 리졸버, 서비스 클래스 의존성 주입

//          1) AppModule 에 의존성 주입
`               @Module({
                  imports: [
                    ~~~,
                    UsersModule,
                    ~~~,
                    }),
                  ],
                })
                export class AppModule {}
`//             Module 데코레이터의 imports 에 
//               UsersModule 클래스 추가해 의존성 주입

//          2) UsersModule 에 의존성 주입
`               @Module({
                  providers: [
                    UsersResolver, //
                    UsersService,
                  ],
                })
                export class UsersModule {}
`//             Module 데코레이터의 providers 에서
//               UsersResolver 와 UsersService 클래스 추가해 의존성 주입

//          3) UsersResolver 에 의존성 주입
`               constructor(
                  private readonly usersService: UsersService, //
                ) {}
`//             생성자에서 UsersService 의존성을 주입

//      3. 회원가입 API 함수 생성

//          1) createUser API 함수 선언
//              UsersResolver 클래스에 선언
`               createUser(
                  @Args('email') email: string,
                  @Args('password') password: string,
                  @Args('name') name: string,
                  @Args({ name: 'age', type: () => Int }) age: number,
                ) {
                  this.usersService.create({ email, password, name, age });
                }
`//             @Args({ name: 'age', type: () => Int }) age: number,
//              : number 타입을 인자로 받을 때 별도의 설정이 없으면 GraphQL이 실수로 인식
//                GraphQL 인자 타입에서 정수라고 명시해줘야함

//      4. 회원가입 서비스 함수 선언

//          1) Users 서비스의 create 함수 선언
//              UsersService 클래스에 선언
`               create({ email, password, name, age }: IUsersServiceCreate) {

                }
`
//          2) create 함수 인자 타입스크립트 인터페이스 선언
//              src/apis/users/interfaces/users-create.interface.ts 파일에 선언
`               export interface IUsersServiceCreate {
                  email: string;
                  password: string;
                  name: string;
                  age: number;
                }
`
//      5. DB 연결
//          1) UsersModule 클래스에서 TypeORM, DB 사용 설정
`               @Module({
                  imports: [
                    TypeOrmModule.forFeature([
                      User, //
                    ]),
                  ],
                  providers: [
                    ~~~,
                  ],
                })
                export class UsersModule {}
`//             imports 에서 TypeOrmModule 의존성 주입, User 엔티티 사용 설정

//          2) UsersService 클래스에 User Repository 의존성 주입
`               constructor(
                  @InjectRepository(User)
                  private readonly usersRepository: Repository<User>,
                ) {}
`//             생성자에서 User에 대한 Repository 의존성 주입
//              @InjectRepository(User): User를 Inject 하는 Repository 데코레이터

//      6. DB에 회원정보 저장

//          1) 서비스 함수 create() 에서 DB에 회원정보 저장
`               create({ email, password, name, age }: IUsersServiceCreate) {
                  this.usersRepository.save({
                    email,
                    password,
                    name,
                    age,
                  });
                }
`//             객체를 만들 때 필드명과 넣을 값의 변수명이 같으면 변수명 생략 가능
//              => save() 인자로 넣을 객체의 필드명만 적어줌

//      7. 저장 결과 반환

//          1) 서비스 함수 create() 결과 반환
`               create({ ~~~ }: ~~~ ): Promise<User> {
                  return this.usersRepository.save({ ~~~ });
                }
`
//          2) API 함수 createUser() 응답 반환
`               @Mutation(() => User)
                createUser(
                  ~~~,
                ): Promise<User> {
                  return this.usersService.create({ ~~~ });
                }
`
//          ** GraphQL API 응답으로 User 객체를 반환하려면
//              User 엔티티 클래스에 GraphQL 타입 데코레이터가 적용되어 있어야함
`               @Entity()
                @ObjectType()           <== GraphQL 클래스 타입 데코레이터
                export class User {
                
                  @Column()
                  @Field(() => String)  <== GraphQL 필드 타입 데코레이터
                  name: string;
                }
`//             클래스: @ObjectType()
//              필드  : @Field(() => GraphQL타입)

//      8. 브라우저로 리턴할 User 타입 수정

//          현재 User 클래스에 password, age 필드가 없음

//          1) User 클래스에 age 필드 추가하기
`               @Entity()
                @ObjectType()
                export class User {
                  ~~~;
                
                  @Column()
                  @Field(() => Int)
                  age: number;
                }
`//             number 타입 age 필드 추가
//              GraphQL 데코레이터에는 Int 타입 명시

//          2) User 클래스에 password 필드 추가하기
`               @Entity()
                @ObjectType()
                export class User {
                  ~~~;
                
                  @Column()
                  // @Field(() => String) // XXX 이 줄은 뺄 것 
                  password: string;
                }
`//             string 타입 password 필드 추가
//              단, GraphQL 데코레이터는 붙이지 않음

//          ** password 필드에 GraphQL 데코레이터 안붙이는 이유

//              브라우저로 보내는 응답에 비밀번호를 포함시키면 안됨!
//              비밀번호는 암호화되어 DB에만 저장되어야 하기 때문!


// 회원가입 API 요청 실습

//      1. 회원가입 API 요청

//          1) createUser() API 요청
`               mutation{
                  createUser(email: "a@a.com", password: "1234", name: "철수", age: 12) {
                    id
                    email
                    name
                    age
                  }
                }
`
//          2) createUser() API 응답
`               {
                  "data": {
                    "createUser": {
                      "id": "7fdb9788-1bb3-48b2-b66f-938ca7fd7a56",
                      "email": "a@a.com",
                      "name": "철수",
                      "age": 12
                    }
                  }
                }
`
//          3) DBeaver 로 MySQL DB 확인
//              User 테이블에 id, name, email, password, age 모두 저장되어 있음


// 회원가입 추가적인 기능 구현

//          기본적인 회원가입 기능을 구현해둔 다음 이어서 진행

//          이메일 중복 확인과 비밀번호 암호화 기능 추가

//      1. 이메일 중복 검증

//          1) 이메일로 회원조회 함수 선언
`               findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
                  return this.usersRepository.findOne({ where: { email } });
                }
`
//          2) findOneByEmail()의 타입스크립트 인터페이스 선언
`               export interface IUsersServiceFindOneByEmail {
                  email: string;
                }
`
//          3) 이메일 중복 검사 후 예외 처리
`               async create({~~~}: ~~~): ~~~ {
                  const user = await this.findOneByEmail({ email });

                  if (user) throw new ConflictException('이미 등록된 이메일입니다.');
                
                  return this.usersRepository.save({~~~});
                }
`//             이메일로 회원조회 함수의 반환 값을 user 에 저장
//              이메일이 똑같은 회원이 있다면 user에 회원 객체가 담겨 예외 발생시킴
//              반환값이 DB에서 완전히 넘어와야 되기 때문에 findOneByEmail 함수 비동기 처리

//      2. 비밀번호 암호화 (Hash)

//          1) bcrypt 라이브러리 설치
`               yarn add bcrypt
`
//          2) 타입스크립트용 bcrypt 설치
`               yarn add --dev @types/bcrypt
`//             TypeScript이기 때문에 DevDependency에 넣기 위해 --dev 옵션 추가

//          이 아래는 UsersService 클래스

//          3) bcrypt 라이브러리 임포트
`               import * as bcrypt from 'bcrypt';
`
//          4) 비밀번호 해쉬
//              create 함수에서 DB에 저장하기 전 비밀번호를 해쉬
`               async create({~~~}: ~~~): ~~~ {
                  ~~~
                  const hashedPassword = await bcrypt.hash(password, 10);
              
                  return this.usersRepository.save({
                    ~~~,
                    password: hashedPassword,
                    ~~~,
                  });
                }
`//             bcrypt.hash() 함수로 password 를 해쉬 (키스트레칭 10회)
//              해쉬한 비밀번호를 password 필드에 저장

//          ** DB의 password 필드에 저장된 Bcrypt로 해쉬된 값

//              $2b$10$ho23o3y0923vnrn8Uve19C/37tjgfid891jigq9a1iur8478sakdjkjn13r
//              $2b : 알고리즘
//                 $10 : 계산비용 (2^10 회 키스트레칭 진행)
//                    $ho23o3y0923vnrn8Uve19C : 22자의 랜덤 SALT 값
//                                           /37tjgfid891jigq9a1iur84~~~ : HASH 값
//              => 2^10번 키스트레칭한 결과