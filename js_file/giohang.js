window.onload = function() {
    var loggedInUser = localStorage.getItem('loggedInUser');
    var displayNameElement = document.getElementById('displayName');
    var logoutButtonElement = document.getElementById('logoutButton');
    var cartUserElement = document.getElementById('cart');

    if (!displayNameElement || !logoutButtonElement || !cartUserElement) {
        return;
    }

    if (loggedInUser === 'Admin') {
        displayNameElement.textContent = loggedInUser;
        logoutButtonElement.textContent = "Đăng Xuất";
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

function saveSelectedProducts() {
    const selectedProducts = [];
    const cartItems = document.querySelectorAll('.cart-item'); 

    cartItems.forEach(item => {
        const checkbox = item.querySelector('.product-checkbox');
        const quantityInput = item.querySelector('.quantity-input');
        const productName = item.querySelector('.product-name').innerText;
        const productPrice = parseFloat(item.querySelector('.cart-item-price').getAttribute('data-price'));
        const productImage = item.querySelector('img').src;

        if (checkbox.checked) {
            selectedProducts.push({
                name: productName,
                price: productPrice,
                quantity: parseInt(quantityInput.value),
                image: productImage
            });
        }
    });

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
}

document.querySelector('.thanh-toan').addEventListener('click', function() {
    saveSelectedProducts();
    window.location.href = 'thanhtoan.html';
});


document.querySelector('.thanh-toan').addEventListener('click', function() {
    saveSelectedProducts();
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser || loggedInUser === 'Admin') {
        alert("Bạn cần đăng nhập để thanh toán!");
        window.location.href = "dangnhap.html"; 
    } else {
        saveSelectedProducts();
        window.location.href = 'thanhtoan.html';
    }
});

function updateCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    const selectedProducts = []; 

    cartItems.forEach(item => {
        const checkbox = item.querySelector('.product-checkbox');
        const quantityInput = item.querySelector('.quantity-input');

        if (checkbox.checked) {
            const product = {
                name: item.querySelector('.product-name').innerText,
                price: parseFloat(item.querySelector('.cart-item-price').getAttribute('data-price')),
                quantity: parseInt(quantityInput.value)
            };
            selectedProducts.push(product); 
        }
    });

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    updateTotal();
}

function updateTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    const selectedItemsDiv = document.getElementById('selected-items');
    selectedItemsDiv.innerHTML = ''; 

    cartItems.forEach(item => {
        const checkbox = item.querySelector('.product-checkbox');
        const quantityInput = item.querySelector('.quantity-input');

        if (checkbox && quantityInput) {
            const quantity = parseInt(quantityInput.value);
            const price = parseFloat(item.querySelector('.cart-item-price').getAttribute('data-price'));

            if (checkbox.checked) {
                total += price * quantity;

                const selectedItem = document.createElement('div');
                selectedItem.className = 'selected-item';

                const img = document.createElement('img');
                img.src = item.querySelector('img').src;
                img.alt = item.querySelector('.product-name').innerText; 
                img.style.width = '88px'; 
                img.style.height = 'auto';

                const productInfoDiv = document.createElement('div');
                productInfoDiv.className = 'product-info';
                productInfoDiv.style.display = 'flex'; 

                productInfoDiv.appendChild(img);

                const productName = document.createElement('div');
                productName.className = 'selected-item-name';
                productName.innerText = item.querySelector('.product-name').innerText;
                productInfoDiv.appendChild(productName);

                const quantityAndPriceDiv = document.createElement('div');
                quantityAndPriceDiv.className = 'quantity-and-price';
                quantityAndPriceDiv.style.backgroundColor = '#f0f0f0'; 
                quantityAndPriceDiv.style.padding = '5px'; 
                quantityAndPriceDiv.style.marginLeft = '10px'; 
                quantityAndPriceDiv.style.marginRight = '10px'; 
                quantityAndPriceDiv.style.marginTop = '10px'; 

                quantityAndPriceDiv.innerHTML = `
                    Số lượng: ${quantity}<br>
                    Giá tiền: ${(price * quantity).toLocaleString()
                    } `;
                selectedItem.appendChild(productInfoDiv);
                selectedItem.appendChild(quantityAndPriceDiv);
                selectedItemsDiv.appendChild(selectedItem);
            }
        }
    });
    document.getElementById('total-price').innerText = total.toLocaleString() + " VND";
}



function increaseQuantity(button) {
    const quantityInput = button.parentElement.querySelector('.quantity-input');
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotal(); 
}

function decreaseQuantity(button) {
    const quantityInput = button.parentElement.querySelector('.quantity-input');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updateTotal();
    }
}

