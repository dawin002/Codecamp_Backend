// 1:1 관계 테이블에서의 데이터 저장과 조회

//      상품 테이블과 상품 카테고리 테이블을 조인해서 데이터를 가져오는 방법

// 상품 카테고리 테이블 연결 실습

//      1. 프로젝트 준비

//          1) 기존 프로젝트 복사
//              11-06-typeorm-crud-one-to-one 프로젝트 복제해 진행


//      2. 상품 카테고리 API 생성

//          상품카테고리 등록 API 는 강의자료에서 구현된 소스코드 다운로드
//          모듈, 리졸버, 서비스, 인터페이스 구현되어 있음

//          1) 강의자료에서 실습 폴더 다운로드
//              강의자료/Supplement/Section 29/10-07 링크

//          2) 프로젝트에 적용
//              기존의 src/apis 의 productCategories 폴더를 지우고
//              다운로드 받은 productCategories 폴더를 src/apis 에 넣기

//          3) 앱 모듈에서 상품카테고리 모듈 임포트
`               imports: [
                  ~~~,
                  ProductsCategoriesModule,
                ],
`

//      3. 카테고리 데이터 추가

//          실습에 사용할 카테고리 데이터를 만들어두기
//          Playground에서 카테고리 이름만 지정해서 등록하면 됨

//          1) 카테고리 등록 api 요청
`               mutation {
                  createProductCategory(name: "의류"){
                    id,
                    name,
                  }
                }
`
//          2) 똑같은 방법으로 음식, 전자제품 카테고리 등록하기


//      4. 상품 등록시 카테고리와 연결하기

//          상품을 등록할 때 상품 테이블의 카테고리id 필드를 채워주려 함

//          상품 등록 화면에서 카테고리 목록을 조회하고, 사용자가 선택한 
//           카테고리의 id값을 상품등록 함수에서 DB에 저장해 연결

//          1) 상품 등록 DTO 에 상품 카테고리 ID 필드 추가
//              create-product.input.ts 파일
`               @InputType()
                export class CreateProductInput {
                  ~~~

                  @Field(() => String)
                  productCategoryId: string;
                }
`//             productCategoryId 필드 추가

//          2) 리졸버는 수정하지 않아도 됨
//              상품 등록 DTO 에 상품 카테고리 ID 필드를 추가했기 때문에
//              상품 카테고리 ID가 포함된 API 인자가 통째로 서비스 함수로 전달됨

//          3) 상품 등록 서비스 함수에서 인자 받기
//              ProductsService 클래스의 create 함수
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  const { ~~~, productCategoryId, ...~~~ } = createProductInput;
                  ~~~
                }
`//             인자로 받은 createProductInput DTO 객체에서 productCategoryId 추출

//          3) DB에 상품 저장할 때 상품 카테고리 넣어주기
//              ProductsService 클래스의 create 함수
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  const { ~~~, productCategoryId, ...~~~ } = createProductInput;
                  ~~~
                  const result2 = this.productsRepository.save({
                    ~~~,
                    productCategory: { id: productCategoryId, },
                  });
                  ~~~
                }
`//             productsRepository.save 함수 인자로 productCategory 의 id 필드 초기화하기


//      5. 상품 조회시 카테고리 연결하기

//          상품을 조회할 때 카테고리 테이블과 연결해 조회하는 방법

//          1) 상품 목록 조회 함수 수정
`               findAll(): ~~~ {
                  return this.productsRepository.find({
                    relations: ['productSaleslocation', 'productCategory'],
                  });
                }
`//             productsRepository.find 함수의 relations 속성에 'productCategory' 추가

//          2) 상품 조회 함수 수정
`               findOne(): ~~~ {
                  return this.productsRepository.findOne({
                    where: ~~~,
                    relations: ['productSaleslocation', 'productCategory'],
                  });
                }
`//             productsRepository.findOne 함수의 relations 속성에 'productCategory' 추가


//      6. 상품 등록 API + 카테고리id 요청

//          DBever 에서 카테고리 id 하나 복사해서 상품 등록 요청 보내기

//          상품 등록시 반환되는 객체에 카테고리 이름은 받을 수 없음
//          이유는 카테고리 id만 save 함수 인자로 전달했기 때문에

//          1) DBever 에서 카테고리id 값이 없는 레코드 다 지우기
//              안지우면 상품 목록 조회시 에러 발생

//          2) 상품 등록 API 요청
`               mutation {
                  createProduct(
                    createProductInput: {
                      "name": "마우스2",
                      ~~~,
                      productSaleslocation: { 
                        ~~~ 
                      },
                      productCategoryId: "1f0cb1dc-25df-456c-b394-e1c5cdd7412c"
                    }
                  ){
                    ~~~,
                    productSaleslocation { 
                      ~~~ 
                    }
                    productCategory {
                      id,
                    }
                  }
                }
`
//          3) 상품 등록 API 응답
`               {
                  "data": {
                    "createProduct": [
                      {
                        "name": "마우스2",
                        ~~~,
                        "productSaleslocation": {
                          ~~~
                        },
                        "productCategory": {
                          "id": "1f0cb1dc-25df-456c-b394-e1c5cdd7412c",
                        }
                      }
                    ]
                  }
                }
`
//          4) DBever 에 등록된 데이터 확인
//              DBever 을 확인하면 등록한 상품에 카테고리 id 값이 함께 저장된 것을
//              확인할 수 있음


//      7. 상품 조회 API + 카테고리

//          상품 조회 API 로 카테고리 id와 name을 확인할 수 있음

//          1) 상품 목록 조회 API 요청
`               query {
                  fetchProducts {
                    ~~~,
                    productCategory {
                      id,
                      name,
                    }
                  }
                }
`
//          2) 상품 목록 조회 API 응답
`               {
                  "data": {
                    "fetchProducts": [
                      {
                        ~~~,
                        "productCategory": {
                          "id": "1f0cb1dc-25df-456c-b394-e1c5cdd7412c",
                          "name": "전자제품"
                        }
                      }
                    ]
                  }
                }
`