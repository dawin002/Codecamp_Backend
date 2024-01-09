// Github에 개인정보 빼고 업로드하기

//      api key 나 api 비밀번호를 그대로 git에 업로드하면 안됨

//      Github와 같은 공유 저장소에 본인만의 key값이 올라가게 되면 도용 위험이 발생하기 때문에 
//      환경변수로 분리하여서 관리해 주어야 함

// 환경변수 분리하는 법

//      1. 환경변수 파일 생성
//          backend 폴더에 ".env" 파일 생성

//      2. 환경변수 파일 git 업로드 ignore 설정
//          ".gitignore" 파일의 새로운 줄에 .env 입력후 저장

//      3. 환경변수 생성
//          ".env" 파일에 필요한 변수 선언 및 초기화
//          예시)
//          SMS_KEY = NCSIYWB4QAC1NTSP
//          SMS_SECRET = IECMDSCNKBKFX4MRQD22PRVITDY3ND7K
//          SMS_SENDER = 01012345678

//      4. 환경변수 라이브러리 설치
//          yarn add dotenv

//      5. 환경변수 라이브러리 가져오기
//          환경변수 사용할 js 파일에서 아래 import문 입력
//          import 'dotenv/config'

//      6. 환경변수 사용
//          process.env 명령어 사용해 .env 파일에서 key를 찾아 value를 읽어옴
//          예시)
//          const smsKey = process.env.SMS_KEY;
//          const smsSecret = process.env.SMS_SECRET;
//          const smsSender = process.env.SMS_SENDER;