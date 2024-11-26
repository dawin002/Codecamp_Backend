// TypeORM API 구현 - Validation 검증

//          Validation 은 수정 API에서 가장 많이 사용됨

//          현재 상황이 수정, 삭제 가능한 상황인지 확인하기 위해 사용


//      검증은 어디서 할 것인가?

//          검증은 서비스에 만드는 것이 좋음

//          => 검증을 서비스에 만들면 다른 곳에서 재사용 가능
//          => 프로젝트의 규모가 커져도 모든 곳에서 똑같이 검증할 수 있음

// Class-Validator

//          검증과 필터링을 도와주는 NestJS 제공 클래스

//          올바르지 않은 데이터가 들어오는지 검증해주는 기능

//      class-validator 설치

//          class-validator 와 class-transformer 둘 다 설치해야됨

//          1) class-validator 설치
`               yarn add class-validator
`
//          2) class-transformer 설치
`               yarn add class-transformer
`

//      ValidationPipe 사용 설정

//          리퀘스트 요청이 왔을 때 리졸버(컨트롤러)로 넘기기 전에 검증하는 파이프
//          파이프를 거쳐 통과한 것들만 리졸버로 넘어갈 수 있음

//          ValidationPipe를 사용 설정해야 class-validator를 사용할 수 있음

//          main.ts 에서 적용시켜 줘야함
`               import { ValidationPipe } from '@nestjs/common';

                async function bootstrap() {
                  ...
                  app.useGlobalPipes(new ValidationPipe());
                  ...
                }
`//             app.useGlobalPipes(new ValidationPipe());
//              : 검증 파이프를 글로벌 파이프로 사용 설정하기


//      class-validator 사용

//          DTO의 필드에 class-validator 용 데코레이터를 추가

//          2) class-validator 가져오기
`               import { ... } from 'class-validator';
`//             DTO 등에서 검증 데코레이터를 사용하기 위해 import 해야함

//          3) 최소값 검증
`               @Min(0)
`//             0 보다 작은 값은 들어올 수 없음


// Validation 실습

//      1. main.ts 에 ValidationPipe 추가하기

//          1) ValidationPipe 가져오기
`               import { ValidationPipe } from '@nestjs/common';
`
//          2) ValidationPipe 를 GlobalPipe 로 사용하기
`               async function bootstrap() {
                  ...
                  app.useGlobalPipes(new ValidationPipe());
                  ...
                }
`//             bootstrap 함수 내에 넣어주기


//      2. 상품 DTO에 검증 추가

//          1) 상품 DTO 상품 가격 최소값 검증
//              create-product.input.ts
`               @Min(0)
                @Field(() => Int)
                price: number;
`//             0 보다 작은 가격으로 생성할 수 없음
//              가격이 0인 상품 추가 API 요청을 보내면 에러 응답


//      3. 상품 수정 DTO 타입 클래스로 선언

//          1) src/apis/products/dto 폴더 진입

//          2) 상품 수정 DTO 파일 생성
`               update-product.input.ts
`
//          3) 상품 수정 DTO 클래스 작성
//              상품 추가 DTO 타입 CreateProductInput과 거의 똑같기 때문에
//               TypeScript의 유틸리티 타입과 GraphQL의 유틸리티 타입을 사용해 생성

//              다른 점은 필드에 ? 붙어야 되고, GraphQL 데코레이터에 nullable 추가되어야함
`               @InputType()
                export class UpdateProductInput extends PartialType(CreateProductInput) {
                
                }
`//             CreateProductInput 클래스를 상속받으나, PartialType(모든 필드 널러블)로
//              한 번 감싼 유틸리티 클래스를 상속받음

//              => 널러블 필드 name, price, desc.. 를 가지는 DTO 타입 생성


//      4. 상품 수정 API 추가

//          상품 ID 로 상품을 찾고, 상품의 정보를 수정하는 API 만들기

//          1) 상품 수정 API 함수 선언
//              ProductsResolver 클래스에 updateProduct() 함수 선언
`               @Mutation
                updateProduct() {

                }
`
//          2) 상품 수정 API 인자 받아서 전달
`               updateProduct(
                  @Args('productId') productId: string, //
                  @Args('updateProductInput') updateProductInput: UpdateProductInput,
                ) {
                  this.productsService.update({ productId, updateProductInput });
                }
`//             updateProductInput : 수정할 상품 내용 담을 DTO
//              productsService.update : 상품 서비스의 update 함수로 전달

//      5. 상품 수정 서비스 함수 추가

//          1) 상품을 수정 서비스 함수 선언
//              ProductsService 클래스에 update() 함수 선언
`                update({ productId, updateProductInput }) {
    
                }
`
//          2) 함수 인자 타입 인터페이스 선언
//              products/interfaces/update-product.input.ts 에 선언
`               export interface IProductsServiceUpdate {
                  productId: string;
                  updateProductInput: UpdateProductInput;
                }
`
//          3) 함수 인자 타입스크립트 작성
`               update({ productId, updateProductInput }: IProductsServiceUpdate) {

                }
`
//          4) Product 레파지토리에서 상품 정보 수정
`               update({ ... }: ...) {
                  this.productsRepository.save({
                    id: productId,
                    name: updateProductInput.name,
                    description: updateProductInput.description,
                    price: updateProductInput.price,
                  });
                }
`//             this.productsRepository.save()
//              : id 에 해당하는 상품 정보 수정
//                save() 함수의 인자로 자동 생성 필드인 id 가 포함되면 수정, 아니면 등록

//          5) 수정된 상품 정보 반환
`               update({ ... }: ...): Product {
                  const result = ...save({
                    id: ...,
                    name: ...,
                    description: ...,
                    price: ...,
                  });

                  return result;
                }
`//             const result 에 수정 정보를 담아 반환

//              productsRepository.update() 함수도 있지만 save()를 쓰는 이유는
//               update()는 수정되었다는 메시지만 반환, save()는 수정한 객체를 반환

//              update() 함수의 반환 타입스크립트 Product 로 지정


//      6. 수정 서비스 함수에서 수정되지 않은 데이터까지 모두 반환

//              상품의 수정되지 않은 데이터까지 모두 객체로 돌려 받고 싶을 땐
//               수정하지 않은 데이터들까지 save() 함수의 인자로 넣어줘야 함

//          1) 기존 상품 정보 조회
`               async update({ ... }: ...): Promise<Product> {
                  const product = await this.findOne({ productId });

                  const result = ...save({
                    ...
                  });

                  return result;
                }
`//             서비스 함수 findOne()으로 수정하기 전의 상품 데이터를 가져옴

//              조회가 완료된 뒤에 수정이 실행되어야 하므로 async await 비동기 처리
//              비동기 결과를 반환하기 때문에 반환 타입스크립트 Promise<Product>로 수정

//          2) save 함수의 인자에 기존 상품 정보 추가
`               async update({ ... }: ...): ... {
                  const product = await ...findOne( ... );
              
                  const result = ...save({
                    ...product,
                    ...updateProductInput,
                  });
              
                  return result;
                }
`//             필드가 두번 초기화되면 더 늦게 써진 값으로 덮어써지는 원리
//              스프레드 연산자로 기존 데이터와 수정할 데이터 전체를 한번씩 초기화

//              ...product : 수정전 값으로 한번 초기화
//              ...updateProductInput : 수정할 값만 다시 초기화


//      7. 상품 수정 API 응답 반환

//          1) 서비스 함수로부터 반환받은 결과 반환
`               @Mutation(() => Product)
                updateProduct(
                  @Args('...') ...: ..., //
                  @Args('...') ...: ...,
                ): Promise<Product> {
                  return this.productsService.update({ ... });
                }
`//             productsService.update()의 반환값 return

//              GraphQL 반환 타입 Product 로 지정

//              반환 타입스크립트 Promise<Product>로 지정
//               update() 함수가 비동기 함수이기 때문에

//              이 함수를 비동기처리할 필요는 없음
//               NestJS API 함수는 return 될 데이터가 비동기라면 알아서 기다리기 때문


//      8. 검증 기능 추가하기

//          이미 판매 완료된 상품을 수정하는 등 상품 수정에서 필요한 검증 과정 추가

//          ProductsService 클래스에 함수로 선언 후 사용
//          => 수정, 삭제시 같은 검증 로직을 사용하기 때문에 함수로 선언

//          1) 상품 판매 완료 검증 함수 선언
`               checkSoldout({ product }: IProductsServiceCheckSoldout): void {

                }
`//             product 를 인자로 받아 검증

//          2) 상품 판매 완료 검증 함수 인자 타입 선언
`               export interface IProductsServiceCheckSoldout {
                  product: Product;
                }
`//             products-service.interface.ts 파일에 인터페이스로 타입 선언

//          3) 상품이 판매 완료 되었는지 검증
`               checkSoldout({ ... }: ...): ... {
                  if (product.isSoldout) {
                    throw new HttpException(
                      '이미 핀매 완료된 상품입니다.',
                      HttpStatus.UNPROCESSABLE_ENTITY,
                    );
                  }
                }
`//             만약 상품이 판매완료된 상태인 경우 HttpException 예외 처리

//              HttpStatus.UNPROCESSABLE_ENTITY 
//              : HTTP 상태 코드, 정상적인 요청이지만 내부 로직에 의해 예외 발생

//          4) 검증 코드 수정
`               checkSoldout({ ... }: ...): ... {
                  if (product.isSoldout) {
                    throw new UnprocessableEntityException('이미 핀매 완료된 상품입니다.');
                  }
                }
`//             더 간단하게 작성하면 이렇게 작성할 수 있음

//              HttpException의 인자로 HTTP 상태 코드를 전달하지 않고
//               UnprocessableEntityException 예외를 던져도 똑같은 동작을 함

//          5) 상품 판매 완료 검증 함수 적용
`               async update({ ... }: ...): ... {
                  const product = await ...findOne({ ... });

                  this.checkSoldout({ product });

                  const result = ...save({ ... });
                  return result;
                }
`//             ProductsService 클래스의 update 함수에 적용


//      9. DB 접속 등 통신 예외 처리

//          DB 접속 에러 등 통신 과정에서 발생하는 에러 또한 예외 처리를 해줘야함

`               try {
                  const result = this.productsRepository.save({
                    ...product,
                    ...updateProductInput,
                  });
                } catch (e) {
                    console.log(e);
                }

`//         위 처럼 try-catch 문 안에 넣어 에러를 처리할 수 있음
//          단, 통신이 있는 모든 부분에 try-catch 를 넣어줘야 하기 때문에 사용하기 힘듬

//          NestJS 제공하는 Exception-Filter 파일을 만들어 사용하면 모든 부분에 
//           try-catch 문을 달지 않아도 Exception-Filter가 예외를 알아서 처리해줌

//          1) Exception-Filter 파일 생성
`               src/commons/filter 폴더 생성
                http-exception.filter.ts 파일 생성
`
//          2) HttpExceptionFilter 클래스 선언
`               export class HttpExceptionFilter implements ExceptionFilter {

                }
`//             implements
//              : implements 뒤에 적힌 인터페이스의 멤버들을 구현해야 한다고 지정하는 것

//              ExceptionFilter
//              : 익셉션 필터와 관련된 변수, 함수 이름이 선언만 되어 있는 인터페이스
//                구현하지 않으면 코드에 에러가 계속 나타남

//          4) @Catch 데코레이터 추가
`               @Catch(HttpException)
                export class HttpExceptionFilter implements ExceptionFilter {

                }
`//             HttpException 이 발생하면 catch 문으로 이 클래스의 catch 함수를 
//               실행시켜줘야 한다고 NestJS 에 지정하는 것

//          3) catch 함수 구현
`               @Catch(HttpException)
                export class HttpExceptionFilter implements ExceptionFilter {
                  catch(exception: HttpException) {
                    const status = exception.getStatus();
                    const message = exception.message;

                    console.log('예외가 발생했습니다.');
                    console.log('예외내용: ', message);
                    console.log('예외코드: ', status);
                  }
                }
`//             에러가 발생하면 실행할 catch 함수 구현

//          4) main.ts 에 Exception-Filter 사용 설정
`               async function bootstrap() {
                  const app = await NestFactory.create(AppModule);
                  app.useGlobalPipes(new ValidationPipe());

                  app.useGlobalFilters(new HttpExceptionFilter());

                  await app.listen(3000);
                }
                bootstrap();
`//             app.useGlobalFilters(new HttpExceptionFilter());
//              : HttpExceptionFilter() 객체를 앱의 글로벌 필터로 사용 설정


//      10. 상품 수정 실습

//          1) 상품 수정 API 요청 전송
`               mutation {
                  updateProduct(
                    productId: "94319f70-ffbd-11ee-89f4-c87f545065bb", 
                    updateProductInput: {
                      price: 5000,
                      description: "나는 짱좋은 마우스"
                    }
                  ) {
                    id
                    name
                    price
                    description
                    isSoldout
                  }
                }
`
//          2) API 응답 결과
`               {
                  "data": {
                    "updateProduct": {
                      "id": "94319f70-ffbd-11ee-89f4-c87f545065bb",
                      "name": "마우스",
                      "price": 100,
                      "description": "나는 짱좋은 마우스",
                      "isSoldout": false
                    }
                  }
                }
`

//      11. 예외 처리 실습

//          1) 상품 수정 API 요청에서 에러 발생시키기
//              가격을 음수로 수정 요청하기
`               mutation {
                  updateProduct(
                    productId: "94319f70-ffbd-11ee-89f4-c87f545065bb", 
                    updateProductInput: {
                      price: -100,
                    }
                  ) {
                    id
                    name
                    price
                    description
                    isSoldout
                  }
                }
`
//          2) API 응답 결과
`               
                {
                  "errors": [
                    {
                      "message": "Bad Request Exception",
                      "locations": [
                        {
                          "line": 2,
                          "column": 3
                ...
`
//          3) 콘솔 출력 결과
`               예외가 발생했습니다.
                예외내용:  Bad Request Exception
                예외코드:  400
`