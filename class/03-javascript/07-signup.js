const checkValidation = () => {
    let email = document.getElementById("email").value;
    let pw1 = document.getElementById("pw1").value;
    let pw2 = document.getElementById("pw2").value;

    if (email && pw1 && pw2) {
        // 모든 인풋이 비어있지 않을 때
        document.getElementById("submit").disabled = false;
    } else {
        // 인풋이 하나라도 비어있을 때
        document.getElementById("submit").disabled = true;
    }
}