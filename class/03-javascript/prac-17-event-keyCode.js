
// event 와 keyCode

console.log(window.event);
//      이벤트가 실행되었을 때 이벤트 객체의 정보를 출력
//      window  : 전역 객체
//      event   : 현재 발생한 이벤트 객체의 정보

console.log(window.event.keyCode);
//      이벤트 객체로 엔터 키가 눌렸을 때 keycode가 몇 번인지 확인 -> 13번
//      keyCode : 눌린 키보드 번호



// 엔터키 눌렸을 때 동작하는 함수

const keyCodeCheck = function () {
    if (window.event.keyCode === 13) {
        console.log("엔터 키 눌림");
    }
};  //  발생한 이벤트의 keyCode가 13(엔터의 키코드)일 때 동작

//      HTML에서 다음 코드 필요
<input type="text" onkeydown="keyCodeCheck"></input>