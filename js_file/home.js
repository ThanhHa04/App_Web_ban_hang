window.onload = function() {
  var loggedInUser = localStorage.getItem('loggedInUser');
  var displayNameElement = document.getElementById('displayName');
  var logoutButtonElement = document.getElementById('logoutButton');
  var adminPanelElement = document.getElementById('adminPanel');
  var cartUserElement = document.getElementById('cart');
  
  if (!displayNameElement || !logoutButtonElement || !adminPanelElement || !cartUserElement) {
      return;
  }

  console.log('Logged In User:', loggedInUser); 
  if (loggedInUser === 'Admin') {
    displayNameElement.textContent = loggedInUser;
    logoutButtonElement.textContent = "Đăng Xuất";
    adminPanelElement.style.display = 'block';
  } else if (loggedInUser) {
    displayNameElement.textContent = loggedInUser; 
    logoutButtonElement.textContent = "Đăng Xuất";
    cartUserElement.style.display = 'block';
  } else {
    displayNameElement.textContent = 'Guest'; 
    logoutButtonElement.textContent = "Đăng Nhập";
  }

  logoutButtonElement.addEventListener('click', function(event) {
    event.preventDefault(); 
    localStorage.removeItem('loggedInUser');
    window.location.href = "dangnhap.html"; 
  });

  document.getElementById('chatButton').addEventListener('click', function() {
    const chatBox = document.getElementById('chatBox');
    chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'block' : 'none';
  });
};
document.getElementById('userList').addEventListener('click', function(event) {
  event.preventDefault();
  const userListContainer = document.getElementById('user-list');
  const overlay = document.getElementById('overlay');

  overlay.style.display = 'block';
  userListContainer.style.display = 'block'; 

  const keys = Object.keys(localStorage);
  userListContainer.innerHTML = ''; 

  const closeButton = document.createElement('button');
  closeButton.id = 'closeUserList';
  closeButton.innerHTML = '&times;';
  closeButton.style.float = 'right';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = '#333'; 
  userListContainer.appendChild(closeButton); 

  if (keys.length === 0) {
      userListContainer.innerHTML += "<p>Không có tài khoản nào được đăng ký.</p>";
  } else {
      keys.forEach(key => {
          const userData = localStorage.getItem(key);
          if (userData && key !== 'loggedInUser') {
              try {
                  const parsedData = JSON.parse(userData);
                  console.log("User Data:", parsedData);
                  if (parsedData) {
                      const userItem = document.createElement('div');
                      userItem.innerHTML = `<p class="user-name" data-key="${key}">${parsedData.username}</p>`;
                      userListContainer.appendChild(userItem);
                      userItem.addEventListener('click', function() {
                          showUserDetails(parsedData, key);
                      });
                  }
              } catch (error) {
                  console.error("Không thể phân tích dữ liệu cho key:", key, "Error:", error);
              }
          }
      });
  }
});
function showUserDetails(userData, key) {
  const userListContainer = document.getElementById('user-list');
  userListContainer.innerHTML = ''; 

  const userInfo = document.createElement('div');
  userInfo.innerHTML = `
      <h3>Thông tin tài khoản</h3>
      <p>Họ và tên: <span id="editUsername">${userData.username}</span></p>
      <p>Email: <span id="editEmail">${userData.email}</span></p>
      <p>Mật khẩu: <span id="editPassword">${userData.password}</span></p>
      <button id="editUser">Chỉnh sửa thông tin</button>
      <button id="saveUser" style="display:none;">Lưu thay đổi</button>
  `;
  userListContainer.appendChild(userInfo);

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.style.float = 'right';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = '#333';
  userListContainer.appendChild(closeButton);

  closeButton.addEventListener('click', function() {
      document.getElementById('overlay').style.display = 'none';
      userListContainer.style.display = 'none';
  });

  document.getElementById('editUser').addEventListener('click', function() {
      document.getElementById('editUsername').contentEditable = true;
      document.getElementById('editEmail').contentEditable = true;
      document.getElementById('editPassword').contentEditable = true;
      document.getElementById('editUser').style.display = 'none';
      document.getElementById('saveUser').style.display = 'inline';
  });

document.getElementById('saveUser').addEventListener('click', function() {

  const newUsername = document.getElementById('editUsername').innerText;
  const newEmail = document.getElementById('editEmail').innerText;
  const newPassword = document.getElementById('editPassword').innerText;

  if (key !== newEmail) {
      localStorage.removeItem(key);
      userData.username = newUsername;
      userData.email = newEmail;
      userData.password = newPassword;
      localStorage.setItem(newEmail, JSON.stringify(userData)); 
  } else {
      userData.username = newUsername;
      userData.password = newPassword;
      localStorage.setItem(key, JSON.stringify(userData));
  }

  alert("Thông tin tài khoản đã được lưu!");
  document.getElementById('overlay').style.display = 'none';
  userListContainer.style.display = 'none';
});

}

overlay.addEventListener('click', function() {
  document.getElementById('user-list').style.display = 'none';
  overlay.style.display = 'none';
});

document.getElementById('user-list').addEventListener('click', function(event) {
  if (event.target.id === 'closeUserList') {
      document.getElementById('user-list').style.display = 'none';
      overlay.style.display = 'none';
  }
});
