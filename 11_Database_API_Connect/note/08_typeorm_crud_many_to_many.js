// N:M 관계 테이블에서의 데이터 저장과 조회

//      상품 테이블과 상품 태그 테이블을 조인해서 데이터를 저장하고 가져오는 방법

//      하나의 상품에 여러개의 태그, 하나의 태그에 여러개의 상품이 연결될 수 있음


// 상품 태그 테이블 연결 실습

//      1. 프로젝트 준비

//          1) 기존 프로젝트 복사
//              11-08-typeorm-crud-many-to-many 프로젝트 복제해 진행


//      2. 상품 태그를 상품 등록 DTO에 추가

//          1) 상품 등록 DTO 수정
//              create-product.input.ts
`               @InputType()
                export class CreateProductInput {
                  ~~~
                
                  @Field(() => [String])
                  productTags: string[];
                }
`//             productTags 문자열 배열 필드 추가
//              GraphQL용 배열 타입은 [String] 이렇게 써야함

//          ** 상품 등록 DTO 수정 후 상품 수정 함수에 에러 발생
//              에러 발생 이유와 해결 방법 직접 찾아보고 코드 수정해보기


//      3. 상품 등록 서비스 함수에서 태그 DB에 저장하고 반환하기

//          리졸버의 create API 함수는 수정할 필요 없음
//          이미 상품 등록 DTO에 태그 데이터가 같이 전달되기 때문

//          상품 태그 배열이 ['#전자제품', '#영등포', '#컴퓨터']와 같은 패턴이라고 가정

//          1) 인자에서 태그 받기
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  const { ~~~, productTags, ...~~~ } = createProductInput;
                  ~~~
                }
`//             createProductInput 을 구조분해할당하며 productTags 따로 뽑기

//          2) 태그 문자열의 '#' 분리하기
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  const { ~~~, productTags, ...~~~ } = ~~~;
                  ~~~
                  const tagNames = productTags.map((el) => el.replace('#', ''));
                }
`//             map() 함수를 사용해 태그 문자열의 '#'을 빈문자열('')로 바꿈
//              그리고 tagNames 배열 변수에 저장

//          3) DB에 이미 존재하는 태그 확인하기
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  ~~~
                  const tagNames = ~~~;

                  const prevTags = await this.productsTagsRepository.find({
                    where: { name: In(tagNames) },
                  });
                }
`//             인자로 받은 태그 중 DB에 이미 존재하는 태그를 조회해 prevTags에 저장
//              where: { name: In(tagNames) } : name 이 tagNames 에 포함되어 있다면

//          4) 기존 태그 제외한 태그 배열 만들기
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  ~~~
                  const tagNames = ~~~;
                  const prevTags = ~~~.find(~~~);

                  const temp = [];
                  tagNames.forEach((el) => {
                    const isExist = prevTags.find((prevEl) => el === prevEl.name);
                    if (!isExist) temp.push({ name: el });
                  });
                }
`//             temp : 새로운 태그만 저장할 배열
//              tagNames.forEach((el) => ~~~ ) : 전달받은 태그에 대해 하나씩 반복문 수행
//              prevTags.find((prevEl) => el === prevEl.name) : 기존 태그 배열에 현재 태그 있는지
//              if (!isExist) temp.push({ name: el }) : 없다면 새로운 태그 저장

//          5) DB에 태그 저장하고 태그 id 받기
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  ~~~
                  const prevTags = ~~~.find(~~~);
                  const temp = ~~~;
                  ~~~

                  const newTags = await this.productsTagsRepository.insert([...temp]);
                }
`//             레파지토리.insert() 함수 사용해 Bulk Insert 방식으로 여러 태그 한번에 저장
//              [...temp] : temp를 스프레드 해서 배열로 인자 전달
//              스프레드 안하고 그냥 insert(temp) 처럼 인자로 넣어줘도 똑같음
//              newTags : DB에 저장한 태그 id 배열

//           ** Bulk Insert 방식
//                  DB에 여러 데이터를 한번에 저장하는 방식
//                  insert() 함수 사용해 구현, save() 함수로는 구현 못함

//                  레파지토리.save()를 반복문으로 여러번 호출해 여러 데이터를 저장하면
//                  Round trip 발생: DB에 여러번 접속하는 것, 시간 오래 걸려서 비효율적

//          6) DB에 상품 저장할 때 넣어줄 태그id 배열 만들기
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  ~~~
                  const prevTags = ~~~.find(~~~);
                  const newTags = ~~~.insert(~~~);
                  ~~~

                  const tags = [...prevTags, ...newTags.identifiers];
                }
`//             기존 태그와 새로운 태그를 합쳐서 해당 상품에 대한 태그id로 DB에 저장됨
//              prevTags : 이 상품의 태그중 기존에 존재하던 태그id 배열
//              newTags.identifiers : 이 상품의 태그중 새로운 태그id 배열
//              두 배열을 스프레드 해서 tags 배열에 저장

//          7) DB에 상품 저장하며 태가id 넣어주기
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  ~~~
                  const tags = ~~~;

                  const result2 = this.productsRepository.save({
                    ...product,
                    ~~~,
                    productTags: tags,
                  });
                }
`

//      4. 상품 태그 서비스 클래스로 코드 분리하기

//          productsTagsRepository를 사용하는 함수는 ProductsService 클래스가 아니라
//           PorductsTagsService 에 있어야 함 (insert, find)

//          productsTagsRepository 에서 태그에 대한 검증 로직이 존재할 수도 있다면
//           서비스 함수로 선언하고 import해서 사용해야 하기 때문

//          1) productsTags 폴더에 productsTags.service.ts 파일 생성

//          2) ProductsTagsService 클래스 선언
`               @Injectable
                export class ProductsTagsService {
                  
                }
`
//          3) 상품태그 서비스 클래스에 productsTagsRepository 의존성 주입
`               constructor(
                  @InjectRepository(ProductTag)
                  private readonly productsTagsRepository: Repository<ProductTag>,
                ) {}
`//             생성자에서 레파지토리 private readonly로 주입
//              @InjectRepository 데코레이터 추가, 데코레이터 인자로 엔티티 명시

//          3) findByNames 함수 선언
//              DB에서 태그 이름에 해당하는 태그 아이디를 찾아오는 함수
`               findByNames({ tagNames }: IProductsTagsServiceFindByNames) {
                  return this.productsTagsRepository.find({
                    where: { name: In(tagNames) },
                  });
                }
`//             인자로 받은 태그의 이름과 일치하는 태그가 DB에 이미 존재한다면
//              해당 태그의 id들을 반환

//          4) bulkInsert 함수 선언
//              태그 DB에 여러 태그를 한번에 저장하는 함수
`               bulkInsert({ names }: IProductsTagsServiceBulkInsert) {
                  return this.productsTagsRepository.insert([...names]);
                }
`//             인자로 받은 이름들을 태그 DB에 저장하고 DB로부터 받은
//              저장한 태그 객체들을 반환

//          5) findByNames 함수 인자 타입스크립트 인터페이스로 선언
`               export interface IProductsTagsServiceFindByNames {
                  tagNames: string[];
                }
`//             string[] : 문자열 배열 타입

//          6) bulkInsert 함수 인자 타입스크립트 인터페이스로 선언
`               export interface IProductsTagsServiceBulkInsert {
                  names: {
                    name: string;
                  }[];
                }
`//             names 는 name:string 필드를 가진 객체의 배열 타입


//      5. 상품 등록 함수에 분리한 태그 서비스 함수 사용

//          1) ProductsTagsService 클래스 의존성 주입
`               constructor(
                  @InjectRepository(Product)
                  ~~~,
                  private readonly productsTagsService: ProductsTagsService,
                ) {}
`
//          2) 기존 태그 id 찾는 부분에 findByNames() 함수 적용
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  ~~~
                  const prevTags = await this.productsTagsService.findByNames(tagNames);
                  ~~~
                }
`
//          3) DB에 태그 저장하는 부분에 bulkInsert() 함수 적용
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  ~~~
                  const newTags = await this.productsTagsService.bulkInsert(temp);
                  ~~~
                }
`

//      6. Products 모듈에서 의존성 주입

//          products.module.ts 파일에서 아래 두 클래스의 의존성을 주입해줘야 사용 가능

//          1) ProductsTagsService 클래스 의존성 주입
`               providers: [
                  ~~~,
                  ProductsTagsService,
                ],
`
//          2) ProductTag 엔티티 의존성 주입
`               imports: [
                  TypeOrmModule.forFeature([
                    ~~~,
                    ProductTag,
                  ]),
                ],
`

//      7. 상품 등록 API + 상품태그 

//          상품 등록 API 요청 인자로 상품 태그를 전달해 DB에 저장할 수 있음

//          DBever 에서 확인해보면 상품마다 태그id 테이블이 존재하는건 아님
//          => 중간테이블 product_product_tags_product_tag 이 생성되고 여기에 저장됨

//          1) 상품 등록 API 요청
`               mutation {
                  createProduct(
                    createProductInput: {
                      "name": "마우스2",
                      ~~~,
                      productSaleslocation: { ~~~ }
                      productCategoryId: "1f0cb1dc-25df-456c-b394-e1c5cdd7412c",
                      productTags: ["#전자제품", "#마우스", "#영등포"]
                    }
                  ){
                    name,
                    ~~~,
                    productSaleslocation { ~~~ },
                    productTags {
                      id,
                    }
                  }
                }
`
//          2) 상품 등록 API 응답
`               {
                  "data": {
                    "createProduct": {
                      "name": "마우스2",
                      ~~~,
                      "productSaleslocation": { ~~~ },
                      "productTags": [
                        {
                          "id": "951cf9bd-882b-4a8f-a21b-d9d6e53cc55f"
                        },
                        {
                          "id": "976b7e6a-5915-467e-953a-3f7aa9b4df8b"
                        },
                        {
                          "id": "984ba53b-d332-4cbf-8957-f02a2e7fc8d0"
                        }
                      ]
                    }
                  }
                }
`//             상품의 태그 id가 응답으로 반환됨

//          3) DBever 확인하기

`               product_product_tags_product_tag 테이블 생성됨
                필드는 productId, productTagId 가 있음
`
//              상품 테이블에는 태그id가 저장되지 않음
//              태그 테이블에도 상품id가 저장되지 않음
//              상품_상품태그 중간 테이블에 (상품id - 태그id) 쌍으로 저장됨

