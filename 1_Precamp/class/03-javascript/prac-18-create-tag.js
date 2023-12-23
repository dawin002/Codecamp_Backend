
// 1. 넣을 위치 찾아 객체로 받기

const parentDiv = document.querySelector("#parent-div");


// 2. createElement

//      HTML 문서에 넣을 새로운 요소 생성
//      document.createElement()

const newDiv = document.createElement('div');
//      <div></div> 태그 생성됨
newDiv.textContent = " 안녕하세요 ";
//      <div> 안녕하세요 </div>


// 3. appendChild

//      태그 내부의 하위 속성으로 어떠한 태그를 추가
//      tagElement.appendChild(childElement);

parentDiv.appendChild(newDiv);
//      parentDiv 태그 내부에 newDiv 태그를 추가

//      <div id="parent-div">
//          <div> 안녕하세요 </div>
//      </div>