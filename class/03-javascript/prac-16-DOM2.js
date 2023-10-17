// DOM 이란?

//      Document Object Model
//      브라우저가 HTML 문서를 파싱하는 과정에서 생겨나는 객체
//      트리 구조의 형태를 가진다

//      document 객체를 활용해 html 문서를 조작할 수 있는 것은 DOM 객체 덕분이다
//      DOM 객체 하위의 각 객체의 속성값을 바꿔주며 html 조작이 가능하다


// DOM 객체 확인하기

console.dir(document);
// ▼ #document  // document 내부에 존재하는 모든 속성이 표시됨
//   ▶︎ ...
//   ▶︎ childNodes: NodeList(2)
//   ▶︎ ...

console.dir(document.childNodes);
// ▼ NodeList(2)
//    ▶︎ 0: <!DOCTYPE html>
//    ▶︎ 1: html
//      length: 2
//    ▶︎ [[Prototype]]: NodeList

console.dir(document.childNodes[1]);
// ▶︎ html   // 내부에 childNodes 존재

console.dir(document.childNodes[1].childNodes);
// ▼ NodeList(3)
//    ▶︎ 0: head
//    ▶︎ 1: text
//    ▶︎ 2: body
//      length: 3
//    ▶︎ [[Prototype]]: NodeList

console.dir(document.childNodes[1].childNodes[2]);
// ▶︎ body

console.dir(document.childNodes[1].childNodes[2].childNodes);
// ▼ NodeList(9)
//    ▶︎ 0: text
//    ▶︎ 1: h1
//    ▶︎ 2: text
//    ▶︎ 3: div.todo-container
//    ...
//      length: 9
//    ▶︎ [[Prototype]]: NodeList

console.dir(document.childNodes[1].childNodes[2].childNodes[3]);
// ▶︎ div.todo-container

console.dir(document.childNodes[1].childNodes[2].childNodes[3].childNodes);
// ▼ NodeList(5)
//    ▶︎ 0: text
//    ▶︎ 1: input#todo-input
//    ▶︎ 2: text
//    ▶︎ 3: ul
//    ▶︎ 4: text
//      length: 5
//    ▶︎ [[Prototype]]: NodeList

console.dir(document.childNodes[1].childNodes[2].childNodes[3].childNodes[1]);
// ▼ input#todo-input
//    ...
//    ▶︎ value: ""
//    ...

console.dir(document.childNodes[1].childNodes[2].childNodes[3].childNodes[1].value);
//

// 안녕하세요 입력 후 다시
console.dir(document.childNodes[1].childNodes[2].childNodes[3].childNodes[1].value);
// 안녕하세요

document.childNodes[1].childNodes[2].childNodes[3].childNodes[1].value;
// '안녕하세요'

document.childNodes[1].childNodes[2].childNodes[3].childNodes[1].value = '반갑습니다';
// 화면의 input 태그 안의 텍스트가 반갑습니다 로 바뀜