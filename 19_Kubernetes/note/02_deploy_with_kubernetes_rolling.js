// Kubernetes rolling 배포

//      수업 목표

//          1. 쿠버네티스 HTTPS 배포

//          2. 자바스크립트의 테스트큐에서 매크로 큐와 마이크로 큐로 나누어 적용하기?

//          3. DB를 도커에서 배포하지 않고 매니지드 DB 서비스를 사용해 배포하기

//          4. package.json 의 DevDependency를 지우고 Dependency만 사용해 배포하기

//          5. env 파일을 쓰지 않는 쿠버네티스 환경에서 환경 변수를 수정하기


// Kubernetes rolling 배포 실습

//      강의자료 참고해 vscode 에서 진행

//      강의자료에 없는 내용만 필기

//      1. 강의자료의 "배포용 DockerFile생성" 에서 수정해야할 부분

//          1) 배포환경에서 리프레시? 말안됨!
`               CMD yarn start:dev
`//             dev : 소스코드 수정이 될 때마다 리프레시
//              배포 환경에서 리프레시 된다는 것 자체가 말이 안됨

//          2) 메모리 문제, 초기 실행속도 문제
`               CMD yarn start:dev
`//             yarn start:dev 로 실행하면 소스코드 변경을 감지함
//              서버를 실행할 때 감지를 위한 프로그램의 메모리 사용량이 엄청나고
//              서버 실행 속도가 느림

//          3) yarn install 오래 걸림
`               RUN yarn install
`//             devDependencies가 모두 설치되기 때문에 yarn install도 오래 걸림

//          => dev 모드가 아니라 production 모드로 변경해야함


//      2. docker-compose.prod.yaml 파일 수정할 때 수업과 다른 부분

//          my-backend 도커 컴퓨터의 이미지 이름의 규칙은 아래와 같은데
//          [HOSTNAME]/[PROJECT_ID]/[REPOSITORY_NAME]/[IMAGE_NAME]:[TAG]

//          수업에서는 구버전인 Google Container Registry 를 사용하기 때문에
//          [HOSTNAME]으로 asia.gcr.io 를 작성했지만

//          지금은 바뀐 Artifact Registry 를 사용해야하기 때문에
//          [HOSTNAME]으로 asia-northeast3-docker.pkg.dev 를 작성해줘야함

`           image: asia-northeast3-docker.pkg.dev/codecamp-backend-422908/my-repo/my-backend-project-nestjs:0.4
`