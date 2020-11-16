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



//cart
let cart = [];

//getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch(apiUrl);
      let data = await result.json();

      let products = data;
      products = products.map(item => {
        const name = item.name;
        const id = item._id;
        const image = item.imageUrl;
        const price = item.price / 100;
        const urlString = './product.html?id=' + item._id;
        return { name, price, id, image, urlString };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}



//display products
class UI {
  displayProducts(products) {
    let result = '';
    products.forEach(product => {
      result += `
    <!-- single product -->
      <article class="product">
        <div class="img-container">
          <a href="${product.urlString}">
            <img 
              src=${product.image} 
              alt="product" 
              class="product-img">          
            <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            more info
          </button>
          </a>          
        </div>
        <h3>${product.name}</h3>
        <h4>$${product.price}</h4>
      </article>
      <!--end of single product -->
    `;
    });
    productsDOM.innerHTML = result;
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  //get all products
  products.getProducts().then(products => {
    ui.displayProducts(products);
  });
});