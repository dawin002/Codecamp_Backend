// Kubernetes - CI/CD 연결

//      강의자료 참고해 실습 진행

//      실습 순서

//          1. vscode에서 cloudbuild.yaml 파일 생성
//              명령어 3개 입력 (build, push, kubectl set image)

//          2. CloudBuild에 Github 트리거 생성
//              github 인증 및 레파지토리 연결

//          3. kubernetes에 CD 실습
//              수정한 소스코드 main 브랜치에 git add, commit, push 하고
//              빌드 진행상황 확인하기

// 실습 메모할 것

//      cloudbuild.yaml 파일에 작성할 명령어

//          다음 세 명령어를 cloudbuild 컴퓨터에서 실행할 것
//          1. docker-compose -f docker-compose.prod.yaml build
//          2. docker-compose -f docker-compose.prod.yaml push
//          3. kubectl set image deployment/my-backend-project-nestjs nestjs-image-sha256-1=asia-northeast3-docker.pkg.dev/codecamp-backend-422908/my-backend-project-nestjs/nestjs-image:0.7

//          0) cloudbuild 컴퓨터에서 실행할 명령어
`           steps:
`//         이 아래에 작성하는 명령어들이 실행됨

//          1) 도커 이미지 빌드
`           - name: docker/compose:1.29.0    // 도커 설치
              args:
                - -f
                - docker-compose.prod.yaml   // 도커 컴포즈 yaml 파일
                - build
`//             기본적으로 docker-compose가 설치되지 않은 환경을 가정, 설치 후 사용
//              docker-compose 설치 코드가 들어가면 args에서 docker-compose가 빠져도 됨

//          2) 도커 이미지 푸쉬
`           - name: docker/compose:1.29.0    // 도커 설치
              args:
                - -f
                - docker-compose.prod.yaml   // 도커 컴포즈 yaml 파일
                - push
`
//          3) 쿠버네티스 셋 이미지
`           - name: gcr.io/cloud-builders/kubectl    // kubectl 설치
              args:
                - set
                - image
                - deployment/my-backend-project-nestjs    // 배포 이름
                - nestjs-image-sha256-1=asia-northeast3-docker.pkg.dev/codecamp-backend-422908/my-backend-project-nestjs/nestjs-image:0.7
                  // [ 컨테이너 이름 ]=[ 도커 이미지 이름 및 태그(버전) ]
`
//          4) 환경 변수 설정
`           env:
              - CLOUDSDK_COMPUTE_ZONE=asia-northeast3
              - CLOUDSDK_CONTAINER_CLOUSTER=autopilot-cluster-1
`//         클러스터 연결할 때 GCP Cloud Shell 에서 입력하는 값들


//      경로 수정할 것

//          Cloud Build 컴퓨터에서 cloudbuild.yaml 파일이나 docker-compose.prod.yaml 파일을
//          찾을 때는 backend 폴더 기준이 아니라 전체 프로젝트의 루트에서부터 경로를 찾음

//          따라서 해당 파일의 경로를 적어줘야 하는 부분에 파일 이름만 적으면 안되고
//          프로젝트 루트에서부터의 전체 경로(상대 경로)를 모두 적어줘야함

//          1) cloudbuild.yaml 파일 위치
//              GCP > Cloud Build > 트리거 > 트리거 수정 > Cloud Build 구성 파일 위치
//              내 vscode 프로젝트 루트에서 CI/CD로 배포할 프로젝트의 cloudbuild.yaml 파일
//              까지의 경로를 모두 적어줘야함
`               19_Kubernetes/class/04-deploy-with-kubernetes-ci-cd/backend/cloudbuild.yaml
`
//          2) docker-compose.prod.yaml 파일 위치
//              vscode > cloudbuild.yaml > steps: 안의 docker-compose.prod.yaml 사용되는 부분
//              이 파일 역시 내 vscode 프로젝트 루트에서 해당 파일 위치까지의 경로를 적어줘야함
`               19_Kubernetes/class/04-deploy-with-kubernetes-ci-cd/backend/docker-compose.prod.yaml
`

//      CLI로 깃허브 푸쉬하기

//          backend 폴더 말고 프로젝트 루트에서 그냥 터미널 열어서 명령어 입력하면 됨
`           git add .
            git commit -m 'study(19_Kubernetes): kubernetes with CI/CD'
            git push origin main
`