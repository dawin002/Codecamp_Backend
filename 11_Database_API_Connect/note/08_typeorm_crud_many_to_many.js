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
                  const { ~~~, productTags, ...~~~ } = ~~~;
                  ~~~
                  const tagNames = ~~~;

                  const prevTags = await this.productsTagsRepository.find({
                    where: { name: In(tagNames) },
                  });
                }
`//             인자로 받은 태그 중 DB에 이미 존재하는 태그를 조회해 prevTags에 저장
//              where: { name: In(tagNames) } : name 이 tagNames 에 포함되어 있다면

//          4) 태그 DB에 저장 (실제로 안함X)
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  const { ~~~, productTags, ...~~~ } = ~~~;
                  ~~~
                  const tagNames = ~~~;
                  const prevTags = ~~~;

                  this.productsTagsRepository.insert([...tagNames]);
                }
`//             레파지토리.insert() 함수 사용해 Bulk Insert 방식으로 여러 태그 한번에 저장
//              [...tagNames] : tagNames를 스프레드 해서 배열로 인자 전달

//           ** Bulk Insert 방식
//                  DB에 여러 데이터를 한번에 저장하는 방식
//                  insert() 함수 사용해 구현, save() 함수로는 구현 못함

//                  레파지토리.save()를 반복문으로 여러번 호출해 여러 데이터를 저장하면
//                  Round trip 발생: DB에 여러번 접속하는 것, 시간 오래 걸려서 비효율적

//          5) DB에 기존 태그 제외하고 저장하기

//          6) DB에 저장한 태그ID 받기
`               async create({ ~~~ }: ~~~ ): ~~~ {
                  const { ~~~, productTags, ...~~~ } = ~~~;
                  ~~~
                  const tagNames = ~~~

                  const this.productsTagsRepository.insert([...tagNames]);
                }
`