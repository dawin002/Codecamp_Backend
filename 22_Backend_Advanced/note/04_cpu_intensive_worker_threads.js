// 워커스레드

//      강의자료에 없는 내용만 필기

//      학습 목표
//          CPU 인텐시브(집중적으로 사용)한 작업을 어떻게 처리할 것인지 알아보자

//      처리 방법
//          1. CPU 인텐시브 작업을 처리하는 서버를 만들어 해당 서버에서 멀티스레드로 처리
//          2. 자바스크립트 내부에서 worker thread를 만들어 CPU 인텐시브 작업을 처리

//          자세한 설명은 강의자료 참고

// 워커스레드 실습

//      강의자료 보고 vscode에서 진행

//      워커 스레드를 여러개 만들어 돌렸을 때 실행 속도가 빠른 이유

//          내 컴퓨터에서 사용할 수 있는 cpu 코어가 여러개여서 
//          각 워커 스레드가 병렬적으로 작업을 처리함

//      => 실행 속도를 보장할 수 있음

//      => 병목 현상을 방지할 수 있음