// 무중단 배포 및 JMeter를 활용한 무중단 배포 테스트

//      JMeter
//          트래픽을 테스트하는 도구
//          시간당 트래픽 요청 개수 조절 가능

//          JMeter vs Locust
//              트래픽 테스트 도구 비교
//              강의자료에 있음

//          JMeter를 활용한 무중단 배포 테스트
//              JMeter로 트래픽을 계속 보내면서 한번이라도 실패한 트래픽이 발생하는지 확인
//              한번이라도 실패하면 서버가 중단된 것이므로 무중단 배포가 아님


//      강의자료에 없는 내용 필기

//      1. 지금의 kubernetes 배포는 무중단 배포가 아닌 이유

//          업데이트 배포를 위해 vscode에서 도커 이미지를 build, push한 후
//          GCP의 Cloud Shell에서 kubectl set image 명령어로 재배포할 수 있음

//          kubectl get pods 명령어를 사용하면 기존 파드가 종료, 삭제되는 것과
//          새로운 파드가 실행되는 것을 확인할 수 있는데
//          새로운 파드가 Running 으로 바뀌어도 이는 컨테이너가 실행된 것이지
//          NestJS가 실행된 것은 아님

//          따라서 컨테이너는 실행되었으나 NestJS가 아직 실행되지 않은 시점이 발생하는데
//          이 때는 서버에 접속할 수 없으므로 중단점이 발생한 것


//      2. 그럼 어떻게 무중단 배포로 만들 수 있을지

//          파드(컨테이너)는 Running 상태이지만 NestJS가 아직 실행되지 않은 시점에
//          서버로 트래픽을 받지 않게 해야 하는데,

//          파드가 Running 되고 나서 적당히 기다린 후 여유를 가지고 트래픽을 받게 하기 위해서
//          '작업 부하'의 'my-backend-project-nestjs'의 YAML 파일에서 MinReadySeconds 를
//          조정하면 중단점 없이 배포를 할 수 있음

//          새로운 파드가 Running 상태가 된 후 설정한 시간만큼 기다린 후 기존 파드의 삭제를 시작함
//          -> 새로운 파드의 NestJS가 완전히 실행된 다음 트래픽이 들어올 수 있게 함

//          => 강의자료의 'MinReadySeconds 조정 후 무중단 배포 테스트' 부분


// JMeter를 활용한 무중단 배포 실습

//      실습할 내용

//          1) MinReadySeconds 설정 안하고 JMeter로 요청하면서 중단점 확인

//          2) MinReadySeconds 설정 후 JMeter로 요청하면서 중단점 사라진 것 확인


//      강의자료에 없는 내용 필기

//      1. my-backend-project-nestjs YAML 파일의 시간 관련된 속성들

//          대표적인 시간 관련 속성 3개

//          minReadySeconds
//              지정한 시간만큼 기다렸다가 이전 버전 삭제를 시작하는 것
//              삭제 시작하면 트래픽 전달 시작

//          terminationGracePeriodSeconds
//              1초만에 삭제하지말고 지정한 시간 동안 부드럽게(천천히) 삭제하는 것

//          progressDeadlineSeconds
//              지정한 시간동안 배포가 되지 않으면 배포를 취소하는 것
