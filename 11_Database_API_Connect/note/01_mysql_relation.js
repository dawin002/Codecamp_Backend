// ORM을 사용한 API 구현

//          ORM을 활용해 상품 테이블을 코드로 구현

//      엔티티 연결 방법

//          1. 연결할 두 엔티티를 생성

//          2. 연결되는 FK 필드를 합쳐질 엔티티에 생성
//              N:M 관계의 경우 양쪽에 모두 생성

//          3. 관계에 따라 FK 필드에 데코레이터 달아줌
//              1:1 / N:1 / N:M 관계에 따라 데코레이터 다름

//          4. N:M 관계의 경우 중간 테이블 선택적으로 생성
//              일반적으론 중간 테이블이 자동적으로 생성되지만,
//              반드시 직접 생성해줘야 하는 경우도 있음

//          * N:M 관계의 중간 테이블을 직접 만들어줘야 하는 경우
//              중간 테이블이 단순히 두 테이블을 연결해주기만 하는 역할이 아닌
//              추가적인 다른 필드가 포함되어야 하는 경우 직접  중간 테이블을 생성해야 하고
//              세 테이블을 1:N, N:1 관계로 풀어서 생성해줘야함

//      엔티티 데코레이터 종류

//          엔티티
//              @Entity()

//          키 필드
//              @PrimaryGeneratedColumn()

//          일반 필드
//              @Column()

//          1:1 연결 FK 필드
//              @JoinColumn()  // 중심이 되는 엔티티 명시 역할
//              @OneToOne(() => 연결엔티티)

//          N:1 연결 FK 필드
//              @ManyToOne(() => 연결엔티티)
//              * 1:N과 데코레이터 다름!

//          N:M 연결 FK 필드
//              @JoinTable()  // 중간테이블 생성됨, 두 엔티티중 한군데에 달면 됨
//              @ManyToMany(() => 연결엔티티, (FK필드명) => FK필드명.상대가나를선언한필드명)


// ORM 사용 실습

//      0. 프로젝트 복제

//          1) 09-09-nestjs-with-typeorm-api_docker 프로젝트 복제


//      1. 엔티티 폴더와 파일 구조 생성

//          1) products 폴더 내에 엔티티 폴더와 파일 생성
`               src/apis/products/entities 폴더 생성
                product.entity.ts 파일 생성
`
//          2) users 폴더 내에 엔티티 폴더와 파일 생성
`               src/apis/users/entities 폴더 생성
                user.entity.ts 파일 생성
`
//          3) apis 안에 나머지 폴더, 엔티티 폴더, 엔티티 파일 생성
`               productsCategories 폴더 생성
                productsTags 폴더 생성
                productsSaleslocations 폴더 생성
                
                각 폴더 안에 entities 폴더 생성

                productCategory.entity.ts 파일 생성
                productTag.entity.ts 파일 생성
                productSaleslocation.entity.ts 파일 생성
`

//      2. product 엔티티 작성

//          1) 기본 클래스 구조 작성
`               export class Product {
                    id: string

                    name: string

                    description: string

                    price: number

                    isSoldout: boolean
                }
`
//          2) 엔티티로 바꾸기
//              데코레이터 달아서 엔티티로 바꾸기
`               import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

                @Entity()
                export class Product {
                    @PrimaryGeneratedColumn('uuid')
                    id: string;

                    @Column()
                    name: string;

                    ...

                    @Column({ default: false })
                    isSoldout: boolean;
                }
`//             @Entity()
//              : 엔티티 데코레이터

//              @PrimaryGeneratedColumn('uuid')
//              : 자동 생성되는 키, uuid 형식의 아이디로 초기화됨

//              @Column({ default: false }
//              : 디폴트 값으로 false로 초기화
//                boolean 필드의 데코레이터에 타입을 명시 안하면 디폴트로 tinyint가 들어감 (0 or 1)

//              FK(외래키) 3개가 더 추가되어야 하는데 나중에 연결할 수 있음


//      3. 다른 테이블도 엔티티 작성

//          1) productCategory
//              ProductCategory 클래스

//              id: string
//              name: string

`               @Column({ unique: true })
                name: string;
`//             unique: 중복된 값의 생성을 방지해줌

//          2) productSaleslocation
//              ProductSaleslocation 클래스

//              id: string
//              address: string
//              addressDetail: string
//              lat: number
//              lng: number
//              meetingTime: Date

`               @Column({ type: 'decimal', precision: 9, scale: 6 })
                lat: number;

                @Column({ type: 'decimal', precision: 9, scale: 6 })
                lgn: number;
`//             type: 'decimal', precision: 9, scale: 6
//              타입: 실수, 총 9자리, 소수점 아래 6자리

//          3) productTag
//              ProductTag 클래스

//              id: string
//              name: string

//          4) user
//              User 클래스

//              id: string
//              name: string
//              email: string


//      4. 엔티티 연결

//          1:1, 1:N, N:M 엔티티 연결 및 FK 명시

//          1) 1:1 관계 연결 - Product : ProductSaleslocation

`               @JoinColumn()
                @OneToOne(() => ProductSaleslocation)
                productSaleslocation: ProductSaleslocation;
`//             @JoinColumn()
//              : 1대1 연결에서는 어떤 테이블이 중심인지 모르기 때문에 @JoinColumn을 달아서
//                이 필드가 중심이 됨을 명시해줌

//              @OneToOne(() => ProductSaleslocation)
//              : 1대1 연결에 사용되는 FK 필드
//                인자로 어떤 엔티티와 연결되는지 작성
//                Product(1) 와 ProductSaleslocation(1) 엔티티를 1:1 관계로 연결

//              ProductSaleslocation
//              : 상품판매위치 타입
//                상품판매위치 엔티티 클래스를 import해서 그대로 타입으로 사용 가능

//          2) N:1 관계 연결 - Product : ProductCategory

`               @ManyToOne(() => ProductCategory)
                productCategory: ProductCategory;
`//             @ManyToOne()
//              : N:1 연결에 사용되는 FK 필드
//                Product(N) 와 ProductCategory(1) 엔티티를 N:1 관계로 연결

//          3) N:1 관계 연결 - Product : User
`               @ManyToOne(() => User)
                user: User;
`//             @ManyToOne(() => User)
//              : Product(N) 와 User(1) 엔티티를 N:1 관계로 연결

//          4) N:M 관계 연결 - Product : ProductTag

//              Product 와 ProductTag 클래스 양쪽에 FK 선언

//              FK 필드 선언시 N:M 관계이기 때문에 복수형으로 명명

//              FK 필드의 타입은 N:M 관계이기 때문에 배열로 지정

//              @ManyToMany() 데코레이터 인자
//                  - 상대 엔티티
//                  - 상대 엔티티가 이 필드를 선언한 이름

//              두 엔티티중 한 군데에 @JoinTable() 데코레이터 추가 


//            4-1) Product 엔티티에 productTags FK 필드 생성

`               @ManyToMany(() => ProductTag, (productTags) => productTags.products)
                productTags: ProductTag[];
`//             @ManyToOne( ... , ... )
//              : 엔티티를 N:M 관계로 연결

//              () => ProductTag
//              : ProductTag 엔티티와 연결됨

//              (productTags) => productTags.products
//              : 상대방 엔티티가 나를 products 필드명으로 선언함

//              productTags: ProductTag[];
//              : 복수형으로 FK 필드 명명, 상대 클래스 타입의 배열로 타입 명시


//            4-2) ProductTags 엔티티에 products FK 필드 생성

`               @ManyToMany(() => Product, (products) => products.productTags)
                products: Product[];
`//             @ManyToOne( ... , ... )
//              : 엔티티를 N:M 관계로 연결

//              () => Product
//              : Product 엔티티와 연결됨

//              (products) => products.productTags)
//              : 상대방 엔티티가 나를 productTags 필드명으로 선언함

//              productTags: ProductTag[];
//              : 복수형으로 FK 필드 명명, 상대 클래스 타입의 배열로 타입 명시


//      5. 앱 모듈에 엔티티 등록

//          app.module.ts 파일의 TypeOrmModule 에 등록해야 함

//          방법 1) entities 배열에 직접 추가

//              TypeOrmModule 의 entities 에 전부 넣어야 하는데 시간 오래 걸림
`               entities: [Board, Product, ProductCategory, ... ],
`
//          방법 2) 모든 폴더를 순회하며 entity 파일 찾아 알아서 추가

//              현위치부터 시작해 apis 폴더의 모든 하위 폴더를 순회하며 이름에 .entity.가
//               들어가는 파일을 모두 entities 배열에 자동으로 추가
`               entities: [__dirname + '/apis/**/*.entity.*'],
`//             ** : 모든 하위 폴더를 순회 탐색
//              *.entity.* : 이름 중간에 .entity. 가 들어간 파일

//              *.entity.ts 안쓰는 이유는 프로그램 실행시 ts 파일은 js 파일로 변환되기 때문
//              => *.entity.* 쓰거나 *.entity.js 로 쓰면 됨

//      6. MySQL로 테이블 생성 확인하기

//          1) MySQL 실행 안되어 있으면 실행
//              Windows PowerShell (관리지 권한)에 명령어 입력
`               net start mysql
`
//          2) 서버 실행
//              프로젝트 폴더 통합 터미널에서 열어 명령어 입력
`               yarn start:dev
`
//          3) DBeaver 에서 테이블 확인
//              DBeaver 프로그램 실행해 mysql - localhost 접속
//              mysql/Databases/myproject/Tables 들어가서 만든 테이블 있는지 확인

//            * 중간 테이블 product_product_tags_product_tag 자동으로 만들어져 있음
//              필드는 productId, productTagId 가 생성되어 있고 둘 다 PK(주키)