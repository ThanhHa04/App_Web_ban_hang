let quantity = 1;

function increaseQuantity() {
  quantity++;
  document.getElementById('quantity').innerText = quantity;
}

function decreaseQuantity() {
  if (quantity > 1) { 
    quantity--;
    document.getElementById('quantity').innerText = quantity;
  }
}
