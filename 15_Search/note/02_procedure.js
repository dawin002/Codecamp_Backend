// Procedure

//      Procedure 란?

//          데이터베이스에 존재하는 함수
//          데이터베이스 내에서도 조건문, 반복문 등의 코드 작성이 가능함

// Procedure 실습

//      강의자료 참고해 DBever 에서 실습 진행

//      1. procedure 선언
`           create procedure 함수이름()
            begin
            
            end;
`//         중괄호 대신 begin 과 end 키워드 사용


//      2. 변수 선언 및 초기화
`           create procedure 함수이름()
            begin
                declare i int default 1;

            end;
`//         const 대신 declare 키워드로 변수 선언

//          = 대신 default 키워드로 변수 초기화


//      3. 반복문 사용
`           create procedure 함수이름()
            begin
                declare i int default 1;
                while i <= 5000000 do
                    (반복할 내용)
	            	set i = i + 1;
	            end while;
            end;
`//         반복문 내용 중괄호 대신 do 키워드 사용
//          i값 증가 코드 앞에 set 키워드 사용


//      4. 반복문으로 데이터 추가하기
`           create procedure 함수이름()
            begin
                declare i int default 1;
                while i <= 5000000 do
                    insert into board(writer, title, contents) values('철수', rand(), '반갑습니다');
	            	set i = i + 1;
	            end while;
            end;
`//         insert : 데이터 삽입
//          into 테이블명(필드명1, 필드명2, ...) : 삽입할 테이블, 속성 지정
//          values(데이터1, 데이터2, ...) : 삽입할 데이터 지정 (지정한 필드와 순서 맞춰야함)


//      ** procedure 선언문을 실행할 때는 선언문 코드 전체를 드래그해서 컨트롤+엔터 해야함


//      5. procedure 목록 확인
`           show procedure status;
`

//      6. procedure 실행하기
`           call 함수이름();
`//         더미 데이터 생성 procedure 는 10분정도씩 걸릴수도 있음

