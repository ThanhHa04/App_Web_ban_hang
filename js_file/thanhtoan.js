window.onload = function() {
    var loggedInUser = localStorage.getItem('loggedInUser');
    var displayNameElement = document.getElementById('displayName');
    var logoutButtonElement = document.getElementById('logoutButton');
    var cartUserElement = document.getElementById('cart');
    var adminPanelElement = document.getElementById('adminPanel');

    console.log('Logged In User:', loggedInUser); 
    if (loggedInUser === 'Admin') {
        displayNameElement.textContent = loggedInUser;
        logoutButtonElement.textContent = "Đăng Xuất";
        if (adminPanelElement) {
            adminPanelElement.style.display = 'block'; 
        }
        cartUserElement.style.display = 'none';
    } else if (loggedInUser) {
        displayNameElement.textContent = loggedInUser; 
        logoutButtonElement.textContent = "Đăng Xuất";
        cartUserElement.style.display = 'block'; 
    } else {
        displayNameElement.textContent = 'Guest'; 
        logoutButtonElement.textContent = "Đăng Nhập";
        cartUserElement.style.display = 'none'; 
    }

    logoutButtonElement.addEventListener('click', function(event) {
        event.preventDefault(); 
        localStorage.removeItem('loggedInUser');
        alert("Bạn đã đăng xuất thành công!");
        window.location.href = "dangnhap.html"; 
    });

    displaySelectedProducts();
};

function displaySelectedProducts() {
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    const productsContainer = document.getElementById('products-container'); 
    const totalPriceElement = document.getElementById('total-price'); 
    let total = 0;

    productsContainer.innerHTML = ''; 

    selectedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.style.width = '88px';

        const productName = document.createElement('h3');
        productName.innerText = product.name;

        const productPrice = document.createElement('p');
        productPrice.innerText = `Giá: ${product.price.toLocaleString()} VND`;

        const productQuantity = document.createElement('p');
        productQuantity.innerText = `Số lượng: ${product.quantity}`;

        total += product.price * product.quantity;

        productElement.appendChild(productImage);
        productElement.appendChild(productName);
        productElement.appendChild(productPrice);
        productElement.appendChild(productQuantity);

        productsContainer.appendChild(productElement);
    });

    totalPriceElement.innerText = `Tổng tiền: ${total.toLocaleString()} VND`;
}
