const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

const urlString = './product.html?id=';

function addCartItem(item) {
  const div = document.createElement('div')
  div.classList.add('cart-item')
  div.innerHTML = `
    <a href="${urlString + item.productId}">
      <img src="${item.image}" alt="product">
    </a>
    <div>
      <h4>${item.name}</h4>
      <h6>${item.colorChoice}</h6>
      <h5>$${item.price}</h5>
      <span class="remove-item" data-id=${item.productId}>remove</span>
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



  const chevUpElems = document.querySelectorAll('.fa-chevron-up');
  const chevDownElems = document.querySelectorAll('.fa-chevron-down');
  const removeElem = document.querySelectorAll('.remove-item');
  const cartTotalElem = document.querySelector('.cart-total');

  // CART TOTAL CALC

  function cartTotalSum() {
    const cartItem = data.filter(product => product.productId);
    const itemSum = cartItem.map(product => product.cartQuantity * product.price);
    const cartTotal = itemSum.reduce((acc, item) => acc + item, 0);
    cartTotalElem.innerText = cartTotal;
  }
  cartTotalSum();

  // QTY INCREMENT

  chevUpElems.forEach(chevUp => {
    chevUp.addEventListener('click', (e) => {
      let products = data.filter(product => (e.target.dataset.id === product.productId));
      let product = products[0];
      product.cartQuantity++;
      e.target.nextElementSibling.innerText = product.cartQuantity;
      localStorage.setItem('products', JSON.stringify(data))
      cartTotalSum()
    })
  })
  chevDownElems.forEach(chevDown => {
    chevDown.addEventListener('click', (e) => {
      let products = data.filter(product => (e.target.dataset.id === product.productId));
      let product = products[0];
      product.cartQuantity--;
      e.target.previousElementSibling.innerText = product.cartQuantity;
      localStorage.setItem('products', JSON.stringify(data))
      cartTotalSum()
    })
  })

  // console.log(removeElem);

  // removeElem.forEach(removeBtn => {
  //   removeBtn.addEventListener('click', (e) => {
  //     let products = data.filter(product => (e.target.dataset.id === product.productId));
  //     let product = products[0];
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].productId === product) {
  //         data.splice(i, 1);
  //         break;
  //       }
  //       localStorage.setItem('products', JSON.stringify(data))
  //     }

  //     console.log(data);
  //   })
  // })




}





