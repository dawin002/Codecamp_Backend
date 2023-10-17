const phoneChecker1 = () => {
    let ph1 = document.getElementById("ph1").value;
    if(ph1.length === 3) {
        document.getElementById("ph2").focus();
    }
}

const phoneChecker2 = () => {
    let ph2 = document.getElementById("ph2").value;
    if(ph2.length === 4) {
        document.getElementById("ph3").focus();
    }
}

const phoneChecker3 = () => {
    let ph3 = document.getElementById("ph3").value;
    if(ph3.length === 4) {
        document.getElementById("auth_btn").disabled = false;
        document.getElementById("auth_btn").style = "border: 1px solid #0068FF; background-color: white; color: #0068FF; cursor: pointer;";
    }
}

const authNumMaker = () => {
    let randNum = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    document.getElementById("auth_num").innerText = randNum;
    document.getElementById("auth_btn").disabled = true;
    document.getElementById("auth_btn").style = "border: 1px solid #D2D2D2; background-color: FFFFFF; color: #D2D2D2; cursor: arrow;";
    document.getElementById("timer_btn").disabled = false;
    document.getElementById("timer_btn").style = "border: 1px solid #0068FF; background-color: #0068FF; color: white; cursor: pointer;";
    timerStart();
}
let timer;

const timerStart = () => {
    let time = 180;

    timer = setInterval( function() {
        if(time >= 1) {
            time = time - 1;
            let min = String(Math.floor(time / 60));
            let sec = String(time % 60).padStart(2, "0");
            document.getElementById("time").innerText = min + ":" + sec;
        } else {
            clearInterval(timer);
            document.getElementById("timer_btn").disabled = true;
            document.getElementById("timer_btn").style = "border: 1px solid #D2D2D2; background-color: FFFFFF; color: #D2D2D2; cursor: arrow;";
            document.getElementById("auth_btn").disabled = false;
            document.getElementById("auth_btn").style = "border: 1px solid #0068FF; background-color: white; color: #0068FF; cursor: pointer;";
            document.getElementById("auth_num").innerText = "000000";
            document.getElementById("time").innerText = "3:00";
        }
    },1000);
}

const timerStop = () => {
    clearInterval(timer);
    document.getElementById("timer_btn").disabled = true;
    document.getElementById("timer_btn").innerText = "인증완료";
    document.getElementById("timer_btn").style = "border: 1px solid #D2D2D2; background-color: FFFFFF; color: #D2D2D2; cursor: arrow;";
    document.getElementById("singUp").disabled = false;
    document.getElementById("singUp").style = "border: 1px solid #0068FF; color: #0068FF; background-color: white;";
}

const checkValidate = () => {
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let pw1 = document.getElementById("pw1").value;
    let pw2 = document.getElementById("pw2").value;
    let location = document.getElementById("loc_sel").value;
    let genderList = document.getElementsByName("gender");
    let gender;
    for(let i=0; i<genderList.length; i++) {
        if(genderList[i].checked) {
            gender = genderList[i].value;
        }
    }

    if(!email || !email.includes("@")) {
        // 에러 메시지 출력
        document.getElementById("error_email").style = "display: block;";
    } else {
        document.getElementById("error_email").style = "display: none;";
    }
    if(!name) {
        document.getElementById("error_name").style = "display: block;";
    } else {
        document.getElementById("error_name").style = "display: none;";
    }
    if(!pw1) {
        document.getElementById("error_pw1").style = "display: block;";
    } else {
        document.getElementById("error_pw1").style = "display: none;";
    }
    if(!pw2 || pw1 !== pw2) {
        document.getElementById("error_pw2").style = "display: block;";
    } else {
        document.getElementById("error_pw2").style = "display: none;";
    }
    if(location === "none") {
        document.getElementById("error_loc").style = "display: block;";
    } else {
        document.getElementById("error_loc").style = "display: none;";
    }
    if(!gender) {
        document.getElementById("error_gen").style = "display: block;";
    } else {
        document.getElementById("error_gen").style = "display: none;";
    }
    
    if(email && name && pw1 && pw2 && location !== "none" && gender && email.includes("@") && pw1 === pw2){
        alert("코드캠프 가입을 축하합니다.");
    }
}