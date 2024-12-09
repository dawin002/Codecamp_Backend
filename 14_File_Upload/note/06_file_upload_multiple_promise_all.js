// Promise.all 로 업로드 여러개 동시에 기다리기

//          반복문 내에서 await new Promise 로 각각의 업로드 따로따로 기다리던 
//           파일 업로드 코드 팩토링

//      Promise.all 적용해 여러 파일 업로드 실습

//          실습은 강의자료 보고 진행하기

//          Promise.all 로 전환하기 코드 리펙토링 과정
`               await Promise.all(
                  waitedFiles.map((el) => {
                    return new Promise((resolve, reject) => {
                      el.createReadStream()
                        .pipe(storage.file(el.filename).createWriteStream())
                        .on('finish', () => resolve('성공'))
                        .on('error', () => reject('실패'));
                    });
                  }),
                );
`//             이렇게 나오는데 

//              .map((el) => { return new Promise(~~~) })
//                  에서 중괄호 안에 리턴 한문장 밖에 없으면 소괄호로 바꿀 수 있음

//              .map((el) => ( new Promise(~~~) ))
//                  에서 소괄호가 큰 의미가 없으면 소괄호 까지 생략 가능

//              .map((el) => new Promise(~~~))

//              최종적으로 이렇게 됨
`               await Promise.all(
                  waitedFiles.map(
                    (el) =>
                      new Promise((resolve, reject) => {
                        el.createReadStream()
                          .pipe(storage.file(el.filename).createWriteStream())
                          .on('finish', () => resolve('성공'))
                          .on('error', () => reject('실패'));
                      }),
                  ),
                );
`

//          new Promise 의 타입 지정하기

//              Promise.all 안에서 Promise 객체를 생성할 때 
//               그냥 new Promise 까지만 하면 upload 함수의 return 에서 에러 발생

//              new Promise<string>(...) 사용해서 Promise 객체의 타입 명시하기
`               new Promise<string>((resolve, reject) => {
                  el.createReadStream()
                    .~~~
                }),
`

// 파일 업로드 요청하기 - postman

//      포스트맨에서 요청하는 방법(여러개)
`           Headers => x-apollo-operation-name: true

            Body => form-data
            operations     { "query": "mutation uploadFile($files: [Upload!]!) { uploadFile(files: $files) }", "variables": { "files": [null, null] } }
            map            { "0": ["variables.files.0"], "1": ["variables.files.1"] }
            0              [파일선택] 강아지.jpeg
            1              [파일선택] 강아지2.jpeg
`