const changeFocus1 = () => {
    let phone1 = document.getElementById("p1").value;

    if(phone1.length === 3) {
        document.getElementById("p2").focus();
    }
}

const changeFocus2 = (fNum) => {
    let phone2 = document.getElementById("p"+String(fNum)).value;

    if(phone2.length === 4) {
        if(fNum === 2) {
            document.getElementById("p3").focus();
        } else {
            document.getElementById("sendnum").disabled = false;
            document.getElementById("sendnum").focus();
        }
    }
}