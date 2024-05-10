// 여러개의 파일 업로드하기

//      배열을 사용해 여러 개의 파일 업로드하기

//      강의자료 보고 실습 진행


// for 문 사용하는 방법의 문제점

//      for 문 안에서 await new Promise 로 하나씩 저장하는 방법
//      => 안티 패턴
//         : 비효율적이거나 생산성이 저해되는, 
//           다시 말해서 '권장사항'의 반대편에 있는 소프트웨어 설계 관행

`           const results = [];

            for (let i = 0; i < waitedFiles.length; i++) {
              results[i] = await new Promise((resolve, reject) => {
                waitedFiles[i]
                  .createReadStream()
                  .pipe(storage.file(waitedFiles[i].filename).createWriteStream())
                  .on('finish', () => resolve('$ {waitedFiles[i].filename} 성공'))
                  .on('error', () => reject('$ {waitedFiles[i].filename} 실패'));
              });
            }
`//         waitedFiles[i].filename 부분은 `${}` 로 감싸서 변수를 포함하는 백틱 문자열

//      파일을 스토리지에 한개씩 보내면 한 파일이 스토리지에 저장될 때까지 다음 파일 전송 못함

//      굳이 모든 파일을 따로따로 보낼 필요가 없음


// 파일 업로드 요청하기 - postman

//      포스트맨에서 요청하는 방법(여러개)
`           Headers => x-apollo-operation-name: true

            Body => form-data
            operations     { "query": "mutation uploadFile($files: [Upload!]!) { uploadFile(files: $files) }", "variables": { "files": [null, null] } }
            map            { "0": ["variables.files.0"], "1": ["variables.files.1"] }
            0              [파일선택] 강아지.jpeg
            1              [파일선택] 강아지2.jpeg
`