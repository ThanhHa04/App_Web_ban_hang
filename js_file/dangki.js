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

  if (name === "" || email === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
  }

  var user = {
    username: name,
    email: email,
    password: password
  };
  
  localStorage.setItem(email, JSON.stringify(user));

  console.log("Tài khoản đã được đăng ký:", user);
  alert("Đăng kí thành công!");
  window.location.href = "dangnhap.html";
  printAllUsers();

}

if (!localStorage.getItem('hachan')) {
  const defaultUser = {
    username: 'hachan',
    password: '11',
    email: 'hachan@gmail.com'
  };
  localStorage.setItem('hachan', JSON.stringify(defaultUser));
}
if (!localStorage.getItem('thangchan')) {
  const defaultUser = {
    username: 'thangchan',
    password: '11',
    email: 'thangchan@gmail.com'
  };
  localStorage.setItem('thangchan', JSON.stringify(defaultUser));
}

function printAllUsers() {
  const keys = Object.keys(localStorage); 
  const users = []; 

  keys.forEach(key => {
      const userData = JSON.parse(localStorage.getItem(key)); 
      if (userData) {
          users.push(userData); 
      }
  });

  console.log("Tài khoản đã lưu vào localStorage",users); 
}

