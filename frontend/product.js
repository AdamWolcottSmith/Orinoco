//variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

const apiUrl = 'http://localhost:3000/api/teddies/';
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

//cart
let cart = [];

//getting the product
class Product {
  async getProduct() {
    try {
      let result = await fetch(apiUrl + productId);
      let data = await result.json();

      let item = {};

      item.name = data.name;
      item.id = data._id;
      item.image = data.imageUrl;
      item.price = data.price / 100;
      item.description = data.description;
      item.colors = data.colors;

      return item;
    } catch (error) {
      console.log(error);
    }
  }
}



//display product
class UI {
  displayProduct(item) {
    let result = `
    <!-- single product -->
     <div class="section-title">
      <h2>${item.name}</h2>
      <p class="product-desc">${item.description}</p>
      <select name="colors" class="color-choice">
        ${item.colors.map(color => { return `<option class="color-options" value="${color}">${color}</option>` }).join("")}
      </select>
      <input type="number" class="product-amt" min="0">
      <h4>$${item.price}</h4>
      <button class="bag-btn-out" data-id=${item.id}>
         <i class="fas fa-shopping-cart"></i>
         add to bag
      </button>
     </div>
      <article class="product">
       <div class="img-container">
        <img 
         src=${item.image} 
         alt="product" 
         class="product-img">
       </div>
      </article>
      <!--end of single product -->
    `;
    productsDOM.innerHTML = result;
  }
  getBagButton() {
    const button = document.querySelector('.bag-btn-out');

    button.addEventListener('click', () => {

      let id = button.dataset.id
      console.log(id);

      //color

      let colorOption = document.querySelector('.color-choice');
      let colorChoice = colorOption.options[colorOption.selectedIndex].text;
      console.log(colorChoice);

      //amount

      let quantity = document.querySelector('.product-amt');
      let cartQuantity = quantity.value
      console.log(cartQuantity);

      //storage
      let products = [];
      if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
      }
      products.push({ 'productId': id, colorChoice, cartQuantity });
      localStorage.setItem('products', JSON.stringify(products));



    })
  }
};


//local storage
class Storage {
  static saveProduct(id, color) {
    localStorage.setItem('cart', JSON.stringify(id, color));
  };
  // static getProduct(id) {
  //  let products = JSON.parse(localStorage.getItem('products'));
  //  // return products.find(product => product._id === id);
  // };


  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const product = new Product();

  //get product
  product.getProduct().then(product => {
    ui.displayProduct(product);
  }).then(() => {
    ui.getBagButton();
  });
});