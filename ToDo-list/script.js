const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

// 로컬 스토리지에서 saveItems 불러와 JSON 타입에서 원본 타입으로 되돌리기
const savedTodoList = JSON.parse(localStorage.getItem('save-items'));

// 로컬 스토리지에 저장된 값이 있다면
if (savedTodoList) {
    // 각 데이터로 todo 추가 함수 호출
    for (let i = 0; i < savedTodoList.length; i ++) {
        createTodo(savedTodoList[i]);
    }
}

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
    
    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value = '';
    saveItemsFunc();
};

// 엔터키 눌림 감지 함수
const keyCodeCheck = function () {
    if (window.event.keyCode === 13 && todoInput.value) {
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

    // 로컬 스토리지에 JSON 형식으로 saveItems 배열 저장
    localStorage.setItem('save-items', JSON.stringify(saveItems));
};