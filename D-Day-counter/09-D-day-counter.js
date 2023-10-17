
// html이 만들어짐과 동시에 동작하고싶은 코드

// 그냥 써두기만 하면 에러남 
// 이유 : html 문서는 위에서부터 한줄씩 실행 -> script 태그를 만나면 script 파일로 넘어가 끝까지 실행 -> 다시 script 태그 다음줄부터 html 파일의 코드 실행 ==> 이 js 코드가 실행될 때는 해당 태그가 생성되지 않은 상태!

// 해결법 1 : <script> 태그를 html 문서 하단에 넣기
//          - html의 태그가 모두 로딩된 후 script 읽음
// 해결법 2 : <script> 태그에 defer 속성 넣기 (<script src="" defer>)
//          - defer 속성이 script 파일을 읽는 동시에 하단의 html 코드를 읽게 해줌


const msgContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
container.style.display = 'none';

const intervalIdArr = [];

// 로컬 스토리지에 저장된 데이터(키값:'saved-date') 불러오기
let savedDate = localStorage.getItem('saved-date');

// msgContainer.textContent = 'D-Day를 입력해주세요.';
// textContent : 태그의 텍스트 콘텐츠만 다루는 속성

msgContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";
// innerHTML : 태그 내부에 들어갈 HTML 코드자체를 다룰 수 있는 속성

const dateFormMarker = () => {
    let inputYear = document.querySelector("#target-year-input").value;
    let inputMonth = document.querySelector("#target-month-input").value;
    let inputDate = document.querySelector("#target-date-input").value;

    // 템플릿 리터럴 방식으로 문자열 생성
    let targetDateInput = `${inputYear}-${inputMonth}-${inputDate}`;

    return targetDateInput;
};

const counterMaker = (data) => {

    // 로컬 스토리지에 날짜 저장
    if (data !== savedDate) {
        localStorage.setItem('saved-date', data);
        savedDate = data;
    }

    // 날짜 객체 생성
    let nowDate = new Date();
    let targetDate = new Date(data).setHours(0, 0, 0, 0); // setHours()로 자정을 기준 시각으로 지정
    
    // 날짜의 차이 (초단위)
    let remaining = (targetDate - nowDate) / 1000;

    // 만약, 남은 시간이 0이면 타이머 종료 출력
    // 수도코드
    if(remaining <= 0) {
        container.style.display = 'none';
        msgContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
        msgContainer.style.display = 'flex';
        setClearInterval();
        // if문 아래의 시간 계산 코드가 작동하지 않게 하기 위한 리턴 함수 종료
        return;
    } else if (isNaN(remaining)) {
        // 만약, 잘못된 날짜가 들어왔다면 유효한 시간대가 아님 출력.
        container.style.display = 'none';
        msgContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
        msgContainer.style.display = 'flex';
        setClearInterval();
        // else if문 아래의 시간 계산 코드가 작동하지 않게 하기 위한 리턴 함수 종료
        return;
    }

    const remainObj = {
        remainDate: Math.floor(remaining / 60 / 60 / 24),
        remainHour: Math.floor(remaining / 60 / 60) % 24,
        remainMin: Math.floor(remaining / 60) % 60,
        remainSec: Math.floor(remaining) % 60,
    };

    const documentArr = ['days', 'hours', 'min', 'sec'];
    const timeKeys = Object.keys(remainObj);

    const format = function(time) {
        if(time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    }

    let i = 0;
    for(let tag of documentArr) {
        const remainingTime = format(remainObj[timeKeys[i]]);
        document.getElementById(tag).textContent = remainingTime;
        i++;
    }
    
};


const starter = function(targetDateInput) {

    if(!targetDateInput) {
        targetDateInput = dateFormMarker();
    }

    // 화면 표시 문구 css 설정
    container.style.display = 'flex';
    msgContainer.style.display = 'none';

    // 한 번에 하나의 인터벌(반복)만 존재하게
    setClearInterval();

    // 화면에 d-day 표시
    counterMaker(targetDateInput);  // 1초 미만일 때 1회 실행
    // 1000ms 간격으로 반복
    const intervalId = setInterval(() => {
        counterMaker(targetDateInput);
    }, 1000);

    // 초기화를 위한 인터벌 id 저장
    intervalIdArr.push(intervalId);
};

// 모든 인터벌 삭제 함수
const setClearInterval = function() {
    for(let intervalId of intervalIdArr) {
        clearInterval(intervalId);
    }
    // 로컬 스토리지에 저장된 saved-date 항목 삭제 
    // (잘못된 시간 입력됐을 때도 삭제해주기 위해 setClearInterval 내에 작성)
    localStorage.removeItem('saved-date');
};

// 타이머 초기화 함수
const resetTimer = function() {
    // 문구 수정
    container.style.display = 'none';
    msgContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";
    msgContainer.style.display = 'flex';

    setClearInterval();
}

if (savedDate) {
    starter(savedDate);
} else {
    container.style.display = 'none';
    msgContainer.style.display = 'flex';
    msgContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";
} 