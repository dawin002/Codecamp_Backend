// MySQL

// MySQL 설치

//      1. MySQL 로컬에 설치하기 

//          C드라이브 아닌 곳에 설치하는 방법

//          1) MySQL 압축 파일 다운로드
//              mysql.com 접속
//              -> Downloads
//              -> MySQL Community (GPL) Downloads
//              -> MySQL Community Server
//              -> Windows (x86, 64-bit), ZIP Archive 다운로드 버튼

//          2) 설치할 곳에 압축 해제

//          3) 명령 프롬프트 관리자 권한으로 실행 

//          4) 압축 푼 mysql 폴더 안의 bin 폴더로 이동

//          5) 설치 명령어 입력
`               mysqld --initialize
                mysqld --install
`
//      2. MySQL 초기 설정

//          1) MySQL 실행
`               net start mysql 명령어 입력
`
//          2) 임시 root 비밀번호 확인
//              mysql 폴더 -> data 폴더 -> DESKTOP~.err 파일 열기
//              root@localhost: 뒤의 임시 비밀번호 복사

//          3) MySQL 로그인
`               mysql -u root -p
                임시 비밀번호 붙여넣기(마우스 우클릭)
`
//          4) 비밀번호 수정
`               ALTER USER 'root'@'localhost' IDENTIFIED BY '새로운 비밀번호';
`//             새로운 비밀번호 4자리로 설정했고 '' 붙여야함 ('1234')

//          5) MySQL 재접속 확인
`               exit
                mysql -u root -p
                1234(비밀번호)
`
//      3. MySQL 환경 변수 등록

//          1) 시스템 환경 변수 등록
//              윈도우 검색창에 시스템 환경 변수 편집 검색
//              -> 환경 변수 클릭
//              -> 시스템 변수의 Path 클릭 후 편집
//              -> 찾아보기 클릭
//              -> MySQL 설치 폴더의 bin 폴더 선택
//              -> 확인 확인 확인

//          2) 환경변수 등록 확인
//              Windows PowerShell 관리자 권한으로 열기
`               mysql -u root -p
                비밀번호 4자리
`//             에러 없이 실행되는지 확인 (mysql 명령어 인식하는 지)


// MySQL 켜고 끄기 명령어

//          Windows PowerShell 에서 명령어를 통해 켜고 끌 수 있음
//           아니면 윈도우 서비스에서 찾아 수동으로 꺼야됨

//          Windows PowerShell 은 관리자 권한으로 실행하기

//          1) MySQL 서비스 시작 명령어
`               net start mysql
`
//          2) MySQL 서비스 종료 명령어
`               net stop mysql
`

// DBeaver (DB 관리 툴) 설치

//          DBeaver는 설치 드라이브 선택 가능해서 installer 다운받아 설치하면 됨

//          1) DBeaver 설치 파일 다운로드
//              https://dbeaver.io 접속
//              -> DBeaver Community 다운로드 버튼 클릭
//              -> Windows (installer) 다운로드

//          2) DBeaver 설치
//              설치 위치만 변경하고 다 추천하는 대로 하면 됨


// MySQL 실습

//      1. Windows Powershell 에서 MySQL 실행

//          1) Windows Powershell 열기

//          2) MySQL 쉘 접속 (명령어 입력)
`               mysql -u root -p
                1234 (비밀번호 4자리)
`//             -u : 유저 아이디
//              root : 관리자 계정을 의미
//              -p : 비밀번호 입력


//      2. MySQL 명령어 실습

//          1) 데이터베이스 목록 조회
`               show databases;
`//             로컬상의 데이터베이스 목록을 띄워줌

//          2) 데이터베이스 열기
`               use (데이터베이스 이름);
`//             데이터베이스 이름을 입력해 해당 데이터베이스 열기
//              -> Database changed 뜨면 된 것

//          3) 테이블 목록 조회
`               show tables;
`//             데이터베이스 안의 테이블 목록을 띄워줌

//          4) 레코드 조회
`               select * from (테이블 이름);
`//             select : 레코드 조회
//              * : 레코드 선택 조건 (* : 모두)
//              from : 조회할 테이블 선택


// DBeaver 실습

//      1. DBeaver 실행

//          1) MySQL 서버 실행
//              MongoDB Compass를 실행할 때도 MongoDB가 켜져 있어야 인식됨
//              마찬가지로 MySQL DB 서버가 실행되어 있어야 DBeaver에서 인식 가능

//          2) DBeaver 프로그램 실행


//      2. MySQL DB에 접속하기

//          1) DBeaver 프로그램 왼쪽 위의 플러그모양 버튼 클릭

//          2) 접속할 DB 종류 선택
//              MySQL 선택
//              다음 클릭

//          3) DB 정보 입력
//              Database: mysql 입력
//              Password: MySQL 비밀번호 입력 (4자리)
//              Port: 3306 (디폴트값)

//          4) 접속 테스트 및 완료
//              Test Connection 클릭 -> 파란색 i 뜨면 확인
//              완료 버튼 클릭


//      3. 모든 Databases 확인하기

//          윈도우의 숨김 파일처럼 몇 개의 database가 숨김 처리 되어 있을 수도 있음

//          1)  모든 databases 보이게 하기
//              -> 왼쪽 목록창의 mysql 우클릭
//              -> Connection view
//              -> Advanced 선택
//              -> 재접속 물어보면 예 선택


//      4. 데이터 조회하기

//          1) "mysql" 왼쪽 꺽쇠 클릭

//          2) "Databases" 왼쪽 꺽쇠 클릭
//              데이터베이스 목록 표시됨

//          3) 조회할 데이터베이스 선택해 왼쪽 꺽쇠 클릭
//              데이터베이스 내부 구조 표시됨

//          4) "Tables" 왼쪽 꺽쇠 클릭
//              데이터베이스에 있는 테이블 목록 표시됨

//          5) 조회할 테이블 선택해 테이블 더블클릭
//              테이블에 있는 레코드 리스트가 DBeaver 화면 중앙에 표시됨