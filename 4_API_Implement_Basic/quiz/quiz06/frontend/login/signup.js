// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex';

  let phone1 = document.getElementById('PhoneNumber01').value;
  let phone2 = document.getElementById('PhoneNumber02').value;
  let phone3 = document.getElementById('PhoneNumber03').value;

  let phoneNumber = phone1 + phone2 + phone3;

  const res = await axios.post('http://localhost:3000/tokens/phone', {
    phoneNumber,
  });

  console.log('인증 번호 전송');
};

// 회원 가입 API 요청
const submitSignup = async () => {
  let name = document.getElementById('SignupName').value;
  let personal1 = document.getElementById('SignupPersonal').value;
  let personal2 = document.getElementById('SignupPersonal2').value;
  let phone1 = document.getElementById('PhoneNumber01').value;
  let phone2 = document.getElementById('PhoneNumber02').value;
  let phone3 = document.getElementById('PhoneNumber03').value;
  let token = document.getElementById('TokenInput').value;
  let prefer = document.getElementById('SignupPrefer').value;
  let email = document.getElementById('SignupEmail').value;
  let password = document.getElementById('SignupPwd').value;

  let personal = personal1 + personal2;
  let phoneNumber = phone1 + phone2 + phone3;

  const res = await axios.post('http://localhost:3000/users', {
    name,
    personal,
    phoneNumber,
    prefer,
    email,
    password,
  });

  console.log(res);

  console.log('회원 가입 이메일 전송');
};
