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
      <span class="remove-item" data-id="${item.productId + item.colorChoice}">remove</span>
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

  let data = JSON.parse(localStorage.getItem('products'))

  // POPULATE CART

  function setCart(products) {
    for (let i = 0; i < products.length; i++) {
      addCartItem(products[i])
    }
  }
  setCart(data)

  const chevUpElems = document.querySelectorAll('.fa-chevron-up');
  const chevDownElems = document.querySelectorAll('.fa-chevron-down');
  let removeElem = document.querySelectorAll('.remove-item');
  const cartTotalElem = document.querySelector('.cart-total');

  // CART TOTAL CALC

  function cartTotalSum(products) {
    const cartItem = products.filter(product => product.productId);
    const itemSum = cartItem.map(product => product.cartQuantity * product.price);
    const cartTotal = itemSum.reduce((acc, item) => acc + item, 0);
    cartTotalElem.innerText = cartTotal;
  }
  cartTotalSum(data);

  // QTY

  chevUpElems.forEach(chevUp => {
    chevUp.addEventListener('click', (e) => {
      let products = data.filter(product => (e.target.dataset.id === product.productId));
      let product = products[0];
      product.cartQuantity++;
      e.target.nextElementSibling.innerText = product.cartQuantity;
      localStorage.setItem('products', JSON.stringify(data));
      cartTotalSum(data);
    });
  });
  chevDownElems.forEach(chevDown => {
    chevDown.addEventListener('click', (e) => {
      let products = data.filter(product => (e.target.dataset.id === product.productId));
      let product = products[0];
      if (product.cartQuantity === 1) {
        e.target.previousElementSibling.innerText = 1
      } else {
        product.cartQuantity--;
        e.target.previousElementSibling.innerText = product.cartQuantity;
        localStorage.setItem('products', JSON.stringify(data));
        cartTotalSum(data);
      };
    });
  });

  // REMOVE ITEM

  removeElem.forEach(removeBtn => {
    removeBtn.addEventListener('click', (e) => {
      let products = data.filter(function (product) {
        return e.target.dataset.id !== product.productId + product.colorChoice;
      });
      if (products.length >= 1) {
        function populateStorage(items) {
          localStorage.setItem('products', JSON.stringify(items));
          cartTotalSum(items);
          e.target.parentElement.parentElement.remove();
          data = items;
          removeElem = document.querySelectorAll('.remove-item');
        }
        populateStorage(products);
      } else {
        e.target.parentElement.parentElement.remove();
        cartTotalSum(products);
        const div = document.createElement('div');
        div.innerHTML = `
        <p style="text-align: center" >There is nothing in your cart</p>
        `;
        cartContent.appendChild(div);
        localStorage.removeItem('products');
      };
    });
  });
};

// SUBMIT ORDER FORM
const apiUrl = 'http://localhost:3000/api/teddies/order'
const subForm = document.getElementById('submit-form')

subForm.addEventListener('submit', (e) => {

  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');

  const localData = JSON.parse(localStorage.getItem('products'))
  const idSum = localData.map(product => product.productId);

  let reqBody = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    },
    products: idSum
  }

  e.preventDefault();

  fetch(apiUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(reqBody)

  }).then(response => {
    return response.json()
  }).then(result => {
    console.log(result);

    const urlString = './confirmation.html?id=' + result.orderId;
    window.location = urlString

  }).catch(error => {
    console.log(error);
  });
})

