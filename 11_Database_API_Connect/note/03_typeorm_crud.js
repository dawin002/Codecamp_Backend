// TypeORM 으로 상품 등록, 조회 API 만들기


// DB 연동해 API 만들기 실습

//          11-01-mysql=relation 프로젝트 복제해 진행

//      1. Products API 클래스 선언

//          1) src/apis/products 폴더 진입

//          2) API 파일들 생성
//              products.module.ts
//              products.resolver.ts
//              products.service.ts

//          3) ProductsModule 클래스 작성
`               import { Module } from '@nestjs/common';
                import { ProductsResolver } from './products.resolver';
                import { ProductsService } from './products.service';

                @Module({
                  providers: [
                    ProductsResolver, //
                    ProductsService,
                  ],
                })
                export class ProductsModule {

                }
`//             @Module 데코레이터 사용

//              providers 리스트에 주입할 의존성 ProductsResolver, ProductsService 작성

//              class 를 export 해서 AppModule 에서 사용할 수 있게 하기

//          2) ProductsResolver 클래스
`               import { Resolver } from '@nestjs/graphql';
                import { ProductsService } from './products.service';

                @Resolver()
                export class ProductsResolver {
                  constructor(
                    private readonly productsService: ProductsService, //
                  ) {}
                }
`//             @Resolver 데코레이터 : 컨트롤러와 같은 역할

//            * import { Resolver } from '@nestjs/graphql' 해야하지만 Resolver를 못찾는 경우
`               yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql
`
//              constructor에서 ProductsService 의존성을 private readonly로 주입받음
//              => productsService 필드 선언 및 초기화 코드 생략 가능

//              constructor에서 주입받을 의존성이 여러 개일 경우 쉼표(,) 뒤에 주석 달아
//               prettier 여러 줄로 나뉘게 하기

//              class 를 export 해서 ProductsModule 에서 사용할 수 있게 하기

//          3) ProductsService 클래스
`               import { Injectable } from '@nestjs/common';

                @Injectable()
                export class ProductsService {}
`//             @Injectable 데코레이터 : 주입할 클래스라는 뜻
//              class 를 export 해서 ProductsResolver 에서 사용할 수 있게 하기


//      2. Product DTO 클래스 생성

//          1) src/apis/products/dto 폴더 생성

//          2) create-product.input.ts 파일 생성

//          3) CreateProductInput 클래스 선언
`               import { Field, InputType, Int } from '@nestjs/graphql';

                @InputType()
                export class CreateProductInput {
                  @Field(() => String)
                  name: string;

                  @Field(() => String)  // GraphQL 타입 명시
                  description: string;  // TypeScript 타입 명시


                  @Field(() => Int)
                  price: number;
                }
`//             @InputType 데코레이터로 DTO로 만듬
//              @Field 데코레이터 사용해 GraphQL 필드로 만듬
//              @Filed 데코레이터의 인자로 GraphQL용 타입 작성
//              export 로 클래스 내보내기


//      4. 상품 등록 API 요청 받기

//          product.resolver.ts 에 api 함수 createProduct() 작성
//          상품 등록 API 요청 받아 등록 함수로 넘겨주기

//          1) ProductsResolver 에 createProduct() 선언

//          2) 인자 받아서 넘겨주기
`               @Mutation()
                createProduct(
                  @Args('createProductInput') createProductInput: CreateProductInput, //
                ) {
                  this.productsService.create({ createProductInput });
                }
`//             @Args('createProductInput') : 받아올 인자의 이름

//              createProductInput: CreateProductInput 
//              : 받은 인자를 저장할 매개변수와 타입스크립트(DTO 타입)

//              this.productsService.create({ createProductInput }) 
//              : 서비스 클래스의 create 함수로 인자 전달


//      5. DB 사용 서비스(TypeORM) 의존성 주입

//          DB를 사용하기 위해 ProductsService에 DB 서비스 의존성을 주입해야함
//          TypeORM 을 통해 특정 테이블에 접속할 수 있는 기능 넣기

//          1) ProductModule에 TypeORM 기능 추가하기
`               @Module({
                  imports: [
                    TypeOrmModule.forFeature([
                      Product, //
                    ]),
                  ],
                  providers: [...],
                })
`//             Product TypeORM 기능을 주입하기
//              Product 테이블에 접근하게 하기

//          2) ProductService에 Product 레파지토리 의존성 주입하기
`               export class ProductsService {
                  constructor(
                    @InjectRepository(Product)
                    private readonly productsRepository: Repository<Product>, //
                  ) {}
                }
`//             생성자에서 private readonly 로 productsRepository 의존성 주입하기

//              레파지토리 의존성에 @InjectRepository() 데코레이터 사용해야함
//               데코레이터 인자로는 사용할 엔티티 클래스 Product 넣어주기

//              타입스크립트는 TypeORM에서 제공해주는 Repository<Product> 를 사용,
//               Repository는 DB에 접속해 데이터를 관리할 수 있게 하는 TypeORM 기능
//               Product는 Product 테이블에 관련된 레파지토리임을 의미


//      5. ProductsService 에서 받을 인자 타입 선언

//          1) products/interfaces 폴더 생성해 진입

//          2) products-service.interface.ts 파일 생성

//          3) 인터페이스 클래스 선언
`               export interface IProductsSeviceCreate {
                  createProductInput: CreateProductInput;
                }
`//             인자의 타입스크립트로 사용할 IProductsSeviceCreate 타입 인터페이스로 선언


//      6. 상품 DB 등록 하기

//          1) ProductsService 에 함수 create() 선언

//          2) 인자 및 타입스크립트 작성
`               create({ createProductInput }: IProductsSeviceCreate) {

                }
`//             createProductInput 를 인자로 받음
//              인자는 IProductsSeviceCreate 타입임을 명시

//          3) 레파지토리로 DB에 상품 저장
`               create({ createProductInput }: IProductsSeviceCreate) {
                  const result = this.productsRepository.save({
                    ...createProductInput,
                  });
                }
`//             this.productsRepository.save()
//              : Product 테이블에 데이터를 저장하는 함수
//                이미 만들어져있는 레파지토리 기능임

//              { ...createProductInput }
//              : 스프레드 연산자 사용해 인자 전달하는 방식
//                원래는 createProductInput.name, ... 과 같이 하나하나 전달해야하지만
//                 스프레드 연산자를 사용하면 한번에 모든 필드를 인자로 전달할 수 있음

//              result
//              : DB에 데이터를 저장한 결과
//                id, name, description, price 가지고 있는 객체


//      7. DB 저장 결과 반환하기

//          1) ProductsService 의 create() 에서 반환
`               create( ... ): Promise<Product> {
                  const result = this.productsRepository.save({ ... });

                  return result;
                }
`//             레파지토리 기능의 save 함수가 반환한 DB 저장 결과를 
//               API 함수 createProduct()에게 반환

//              함수 반환값의 타입스크립트로 Promise<Product> 명시
//              : Product 타입이 반환되나 시간이 좀 걸릴 수도 있어서 Promise 타입 사용


//          2) ProductResolver 의 createProduct() 에서 반환
`               @Mutation(() => Product)
                createProduct(
                  ...
                ): Promise<Product> {
                  return this.productsService.create({ createProductInput });
                }
`//             @Mutation(() => Product)
//              : Mutation 의 반환 타입으로 GraphQL 문법의 Product 타입 명시

//              Promise<Product>
//              : 함수 반환값의 타입스크립트로 Promise<Product> 명시
//                Product 타입이 반환되나 비동기 처리 이므로 Promise 타입 사용

//              return
//              : productsService.create 함수가 반환한 결과를 브라우저에게 응답

//          ** DB 저장 결과를 응답으로 내보낼 때 await async 안해도됨??

//              NestJS는 API 함수에서 브라우저로 return이 있는 경우
//               아직 DB에서 돌아오지 않은 데이터가 있다면 return 문 앞에서 잠깐 멈춰서
//               DB 작업이 완전히 끝날 때까지 기다린 다음에 브라우저로 응답 return해줌

//              반대로 express는 반드시 await, async 해야함

//          ** 브라우저에 결과를 보내주는 두 가지 방법

//              ProductsResolver 의 API 함수에서 브라우저로 응답을 보내는 상황

//              1) 등록된 내용이 담긴 객체를 그대로 브라우저에 돌려보내주기
`                   return this.productsService.create({ createProductInput });
`
//              2) 결과 메시지만 간단히 보내주기
`                   return '정상적으로 상품이 등록되었습니다.';
`
//              일반적으로 1) 방법 사용
//              => 브라우저에서 해당 내용을 조회하기 위해 API를 한번 더 보내지 않아도 돼서


//      8. Entity 에 GraphQL 데코레이터 추가

//          여러 엔티티 파일의 클래스들은 GraphQL에서도 사용되는데, 
//           MySQL용 데코레이터만 있어서 GraphQL용 데코레이터를 추가함

//          엔티티 클래스의 외래키 필드는 GraphQL 기본타입이 아닌 연결된 엔티티 필드의
//           타입을 데코레이터 인자에 타입으로 작성해줘야함

//          엔티티 클래스 목록
//              Product              (product.entity.ts)
//              ProductSaleslocation (productSaleslocation.entity.ts)
//              ProductCategory      (productCategory.entity.ts)
//              ProductTag           (productTag.entity.ts)
//              User                 (user.entity.ts)

//          1) 엔티티
`               @Entity()
                @ObjectType()
                export class Product {
                  ...
                }
`//             @ObjectType() 데코레이터 추가

//          2) 필드 (기본 타입)
`               @PrimaryGeneratedColumn('uuid')
                @Field(() => String)
                id: string;
`//             @Field() 데코레이터 안에 필드의 타입을 작성
//              String, Int, Float, Boolean 등

//          3) 필드 (엔티티 타입)
`               @ManyToOne(() => User)
                @Field(() => User)
                user: User;
`//             @Field() 데코레이터 안에 연결되는 엔티티 클래스를 타입으로 작성
//              연결되는 엔티티 클래스도 GraphQL 데코레이터 다 추가해야 에러 안남

//          4) 필드 (배열 타입)
`               @JoinTable()
                @ManyToMany(() => ProductTag, (productTags) => productTags.products)
                @Field(() => [ProductTag])
                productTags: ProductTag[];
`//             배열 타입은 @Field() 데코레이터 안에 타입을 작성할 때
//               타입명[] 이 아니라 [타입명] 처럼 대괄호로 감싸서 작성


//      9. AppModule 에서 ProductsModule 합치기

//          1) app.module.ts 파일 열기

//          2) imports 에 ProductsModule 추가
`               @Module({
                  imports: [
                    BoardsModule, //
                    ProductsModule,
                    ...
                  ],
                })
`//             ProductsModule 추가하고 import 하기


//      10. 상품 조회 API 작성

//          ProductsResolver 클래스에 조회 API 함수 작성
//          products.resolver.ts

//          1) 상품 목록 조회 API 함수
`               @Query(() => [Product])
                fetchProducts(): Promise<Product[]> {
                  return this.productsService.findAll();
                }
`//             서비스 함수 findAll() 호출
//              Promise 객체로 Product 객체 배열 반환

//          2) 상품 상세 조회 API 함수
`               @Query(() => Product)
                fetchProduct(
                  @Args('productId') productId: string, //
                ): Promise<Product> {
                  return this.productsService.findOne({ productId });
                }
`//             api 요청 인자로 받은 productId를 서비스 함수 findOne()에게 전달
//              Promise 객체로 Product 객체 반환


//      11. 상품 조회 서비스 함수 작성

//          ProductsService 클래스에 DB에서 조회하는 함수 작성
//          products.service.ts

//          1) 상품 목록 조회 서비스 함수
`               findAll(): Promise<Product[]> {
                  return this.productsRepository.find();
                }
`//             Product 레파지토리의 find() 기능 사용해 DB의 모든 Product 배열 구해서 반환

//          2) 상품 상세 조회 서비스 함수
`               findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
                  return this.productsRepository.findOne({ where: { id: productId } });
                }
`//             productId 인자로 받고 IProductsServiceFindOne 타입스크립트 명시

//              Product 레파지토리의 findOne() 기능 사용해 DB에서 조건에 맞는 Product 조회

//              findOne() 의 인자로 들어가는 { where: { id: productId } } 으로 조건 검색

//              id(필드)가 productId(인자)와 일치하는 레코드를 where 을 통해 검색해 반환


//      12. 상품 조회 함수 인자 타입 정의

//          ProductsService의 findOne() 함수는 인자를 받는데 인자의 타입을
//           타입스크립트로 명시해 줘야함.

//          근데 인자의 타입이 객체 형식이라 인터페이스로 타입을 정의해줘야함

//          1) src/apis/products/interfaces 폴더 진입

//          2) products-service.interface.ts 파일 열기

//          3) IProductsServiceFindOne 인터페이스 정의
`               export interface IProductsServiceFindOne {
                  productId: string;
                }
`

// DB 연동 API 테스트

//      1. NestJS 서버 실행

//          1) 로컬 데이터베이스 켜져 있는 상태인지 확인
//              안켜져있으면 켜기
`               net start mysql
`
//          2) NestJS 서버 실행
`               yarn start:dev
`

//      2. GraphQL API 요청 테스트

//          1) Playground 접속
`               http://localhost:3000/graphql
`
//          2) 상품 등록

`               mutation {
                  createProduct(createProductInput:{
                    name: "무접점 키보드",
                    description: "스위치에 접점이 없어 타건감이 좋음",
                    price: 60000,
                  }) {
                    id
                    name
                    description
                    price
                    isSoldout
                  }
                }
`//             createProduct 뮤테이션 요청 전송
//              createProductInput DTO에 데이터 담아 인자로 전달
//              id, name, ... 등 응답으로 돌아온 정보 조회

`               {
                  "data": {
                    "createProduct": {
                      "id": "24213af8-4f71-4abb-906c-0c3743b8a7d0",
                      "name": "무접점 키보드",
                      "description": "스위치에 접점이 없어 타건감이 좋음",
                      "price": 60000,
                      "isSoldout": false
                    }
                  }
                }
`//             createProduct 함수의 응답이 반환됨
//              id 는 자동 생성된 uuid가 반환됨
//              isSoldout 은 설정한 대로 디폴트 값으로 false 초기화

//          3) 상품 목록 조회

`               query {
                  fetchProducts {
                    id
                    name
                    description
                    price
                  }
                }
`//             fetchProducts 쿼리 요청 전송
//              id, name 등 응답으로 돌아오는 정보 조회

`               {
                  "data": {
                    "fetchProducts": [
                      {
                        "id": "0531ad9d-ffbe-11ee-89f4-c87f545065bb",
                        "name": "노트북",
                        "description": "최신 맥북입니다!",
                        "price": 2000000
                      },
                      { ... },
                      { ... }
                    ]
                  }
                }
`//             DB에 저장된 Products가 모두 조회됨
//              너무 많아서 ... 로 생략

//          4) 상품 상세 조회

`               query {
                  fetchProduct(productId: "24213af8-4f71-4abb-906c-0c3743b8a7d0") {
                    id
                    name
                    description
                    price
                  }
                }
`//             fetchProduct 쿼리 요청 전송
//              인자로 productId 전달해 해당 id와 일치하는 Product 조회
//              id, name 등 응답으로 돌아오는 정보 조회

`               {
                  "data": {
                    "fetchProduct": {
                      "id": "24213af8-4f71-4abb-906c-0c3743b8a7d0",
                      "name": "무접점 키보드",
                      "description": "스위치에 접점이 없어 타건감이 좋음",
                      "price": 60000
                    }
                  }
                }
`//             DB의 Products 테이블에서 id 가 "24213..." 와 일치하는 레코드 검색
//              일치하는 데이터 찾아 요청한 정보 출력