const apiUrl = 'http://localhost:3000/api/teddies/';
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('id');
const productsDOM = document.querySelector('.products-center');
const localData = JSON.parse(localStorage.getItem('products'))
const idSum = localData.map(product => product.productId);

function cartTotalSum(products) {
 const cartItem = products.filter(product => product.productId);
 const itemSum = cartItem.map(product => product.cartQuantity * product.price);
 const cartTotal = itemSum.reduce((acc, item) => acc + item, 0);
 return cartTotal
}

function orderConfirm() {
 const div = document.createElement('div')
 div.classList.add('cart-item')
 div.innerHTML = `
 <p style="text-align: center">congrats! your order number <br> ${orderId} <br>is on the way</p>
 <p style="text-align: center">Total : $${cartTotalSum(localData)}</p>
 `;
 productsDOM.appendChild(div)
}

orderConfirm();

localStorage.removeItem('products');