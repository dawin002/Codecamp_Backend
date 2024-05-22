// Kubernetes 실습

//      강의자료 참고해 vscode에서 실습 진행


// 강의자료에 없는 내용

//      1. GCP의 Kubernetes Engine 하위 메뉴 소개

//          클러스터
//              클러스터 생성 및 관리

//          작업 부하
//              배포하는 곳
//              클러스터별 deployment 관리 가능

//          게이트웨이, 서비스, 인그레스
//              네트워크를 설정하는 곳

//          보안 비밀 및 ConfigMap
//              환경변수 등을 관리하는 환경 설정


//      2. Kubernetes 배포 과정

//          mysql 과 nestjs 서버를 배포하는 과정

//          1) 노드(컴퓨터) 하나 생성
//          2) 노드 안에 Pod(파드) 하나 생성
//          3) Pod 안에서 mysql(또는 nestjs) 컨테이너를 넣고 실행

//          보편적인 방식으로 하나의 Pod 안에 하나의 컨테이너를 넣으려면
//          노드 안에 두개의 Pod, 각 Pod에 mysql과 nestjs 컨테이너 넣고 실행


//      3. 사실 mysql은 도커에서 배포하지 않음

//          사실 DB는 도커에서 배포하는 것이 아니라
//          Cloud SQL을 사용해 배포하는 것이 일반적이지만
//          지금은 kubernetes 실습을 위해 도커를 통해 배포해보는 것


//      4. Container Registry 이미지 추가는 Artifact Registry 에서 하기

//          Container Registry 기능을 GCP에서 더이상 지원하지 않음
//          대신 Artifact Registry 사용하라고 나옴

//          구글에 "Artifact Registry 이미지 업로드" 검색해서 linux 명령어 그대로
//          윈도우 파워쉘에서 진행하기

//        * tag 와 push 명령어 입력할 때 업로드할 이미지 URL 끝의 버전 바로 앞에 
//          이미지 경로의 REPOSITORY 누락 확인하기
//          ( 하위 폴더 하나를 더 추가해야된다는 말 )

//        * Artifact Registry 업로드시 권한 없어서 안될 수도 있는데 그 때는
//          아래의 권한 부여 명령어 사용해 권한 부여하기

`           gcloud projects add-iam-policy-binding [PROJECT_ID] \
            --member="user:[YOUR_EMAIL]" \
            --role="roles/artifactregistry.writer"

            (명령어 입력할 때는 \ 지우고 한줄로 입력하기)
`//         [PROJECT_ID] : GCP의 프로젝트 개요에서 프로젝트 ID 복붙
//          [YOUR_EMAIL] : 현재 gcloud에 로그인한 이메일 주소 (내 gmail 주소로 했음)


//      5. 작업 부하에서 nestjs 배포 만들기할 때 환경변수 주의

//          'Kubernetes Engine > 작업 부하 > 배포 만들기'에서 nestjs 이미지 배포할 때 
//          다른 환경 변수는 전부 'docker-compose.prod.yaml' 파일이랑 똑같이 하면 되는데

//          DATABASE_HOST 와 DATABASE_DATABASE 환경변수는 
//          이번 실습에서 Kubernetes로 배포한 mysql Pod(파드)에 맞게 변경해서 적어줘야함

`           키: DATABASE_HOST        값: my-backend-project-mysql
            키: DATABASE_DATABASE    값: mydocker
`
//          DATABASE_HOST 환경변수의 값으로 my-backend-project-mysql 를 입력하면 
//          네임 리졸루션으로 Kubernetes의 해당 Pod를 찾아가 DB로 연결함

//          DATABASE_DATABASE 환경변수 또한 마찬가지
