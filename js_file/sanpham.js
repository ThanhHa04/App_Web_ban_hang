let currentSlide = 1;

function showSlide(slideIndex) {
  const slides = document.querySelectorAll("input[name='slide']");
  if (slideIndex > slides.length) {
    currentSlide = 1;
  } else if (slideIndex < 1) {
    currentSlide = slides.length;
  } else {
    currentSlide = slideIndex;
  }
  slides[currentSlide - 1].checked = true;
}

function increaseQuantity() {
  let quantity = document.getElementById('quantity');
  let currentQuantity = parseInt(quantity.textContent);
  quantity.textContent = currentQuantity + 1; 
}

function decreaseQuantity() {
  let quantity = document.getElementById('quantity');
  let currentQuantity = parseInt(quantity.textContent);
  if (currentQuantity > 1) {
    quantity.textContent = currentQuantity - 1; 
  }
}

let index = 0;
function changePic(index) {
  const picDiv = document.querySelector('.pic'); 
  picDiv.setAttribute('data-index', index);      
}
changePic(index);

function showDescription() {
  document.getElementById("mo-ta").style.display = "block";
  document.getElementById("san-pham-tuong-tu").style.display = "none";

  document.getElementById("mo-ta-button").classList.add("active-button");
  document.getElementById("san-pham-tuong-tu-button").classList.remove("active-button");
}

function showSimilarProducts() {
  document.getElementById("mo-ta").style.display = "none";
  document.getElementById("san-pham-tuong-tu").style.display = "block";

  document.getElementById("mo-ta-button").classList.remove("active-button");
  document.getElementById("san-pham-tuong-tu-button").classList.add("active-button");
}


window.onload = function() {
  var loggedInUser = localStorage.getItem('loggedInUser');
  var displayNameElement = document.getElementById('displayName');
  var logoutButtonElement = document.getElementById('logoutButton');
  var cartUserElement = document.getElementById('cart');

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
};

