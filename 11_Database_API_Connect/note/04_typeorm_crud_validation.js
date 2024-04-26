// TypeORM API 구현 - Validation 검증

//          Validation 은 수정 API에서 가장 많이 사용됨

//          현재 상황이 수정, 삭제 가능한 상황인지 확인하기 위해 사용

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


//      4. 상품 수정하기 API 추가

//          상품 ID 로 상품을 찾고, 상품의 정보를 수정하는 API 만들기

//          1) 상품 수정 API 함수 선언
//              ProductsResolver 클래스에 updateProduct() 함수 선언

//          2) 상품 수정 API 인자 받아서 전달
`               updateProduct(
                  @Args('productId') productId: string, //
                  @Args('updateProdcutInput') updateProductInput: UpdateProductInput,
                ) {
                  this.productsService.update({ productId, updateProductInput });
                }
`//             updateProductInput : 수정할 상품 내용 담을 DTO
//              productsService.update : 상품 서비스의 upadate 함수로 전달

//      5. 상품 수정 서비스 함수 추가

//          1) 상품을 수정 서비스 함수 선언
//              ProductsService 클래스에 update() 함수 선언
`               update({ productId, updateProductInput }) {
    
                }
`
//          2) 함수 인자 타입 인터페이스 선언
//              products/interfaces/update-prodcut.input.ts 에 선언
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
`               
`