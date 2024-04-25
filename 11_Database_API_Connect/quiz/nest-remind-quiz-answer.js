// 퀴즈 답안지

//      1. ?
//      2. 4
//      3. 1
//      4. Hello World
//      5. 의존성 주입
//      6. 2, 5
//      7. 1, 4
//      8. prociders: [ ProductService, ],
//      9. 데코레이터
//      10. 2
//      11. 3
//      12. @Field(() => String, nullable: true)

// 정답 (틀린것만)

//      1. 4
//          스프레드 연산자

//      2. 정답, 잘모름
//          rest 파라미터

//      3. 2
//          객체의 key 중복 초기화 => 나중 값으로 덮어써짐

//      8. 정답, 잘모름
//          nestjs에서 의존성 주입은 @Module 의 providers 에 적어주면 됨

//      10. 1
//          데코레이터는 함수로 만들 수 있음
//          데코레이터는 함수임!

//      12. 완전 틀림
`           @ObjectType() => @InputType()
`// API 만들기 전 필수 지식 //         DTO는 @InputType 데코레이터를 붙여야 함

//      1) 스프레드 연산자

//          객체의 필드를 한 단어로 축약한 것
`           const profile = {
                name: qqq.name,
                age: qqq.age,
                school: qqq.shcool
            }
`//          => ...q //         위 객체의 필드를 스프레드 연산자로 표현할 수 있음

//      2) REST 파라미터

//          구조분해할당을 할 때 필요한 필드만 꺼내오고
//           나머지 필드는 rest 파라미터에 담을 수 있음

`           const { name, ...rest } = profile
` //         profile 객체의 name을 제외한 나머지 필드는 rest 에 담김
`           rest.age, rest.school
`//          꼭 rest 가 아니라 qqq 등 다른 변수명 사용 가능 //         이렇게 rest.필드명 으로 사용 가능

//          객체에서 어떤 필드를 제외해서 사용하고 싶을 때 주로 사용
`           cosnt { school, ...myProfile } = profile
            addProfile(myProfile)
`//      3) 객체의 KEY 특징

//          객체에서는 키(필드의 키)가 중복될 수 없음
//          중복 선언하면 아래쪽에 작성된 값으로 덮어써짐

//      4) 클래스와 의존성 주입

//      5) private readonly 역할

//          private readonly 로 의존성을 받아오면
//           - 의존성 저장할 필드 선언 생략 가능
//           - 의존성 필드 초기화 코드 생략 가능

//      6) 타입스크립트-기본타입

//      7) 타입스크립트-데코레이터

//          데코레이터는 함수이다!

//      8) 타입스크립트-유틸리티타입

//          인터페이스로 선언한 타입을 조작해 새로운 타입을 만드는 것
//          재사용성을 높임

//          Partial 타입 : 모든 필드에 ? 붙임
//          Required 타입 : 모든 필드에 ? 제거
//          Pick 타입 : 일부 필드만 선택해 새로운 타입 선언
//          Omit 타입 : 일부 필드를 제외한 나머지 필드로 새로운 타입 선언

//      9) 그래프큐엘 Code-First (schema.gql 자동 생성)

//          리졸버

`           @Resolver()
            export class BoardResolver {
                constructor(private readonly boardsSerivce: BoardsService) {}

                @Query(() => String)
                fetchBoards(): string {
                    return this.boardsService.qqq();
                }
            }
`//          엔티티

`           @Entity()
            @ObjectType()
            export class Board {
                @PrimaryGEneratedColumn('increment')
                @Field(() => Int)
                number: number;

                @Column()
                @Field(() => String)
                writer: string;

                @Column()
                @Field(() => String)
                title: string;

                @Column()
                @Field(() => String)
                contents: string;
            }
`//          DTO

`           @InputType()
            export class CreateBoardInput {
                @Field(() => String)
                writer: string;

                @Field(() => String)
                title: string;

                @Field(() => String)
                contents: string;
            }
`;
