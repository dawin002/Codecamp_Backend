// MongoDB

//      MongoDB에 접속하기 위해서는 두 가지 방식 있음

//      CLI 접속 방식
//          Command Line Interface 로 접속 가능
//          MongoDB 만 설치하면 사용 가능

//      GUI 접속 방식
//          Graphic User Interface 로 접속 가능
//          MongoDB-Compass 를 추가로 설치해야 사용 가능

// MongoDB CLI 접속 방식

//      터미널의 CLI를 사용해 접속하는 방식

//      1. brew 로 실행 가능한 서비스 확인
//          1) 터미널 열기
//          2) 서비스 목록 명령어 입력
                `brew services`
//          3) mongodb-community 설치되어 있는지 확인

//      2. brew 로 mongodb-community 서비스 실행
//          1) mongodb-community 서비스 실행 명령어 입력
                `brew services start mongodb-community`
//          * brew 서비스 실행/종료 관련 명령어
//              brew services [start/stop/restart] [서비스명]

//      3. MongoDB 접속
//          1) MongoDB 실행 명령어 입력
                `mongo`


// MongoDB CLI 명령어

//      데이터베이스 목록 조회
            `show databases;`
//          MongoDB에 저장된 데이터베이스 목록을 조회

//      데이터베이스 선택
            `use ${'데이터베이스명'};`
//          데이터베이스 선택해 들어가기
//          switched to db ${데이터베이스명} 이 출력됨

//      collection 목록 조회
            `show collections;`
//          데이터베이스내 존재하는 collection 목록을 보여줌

//      collection 선택해 내용 조회
            `db.${'collection명'}.find();`
//          여기서부터는 쿼리문 사용해 조작
//          collection에 저장된 document들이 문자열 형태로 모두 출력됨
//          -> 일렬로 출력되어 보기 불편하고 효율적이지 못함
//          -> UI 형태로 보여주는 MongoDB-Compass 사용하면 편함

//      데이터베이스 추가
            ``

// MongoDB GUI 접속 방식 (MongoDB Compass)

//      GUI 방식의 MongoDB 접속 도구 MongoDB Compass 사용

//      1. MongoDB Compass 프로그램 실행

//      2. MongoDB 접속
//          내 로컬에서 실행되고 있는 MongoDB 데이터베이스 서버에 접속
//          1) MongoDB URI 주소 입력
//              mongodb://localhost:27017
//          2) Connect 버튼 클릭

// MongoDB Compass 진입

//      1. 전체 Database 목록 조회
//          왼쪽 메뉴의 Databases 아래에 저장된 데이터베이스 목록 표시됨
//          데이터베이스명을 클릭해 선택 가능

//      2. collection 목록 확인
//          특정 데이터베이스 선택시 collection 목록이 하단에 표시됨
//          특정 collection 클릭해 조회 가능

//      3. document 확인
//          특정 collection 선택시 포함된 document 내용이 중앙에 표시됨
//          화면의 버튼을 통해 document 조작 가능
//          가로 3줄 버튼 클릭해 리스트 형식으로 조회할 수 있음
//          {} 버튼 클릭해 실제 객체 형식으로 조회할 수 있음
//          표 모양 버튼을 클릭해 RDB 와 같은 표 형식으로 조회할 수 있음

//      4. collection 추가
//          1) database 이름 옆에 + 버튼 클릭
//          2) collection 이름 입력
//          collection 추가 기능은 MongoDB Compass 에서 MongoDB 로
//          작업이 넘어가 MongoDB의 쿼리문이 실행되는 방식으로 동작
//          MongoDB로 실행된 쿼리문의 결과를 다시 받아서 compass가 보여줌

//      5. document 추가
//          1) 화면 중앙의 [+ ADD DATA] 버튼 클릭
//          2) Insert document 선택
//          3) document 내용 입력
//              객체의 속성을 추가하는 형식으로 입력
//          4) Insert 버튼 클릭

