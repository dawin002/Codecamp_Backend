// DOM 이란?

//      Document Object Model

//      JS로 구현한 기능을 HTML 상에서 돌릴 수 있게 하는 것

//      HTML의 Element(태그로 관리되는 것들)를 읽어오거나 JS에서 구현한 기능으로 
//      Element를 제어하는 것이 가능

// DOM 사용 예시


// document.getElementById() 예제

document.getElementById("tagID").innerText
document.getElementById("tagID").value
document.getElementById("tagID").style
document.getElementById("tagID").textContent
//      등등이 있음



// document.querySelector() 예제


// class로 요소 접근

document.querySelector(".tagClass")
//      <div class=​"tagClass">​ 안녕하세요 ​</div>​ 
//      동일 class명 중 가장 앞의 하나만 가져옴

document.querySelector(".tagClass").innerText;
//      '안녕하세요'

document.querySelector("div.tagClass").innerText;
//      '안녕하세요'

document.querySelectorAll(".tagClass");
//      [div.tagClass, div.tagClass]

document.querySelectorAll(".tagClass").innerText = "123";
//      에러

document.querySelectorAll(".tagClass")[0].innerText = "123";
//      첫번째 tagClass인 요소 텍스트 "123"으로 바뀜

let tagList = document.querySelectorAll(".tagClass");
for(let i=0; i<tagList.length; i++) {
    tagList[i].innerText = "hello";
}
//      class="tagClass" 인 태그 모두 "hello"로 바뀜


// id로 요소 접근

document.querySelector("#tagID").innerText;
//      '안녕하시렵니까?'

document.querySelector("div#tagID").innerText;
//      '안녕하시렵니까?'

