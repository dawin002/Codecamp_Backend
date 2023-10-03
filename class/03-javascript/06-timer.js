let randNumMaker = () => {
    randNum = String( Math.floor( Math.random() * 1000000 ) ).padEnd(6, "0");
    document.getElementById("num").innerText = randNum;
}

let startTimer = function () {
    let time = 5;
    setInterval(function () {
        if(time >= 0) {
            let min = String(Math.floor(time/60));
            let sec = String(time%60).padStart(2, '0');
            document.getElementById('timer').innerText = min + ':' + sec;
            time -= 1;
        } else {
            document.getElementById('finish').disabled = true;
        }
    }, 1000)
}