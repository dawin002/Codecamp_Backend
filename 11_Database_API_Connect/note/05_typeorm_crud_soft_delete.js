// 상품 삭제 API - 소프트 삭제

//      소프트 삭제
//          실제로 지우는 것이 아닌 지웠다고 가정하는 것


// 실제 삭제

//      11-05-typeorm-crud-validation 프로젝트 복제해 실습 진행

//      DB에서 실제로 삭제하는 단순한 방법

//      이렇게 단순하게 삭제해버리면 DB에서 진짜로 지워져버려서 
//       실제론 삭제되지 않고 안보이게 처리되는 소프트 삭제를 이용하기도 함

//      1. 상품 삭제 API, 서비스 함수 선언

//          1) 상품 삭제 API 선언
`               @Mutation()
                deleteProduct() {
                  this.productsService.delete();
                }
`//             ProductsResolver 클래스에 선언
//              서비스 함수인 productsService.delete() 호출

//          2) 상품 삭제 서비스 함수 선언
`               delete() {
    
                }
`//             ProductsService 클래스에 선언


//      2. 상품 삭제 API 인자 전달

//          1) 상품 삭제 API 에서 인자 받아 서비스 함수로 전달
`               @Mutation()
                deleteProduct(
                  @Args('productId') productId: string, //
                ) {
                  this.productsService.delete({ productId });
                }
`
//          2) 상품 삭제 서비스 함수에서 인자 받기
`               delete({ productId }: IProductsServiceDelete) {
    
                }
`
//          3) 상품 삭제 서비스 함수 인자의 타입스크립트 인터페이스 선언
`               export interface IProductsServiceDelete {
                  productId: string;
                }
`//             상품 삭제 서비스 함수에서 인자를 객체로 받기 때문에
//               타입스크립트에 넣어줄 객체의 타입이 필요해서 선언하는 것

//              src/apis/products/interfaces/products-service.interface.ts 파일에 선언


//      3. 상품 삭제 서비스 함수 구현

//          1) ProductRepository 객체에서 상품 delete 하기
`               async delete({ productId }: IProductsServiceDelete) {
                  const result = await this.productsRepository.delete({ id: productId });
                }
`//             productsRepository.delete 함수 사용해 인자로 들어오는 조건에 맞는 상품 삭제
//              { id: productId } 인자를 전달해 id 값이 productId 와 일치하는 상품 선택

//              result 값을 반환하기 위해 async await 으로 비동기 처리

//          2) 실제로 삭제가 되었는지 반환
`               async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
                  const result = await this.productsRepository.delete({ id: productId });
                  return result.affected ? true : false;
                }
`//             return result.affected ? true : false
//              : 삭제 결과(result)가 실제로 동작 했는지 아닌지 검사하는 affected 함수 사용
//                검사 결과를 API 함수로 반환

//              함수 반환값 타입스크립트로 Promise<boolean> 명시


//      4. 상품 삭제 API 함수 구현

//          1) 서비스 함수 반환 결과 받아 브라우저로 응답 반환
`               @Mutation(() => Boolean)
                deleteProduct(
                  @Args('productId') productId: string, //
                ): Promise<boolean> {
                  return this.productsService.delete({ productId });
                }
`//             productsService.delete 함수의 반환값 리턴
//              => API 함수 반환 타입스크립트 Promise<boolean> 로 명시
//              => GraphQL 반환 타입 () => Boolean 로 명시


// 소프트 삭제(직접 구현) - isDeleted

//      isDeleted 칼럼을 만들어 삭제된 데이터를 따로 관리하는 소프트 삭제

//      DB에서 실제로 데이터를 삭제하는 것이 아닌 안보이게 처리하는 것

//      다만, 언제 삭제되었는지 알 수가 없음

//      1. Product 엔티티에 isDeleted 칼럼 생성

//      2. 삭제 서비스 함수 수정

//          1) ProductsServices 의 delete() 수정
`               async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
                  this.productsRepository.update({id: productId}, {isDeleted: true});
                }
`//             productsRepository 의 delete 가 아닌 update 함수로 특정 상품의
//               isDeleted 필드 값을 true 로 수정

//      3. 상품 조회 서비스 함수 수정

//          1) ProductsServices 의 findAll() 수정
`               findAll(): Promise<Product[]> {
                  return this.productsRepository.find({ where: { isDeleted: false } });
                }
`//             상품의 isDeleted 가 false 인 상품만 조회

//          2) ProductsServices 의 findOne() 수정
`               findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
                  return this.productsRepository.findOne({ 
                    where: { id: productId, isDeleted: false },
                  });
                }
`//             상품의 isDeleted 가 false 인 상품만 조회


// 소프트 삭제(직접 구현) - deletedAt

//      deletedAt (삭제된 날짜) 칼럼을 만들어 삭제된 데이터를 관리하는 소프트 삭제

//      deletedAt 의 초기값을 비워두고 비어있으면 삭제되지 않은 데이터, 비어있지 않으면
//       안보이게 처리한 후 언제 삭제되었는지 기록해두는 방식

//      삭제 되었다는 정보와 삭제된 날짜 정보를 한 칼럼에 저장할 수 있다는 장점

//      단, 소프트 삭제를 사용할 때는 반드시 해당 상품이 조회되지 않게 꼼꼼하게 확인해야 함

//      1. Product 엔티티에 deletedAt 칼럼 생성

//      2. 삭제 서비스 함수 수정

//          1) ProductsServices 의 delete() 수정
`               async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
                  this.productsRepository.update({id: productId}, {deletedAt: new Date() });
                }
`//             productsRepository 의 update 함수로 특정 상품의 
//               deletedAt 필드 값을 Date 데이터로 수정

//      3. 상품 조회 서비스 함수 수정

//          1) ProductsServices 의 findAll() 수정
`               findAll(): Promise<Product[]> {
                  return this.productsRepository.find({ where: { deletedAt: null } });
                }
`//             상품의 deletedAt 가 null 인 상품만 조회

//          1) ProductsServices 의 findOne() 수정
`               findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
                  return this.productsRepository.findOne({
                    where: { id: productId, deletedAt: null },
                  });
                }
`//             상품의 deletedAt 가 null 인 상품만 조회


// 소프트 삭제(TypeORM 제공) - softRemove, softDelete

//      TypeORM 에 내장된 소프트 삭제 기능 softRemove, softDelete

//      실제로 DB에는 삭제되어있지 않고 조회시 안보이게 처리됨

//      deletedAt 컬럼이 있는 데이터는 TypeORM 이 자체적으로 걸러내 조회되지 않게 함
//      => 조회 로직을 알아서 처리해줘서 편리함

//      deletedAt 컬럼은 엔티티에 반드시 생성해줘야 함

//      softRemove

//          id 값으로만 데이터 삭제 가능
//          id 배열로 여러 데이터 한번에 삭제 가능
//          .softRemove([{id: aaa}, {id: bbb}, {id: ccc}])

//      softDelete

//          한번에 하나의 데이터만 삭제 가능
//          다른 칼럼으로도 데이터 삭제 가능


//      1. 소프트 삭제 시간 기록을 위한 컬럼 생성

//          1) 엔티티에 deletedAt 컬럼 생성
//              src/apis/products/entities/product.entity.ts 파일에 선언
`               deletedAt: Date;
`
//          2) 소프트 삭제 시간 기록을 위한 데코레이터 추가
`               @DeleteDateColumn()
                deletedAt: Date;
`//             컬럼에 @DeleteDateColumn 데코레이터를 달아야 TypeORM이 소프트 삭제에
//               사용할 deletedAt 컬럼으로 인식함(deletedAt 이름이 아니어도 괜찮음)

//      ** 이와 비슷한 TypeORM 제공 기능

//          1) 데이터 등록 시간을 자동으로 기록해주는 컬럼
`               @CreateDateColumn()
                createdAt: Date;
`
//          2) 데이터 수정 시간을 자동으로 기록해주는 컬럼
`               @UpdateDateColumn()
                updatedAt: Date;
`

//      2. 삭제 서비스 함수 수정 - softDelete

//          1) ProductsServices 의 delete() 수정
`               async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
                  const result = await this.productsRepository.softDelete({ id: productId });
                  return result.affected ? true : false;
                }
`//             productsRepository 의 softDelete 함수 사용
//              삭제할 데이터의 조건을 비교해 데이터 삭제 처리