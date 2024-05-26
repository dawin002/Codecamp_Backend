// CI / CD

//      CI/CD 란?

//          Continuous Integratioin / Continuous Deployment
//          지속적으로 통합해서 / 지속적으로 배포한다

//          개발 단계부터 배포까지 자동화하는 것

//          Git에 push 하기만 하면 해당 코드로 도커가 자동으로 빌드되고 배포됨

//          지속적 통합
//              테스트코드를 돌려 코드에 문제가 없는지 확인
//              문제 발생시 알림 전송, 배포 취소
//              E2E(End to End) 테스트를 돌려 모든 코드 확인

//          지속적 제공
//              컨테이너 레지스트리 또는 다른 깃허브 레파지토리에 결과물 업로드
//              보안 및 권한 등을 설정해줘야함

//          지속적 배포
//              쿠버네티스에 자동으로 배포
//              쿠버네티스 배포는 자동화하지 않고 직접 하기도 함
//              argoCD 도구 사용
//              배포 후 롤백 프로세스 구축해야함


//      CI/CD 도구들

//          Jenkins
//              데브옵스 팀에서는 Jenkins를 가장 많이 사용함
//              플러그인(추가적으로 설치할 수 있는 라이브러리)이 가장 많아서

//          Github-Actions
//              백엔드 개발자들은 Github-Actions도 많이 사용함
//              Jenkins에 비해 사용하기 간편해서

//          AWS-Codebuild
//              AWS 서비스와 통합하기 간편함

//          GCP-Cloudbuild
//              GCP 서비스와 통합하기 간편함


//      CI/CD 과정

//          사전 준비
//              CI/CD를 처리해주는 GCP-Cloudbuild 컴퓨터(구글 컴퓨터)가 한대 필요함
//              GCP-Cloudbuild 컴퓨터에서 Github에 로그인과 사전 설정을 해둠

//          시작 트리거
//              vscode에서 업데이트된 소스를 Github에 push 하면 
//               GCP-Cloudbuild 컴퓨터에서 Github에 있는 파일을 가져와 CI/CD 시작

//          1. 테스트 코드를 실행 => 지속적 통합
//          2. 컨테이너 레지스트리 업로드 => 지속적 제공
//          3. 쿠버네티스에 배포 => 지속적 배포

