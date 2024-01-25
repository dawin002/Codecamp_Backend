// Docker MongoDB 연결


// MongoDB 설치

//      1. MongoDB 설치
//          1) 터미널 열기
//          2) 로컬에 MongoDB를 위한 탭 추가 명령어 입력
                `brew tap mongodb/brew`
//          3) mongodb-community를 설치 명령어 입력
                `brew install mongodb-community`
//          3-1) 경고 : Warning: ......brew link mongodb-community 가 뜬 경우
//               brew link mongodb-community를 입력하면 정상적으로 재설치

//      2. MongoDB 설치 확인
//          1) 터미널에서 brew 로 설치한 패키지 리스트 확인 명령어 입력
                `brew list`
//          2) MongoDB 관련 패키지 3개 존재하는지 확인
//              mongodb-community, mongodb-database-tools, mongosh


// MongoDB 설치 확인

//      1. MongoDB 실행
//          1) 터미널에서 MongoDB 실행 명령어 입력
                `brew services start mongodb-community`

//      2. MongoDB 실행 확인
//          1) 브라우저 주소창에 MongoDB 로컬 주소 입력
                `localhost:27017`
//          2) '페이지 열기 실패'라는 타이틀과 아래 문구가 웹페이지에 뜨는지 확인
//              It looks like you are trying to access MongoDB over HTTP on the native driver port.


// MongoDB root 설정

//      root 사용자를 등록해 비밀번호가 있어야 mongoDB에 접속할 수 있도록 설정

//      1. MongoDB shell 설치
//          1) 터미널에서 shell 설치 명령어 입력
                `brew install mongodb-community-shell`

//      2. MongoDB shell 실행
//          1) 터미널에서 shell 실행 명령어 입력
                `mongo`

//      3. root 사용자 등록
//          1) 기본 DB인 admin 선택
                `use admin`
//          2) root 사용자 등록
                `db.createUser({user:'root', pwd:'본인이 설정하고 싶은 비밀번호', roles:['root']})`
//          3) shell 에서 나오기
                `exit`

//      4. root 사용자로 접속
//          1) MongoDB 재시작
                `brew services restart mongodb-community`
//          2) root 사용자로 접속하기
                `mongo -u root -p`
                `root 사용자 비밀번호 입력`


// MongoDB Compass 설치

//      MongoDB용 GUI 데이터를 시각적으로 탐색하는 툴
//      데이터베이스를 쉽게 조회하고 수정할 수 있음
//      Linux, Mac, Windows에서 사용 가능

//      1. MongoDB Compass 다운로드
//          1) 다운로드 링크 접속
//              https://www.mongodb.com/try/download/compass
//          2) 내 pc 환경에 맞는 버전의 프로그램 다운로드
//          3) 설치 프로그램 실행 및 설치

//      2. MongoDB 연결
//          1) MongoDB Compass 실행
//          2) URI 부분에 mongodb://localhost:27017 입력
//          3) Connect 버튼 클릭

//      3. MongoDB 연결 확인
//          1) MongoDB Compass 왼쪽 메뉴 중 Databases 클릭
//          2) Databases 탭이 열리고 아래 세 가지 항목이 있는지 확인
//              admin, config, local
//              있으면 정상적으로 연결된 것


// 윈도우 환경 MongoDB 설치

//      MongoDB, MongoDB shell, MongoDB Compass 설치 하고
//      root 사용자 생성까지

//      아래 게시물 보고 따라할 것
//          포시코딩 - MongoDB - Local 설치
//          https://4sii.tistory.com/54


// MongoDB 설치하며 발생한 에러 (Mac)

//      1. brew를 이용한... > 3) mongodb-community ... 에서 발생한 에러

/*
            Warning: A newer Command Line Tools release is available.
            Update them from Software Update in System Settings.

            If that doesn't show you any updates, run:
                sudo rm -rf /Library/Developer/CommandLineTools
                sudo xcode-select --install

            Alternatively, manually download them from:
                https://developer.apple.com/download/all/.
            You should download the Command Line Tools for Xcode 15.1.
*/

/*
            Error: The 'brew link' step did not complete successfully
            The formula built, but is not symlinked into /usr/local
            Could not symlink bin/node
            Target /usr/local/bin/node
            already exists. You may want to remove it:
                rm '/usr/local/bin/node'

            To force the link and overwrite all conflicting files:
                brew link --overwrite node

            To list all files that would be deleted:
                brew link --overwrite --dry-run node
*/

/*
            Warning: The post-install step did not complete successfully
            You can try again using:
                brew postinstall node
*/

/*
            Warning: openssl@1.1 has been deprecated because it is not supported upstream!
*/

// MongoDB 설치하며 발생한 에러 (Windows)

/*
            Service 'MongoDB Server'(MongoDB) failed to start.
            Verify that you have sufficient privileges to start system services

            MongoDB 설치 후 실행했을 때 발생한 에러
            구글링 결과 권한 관련 문제로 보임

            https://stackoverflow.com/a/61341751/19418070 를 보고 해결방법을 따라하던 중
            내가 mongodb를 설치한 외장 ssd의 폴더의 속성에서 보안 탭이 없는걸 보고
            외장 ssd는 내 pc를 조작할 수 있는 권한을 부여할 수 없는 것 같아서
            내 pc의 D 드라이브에 재설치하자 문제 해결됨
*/