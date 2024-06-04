1. 통합 터미널에서 열기 한 폴더는 삭제 및 조작 불가능

Error: EBUSY: resource busy or locked, rmdir 에러

폴더 우클릭 -> 통합 터미널에서 열기 한 상태로 폴더 이름을 바꾸거나 폴더를 지울 때 발생하는 에러
폴더 이름 변경이나 폴더 삭제가 안먹음
로컬 탐색기에서 폴더 삭제 후 vscode 열면 터미널을 열 수 없다고 뜨면서 이게 원인이었다는거 알 수 있었음

폴더 우클릭 -> 통합 터미널 열기 -> 폴더 삭제 -> 에러 내용 캡처 => 같은 에러 나는지 확인해보기
해결방법: 아래 터미널에서 터미널 종료(휴지통 아이콘) 후 폴더 조작

2. 윈도우에서 yarn 실행시 초기 에러 잡기
   https://theworldaswillandidea.tistory.com/77

3. 안드로이드 스튜디오 기본 프로젝트 폴더 변경

안드로이드 스튜디오에서 기본 프로젝트 폴더를 변경하려면 안드로이드 스튜디오의 설정을 수정해야 합니다. 다음은 Windows 환경에서 C:\Users\Administrator\AndroidStudioProjects 대신 다른 폴더를 기본 프로젝트 폴더로 설정하는 방법입니다:

안드로이드 스튜디오를 열고 대시보드로 이동합니다.

"Configure"를 클릭하고 "Settings" 또는 "Preferences"를 선택합니다.

"Appearance & Behavior" 아래에서 "System Settings"를 선택합니다.

"Project Opening" 섹션에서 "Default directory"를 변경합니다.

"Default directory"를 원하는 새로운 기본 폴더 경로로 변경합니다.

변경된 설정을 저장하려면 "OK" 또는 "Apply" 버튼을 클릭합니다.

이제 안드로이드 스튜디오에서 새로운 프로젝트를 만들 때 지정한 폴더가 기본 폴더로 사용됩니다.

기본 프로젝트 폴더를 변경한 후에는 새로운 프로젝트를 만들 때 해당 폴더가 자동으로 사용됩니다. 이렇게 설정하면 매번 프로젝트를 만들 때마다 기본 경로를 수동으로 변경할 필요가 없습니다.

4. 윈도우에서 MongoDB 종료시 재시작 안되는 에러

MongoDB 종료 후 에러 발생까지의 과정

-   윈도우 파워쉘에서 mongod 명령어로 MongoDB 실행
-   mongosh 명령어로 MongoDB Shell 실행
-   use admin 명령어로 admin db로 변경
-   db.shutdownServer(); 명령어로 MongoDB 종료
-   exit 명령어로 MongoDB shell 종료
-   이후 mongosh 로 MongoDB가 종료되어 실행 안되는 것 확인
-   근데 여기서 mongod 로 MongoDB를 실행하고 mongosh 로 MongoDB Shell 을 열었으나 connection error? 이런 에러 뜸 나중에 다시 테스트

시도한 방법들

-   mongod.lock 파일 삭제
    -> MongoDB가 비정상 종료되었을 경우 이를 해결하는 작업을 다음 MongoDB 실행때 수행하는데 수행할 작업을 mongod.lock에 적어둔다고 함
    -> 이 작업 자체가 잘못 적혀있거나 수행되며 에러가 발생할 수도 있어서 lock 파일을 지우면 해결될 수도 있다고 함
    -> 지웠으나 동일한 에러 발생

-   작업관리자 - 서비스에서 MongoDB 상태 확인하기
    -> 상태 정지 로 되어있음
    -> 우클릭해서 시작 눌러도 잠깐 바뀌었다가 다시 정지됨
    -> 서비스 속성에서는 사용/사용안함/자동 중 자동으로 되어있음
    -> 서비스 시작 눌러도 시작 안되고 에러 뜸

-   mongod --dbpath D:Apps/MongoDB/.../data 명령어 실행
    -> 위 명령어 입력한 powershell에서는 더이상 입력 안됨
    -> 다른 탭에서 mongosh 정상 작동
    -> mongod --dbpath ... 입력한 파워쉘의 작업을 ^C로 끝내거나 탭을 닫으면 MongoDB 서버도 닫힘
    -> mongod 실행한 파워쉘 닫은 후에는 mongosh 나 MongoDB Compass 둘 다 connection 실패

-   컴퓨터 다시시작 하기
    -> 컴퓨터 재시작 후 파워쉘에서 mongod, mongosh 명령어 수행
    -> 정상 작동함(???)
    -> 다시 db.shutdownServer();로 MongoDB 종료 후 재시작하니 똑같은 에러 발생
    -> 다시 컴퓨터 껏다 켜니 정상 동작
    -> shutdown 이후 왜 다시 안켜지는지 나중에 구글링해보기

5. docker compose with mongoose 에서 발생하는 에러

Run yarn install 에서 실패한다고 나옴
자세한 내용은 5_Docker / note / 08_docker_compose_with_mongoose.js 파일의 에러 발생 부분 참조

6. docker 에서 nodemon 으로 리프레시 안됨

자세한 내용은 5_Docker / note / 10_docker_compose_with_mongoose_board2.js 파일의 "nodemon 리프레시 안되는 문제 해결" 부분 참고
https://velog.io/@412/Docker%EC%97%90%EC%84%9C-Nodemon-React-CRA%EA%B0%80-%EC%95%88-%EB%8F%BC%EC%9A%94

7. 도커 버전 낮아서 에러 발생

09-09 neset with typeorm api docker 에서 발생한 에러

docker-compose build 했을 때 버전 낮다는 에러 발생

에러 메시지 :
PS D:\Study\Develop\Codecamp_Backend\09_Nest.js\class\09-nestjs-with-typeorm-api_docker> docker-compose build
[+] Building 37.3s (9/10) docker:default
...
=> ERROR [my-backend 5/6] RUN yarn install

---

> [my-backend 5/6] RUN yarn install:
> 2.079 yarn install v1.22.19
> 2.233 [1/4] Resolving packages...
> 2.485 [2/4] Fetching packages...
> 28.85 error @angular-devkit/core@17.1.2: The engine "node" is incompatible with this module. Expected version "^18.13.0 || >=20.9.0". Got "16.20.2"
> 28.86 error Found incompatible module.

## 28.86 info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.

failed to solve: process "/bin/sh -c yarn install" did not complete successfully: exit code: 1

Node.js 버전이 호환되지 않는 패키지를 설치하려고 시도했기 때문에 발생
도커 컨테이너 내의 노드 버전이 낮아서 발생한 듯

에러 메시지를 보면 '@angular-devkit/core' 패키지가 Node.js 버전 "^18.13.0 || >=20.9.0"을 요구하는데, 현재 사용 중인 Node.js 버전이 "16.20.2"이기 때문에 호환되지 않습니다. 라고 나옴

Dockerfile 수정

# 현재 사용 중인 이미지

FROM node:16

# 노드 버전을 업그레이드한 이미지를 사용하려면 다음과 같이 변경합니다.

FROM node:18

에러 해결 완료!

8. 도커 mysql 실행시 DBeaver 에서 접속 안되는 에러

09-09 neset with typeorm api docker 에서 발생한 에러

DBeaver 에서 테스트 커넥션? 했을 때
Public Key Retrieval is not allowed 라는 에러창 뜨고 접속 안됨

해결 방법

https://velog.io/@dailylifecoding/DBeaver-MySQL-connecting-error-Public-Key-Retrieval-is-not-allowed-solved

9. gcp-file-storage.json 파일 커밋해서 생긴 에러

14_File_Upload 에서 GCP(Google Cloud Platform)의 시크릿 키
gcp-file-storage.json 를 커밋해버려서 푸시가 안되는 에러 발생

커밋 로그 확인해보니 gcp-file-storage.json 파일의 시크릿 키가 포함되었다고 나와서
커밋 전부 되돌리고 .gitignore 에 gcp-file-storage.json 제대로 포함시켜서 커밋푸시 했는데
그래도 똑같은 에러 났음

다시 왼쪽 메뉴중 소스제어의 변경사항에 보니 gcp-file-storage.json 파일이
이미 커밋할 파일에 포함되어 있음

변경 사항에서 gcp-file-storage.json 파일 우클릭해서 변경 내용 스테이징 (무슨뜻인진 모름)
을 클릭해 변경 사항에서 해당 파일 제외시키고 커밋, 푸시하니 제대로 작동함

10. 이건 진짜 꼭 올려야됨

GCP에서 비관리형 인스턴스 그룹을 만들고 vm 인스턴스를 추가할 때
No available VMs만 뜨고 내가 생성한 vm이 표시되지 않는 에러

스택오버플로우, 구글링 다 해봐도 해결 방법이나 같은 사례 못찾았는데 챗지피티한테 물어봐서 해결함
생성한 vm 인스턴스와 생성한 인스턴스 그룹의 지역이 일치해야 하는데, 큰지역(서울)이 똑같아야할 뿐더러
작은지역(asia-northeast3-c) 맨 뒤에 있는 a/b/c까지 완전 똑같이 맞춰줘야 vm 인스턴스가 떠서 선택 가능

챗지피티 답변

    GCP에서 비관리형 인스턴스 그룹에 VM을 추가하려고 할 때 "No available VMs" 메시지가 나타나는 몇 가지 일반적인 원인이 있습니다. 아래 몇 가지 가능한 원인과 해결 방법을 제시합니다:

    1. VM의 영역(Zone)이 인스턴스 그룹의 영역과 다름:
        인스턴스 그룹은 특정 영역에 속합니다. 추가하려는 VM이 동일한 영역에 있어야 합니다.

        확인 방법:
        GCP 콘솔에서 VM 인스턴스의 영역을 확인하세요.
        인스턴스 그룹이 속한 영역과 일치하는지 확인하세요.

    2. VM이 이미 다른 인스턴스 그룹에 속해 있음:
        VM 인스턴스는 하나의 인스턴스 그룹에만 속할 수 있습니다. 다른 인스턴스 그룹에 속해 있는지 확인하세요.

        확인 방법:
        GCP 콘솔에서 해당 VM 인스턴스를 선택하세요.
        인스턴스 세부 정보에서 인스턴스 그룹 탭을 확인하세요.

    3. VM의 상태가 비정상적이거나 중지됨:
        중지된 VM이나 비정상 상태의 VM은 인스턴스 그룹에 추가할 수 없습니다.

        확인 방법:
        GCP 콘솔에서 VM 인스턴스의 상태를 확인하세요.
        VM이 실행 중인지 확인하세요.

    4. 네트워크 설정 불일치:
        인스턴스 그룹과 VM이 동일한 네트워크 및 서브네트워크에 있어야 합니다.

        확인 방법:
        GCP 콘솔에서 VM 인스턴스의 네트워크 설정을 확인하세요.
        인스턴스 그룹의 네트워크 설정과 일치하는지 확인하세요.

    5. 권한 문제:
        VM을 인스턴스 그룹에 추가할 수 있는 적절한 권한이 없는 경우도 문제가 될 수 있습니다.

        확인 방법:
        GCP IAM 설정에서 VM 인스턴스와 인스턴스 그룹에 대한 권한을 확인하세요.

    문제 해결 절차
        1. GCP 콘솔에 로그인합니다.
        2. Compute Engine > VM 인스턴스로 이동하여 추가하려는 VM의 영역, 상태, 네트워크 설정을 확인합니다.
        3. Compute Engine > 인스턴스 그룹으로 이동하여 인스턴스 그룹의 영역, 네트워크 설정을 확인합니다.
        4. 필요한 경우 VM 인스턴스를 인스턴스 그룹과 동일한 영역으로 이동하거나, 네트워크 설정을 일치시킵니다.
        5. 모든 설정이 올바르게 구성되었는지 다시 확인한 후 VM을 인스턴스 그룹에 추가해 봅니다.

    이 단계를 통해 문제를 해결할 수 있을 것입니다. 그래도 해결되지 않으면 자세한 설정 정보를 제공해 주시면 추가로 도움을 드릴 수 있습니다.

11. GCP에서 Artifact Registry에 docker 이미지를 푸쉬할 때 권한 없어서 안되는 에러

19-01-deploy-with-kibernetes 실습에서 docker 이미지를 build 후 push 할 때
gcloud에 로그인한 계정이 권한이 없어서 푸쉬할 수 없다는 에러 발생

챗지피티가 해결해줌

챗지피티 답변

    권한 문제

    Google Cloud 프로젝트에 대한 적절한 권한이 없는 경우 이미지 업로드에 실패할 수 있습니다.

    Artifact Registry에 이미지를 업로드하려면 roles/artifactregistry.writer 역할이 필요합니다.
    다음 명령을 사용하여 역할을 부여할 수 있습니다.

    gcloud projects add-iam-policy-binding [PROJECT_ID] \
    --member="user:[YOUR_EMAIL]" \
    --role="roles/artifactregistry.writer"

    ( \ 지우고 한줄로 이어서 쓰기 )

12. Swagger API Docs의 API 테스트 무한 로딩

Swagger API Docs에서 API를 테스트 하려면 Try it out 버튼과 Execute 버튼을 눌러서 테스트할 수 있는데 무한 로딩이 되는 상황이 발생

원인

swagger.js 파일에서 @swagger 로 docs를 정의할 때 api 요청에 인자가 없을 때 "\* parameters:" 를 아예 지우지 않아서 그렇다

해결

"\* parameters:"를 비워두지 말고 완전히 삭제해야 API 테스트가 정상적으로 작동

13. axios 요청 바디를 못읽음

rest 실습에서 계속 요청 바디를 읽지 못하고 이런 에러 발생

TypeError: Cannot read properties of undefined (reading 'phoneNumber')
at Route.dispatch (D:\Study\Develop\Codecamp_Backend\4_API_Implement_Basic\quiz\quiz06\backend\node_modules\express\lib\router\route.js:119:3)
at Layer.handle [as handle_request] (D:\Study\Develop\Codecamp_Backend\4_API_Implement_Basic\quiz\quiz06\backend\node_modules\express\lib\router\layer.js:95:5)
at D:\Study\Develop\Codecamp_Backend\4_API_Implement_Basic\quiz\quiz06\backend\node_modules\express\lib\router\index.js:284:15
at Function.process_params (D:\Study\Develop\Codecamp_Backend\4_API_Implement_Basic\quiz\quiz06\backend\node_modules\express\lib\router\index.js:346:12)
at next (D:\Study\Develop\Codecamp_Backend\4_API_Implement_Basic\quiz\quiz06\backend\node_modules\express\lib\router\index.js:280:10)
at cors (D:\Study\Develop\Codecamp_Backend\4_API_Implement_Basic\quiz\quiz06\backend\node_modules\cors\lib\index.js:188:7)
at D:\Study\Develop\Codecamp_Backend\4_API_Implement_Basic\quiz\quiz06\backend\node_modules\cors\lib\index.js:224:17

Express 자체는 JSON 타입을 읽지 못함
express 객체에 JSON을 해석하는 기능을 적용시켜야 함

백엔드의 index.js 파일에 app.use(express.json()); 코드 추가하기
