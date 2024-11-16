// 게시판 CRUD API

//      TypeORM 사용해 API 구체적으로 만들기


//      1. 게시물 등록 API

//          1) boards.resolver.ts 에 API 함수 createBoard() 구현

//          2) boards.service.ts 에 DB 등록 함수 create() 구현
//              사실 전에 이미 구현한 적 있음
//              4_API_Imple.../07-graphql-...-board/index.js 경로
//              4/07/index.js의 createBoard 함수 내용을 create() 함수로 복사하기

//          3) API 함수에서 요청으로부터 인자 받아 전달하기
`               @Mutation()
                createBoard(
                  @Args('writer') writer: string,
                  @Args('title') title: string,
                  @Args('contents') contents: string,
                ) {
                    this.boardsService.create(writer, title, contents);
                }
`//             @Args('writer') writer: string,
//              : GraphQL로부터 'writer' 필드 값을 writer 변수에 받을거고 string 타입이다

//              this.boardsService.create(writer, title, contents);
//              : 서비스의 create 함수로 세 인자 넘겨줌

//          4) API 함수 인자 null 가능하게 만들기
//              createBoard 함수 인자의 @Args 데코레이터 수정
`               @Args({ name: 'contents', nullable: true }) contents: string,
`//             name: 'contents 를 { name: 'contents', nullable: true } 로 수정
//              => 필수 인자가 아니게 수정

//          5) 서비스 함수에서 인자 받기
`               create(writer: string, title: string, contents: string): string {
                  // 1. 브라우저의 요청 데이터 확인
                  console.log(writer);
                  console.log(title);
                  console.log(contents);

                  // 2. DB 접속해 데이터 저장했다고 가정

                  // 3. DB에 저장한 결과 응답
                  return '게시물 등록에 성공했습니다.';
                }
`//             그냥 함수에서 매개변수 받는거랑 똑같이 받으면 됨
//              TypeScript이므로 매개변수 타입, 리턴 타입 명시해주기

//          6) API 함수에서 서비스 함수 반환값 처리
`               @Mutation()
                createBoard(
                  @Args ...
                  ...
                ): string {
                    return this.boardsService.create(writer, title, contents);
                }
`//             서비스 함수 create() 함수의 반환값 받아 브라우저로 리턴하기
//              TypeScript이므로 리턴 타입 명시해주기

//          7) 스키마 생성용 반환값 처리
`               @Mutation(() => String)
                createBoard(
                  @Args ...
                  ...
                ): string {
                    return ...
                }
`//             @Mutation 데코레이터의 인자로 API 함수 반환 타입 명시하기
//              () => String : String 타입으로 리턴, GraphQL 문법이라서 S 대문자!


//      2. 게시물 조회 API

//          1) boards.resolver.ts 에 API 함수 fetchBoards() 있음

//          2) boards.service.ts 에 DB 조회 함수 findAll() 있음
//              fetchBoards 함수 내용을 findAll() 함수로 복사하기

//          3) 서비스 함수 findAll() 리턴 타입 수정
//              return result(객체 배열) 인데 TypeScript 리턴 타입은 string으로 해둬서 에러
`               @Injectable({ ... })
                export class BoardsService {
                findAll(): Board[] {
                  const result = [
                    {
                      number: ... ,
                      writer: ... ,
                      title: ... ,
                      contents: '... ,
                    },
                    ...
                  ];

                  // 2. DB에서 꺼내온 결과 응답
                  return result;
                }
`//             함수의 리턴 타입을 Board[] 로 수정해야함
//              Board : 게시판 엔티티, Board import 해야함

//          4) API 함수 fetchBoards() 리턴 타입 수정
//              TypeScript 리턴 타입을 string으로 해둬서 에러
`
                @Query(() => String, { ... })
                fetchBoards(): Board[] {
                  return this.boardsService.findAll();
                }
`//             함수의 리턴 타입을 Board[] 로 수정해야함
//              Board : 게시판 엔티티, Board import 해야함

//          5) 스키마 생성용 반환값 처리
`               @Query(() => [Board], { nullable: true })
                fetchBoards(): ... {
                  return ...;
                }
`//             @Mutation 데코레이터의 인자로 API 함수 반환 타입 명시하기
//              () => [Board] : Board 객체 배열 타입으로 리턴
//                              GraphQL 문법이라서 객체 배열을 [Board] 이렇게 씀!


//      3. GraphQL 타입 추가 정의

//          Board 타입을 TypeScript 엔티티로 정의했을 뿐 GraphQL 타입으로 정의하지 않았음
//          => GraphQL 타입으로도 만들어줘야 함

//          1) board.entity.ts 파일 열기

//          2) Board type 정의
//              Board 클래스에 GraphQL용 데코레이터를 추가로 붙여 type Board 정의
`               @Entity()
                @ObjectType() // type Board 가 생성됨
                export class Board {
                  @PrimaryGeneratedColumn('increment')
                  @Field(() => Int) // Int 타입 GraphQL 필드로 정의
                  number: number;
                
                  @Column()
                  @Field(() => String) // String 타입 GraphQL 필드로 정의
                  writer: string;
                
                  @Column()
                  @Field(() => String)
                  title: string;
                
                  @Column()
                  @Field(() => String)
                  contents: string;
                }
`//             GraphQL용 데코레이터 추가

//              @ObjectType() 
//              : type Board 정의

//              @Field(() => Int)
//              : Int 타입 GraphQL 필드로 정의

//              @Field(() => String) 
//              : String 타입 GraphQL 필드로 정의

//          3) type Board 정의 확인
//              commons/graphql/schema.gql 파일 열기

//              type Board 가 다음과 같이 정의되어 있으면 성공한 것
`               type Board {
                  number: Int!
                  writer: String!
                  title: String!
                  contents: String!
                }
`

//      4. DTO 로 인자 받기

//          인자를 받을 때 여러 데이터를 따로 받지 않고 묶어서 한번에 받는 것이 보편적
//          DTO 만들어서 객체 인자 전달받기
//          DTO : Data Transfer Object

//          1) dto 파일 생성
//              src/apis/boards/dto 폴더에
`               create-board.input.ts 파일 생성
`
//          2) dto 클래스 정의
`               export class CreateBoardInput {
                  writer: string;

                  title: string;

                  contents: string;
                }
`//             CreateBoardInput 이라는 클래스 생성후 export

//          3) GraphQL용 데코레이터 추가
//              GraphQL에서 인식할 수 있도록 타입 정의해줘야햠
`               @InputType()
                export class CreateBoardInput {
                  @Field(() => String)
                  writer: string;
                
                  @Field(() => String)
                  title: string;
                
                  @Field(() => String)
                  contents: string;
                }
`//             @InputType()
//              : @ObjectType 아님! 인자는 InputType을 사용해야함
//              @Field(() => String)
//              : 필드 정의 String 타입


//      5. TypeScript 꼼꼼히 작성

//          board.service.ts 의 create() 의 인자의 타입이 명시되어 있지 않음

//          create 함수에서 사용되는 매개변수 { createBoardInput }의 타입을
//           인터페이스로 정의해야함

//          1) 인터페이스를 저장할 폴더 생성
//              src/apis/boards/interface

//          2) 인터페이스 파일 생성
//              boards-service.interface.ts

//          3) 인터페이스로 타입 정의
//              create 함수의 인자 타입 IBoardsServiceCreate 인터페이스 정의
`               export interface IBoardsServiceCreate {
                  createBoardInput: CreateBoardInput;
                }
`//             CreateBoardInput DTO 객체만을 필드로 가질 수 있게 정의
//              board.service.ts에서 가져올 수 있게 export

//          4) board.service.ts 의 create 함수 인자 타입으로 명시
//              create 함수의 인자에 타입 명시
`               create({ createBoardInput }: IBoardsServiceCreate): string { 
                  ...
                }
`

//      6. Playground 에서 테스트

//          1) 브라우저에서 localhost:3000/graphql 접속

//          2) DOCS에서 API 함수의 리턴타입, 인자타입이 정확히 적혀있는지 확인

//          3) API 요청 보내서 정확한 응답이 오는지 확인

//              fetchBoards 요청
`               query {
                  fetchBoards{
                    number
                    writer
                    title
                    contents
                  }
                }
`
//              createBoard 요청
`               mutation {
                  createBoard(createBoardInput:{
                    writer: "다윈",
                    title: "api 요청 규칙",
                    contents: "문자열은 쌍따옴표로 감싸야함",
                  })
                }
`
//              createBoard 응답
`               {
                  "data": {
                    "createBoard": "게시물 등록에 성공했습니다."
                  }
                }
`
//              createBoard 요청시 서비스 로그 출력
`               다윈
                api 요청 규칙
                문자열은 쌍따옴표로 감싸야함
`