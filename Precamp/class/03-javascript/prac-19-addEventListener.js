
// eventListener

//      onclick, onkeydown 같은 이벤트 속성을 직접 지정해주는 것
//      html 파일이 아닌 js 파일에서 이벤트 추가


// 이벤트 리스너 추가하는 법

// 1. eventListener를 넣을 객체 지정
const btn = document.querySelector("check-btn");

// 2. addEventListener 함수로 이벤트 추가
//      매개변수 1: 어떤 속성에 반응할 건지 (click: onclick이랑 동일)
//      매개변수 2: 어떤 동작을 할 건지 (화살표 함수)
btn.addEventListener('click', () => {
    console.log('btn clicked');
});
