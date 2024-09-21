document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault(); 

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var user = localStorage.getItem(username);
    if (!user) {
        alert("Tài khoản không tồn tại. Vui lòng kiểm tra lại.");
        console.log("Tài khoản không tồn tại");
        return;
    }

    var data = JSON.parse(user);

    if (username === data.email && password === data.password) {
        alert("Đăng nhập thành công!");
        console.log("Đã đăng nhập thành công:", data);
        window.location.href = "home.html"; 
    } else {
        alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
        console.log("Thông tin đăng nhập không chính xác");
    }
});
