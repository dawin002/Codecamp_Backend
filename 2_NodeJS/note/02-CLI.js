// GUI

//      Graphic User Interface
//      그림을 통해 사용자가 조작하는 인터페이스

// CLI

//      Command Line Interface
//      명령어를 통해 사용자가 조작하는 인터페이스

// 명령어

//      작업 디렉토리 위치 출력
//          pwd
//          : print working directory
//          현재 작업하고 있는 디렉토리의 위치를 출력

//      파일 리스트 출력
//          ls
//          : list
//          현재 디렉토리의 하위 파일(디렉토리) 리스트 출력
//          옵션
//              list -al 
//              : 숨김 파일(디렉토리)을 포함한 모든 리스트와 상세 정보를 출력
//                d로 시작하는 라인은 디렉토리를 의미

//      디렉토리 이동
//          cd
//          사용 예시
//              cd class
//              : 현재 디렉토리 하위의 폴더 중 class 폴더로 이동

//      디렉토리 생성
//          mkdir
//          : make directory
//          현재 디렉토리의 하위에 새로운 디렉토리 생성
//          사용 예시
//              mkdir class2
//              : 현재 디렉토리 하위에 class2 디렉토리 생성

//      파일 복사
//          cp
//          : copy
//          파일을 복사해 새로운 파일 생성
//          사용 예시
//              cp a.js b.js
//              : a.js 파일을 복사해 b.js 파일 생성

//      디렉토리 복사
//          cp -R
//          : copy recursive
//          하위 파일(디렉토리)까지 순회하며 복사해 새로운 디렉토리 생성
//          디렉토리는 하위 파일이 존재할 수도 있어서 모든 하위 파일 전체를 복사해야 디렉토리 복사 가능
//          사용 예시
//              cp -R class class2
//              : class 내의 모든 파일, 디렉토리를 복사해 class2 디렉토리 생성
//          잘못된 예시
//              cp class class2
//              : 에러 발생 "cp: class2 is a directory (not copied)."

//      파일 제거
//          rm
//          : remove
//          현재 작업 디렉토리의 특정 파일 제거
//          사용 예시
//          rm a.js
//          : 현재 작업 디렉토리 내의 a.js 파일 제거됨

//      디렉토리 제거
//          rm -rf
//          : remove recursive false
//          하위 디렉토리까지 모두 순회하며 모든 파일(디렉토리) 제거
//          디렉토리는 하위에 또 다른 디렉토리가 존재할 수 있으므로 순회 옵션(-rf)을 사용해야만 제거 가능
//          사용 예시
//              rm -rf class2
//              : class2 디렉토리의 하위 디렉토리를 모두 순회하며 모든 파일(디렉토리) 제거
//          잘못된 예시
//              rm class2
//              : 에러 발생 "rm: class2: is a directory"
