// 복잡한 쿼리

//          일반적으로 많이 사용되는 쿼리문들 알아보기

//      1. 집계 쿼리

//          sum(), max() 등의 함수로 어떤 값을 계산해 컬럼으로 보여주는 것

//          1) 총합 구하기
`               select name, SUM(price) as '가격총합'
                from product
                group by name
                ;
`//             SUM(price) : price 의 합계를 구하는데,
//              group by name : name 이 같은 데이터끼리 그룹핑해 SUM 연산을 함
//              as '가격총합' : 그리고 표시 필드명을 '가격총합'으로 변경

//          2) 최대값 구하기
`               select name, MAX(price) as '최대값'
                from product
                group by name
                ;
`//             MAX(price) : price 의 최대값을 구하는데,
//              group by name : name 으로 그룹핑해 MAX 연산을 함
//              as '최대값' : 표시 필드명을 '최대값'으로 변경


//      2. 정렬 쿼리

//          컬럼을 조회할 때 정렬시켜서 보여주는 방법

//          1) 내림차순으로 정렬해서 조회
`               select name, price, isSoldout
                from product
                order by price desc
                ;
`//             order by price : price 필드의 값을 기준으로 정렬해서 조회
//              desc : descending(내림차순, 큰 것부터)을 의미

//          2) 오름차순으로 정렬해서 조회
`               select name, price, isSoldout
                from product
                order by price asc
                ;
`//             order by price : price 필드의 값을 기준으로 정렬해서 조회
//              asc : ascending(오름차순, 작은 것부터)을 의미
//                    디폴트 값이 asc 이기 때문에 생략해도 됨

//          3) 두번째 정렬조건 지정
`               select name, price, isSoldout
                from product
                order by price, name asc
                ;
`//             order by price, name 
//              : price 필드의 값을 기준으로 정렬해서 조회하는데, 
//                 price 값이 똑같을 경우 다음 인자인 name을 기준으로 정렬


//      3. 서브 쿼리

//          쿼리문으로 만든 결과를 
//           select 자리에 넣어 보여주거나,
//           from 자리에 넣어 테이블처럼 쓰거나,
//           where 자리에 넣어 조건으로 사용하는 것

//          1) 스칼라 서브쿼리

//              select 자리에 쿼리문 넣기
//              서브쿼리가 한 레코드당 정확히 하나의 값을 반환해야 함

`               select name,
                       price,
                       isSoldout,
                       (select max(price) from product) as maxPrice
                  from product
                ;
`//             (select max(price) from product)
//              : 집계 쿼리문을 하나의 컬럼으로 조회

//              as maxPrice
//              : 서브쿼리를 maxPrice 축약어로 사용

//          2) 인라인 뷰

//              from 자리에 쿼리문 넣기
//              서브쿼리로 만든 임시 테이블을 from 범위에 넣어 사용
//              서브쿼리의 결과가 반드시 하나의 테이블로 리턴되어야 함

`               select name, price,
                from (
                     select * 
                     from product
                     where price >= 1000
                     )
                where isSoldout = false
                ;
`//             from ( select ... )
//              : 서브쿼리의 결과 테이블을 from 이 받아 메인 쿼리를 수행

//          3) 중첩 서브쿼리

//              where 자리에 쿼리문 넣기
//              결과집합을 한정하기 위한 서브쿼리
//              서브쿼리가 메인쿼리의 컬럼을 참조할 때 상관관계가 있음
//              (단일행, 다중행을 반환할 수 있음)

//              예시 1)
`               select name, price
                from product
                where price <= (select avg(price) from product)
                ;
`//             서브쿼리로 product 테이블의 평균 가격을 구하고
//               그 평균 가격보다 낮은 가격의 물품의 이름과 가격을 조회

//              예시 2)
`               select name, price
                from product
                where productSaleslocationId = (
                                        select id
                                        from productSaleslocation
                                        where address = '수성구'
                                        )
                ;
`//             서브쿼리로 판매주소가 수성구인 판매위치ID 를 구하고
//               판매위치ID가 일치하는 product를 찾아 이름과 가격을 조회


// ANSI-SQL

//      ANSI-SQL 이란?

//          미극 표준 협회에서 만든 공통표준 SQL
//          여러 SQL DB끼리 쿼리문 문법이 맞지 않아서 만들어짐

//          MySQL 쿼리문이랑 문법이 좀 다름

//      MySQL과의 차이점

//          WHERE 대신 ON 사용

//          MySQL 에서는 두 테이블을 조인할 때
`           from product p, product_saleslocation ps
`//         FROM 절 안의 두 테이블 사이에 쉼표(,)만 붙이는데

//          ANSI-SQL 에서는 두 테이블을 조인할 때
`           from product p inner join product_saleslocation ps
`//         FROM 절 안의 두 테이블 사이에 inner join 절을 붙임