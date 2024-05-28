// Gitflow 실습

//      회사 레파지토리, 팀장 레파지토리, 팀원 레파지토리 생성해 Gitflow 실습

//      Gitflow Work-flow 강의자료에 실습 내용 들어있음

//      실습 과정

//          팀장 작업 폴더 생성 후 회사 레파지토리에 push(업로드)
//          * 팀장 역할 실습은 노원두 선생님이 진행, 내가 안함
//          팀장 폴더를 fork로 내 레파지토리에 복제
//          해당 레파지토리를 clone으로 내 로컬 vscode에 복제

//      실습 진행

//          중요!!!
//              https://github.com/nwd0907/codecamp-backend-team

//              위 주소의 레파지토리 Fork 후 강의자료 보고 실습 진행

//              실습은 현재 레파지토리가 아닌 새로 생성한 레파지토리에서 진행

//              실습 로컬 폴더는 D:\Study\Develop\codecamp-backend-user


//          Github Issues로 팀원들과 일정 공유하기

//              git checkout -b feature-createBoard 명령어로 브랜치 생성해서 작업하면
//               다른 팀원들이 뭘 하고 있는지 모름

//              따라서 Github > 팀장 레파지토리 > Issues > New issue 에서
//               내가 어떤 작업을 할건지 작성해서 알려줘야함

`               제목: 메세지 전송 취소 API 만들기!!!

                'Submit new issue' 버튼 클릭해 등록
`
//              trello, Jira 등 팀원들과 일정 공유하는 도구 사용하기도 함


//          내 작업 branch 만들기

//              branch 이름을 정할 때 

//              1) Github issue 제목을 영어로 써두고
//                  feature-createUserAPIImplement 로 명명하거나

//              2) Github issue 번호를 확인하고
//                  feature-#41 또는 feature-issue#41 로 명명함

`               git checkout -b feature-#41
`

//          기능 구현후 커밋하기

`               git branch
`//             현재 브랜치 확인하기 - feature-#41 브랜치인지 확인

`               git status
`//             깃 상태 확인하기
//              생성/변경되었지만 깃에 추가되지 않은 파일은 빨간색으로 뜸
//              생성/변경되었고 깃에 추가된 파일은 초록색으로 뜸

`               git add .
`//             모든 생성/변경 파일 깃에 추가하기

`               git commit -m '메세지 전송 취소 기능'
`//             현재 변경된 깃 커밋하기

`               git push origin feature-#41
`//             origin(내 레파지토리)의 feature-#41 브랜치에 푸쉬


//          커밋한 깃 Pull Request하기

//              내 Github의 codecamp-backend-team 레파지토리에 들어가면
//               아래 메시지와 버튼이 떠 있음

`               feature-#41 had recent pushes 2 minutes ago    [Compare & pull request]
`//             브랜치가 푸쉬되었다. [비교하고 PR하는 버튼]

//              Compare & pull request 버튼 클릭하기

//              내 레파지토리의 feature-#41 브랜치를 원본 레파지토리의 master 브랜치로
//               Pull request 하는 창이 뜸
//              (실제라면 원본의 develop 브랜치로 PR함)

//              Create pull request 버튼 클릭해 PR 보내기


//          팀장이 PR 승인하기 (내가 실습 안함, 강의에서 보여줌)

//              팀장이 Github에서 원본 레파지토리로 접속
//              Pull requests 탭 들어옴
//              들어온 PR 다같이 코드리뷰함
//              PR에 문제가 없다면 팀장이 Confirm merge 버튼 눌러서 병합
//              PR에 문제가 있다면 팀장이 Close pull request 버튼 눌러서 reject


//          upstream에서 Merge한 원본 레파지토리 다시 Pull 받기

//              어제 보냈던 PR들이 Merge된 후 오늘 업무를 시작하기 전에 
//               내 로컬의 vscode 작업 공간에 다시 pull 받아야함

`               gir remote -v
`//             upstream 등록되어 있는지 확인
//              터미널에 명령어 입력후 출력 결과 맨앞에 origin 밖에 없으면 upstream 등록 안된것

`               팀장 레파지토리의 git 주소 복사
`//             upstream으로 등록할 주소 받아와야하기 때문

`               git remote add upstream https://github.com/nwd0907/codecamp-backend-team.git
`//             upstream 설정하기

`               git checkout master
`//             내 작업 공간에 있는 master 브랜치로 이동

`               git pull upstream master
`//             upstream 레파지토리의 master 브랜치 다운(pull)받기


//          브랜치 생성할 때 주의사항

//              브랜치를 어떤 브랜치에서 생성하는지에 따라 베이스 폴더가 완전히 달라짐

//              upstream의 master 브랜치를 pull한 뒤
`               git checkout -b feature-#45
`//             명령어로 오늘 작업할 브랜치 생성할 때

`             * master 브랜치에서 feature-#45 브랜치 생성해야함!
`
`             * feature-#41 브랜치에서 feature-#45 브랜치 생성하면 큰일남!!!
`
//              feature 브랜치에서 새로운 feature 브랜치를 생성하는 경우
//               upstream의 master 브랜치에서 추가/변경된 코드가 하나도 적용이 안된
//               상태로 새로운 코드를 짜게 됨

//              => 베이스 브랜치에서 피쳐 브랜치를 따자!