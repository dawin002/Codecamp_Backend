// Mongoose 를 활용한 게시판 API 구현

//      스키마 (Schema)
//          MongoDB에 데이터를 저장하기 위한 객체
//          어떤 키로 어떤 데이터를 저장할지 구조를 정해둠
//          JavaScript 파일로 생성

// 모델, 스키마 정의

//      1. 게시판 모델 파일 생성
//          1) backend 폴더 안에 models 폴더 생성
//          2) models 폴더 안에 board.model.js 파일 생성

//      2. 모델 파일 생성
//          1) mongoose 가져오기
                `import mongoose from 'mongoose';`

//          2) boardSchema 스키마 정의
`               const boardSchema = new mongoose.Schema({
                    writer: String,
                    title: String,
                    contents: String,
                });
`
//              boardSchema 에 어떤 타입의 데이터를 저장할지 구조 정의

//          3) Board 모델 정의
                `export const Board = mongoose.model("Board", boardSchema);`
//              - "Board" : 컬렉션의 이름
//              - boardSchema : 적용할 스키마 객체
//              Board 모델을 DB에 저장하면 컬렉션이 됨
//              내보내서 사용할 것이기 때문에 export

// 백엔드 서버에서 DB 조작

//      index.js 에서 mongoose 사용해 DB 조작

//      1. 게시판 등록 API 수정
//          1) Board 모델 가져오기
                `Board` // 입력 후 엔터(import 문 자동 생성)

//          2) Board 모델 생성
`               const board = new Board({
                    writer: req.body.writer,
                    title: req.body.title,
                    contents: req.body.contents
                });
`
//              1)에서 입력한 Board를 위와 같이 수정
//              DB에 저장할 모델을 하나 생성한 것

//          3) Board 모델 DB에 저장
                `await board.save();`
//              - save() : 모델을 DB에 저장하는 mongoose model의 메서드
//              - await : DB에 저장이 되었는지 확인하기 위해 동기적 실행
//              - await 를 사용하기 위해 게시판 등록 API 함수에 async 키워드 추가

//      2. 게시판 조회 API 수정
//          1) DB에서 Board 컬렉션 가져오기
                `const result = await Board.find();`
//              - find() : DB의 컬렉션을 가져오는 mongoose model의 메서드
//              - await : DB의 데이터를 가져와 사용해야하기 때문에 동기적 실행
//              - await 를 사용하기 위해 게시판 등록 API 함수에 async 키워드 추가

// API 사용해보기

//      1. docker 백엔드, DB 서버 실행
//          1) docker-compose build
//          2) docker-compose up

//      2. MongoDB Compass 로 DB 접속
//          1) MongoDB Compass 프로그램 실행

//          2) localhost:27017 연결
//              MongoDB Compass 프로그램의 connect 버튼 클릭

//          여기서 에러 발생
//              docker-compose.yaml 파일에서 포트포워딩 꺼놔서 그럼
//              my-database 컴퓨터의 ports: 주석 해제

//              근데 docker 재실행 할 때 build 는 다시 안해도 됨
//              이유는 index.js 파일이 수정된게 아니기 때문
//              따라서 docker-compose.yaml 파일이 수정된 경우에는 up 만 다시 해주면 됨

//          3) localhost:27017 재연결
//              Mongo Compass 프로그램의 connect 버튼 클릭해

//      3. Postman 으로 게시판 등록 API 요청 보내기
//          1) Postman 에서 POST 메서드 선택

//          2) Endpoint 주소 입력
                `http://localhost:4000/boards`
//              - localhost:4000 : 포트포워딩한 localhost 4000번 포트
//              - boards : 게시판 엔드포인트 주소

//          3) api 바디 데이터 입력
//              Body -> raw -> JSON 선택 후 데이터 입력
`               {
                    "writer": "철수",
                    "title": "자기소개",
                    "contents" : "안녕 나는 철수야"
                }
`
//          4) Send 버튼 클릭해 api 요청 전송

//          5) 응답 바디로 돌아오는 데이터 확인
//              "게시물 등록에 성공했습니다."

//          6) MongoDB Compass 에서 등록한 게시글 확인
//              mydocker DB의 -> boards 컬렉션 -> Documents 중 저장한 데이터가 존재하는지 확인

//      4. Postman 으로 게시판 조회 API 요청 보내기
//          1) Postman 에서 GET 메서드 선택

//          2) Endpoint 주소 입력
                `http://localhost:4000/boards`

//          3) body 부분의 데이터 제거

//          4) Send 버튼 클릭해 api 요청 전송

//          5) 응답 바디로 돌아오는 게시글 리스트 확인
//              DB에 저장되어 있는 모든 게시글이 응답 바디에 담겨 돌아오는지 확인
`               [
                    {
                        "_id": "65c5f4bc24c07e565ac6a8ec",
                        "writer": "철수",
                        "title": "자기소개",
                        "contents": "안녕 나는 철수야",
                        "__v": 0
                    },
                    {
                        "_id": "65c5f63524c07e565ac6a8ee",
                        "writer": "영희",
                        "title": "오랜만",
                        "contents": "안녕 철수야 잘 지냈니?",
                        "__v": 0
                    }
                ]`