document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault(); 

    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    const adminEmail = 'admin11';
    const adminPassword = 'pka11';

    if (email === adminEmail && password === adminPassword) {
        alert("Đăng nhập thành công với tư cách Admin!");
        localStorage.setItem('loggedInUser', 'Admin');
        window.location.href = "home.html"; 
        return;
    }

    var user = localStorage.getItem(email);
    if (!user) {
        alert("Tài khoản không tồn tại. Vui lòng kiểm tra lại.");
        console.log("Tài khoản không tồn tại");
        return;
    }

    var data = JSON.parse(user);

    if (email === data.email && password === data.password) {
        alert("Đăng nhập thành công!");
        console.log("Đã đăng nhập thành công:", data);
        window.location.href = "home.html"; 
        localStorage.setItem('loggedInUser', data.username);
        console.log("loggedInUser:", localStorage.getItem('loggedInUser'));
    } else {
        alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
        console.log("Thông tin đăng nhập không chính xác");
    }
});
