// SQL Query문


// DBever SQL Query문 실습

//      1. DBever 로 DB 열기

//          1) MySQL 실행
`               net start mysql
`
//          2) SQL 편집기 열기
//              왼쪽 상단의 SQL 버튼 클릭
//              MySQL shell에 접속하는 것과 동일


//      2. Query문 기본 규칙

//          1) query문 끝 세미콜론(;)
//              세미콜론 빠뜨리면 그 다음 명령어와 한 줄로 인식
//              문장 끝에 쓰면 헷갈리기 때문에 문장 다음줄에 쓰면 좋음
`               show databases
                ;
`
//          2) 명령어 한 줄 실행
//              실행하려는 명령어에 커서를 올리고 컨트롤+엔터 누름
//              현재 커서가 올라가있는 한 줄만 실행됨

//          3) 큰 따옴표와 작은 따옴표
//              MySQL에서는 큰따옴표("")와 작은따옴표('')가 큰 차이 없으나,
//              다른 SQL DB는 대부분 작은따옴표('')를 사용


//      3. 데이터베이스 관련 Query문

//          1) 데이터베이스 목록 조회
`               show databases
                ;
`
//          2) 데이터베이스 사용
`               use myproject
                ;
`//             앞으로 입력하는 명령어는 myproject 데이터베이스를 기준으로 실행한다는 뜻


//      4. 테이블 관련 Query문

//          1) 테이블 목록 조회
`               show tables
                ;
`//             현재 데이터베이스의 테이블 목록 조회

//          2) 테이블 상세 설명 조회
`               desc product
                ;
`//             product 테이블의 상세 설명 조회
//              왼쪽 DB 구조에서 product 테이블을 더블클릭했을 때와 동일한 동작


//      5. 데이터 관련 Query문

//          1) 데이터 조회
`               select * from product
                ;
`//             모든 데이터를 조회 product 테이블에서

//          2) 데이터 추가
`               insert into product(id, name, description, price)
                values(uuid(), '마우스', '정말 좋은 마우스입니다!', 15000)
                ;
`//             product 테이블에 id, name, description, price를 채운 데이터 추가
//              values에 그 필드의 실제 값을 넣어 데이터 초기화
//              uuid() : uuid를 알아서 생성하는 함수

//          3) (주의!!!) 모든 데이터 삭제
`               delete from product (쓰지마XXX)
`//             where절(조건) 없이 삭제하면 테이블의 모든 데이터가 삭제됨

//          4) 데이터 삭제
`               delete from product
                where name = '셔츠' 
                ;
`//             product 테이블에서 name 필드 값이 '셔츠'인 데이터를 삭제

//          5) (주의!!!) 모든 데이터 수정
`               update product (쓰지마XXX)
                set price = 18000
                ;
`//             where절(조건) 없이 수정하면 테이블의 모든 데이터의 필드가 일괄 수정됨

//          6) 데이터 수정
`               update product
                set price = 18000
                where name = '마우스' 
                ;
`//             product 테이블의 name이 '마우스'인 데이터의 price 값을 18000으로 수정


//      6. 테이블 조인 관련 Query문

//          1) 연결할 데이터 준비
//              product_saleslocation 테이블에 데이터 추가
`               insert into product_saleslocation(id, address, addressDetail, lat, lng, meetingTime)
                values(uuid(), '구로구', '구로디지털단지', 37.281734, 127.192483, '2024-04-21')
                ;
`
//          2) 두 테이블의 데이터 연결하기
//              saleslocation의 구로구 데이터의 id가 product의 마우스 데이터의 
//               productSaleslocationId 에 연결되어야 함
`               update product 
                set productSaleslocationId = 'b52d8baa-ffc2-11ee-89f4-c87f545065bb'
                where name = '마우스'
                ;
`//             일단 product_saleslocation 테이블의 구로구 데이터 id 복사해서 넣어주기

//          3) 두 테이블 조인해서 조회하기
`               select product.id, name, price, address, addressDetail
                from product, product_saleslocation
                where product.productSaleslocationId = product_saleslocation.id 
                ;
`//             select 로 조회할 데이터 선택,
//              from 으로 조회할 두 테이블 지정,
//              where 로 조인할 기준 설정

//          4) as 사용해 더 보기 쉽게 바꾸기
`               select p.id, name, price, address, addressDetail as '상세주소'
                from ...
                where ...
                ;
`//             조회 결과 창에 addressDetail 필드명이 상세주소 로 바뀌어서 표식됨

//          5) 축약어 사용해 코드 간결하게 하기
`               select p.id, name, price, address, addressDetail
                from product p, product_saleslocation ps
                where p.productSaleslocationId = ps.id
                ;
`//             테이블명 뒤에 한칸 띄우고 단어를 쓰면 그 단어를 축약어로 지정할 수 있음
//              쿼리문에서 테이블명 대신 축약어로 작성할 수 있게 된 것


//      7. 추가 기능

//          1) 조건에 and 달기
`               update product
                set isSoldout = true 
                where name = '노트북' 
                and price = 2000000
                ;
`//             where절 뒤에 and를 사용해 '그리고' 조건을 더 달 수 있음

//          2) 조건에 or 달기
`               update product
                set isSoldout = true 
                where name = '노트북' 
                or price = 2000000
                ;
`//             where절 뒤에 or을 사용해 '또한' 조건을 더 달 수 있음


//      8. 주석 쉽게 다는 방법

//          '컨트롤 + /' 키는 한 줄만 주석 처리 단축키
//          한 줄만 주석을 달면 이렇게 주석처리됨
`               -- select *
`
//          1) 이럴 땐 주석을 달기 애매해
`               select *
                from product
                -- where name = '마우스'
                and price = 5000
                and isSoldout = false 
                ;
`//             and 조건을 많이 걸어두고 하나씩 주석 처리하며 일치하는 데이터를 조회하려 한다
//              여기서 price와 isSoldout은 주석을 달아서 조건을 제외할 수 있으나
//              name은 주석을 달면 where 자체가 주석 처리되어 조건에서 제외하기 귀찮다

//          2) 당연히 참인 조건을 달자
`               select *
                from product p
                where 1 = 1
                -- and name = '마우스'
                and price = 5000
                and isSoldout = false 
                ;
`//             name 필드도 and 조건으로 달아두고 where 문에는 당연히 참인 조건을 걸면
//              name 필드도 주석 처리로 where 조건에서 쉽게 제외할 수 있다

//          ** 단, UPDATE 나 DELETE 문에서는 사용하지 말자
//              실수로 모든 and 조건을 주석처리하는 경우 모든 데이터가 수정되거나 삭제됨