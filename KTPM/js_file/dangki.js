function dangki(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert("Mật khẩu và xác nhận mật khẩu không khớp. Vui lòng thử lại.");
    return;
  }

  if(name === "" || email === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
  }

  var user = {
    username: name,
    email: email,
    password: password
  };
  var json = JSON.stringify(user);

  localStorage.setItem(email, json);

  console.log("Tài khoản đã được đăng ký:", user);
  alert("Đăng kí thành công!");
  window.location.href = "dangnhap.html";

  fetch('http://localhost:3000/user_data', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: name,
          email: email,
          password: password,
      }),
  })
  .then((response) => response.text())
  .then((data) => {
      alert(data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}
