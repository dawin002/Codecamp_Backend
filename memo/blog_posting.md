1. 통합 터미널에서 열기 한 폴더는 삭제 및 조작 불가능

Error: EBUSY: resource busy or locked, rmdir 에러

폴더 우클릭 -> 통합 터미널에서 열기 한 상태로 폴더 이름을 바꾸거나 폴더를 지울 때 발생하는 에러
폴더 이름 변경이나 폴더 삭제가 안먹음
로컬 탐색기에서 폴더 삭제 후 vscode 열면 터미널을 열 수 없다고 뜨면서 이게 원인이었다는거 알 수 있었음

폴더 우클릭 -> 통합 터미널 열기 -> 폴더 삭제 -> 에러 내용 캡처 => 같은 에러 나는지 확인해보기
해결방법: 아래 터미널에서 터미널 종료(휴지통 아이콘) 후 폴더 조작


2. 윈도우에서 yarn 실행시 초기 에러 잡기
https://theworldaswillandidea.tistory.com/77