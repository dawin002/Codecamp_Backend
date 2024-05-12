// 1:1 관계 테이블에서의 데이터 저장과 조회


//          상품 테이블과 상품 거래 위치 테이블을 조인해서 데이터를 가져오는 방법

// 상품 등록 API 수정

//      11-05-typeorm-soft-delete 프로젝트 복제해 진행

//      상품을 등록할 때 위치 정보까지 인자로 포함해 등록하도록 수정

//      1. 상품 판매 위치 DTO 생성

//          상품 등록 DTO의 productSaleslocation 필드의 타입으로 사용될 DTO 클래스 생성

//          ProductsSaleslocation 엔티티 클래스에서 id 값만 제외하고 생성하면 됨
//          => 유틸리티 타입 Omit 타입 사용

//          id 값을 빼는 이유는 id는 필수 입력인데 아직 생성이 안되어서 제외해야함

//          1) 상품 판매 위치 DTO 파일 생성
`               productsSaleslocation/dto 폴더 생성
                product-saleslocation.input.ts 파일 생성
`//             파일 이름의 products 에서 s 뺀 이유는 DB 파일을 그대로 가져왔기 때문

//          2) 상품 판매 위치 DTO 클래스 선언
`               @InputType()
                export class ProductSaleslocationInput extends OmitType(
                  ProductSaleslocation,
                  ['id'],
                  InputType,
                ) {}
`//             @InputType() : DTO 클래스를 의미
//              extends OmitType( : 원본 클래스에서 일부를 제외한 클래스 상속
//                ProductSaleslocation, : 상품 판매 위치 엔티티 클래스
//                ['id'],               : 제외할 필드
//                InputType,            : 원본 클래스를 DTO로 변환해 가져옴
//                                        (ObjectType 클래스 -> InputType 클래스)

//      2. 상품 등록 DTO 수정

//          1) 상품 판매 위치 필드 추가
`               @InputType()
                export class CreateProductInput {
                  ~~~
                  @Field(() => ProductSaleslocationInput)
                  productSaleslocation: ProductSaleslocationInput;
                }
`//             productSaleslocation: ProductSaleslocationInput
//              : 상품 판매 위치 필드와 상품 판매 위치 DTO 타입스크립트


//      3. 상품 등록 API 함수는 수정 안해도 됨

//          상품 등록 DTO에서 이미 상품 위치 정보를 같이 받아서,
//          상품 등록 서비스 함수로 DTO 객체를 통째로 넘기기 때문


//      4. 상품 등록 서비스 함수 수정

//          상품 등록 서비스 함수 create() 수정

//          1) 상품과 상품판매위치 인자로 받아 분리하기
`               create({ createProductInput }: IProductsSeviceCreate): Promise<Product> {
                  const { productSaleslocation, ...product } = createProductInput;
                }
`//             rest 파라미터 사용해 인자로 받은 createProductInput DTO 객체를
//              productSaleslocation 과 product 로 분리

//          2) 상품판매위치 DB에 저장
`               create({ ~~~ }: ~~~): ~~~ {
                  ~~~
                  this.productsSaleslocationsRepository.save({
                    ...productSaleslocation,
                  });
                }
`//             productsSaleslocationsRepository.save() 로 DB에 위치 저장
//              스프레드 연산자 사용해 한번에 productSaleslocation 의 모든 필드 넘겨주기

//              * productsSaleslocationsRepository 는 아직 생성 안함

//          3) 상품 DB에 저장 (아직 틀림)
`               create({ ~~~ }: ~~~): ~~~ {
                  ~~~

                  this.productsSaleslocationsRepository.save({ ~~~ });

                  this.productsRepository.save({
                    ...product,
                  });
                }
`//             productsRepository.save 로 DB에 상품 저장
//              스프레드 연산자 사용해 product 의 모든 필드 한번에 넘겨줌

//          4) 상품 DB에 상품판매위치 id 값 채워주기

//              productsSaleslocationsRepository.save()에서 반환된 id 값을 
//              productsRepository.save()에 전달해 DB에 같이 저장해야함

`               async create({ ~~~ }: ~~~): ~~~ {
                  ~~~
                  const result = await this.productsSaleslocationsRepository.save({ ~~~ });

                  this.productsRepository.save({
                    ...product,
                    productSaleslocation: {
                      id: result.id,
                    },
                  });
                }
`//             productsSaleslocationsRepository.save() 의 결과 객체를 비동기로 받아서
//              productsRepository.save() 인자의 productSaleslocation 안에 id 값 넣어 저장
//              result 는 비동기 처리되어야 하므로 async await

//          5) 상품 등록 결과 반환시 모든 정보 반환하기

//              productsRepository.save()의 결과를 반환하면 상품판매위치는 id값만 반환됨
//              (save 함수의 인자로 들어간 데이터만 save 함수가 반환해주기 때문)

//              => productsRepository.save()의 productSaleslocation 필드를 통째로
//                 productsSaleslocationsRepository.save()의 결과로 초기화 해주는 것이 좋음

`               async create({ ~~~ }: ~~~): ~~~ {
                  ~~~
                  const result = await this.productsSaleslocationsRepository.save({ ~~~ });

                  const result2 = this.productsRepository.save({
                    ...product,
                    productSaleslocation: result,
                  });

                  return result2;
                }
`//             productSaleslocation: result
//              : 상품 save() 인자로 상품판매위치 save() 결과를 통째로 넣어줌
//              => 상품 save() 결과에 상품판매위치의 모든 필드가 포함됨


//      5. 상품판매위치 서비스 클래스로 코드 분리

//          위에서 사용했던 상품판매위치 레파지토리 관련 코드는 사실 ProductsService
//          클래스가 아니라 ProductsSaleslocationsService 클래스에 있어야 함

//          상품 서비스 클래스에서 상품판매위치 레파지토리를 직접 사용하면 안되는 이유는
//           여러 곳에서 다른 클래스의 레파지토리에 직접 접근하면 검증 로직을 통일시킬 수 없기 때문

//          따라서 관련 코드를 ProductsSaleslocationsService 클래스로 분리

//          1) porductsSaleslocations.service.ts 파일 생성
//              src/apis/productsSaleslocations 폴더에 생성

//          2) ProductsSaleslocationsService 클래스 선언
`               @Injectable()
                export class ProductsSaleslocationsService {
                    
                }
`//             의존성 주입 보낼 수 있게 @Injectable 데코레이터 추가

//          3) 상품 서비스 클래스에 의존성 주입
//              ProductsService 클래스의 생성자에서 의존성 주입
`               constructor(
                  ~~~,
                  private readonly productsSaleslocationsService: ProductsSaleslocationsService,
                ) {}
`//             ProductsSaleslocationsService 임포트해서 사용
//              private readonly 로 주입해서 필드 선언 및 초기화 생략

//          4) 상품판매위치 등록 함수 선언
//              ProductsSaleslocationsService 클래스에 선언
`               async create({ productSaleslocation }) {
                  return this.productsSaleslocationsRepository.save({
                    ...productSaleslocation,
                  });
                }
`//             상품 등록 서비스 함수의 productsSaleslocationsRepository.save() 코드를
//               상품판매위치 등록 함수로 이동

//          5) 상품판매위치 등록 함수 사용
`               async create({ ~~~ }: ~~~): ~~~ {
                  ~~~
                  const result = await this.productsSaleslocationsService.create({
                    productSaleslocation,
                  });
              
                  const result2 = this.productsRepository.save({ ~~~ });
                  return result2;
                }
`//             productsSaleslocationsRepository.save() 함수는 삭제
//              productsSaleslocationsService.create() 함수 사용해 상품판매위치를
//               DB에 저장하고 객체를 반환받음

//          6) 상품판매위치 레파지토리 주입받기
//              ProductsSaleslocationsService 클래스의 생성자에서 주입 받아야함
`               constructor(
                  @InjectRepository(ProductSaleslocation)
                  private readonly productsSaleslocationsRepository: 
                    Repository<ProductSaleslocation>,
                ) {}
`//             ProductSaleslocation 엔티티의 레파지토리 주입받아 생성하기


//      6. 상품 모듈에 의존성 주입

//          ProductsModule 에 사용하는 클래스들의 의존성을 주입해야함

//          1) 상품판매위치 서비스 클래스 의존성 주입
`               providers: [
                  ~~~,
                  ~~~,
                  ProductsSaleslocationsService,
                ],
`//             서비스 클래스는 providers 에 작성

//          2) 상품판매위치 엔티티 클래스 의존성 주입
`               imports: [
                  TypeOrmModule.forFeature([
                    ~~~,
                    ProductSaleslocation,
                  ]),
                ],
`//             엔티티 클래스는 imports의 TypeOrmModule.forFeature 인자에 작성


// 상품 조회 API 수정

//      1. 상품 목록 조회 서비스 함수 수정

//          1) ProdcutService 의 findAll() 함수 수정
`               findAll(): Promise<Product[]> {
                  return this.productsRepository.find({
                    relations: ['productSaleslocation'],
                  });
                }
`//             productsRepository.find() 함수에 relations 추가
//              => relations으로 적힌 테이블이 조인되어 조회 결과가 반환됨

//      2. 상품 상세 조회 서비스 함수 수정

//          1) ProdcutService 의 findOne() 함수 수정
`               findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
                  return this.productsRepository.findOne({
                    where: { id: productId },
                    relations: ['productSaleslocation'],
                  });
                }
`//             productsRepository.find() 함수에 relations 추가
//              => relations으로 적힌 테이블이 조인되어 조회 결과가 반환됨


// API 실행 테스트

//      1. DB 기존 데이터 삭제

//          DB에 있는 기존의 데이터는 모두 삭제하는 것이 좋음
//          상품판매위치id 값으로 null이 들어가있는 데이터가 있기 때문
//          => 상품 조회에서 에러가 발생할 수도 있음

//          1) product, product_saleslocation 테이블의 데이터 지우기
//              삭제할 행 선택한 뒤 아래의 '로우 삭제' 버튼 클릭 후 'Save' 버튼 클릭

//      2. 상품 등록하기

//          상품을 등록했을 때 요청으로 보낸 상품판매위치도 같이 반환되는지 확인

//          1) 상품 등록 API 요청
`               mutation {
                  createProduct(
                    createProductInput: {
                      name: "마우스",
                      description: "짱 좋은 마우스",
                      price: 5000,
                      productSaleslocation: {
                        address: "수성구",
                        addressDetail: "매호동",
                        lat: 120.1234,
                        lng: 27.1234,
                        meetingTime: "2024-04-28",
                      }
                    }
                  ){
                    id,
                    name,
                    description,
                    price,
                    productSaleslocation {
                      id,
                      address,
                      addressDetail,
                      lat,
                      lng,
                      meetingTime,
                    }
                  }
                }
`
//          2) 상품 등록 API 응답
`               {
                  "data": {
                    "createProduct": {
                      "id": "fd3e2e7b-8919-45fa-a1c8-8f02a12495c3",
                      "name": "마우스",
                      "description": "짱 좋은 마우스",
                      "price": 5000,
                      "productSaleslocation": {
                        "id": "9b46d5a6-cee0-43ab-81a0-7eaa3b6783f2",
                        "address": "수성구",
                        "addressDetail": "매호동",
                        "lat": 120.1234,
                        "lng": 27.1234,
                        "meetingTime": "2024-04-28T00:00:00.000Z"
                      }
                    }
                  }
                }
`//             상품 등록시 상품판매위치 정보도 조회할 수 있음

//          => DBeaver 에서 확인해보면 product 테이블과 product_saleslocation 양 쪽에
//             등록한 상품의 정보가 들어가있음

//      3. 상품 조회하기

//          상품을 조회했을 때 product_saleslocation 테이블이 product 테이블에 연결되어
//          상품판매위치까지 조회할 수 있는지 확인

//          1) 상품 조회 API 요청
`               query {
                  fetchProducts {
                    id,
                    name,
                    description,
                    price,
                    productSaleslocation {
                      id,
                      address,
                      addressDetail,
                      lat,
                      lng,
                      meetingTime,
                    }
                  }
                }
`
//          2) 상품 조회 API 응답
`               {
                  "data": {
                    "fetchProducts": [
                      {
                        "id": "fd3e2e7b-8919-45fa-a1c8-8f02a12495c3",
                        "name": "마우스",
                        "description": "짱 좋은 마우스",
                        "price": 5000,
                        "productSaleslocation": {
                          "id": "9b46d5a6-cee0-43ab-81a0-7eaa3b6783f2",
                          "address": "수성구",
                          "addressDetail": "매호동",
                          "lat": 120.1234,
                          "lng": 27.1234,
                          "meetingTime": "2024-04-28T00:00:00.000Z"
                        }
                      }
                    ]
                  }
                }
`//             상품을 조회했을 때 상품판매위치도 조회할 수 있음