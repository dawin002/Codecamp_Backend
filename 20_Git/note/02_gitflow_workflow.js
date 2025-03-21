// Git 협업하기

//      협업 방식 두 가지

//          Gitflow Work-flow
//              일반적으로 많이 사용하는 방식

//          Trunk Based Development
//              CI/CD 에서 사용하는 방식
//              데브옵스 팀이 있는 회사에서 많이 사용

// Gitflow Work-flow

//      강의자료에 알기 쉽게 설명되어 있음

//      강의자료에 없는 내용만 필기


//      Git 브랜치

//          독립적인 개발 라인
//          하나의 프로젝트를 다른 사람의 작업과 분리해 개발 가능


//      Git 저장, 병합

//          git commit 을 하면 현재 브랜치에 저장(확정)됨
//          상위 브랜치에서는 현재 브랜치에 방금 커밋한 파일이 아직 적용 안됨
//          git merge 를 하면 현재 브랜치를 상위 브랜치로 병합함


//      브랜치 종류 요약

//          master branch 
//              배포할 브랜치

//          develop barnch
//              통합 개발 브랜치
//              master branch의 하위 브랜치
//              이 브랜치에서 바로 개발을 하는건 아님

//          feature branches
//              기능을 개발을 위한 브랜치
//              develop branch의 하위 브랜치
//              피쳐 브랜치의 이름은 feature-fetchBoard 처럼 지음

//          release branches
//              릴리즈 하기 위한 브랜치
//              릴리즈 전 테스트 및 버그 픽스 작업만 함
//              릴리즈 준비 끝나면 master branch로 병합되어 배포됨
//              버그 픽스 때문에 기능 개발이 필요하다면 다시 develop branch로 내려가기도 함

//          hotfixes branch
//              급한 버그를 픽스하는 브랜치
//              배포후 발생한 버그를 핫픽스하는 작업만 수행
//              핫픽스후 바로 master branch로 병합
//              master branch의 하위 브랜치


//      Forking Repository

//          회사 레파지토리에 직원이 다이렉트로 푸쉬하면 충돌이 일어날 수도 있고
//          ~~~ 할 수도 있기 때문에 방어해야함

//          Forking Repository로 방어 가능

//          회사 레파지토리에 보일러 플레이트가 들어있음
//          각각의 개발자가 회사 레파지토리를 자신의 레파지토리로 복사 (Fork)
//          개발자가 자신의 레파지토리를 로컬에 복사 (Clone)
//          개발자가 자신이 개발할 기능의 브랜치를 생성해 개발 (branch 생성)
//          개발자가 개발한 기능을 자신의 레파지토리에 올림 (Push)
//          회사 레파지토리에 개발자가 개발한 기능을 가져가라고 요청 (Pull Request)
//          회사 레파지토리 권한을 가진 관리자가 PR을 본 프로젝트에 합침 (Merge)

//          그냥 Merge 되는가? => 아님
//              merge를 위해서는 권한을 가진 사람이나 몇명의 승인이 필요함
//              승인은 다같이 코드 리뷰를 하면서 해당 PR을 병합할지 Reject할지 결정
//              Reject된 PR은 반려되고 다시 수정해서 PR을 보내야함

//          origin / upstream
//              origin : 내가 회사 레파지토리로부터 Fork해온 내 깃허브 레파지토리
//              upstream : 회사 레파지토리
//              origin과 upstream 간에 차이(다른 개발자가 개발한 기능이 병함되는 등)가
//               발생한 경우 오늘 업무를 시작하기 전 내 로컬 개발 환경에서 upstream을 pull 해야함


//      협업시 주의사항

//          1. 1일 1PR
//              하루에 한번 PR을 날리고 다음날 upstream에서 pull하지 않으면
//               내 코드와 upstream 코드의 호환이 무너질 수 있음
//              코딩이 덜 끝나서 PR을 못하는 경우는 기능의 단위를 너무 넓게 잡은 것
//              기능을 더 세분화해서 하루에 한번 올릴 수 있는 양으로 줄여야함

//          2. 독립 기능으로 역할 분배
//              각각이 서로 다른 기능을 개발해야함 
//              서로 겹치는 부분을 개발하면 PR끼리 호환이 안되는 문제가 생길 수도 있음

//          3. 각 PR간 의존성 없애기
//              하루에 여러 PR을 보낼 때 서로 독립적인 PR을 보내야함
//              첫번째 PR에서 만든 기능이 두번째 PR에서 사용될 때 첫번째 PR에 문제가 있어서
//              reject되야 하는 경우 두번째 PR도 reject해야하기 때문

//          4. 공통기능 주의하기
//              모든 기능에 영향을 미치는 공통기능은 회사의 실력 있는 사람이
//              각각의 기능에 이슈가 없을지 고려해 잘 만들어야함