const createUser = function () {
    // 1. 이메일 검증(1-존재여부, 2-"@"포함여부)
    const isValid = checkEmail({ email });
    if (!isValid) {
        return;
    }

    // 2. 가입환영 템플릿 만들기
    const welcomeTemplate = getWelcomeTemplate({
        name,
        age,
        school,
        createdDate,
    });

    //3. 이메일에 가입환영 템플릿 전송
    sendTemplateToEmail({ email, welcomeTemplate });
};

const checkEmail = function ({ email }) {
    if (!email) {
        console.log("[ERROR] 이메일이 비어있습니다.");
        return false;
    }
    if (email.indexOf("@") === -1) {
        console.log("[ERROR] 올바른 이메일 형식이 아닙니다.");
        return false;
    }
    return true;
};

const getWelcomeTemplate = function ({ name, age, school, createdDate }) {
    const welcomeTemplate = `
        <html>
            <body>
                <h1>${name}님, 가입을 환영합니다!</h1>
                <hr/>
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createdDate}</div>
            </body>
        </html>
    `;
    return welcomeTemplate;
};

const sendTemplateToEmail = function ({ email, welcomeTemplate }) {
    console.log(
        email +
            " 이메일로 가입환영 템플릿 " +
            welcomeTemplate +
            "을 전송합니다."
    );
};

const getToday = function () {
    const now = new Date();
    return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
};

const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "cheulsoo@gmail.com";
const createdDate = getToday();

createUser({ name, age, school, email, createdDate });
