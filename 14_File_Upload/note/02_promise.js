// Promise

//      기존 파일 업로드 코드의 문제점
//      (강의자료에 없음)


//      문제 상황

//          files.service.ts 파일의 upload 함수의 스토리지에 파일 올리기 부분
`               file
                .createReadStream()
                .pipe(storage.file(file.filename).createWriteStream())
                .on('finish', () => console.log('성공'))
                .on('error', () => console.log('실패'));

                console.log('파일 전송이 완료되었습니다.');

                return '임시작성';
`
//          '성공' 이 출력된 후 '파일 전송이 완료되었습니다.' 가 출력되어야 함

//          하지만 실제 터미널에서는 '파일 전송이 완료되었습니다.' 출력 후 '성공' 이 출력됨


//      문제 원인

//          file.createReadStream() 함수가 파일 업로드가 완료될 때까지 기다리면
//          '성공'이 먼저 출력되지만, 기다리고 있지 않기 때문에 다음 코드인
//          '파일 전송이 완료되었습니다.' 출력이 먼저 실행된 것


//      이게 큰 문제?

//          만약 파일 전송에 성공이 아니라 실패한 경우 실패했음에도 불구하고
//          '파일 전송이 완료되었습니다.' 메시지가 출력될 뿐더러 
//          .on('error', () => {}) 함수에서 에러를 핸들링할 경우에도 
//          에러를 처리하기 전에 upload 서비스 함수의 반환값이 api 함수로 반환되어버림


//      해결 방법

//          1. 함수 앞에 await 붙이기

//              file.createReadStream().~~~ 앞에 await 를 붙여 해결할 수 있지만
//              await는 Promise 기능을 지원하는 함수 앞에만 붙일 수 있음 
//              == Promise 객체를 리턴하는 함수 앞에만 사용 가능 ( axios.get(), fetch() )

//          2. 함수 뒤에 .then() 붙이기

//              file.createReadStream()~~~ 끝에 .then() 을 붙여 해결할 수 있지만
//              .then() 또한 마찬가지로 Promise 기능을 지원하는 함수 앞에만 붙일 수 있음

//          => file.createReadStream().~~~ 함수를 Promise 형태로 바꿔줘야 함


//      Promise

//          Promise 에 대한 설명은 강의자료 참고


//      Promise로 만들기 실습

//          Promise 형태로 함수 수정하기 실습에 대한 설명은 강의자료 참고