// DOM 이란?

// Document Object Model
// JS로 구현한 기능을 HTML 상에서 돌릴 수 있게 하는 것

// HTML의 Element(태그로 관리되는 것들)를 읽어오거나 JS에서 구현한 기능으로 Element를 제어하는 것이 가능

// 대표적인 사용 예시
// document.getElementById("tagID").innerText
// document.getElementById("tagID").value
// document.getElementById("tagID").style
// document.getElementById("tagID").textContent

// innerText 와 value 의 차이

function greeting(){
    // innerText : 시작태그와 종료태그 사이에 있는 문자열에 접근
    document.getElementById("target").innerText = "Goodbye";

    // input 태그처럼 종료태그가 없는 태그는 innerText로 문자열에 접근 못함,
    // value 써야함
    document.getElementById("inp_txt").value = "changed by value";

}

