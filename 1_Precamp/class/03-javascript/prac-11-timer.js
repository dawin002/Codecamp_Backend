// 내장함수

// 시간 입력시 ms 단위 (1s == 1000ms)



// 시간지연함수
// setTimeout(func, time);

setTimeout(function(){
    console.log('펑!')
}, 3000)
// VM513:2 펑! (3초 있다 출력)



// 시간반복함수
// setInterval(func, time);

setInterval(function(){
    console.log('1초가 지났다')
}, 1000)
// 5VM653:1 1초가 지났다 (1초 마다 출력)


// 5초 타이머 실습
let time = 5;

setInterval(function() {
    if(time >= 0){
        console.log(time);
        time -= 1;
    }
}, 1000);
// VM957:6 5
// VM957:6 4
// VM957:6 3
// VM957:6 2
// VM957:6 1
// VM957:6 0


// 회원가입 인증번호 3분 타이머
time = 180;

setInterval(function () {
    if(time >= 0) {
        let min = String(Math.floor(time/60));
        let sec = String(time%60).padStart(2, '0');
        console.log(min + ':' + sec);
        time -= 1;
    }
}, 1000)