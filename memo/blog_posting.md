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
- 윈도우 파워쉘에서 mongod 명령어로 MongoDB 실행
- mongosh 명령어로 MongoDB Shell 실행
- use admin 명령어로 admin db로 변경
- db.shutdownServer(); 명령어로 MongoDB 종료
- exit 명령어로 MongoDB shell 종료
- 이후 mongosh 로 MongoDB가 종료되어 실행 안되는 것 확인
- 근데 여기서 mongod 로 MongoDB를 실행하고 mongosh 로 MongoDB Shell 을 열었으나 connection error? 이런 에러 뜸 나중에 다시 테스트

시도한 방법들

- mongod.lock 파일 삭제
-> MongoDB가 비정상 종료되었을 경우 이를 해결하는 작업을 다음 MongoDB 실행때 수행하는데 수행할 작업을 mongod.lock에 적어둔다고 함
-> 이 작업 자체가 잘못 적혀있거나 수행되며 에러가 발생할 수도 있어서 lock 파일을 지우면 해결될 수도 있다고 함
-> 지웠으나 동일한 에러 발생

- 작업관리자 - 서비스에서 MongoDB 상태 확인하기
-> 상태 정지 로 되어있음
-> 우클릭해서 시작 눌러도 잠깐 바뀌었다가 다시 정지됨
-> 서비스 속성에서는 사용/사용안함/자동 중 자동으로 되어있음
-> 서비스 시작 눌러도 시작 안되고 에러 뜸

- mongod --dbpath D:Apps/MongoDB/.../data 명령어 실행
-> 위 명령어 입력한 powershell에서는 더이상 입력 안됨
-> 다른 탭에서 mongosh 정상 작동
-> mongod --dbpath ... 입력한 파워쉘의 작업을 ^C로 끝내거나 탭을 닫으면 MongoDB 서버도 닫힘
-> mongod 실행한 파워쉘 닫은 후에는 mongosh 나 MongoDB Compass 둘 다 connection 실패

- 컴퓨터 다시시작 하기
-> 컴퓨터 재시작 후 파워쉘에서 mongod, mongosh 명령어 수행
-> 정상 작동함(???)
-> 다시 db.shutdownServer();로 MongoDB 종료 후 재시작하니 똑같은 에러 발생
-> 다시 컴퓨터 껏다 켜니 정상 동작
-> shutdown 이후 왜 다시 안켜지는지 나중에 구글링해보기


5. docker compose with mongoose 에서 발생하는 에러

Run yarn install 에서 실패한다고 나옴
자세한 내용은 05-08_docker_compose_with_mongoose.js 파일의 에러 발생 부분 참조