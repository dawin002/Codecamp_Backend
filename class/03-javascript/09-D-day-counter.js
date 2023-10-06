
// html이 만들어짐과 동시에 동작하고싶은 코드

// 그냥 써두기만 하면 에러남 
// 이유 : html 문서는 위에서부터 한줄씩 실행 -> script 태그를 만나면 script 파일로 넘어가 끝까지 실행 -> 다시 script 태그 다음줄부터 html 파일의 코드 실행 ==> 이 js 코드가 실행될 때는 해당 태그가 생성되지 않은 상태!

// 해결법 1 : <script> 태그를 html 문서 하단에 넣기
//          - html의 태그가 모두 로딩된 후 script 읽음
// 해결법 2 : <script> 태그에 defer 속성 넣기 (<script src="" defer>)
//          - defer 속성이 script 파일을 읽는 동시에 하단의 html 코드를 읽게 해줌


let msgContainer = document.querySelector("#d-day-message");
let container = document.querySelector("#d-day-container");

// ****************< 주석 풀기 >******************
// container.style.display = 'none';
// *********************************************

// textContent : 태그의 텍스트 콘텐츠만 다루는 속성
// msgContainer.textContent = 'D-Day를 입력해주세요.';

// innerHTML : 태그 내부에 들어갈 HTML 코드자체를 다룰 수 있는 속성
msgContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";


const dateForMarker = () => {
    let inputYear = document.querySelector("#target-year-input").value;
    let inputMonth = document.querySelector("#target-month-input").value;
    let inputDate = document.querySelector("#target-date-input").value;

    // 문자열 연산자 활용해 문자열 생성
    // let dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;

    // 템플릿 리터럴 방식으로 문자열 생성
    let dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

    return dateFormat;
};

const counterMaker = () => {
    // 입력된 날짜 데이터 받아오기
    let dateFormat = dateForMarker();

    // 날짜 객체 생성
    let nowDate = new Date();
    let targetDate = new Date(dateFormat).setHours(0, 0, 0, 0); // setHours()로 자정을 기준 시각으로 지정
    
    // 날짜의 차이 (초단위)
    let remaining = (targetDate - nowDate) / 1000;

    // 만약, 남은 시간이 0이면 타이머 종료 출력
    // 수도코드
    if(remaining <= 0) {
        console.log("타이머가 종료되었습니다.");
        msgContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    } else if (isNaN(remaining)) {
        // 만약, 잘못된 날짜가 들어왔다면 유효한 시간대가 아님 출력.
        console.log("유효한 시간대가 아닙니다.");
        msgContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    }

    let remainSec = Math.floor(remaining) % 60;
    let remainMin = Math.floor(remaining / 60) % 60;
    let remainHour = Math.floor(remaining / 60 / 60) % 24;
    let remainDate = Math.floor(remaining / 60 / 60 / 24);

    let days = document.querySelector("#days");
    let hours = document.querySelector("#hours");
    let min = document.querySelector("#min");
    let sec = document.querySelector("#sec");

    days.textContent = remainDate;
    hours.textContent = remainHour;
    min.textContent = remainMin;
    sec.textContent = remainSec;

    console.log(remainDate, remainHour, remainMin, remainSec)
}