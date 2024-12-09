// 파일 업로드하기

//      파일 업로드 구현 과정

//          실습 코드는 강의자료 참고

//          1. 브라우저에서 API 요청 인자로 파일 받아오기

//          2. 클라우드에 파일 업로드하기

//          3. 브라우저로 파일 다운 주소 응답하기

//      필요한 과정

//          @google-cloud/storage 라이브러리 설치

//          버킷 생성
//              버킷 : 파일을 업로드할 수 있는 스토리지 안의 폴더

//          graphql-upload 라이브러리 설치
//              graphql 용 파일 타입 FileUpload 를 가지고 있음

`           * graphql-upload 라이브러리 버전 "13.0.0" 으로 고치기
                package.json 에서 고치면 됨
`
//          @types/graphql-upload 라이브러리 데브 디펜던시에 추가
//              yarn add @types/graphql-upload --dev

`           * @types/graphql-upload 라이브러리 버전 "8.0.12" 로 고치기
                package.json 에서 고치면 됨
`

// 파일 업로드 요청하기 - postman

//      포스트맨에서 요청하는 방법(1개)
`           Headers => x-apollo-operation-name: true

            Body => form-data
            operations     { "query": "mutation uploadFile($file: Upload!) { uploadFile(file: $file) }", "variables": { "file": null } }
            map            { "0": ["variables.file"] }
            0              [파일선택 : key 부분 눌러서 file 로 바꾸고, value 부분에서 파일선택] 강아지.jpeg
`

//      포스트맨에서 요청하는 방법(여러개)
`           Headers => x-apollo-operation-name: true

            Body => form-data
            operations     { "query": "mutation uploadFile($files: [Upload!]!) { uploadFile(files: $files) }", "variables": { "files": [null, null] } }
            map            { "0": ["variables.files.0"], "1": ["variables.files.1"] }
            0              [파일선택] 강아지.jpeg
            1              [파일선택] 강아지2.jpeg
`