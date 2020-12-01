const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

function addCartItem(item) {
  const div = document.createElement('div')
  div.classList.add('cart-item')
  div.innerHTML = `
      <img src="${item.image}" alt="product">
          <div>
            <h4>${item.name}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
          </div>
          <div>
            <i class="fas fa-chevron-up" data-id=${item.productId}></i>
            <p class="item-amount">${item.cartQuantity}</p>
            <i class="fas fa-chevron-down" data-id=${item.productId}></i>
          </div>
 `;
  cartContent.appendChild(div)
}

if (localStorage.getItem('products') == null) {
  const div = document.createElement('div')
  div.innerHTML = `
      <p style="text-align: center" >There is nothing in your cart</p>
 `;
  cartContent.appendChild(div)
} else {
  const data = JSON.parse(localStorage.getItem('products'))
  for (let i = 0; i < data.length; i++) {
    addCartItem(data[i])
  }
  const chevUp = document.querySelector('.fa-chevron-up');
  const chevDown = document.querySelector('.fa-chevron-down');
  chevUp.addEventListener('click', () => {
    console.log('Qty Up');
    let products = data.filter(product => (chevUp.dataset.id === product.productId))
    let product = products[0]
    product.cartQuantity += 1
    //fix numbering system
    console.log(data);
  })
  chevDown.addEventListener('click', () => {
    console.log('Qty Down');
  })
}





