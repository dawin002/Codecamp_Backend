// Node.js에서 파일 불러오기


// 기존 방식 (HTML)

//      예시 : game.html

<script scr="game.js"></script>


// Node.js 방식

//      import, export 키워드 사용
//      원하는 값만 골라서 가져올 수 있음

//      예시 : index.js

import {apple, banana } from 'game.js';

//      예시 : game.js

export let apple = 10;
export const banana = 3;

// 이렇게 작성 후 추가 작업 필요
//      import 문이 뭔지 이해시켜야 함

// 1. package.json 파일 생성
//      package.json: 이 패키지(프로젝트)의 정보를 관리하는 파일)

//      1) 현재 디렉토리 통합 터미널 열기

//      2) 터미널에 yarn init 입력
//         (yarn 에러 발생 : 메모에 작성)

//      3) 터미널에 입력하라고 뜨는 것들 다 엔터 치고 넘어가기

//      4) 현재 디렉토리에 package.json 파일이 생성됨

// 2. package.json 에 "type": "module" 속성 추가하기

//      1) 파일의 중괄호 안 마지막 줄에 "type": "module" 코드 추가

// 3. 시작 파일 실행하기

//      1) 터미널에 node (시작 파일 이름).js 명령어 입력해 파일 실행

// -> import 가 뭔지 이해하고 인식해 정상 실행됨