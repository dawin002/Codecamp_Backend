let randNumMaker = () => {
    document.getElementById("randmake").disabled = true;
    randNum = String( Math.floor( Math.random() * 1000000 ) ).padEnd(6, "0");
    document.getElementById("num").innerText = randNum;
}

// 타이머 작동중 플래그 : false
let isStarted = false;

let auth = function () {

    if (isStarted === false) {
        // 타이머 플래그 : true
        isStarted = true;
        document.getElementById("finish").disabled = false;

        let time = 5;
        // timer 함수 이름 선언
        let timer;

        // timer 함수 초기화
        timer = setInterval(function () {

            // time이 0 이상이라면 1씩 줄이면서 화면에 표시
            if(time >= 0) {
                let min = String(Math.floor(time/60));
                let sec = String(time%60).padStart(2, '0');
                document.getElementById('timer').innerText = min + ':' + sec;
                time -= 1;

            // time이 0 미만이라면 인증완료 버튼 비활성화, 플래그 초기화, 인터벌 삭제
            } else {
                document.getElementById('finish').disabled = true;
                isStarted = false;
                // timer에 해당되는 인터벌 함수 삭제
                clearInterval(timer);
                document.getElementById("randmake").disabled = false;
            }
        }, 1000)

    } else {

    }

    

}