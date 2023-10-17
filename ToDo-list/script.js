const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

// todo 하나 추가하는 함수
const createTodo = function () {
    const newLi = document.createElement('li' );
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');

    // 버튼에 이벤트 리스너 추가 (클릭 이벤트)
    newBtn.addEventListener('click', () => {
        // complete 라는 클래스 속성 추가
        newLi.classList.toggle('complete');
        //      toggle로 추가하는 거라 한번 누르면 추가 다시 한번 누르면 삭제됨
    });

    // li 태그에 이벤트 리스너 추가 (더블 클릭 이벤트)
    newLi.addEventListener('dblclick', () => {  // dblclick : 더블 클릭
        // 이 태그 객체를 삭제
        newLi.remove();
    });
    
    newSpan.textContent = todoInput.value;
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
    }
}

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
    console.log(saveItems);
}