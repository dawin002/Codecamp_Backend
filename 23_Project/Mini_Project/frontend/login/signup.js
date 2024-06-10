// 휴대폰 인증 토큰 전송API를 요청해주세요.
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex';
  const phone01 = document.getElementById('PhoneNumber01').value;
  const phone02 = document.getElementById('PhoneNumber02').value;
  const phone03 = document.getElementById('PhoneNumber03').value;
  const phone = phone01 + phone02 + phone03;
  const res = await axios.post('http://localhost:3000/tokens/phone', { phone });
  console.log(res);
  console.log('인증 번호 전송');
};

// 핸드폰 인증 완료 API를 요청해주세요.
const submitToken = async () => {
  const phone01 = document.getElementById('PhoneNumber01').value;
  const phone02 = document.getElementById('PhoneNumber02').value;
  const phone03 = document.getElementById('PhoneNumber03').value;
  const phone = phone01 + phone02 + phone03;
  const tokenNumber = document.getElementById('TokenInput').value;
  const res = await axios.patch('http://localhost:3000/tokens/phone', {
    phone,
    tokenNumber,
  });
  console.log(res);
  console.log('핸드폰 인증 완료');
};

// 회원 가입 API를 요청해주세요.
const submitSignup = async () => {
  const name = document.getElementById('SignupName').value;
  const personal01 = document.getElementById('SignupPersonal1').value;
  const personal02 = document.getElementById('SignupPersonal2').value;
  const phone01 = document.getElementById('PhoneNumber01').value;
  const phone02 = document.getElementById('PhoneNumber02').value;
  const phone03 = document.getElementById('PhoneNumber03').value;
  const prefer = document.getElementById('SignupPrefer').value;
  const email = document.getElementById('SignupEmail').value;
  const password = document.getElementById('SignupPwd').value;
  const personal = personal01 + personal02;
  const phone = phone01 + phone02 + phone03;
  const res = await axios.post('http://localhost:3000/users', {
    name,
    email,
    personal,
    prefer,
    password,
    phone,
  });
  console.log(res);
  console.log('회원 가입 완료');
};
