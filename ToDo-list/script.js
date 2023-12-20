const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

// 로컬 스토리지에서 saveItems 불러와 JSON 타입에서 원본 타입으로 되돌리기
const savedTodoList = JSON.parse(localStorage.getItem('save-items'));

// todo 하나 추가하는 함수
const createTodo = function (storageData) {
    // todo 내용 input에서 가져오기
    let todoContents = todoInput.value;
    // 매개변수가 들어온다면(저장된 todo 있다면)
    if (storageData) {
        // todo 내용 저장된 값으로 재할당
        todoContents = storageData.contents;
    }

    const newLi = document.createElement('li' );
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');

    // 버튼에 이벤트 리스너 추가 (클릭 이벤트)
    newBtn.addEventListener('click', () => {
        // complete 라는 클래스 속성 추가
        newLi.classList.toggle('complete');
        //      toggle로 추가하는 거라 한번 누르면 추가 다시 한번 누르면 삭제됨
        // 버튼 눌릴 때마다 로컬 스토리지 저장
        saveItemsFunc();
    });

    // li 태그에 이벤트 리스너 추가 (더블 클릭 이벤트)
    newLi.addEventListener('dblclick', () => {  // dblclick : 더블 클릭
        // 이 태그 객체를 삭제
        newLi.remove();
        // 삭제될 때마다 로컬 스토리지 저장
        saveItemsFunc();
    });

    // 매개변수가 있고, 매개변수의 complete 값이 true 인 경우
    if (storageData?.complete) {
        // complete 라는 클래스 속성 추가
        newLi.classList.add('complete');
    }
    // 조건식 안 객채 뒤의 '?'
    //    : optional chaining
    //      객체가 undefined 이거나 null 이면 뒤쪽 코드 실행 안함
    //      if (storageData && storageData.complete) 조건식과 같음
    //      storageData 가 존재할 때만 .complete 실행
    
    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value = '';
    saveItemsFunc();
};

// 엔터키 눌림 감지 함수
const keyCodeCheck = function () {
    // trim() : 문자열 양쪽의 공백을 제거하는 메서드
    if (window.event.keyCode === 13 && todoInput.value.trim()) {
        createTodo();
    }
};

// 모든 태그 삭제 함수
const deleteAll = function () {
    const liList = document.querySelectorAll('li');
    for(li of liList) {
        li.remove();
        saveItemsFunc();
    }
};

// 로컬 스토리지에 저장 함수
const saveItemsFunc = function () {
    const saveItems = [];
    
    for(let i=0; i<todoList.children.length; i++) {
        const todoObj = {
            // i번째 li 태그 안의 span 태그의 텍스트
            contents : todoList.children[i].querySelector('span').textContent,
            // i번째 li 태그의 클래스 리스트의 complete 클래스 존재 여부
            complete : todoList.children[i].classList.contains('complete'),
        };
        saveItems.push(todoObj);
    };

    // JSON : 텍스트형 데이터 포맷 (객체나 데이터를 문자열로 바꿀 수 있음)
    // console.log(JSON.stringify(saveItems))

    // 배열이 비어있을 때는 로컬 스토리지에서 데이터 삭제(불필요한 데이터 삭제)
    if (saveItems.length === 0) {
        localStorage.removeItem('save-items');
    } else {
        // 로컬 스토리지에 JSON 형식으로 saveItems 배열 저장
        localStorage.setItem('save-items', JSON.stringify(saveItems));
    }

    // 바로 위 코드 3항 연산자로 대체 가능
    // saveItems.length === 0 
    //     ? localStorage.removeItem('save-items') 
    //     : localStorage.setItem('save-items', JSON.stringify(saveItems));
};

// 로컬 스토리지에 저장된 값이 있다면
if (savedTodoList) {
    // 각 데이터로 todo 추가 함수 호출
    for (let i = 0; i < savedTodoList.length; i ++) {
        createTodo(savedTodoList[i]);
    }
}
// 이 코드가 가장 아래에 내려와야 하는 이유
// : createTodo() 함수가 정의된 후에 호출되어야 하기 때문


/* Web Weather Map API 사용해 날씨 정보 가져오기 */

const weatherSearch = function(position) {
    let key = '3b27ee52a6e2c2453328d0db9f28269c';
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${key}`
    ) 
    // then()으로 promise 객체가 fulfilled 상태가 되었을 때 처리해줌
    .then((res) => {
        // JSON 타입의 응답을 원래의 데이터 타입으로 변환해서 반환
        // 헤더가 존재하는 응답이라 json() 사용
        return res.json();  // json()이 promise 객체 반환
    }) 
    // 한번 더 then()으로 res.json()의 변환 작업이 완료되는 것을 기다렸다가 처리
    .then((json) => {
        console.log(json.name, json.weather[0].description);
    })
    .catch((err) => {
        console.error(err);
    });
}


/* Geolocation API 사용해 위치 정보 가져오기 */

// 위치 접근에 성공했을 때 실행되는 함수
const accessToGeo = function(position) {
    // 매개변수 position 에 현재 위치 정보가 담김

    // 위치 정보를 담는 객체
    const positionOBJ = {
        latitude: position.coords.latitude,     // 위도
        longitude: position.coords.longitude,   // 경도
    }

    weatherSearch(positionOBJ);
}

// 위치 접근에 실패했을 때 실행되는 함수
const error1 = function(err) {
    console.log(err);
}

const askForLocation = function() {
    navigator.geolocation.getCurrentPosition(accessToGeo, error1);
}

askForLocation();
