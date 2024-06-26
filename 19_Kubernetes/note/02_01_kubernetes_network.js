// 쿠버네티스 네트워크

//      이론 설명은 강의자료에 하나도 없어서 필기


// 쿠버네티스 네트워크 개념

//      쿠버네티스 클러스터 구조

//          클러스터 안에 여러 개의 노드(컴퓨터)가 있음
//          각 컴퓨터에 파드(Pod)가 하나씩 있음
//          각 파드에 컨테이너가 있음 (보통은 한개)
//          컨테이너의 종류는 nestjs, mysql, ...

//      네트워크 연결

//          클러스터 IP
//              전체 클러스터 자체 IP 주소가 아님!!
//              파드에 접속하기 위해 클러스터 내에서 사용되는 IP
//              클러스터 밖에서는 접속할 수 없는 내부 IP

//          노드 포트
//              노드에 접속하기 위한 IP
//              보통 노드에 직접적으로 접속할 일은 잘 없음

//          부하분산기
//              바깥의 클라이언트가 nestjs 서버에 접속할 때 사용되는 IP
//              클러스터 밖에서 접속 가능한 외부 IP

//          nestjs 파드에서 mysql 파드로 접속하기 위해 mysql에 클러스터 IP 필요함

//          외부에서 nestjs 로 접속하기 위해 부하분산기가 필요

// 실습 진행

//      1. 네트워크 연결 전 nestjs 서버에 에러 나는 이유

//          Kubernetes 클러스터 > CLOUD SHELL 접속 > 사용중인 클러스터 연결 한 상태로
//          아래 명령어로 nestjs 파드의 로그를 확인해보면
`           kubectl get pod
            kubectl logs [nestjs 파드 ID]
`//         에러가 잔뜩 발생한 것을 확인 가능
//          : DB에 접속이 안되기 때문

//          => 네임 리졸루션이 안되고 있기 때문

//          => mysql 파드에 접속할 수 있는 클러스터 IP를 생성해야함

//          여기서부터가 실습 내용


//      강의자료 보고 실습 진행

//      2. 배포한 파드 노출시 강의자료와 다른 부분

//          클러스터 IP를 생성하기 위해 배포한 파드를 노출해야함

//          Kubernetes Engine > 작업 부하 > my-backend-project-mysql 선택 > 노출
//          에서 서비스 이름을 설정할 때 nestjs 파드의 환경 변수에 작성했던 
//          DATABASE_HOST 의 값과 동일한 이름으로 설정해야함

`           서비스 이름: my-backend-project-mysql
`
//          강의자료에서는 my-database 라고 되어 있지만 
//          실습에서는 my-backend-project-mysql 사용


//      3. 노출한 서비스 확인시 강의자료와 다른 부분

//          GCP 기능 업데이트 되면서 메뉴 들어가는거 달라짐

//          강의자료: Kubernetes Engine > 서비스 및 수신 > 노출한 서비스 확인
//          변경된후: Kubernetes Engine > 게이트웨이, 서비스, 인그레스 > 서비스 탭 > 노출한 서비스 확인

