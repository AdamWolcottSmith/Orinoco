const products = document.getElementById('products')
const container = document.createElement('div')
const teddyUrl = 'http://localhost:3000/api/teddies/';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

container.setAttribute('class', 'container')
products.appendChild(container)

const createNode = (elem) => {
  return document.createElement(elem);
};

fetch(teddyUrl + id)
  .then(res => res.json())
  .then(teddy => {
    let card = createNode('div'),
      title = createNode('h2'),
      img = createNode('img'),
      description = createNode('p'),
      price = createNode('div'),
      colors = createNode('span')
    addCart = createNode('button');

    // CURRENCY FORMATTER

    let currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(teddy.price / 100);

    title.textContent = teddy.name;
    img.src = teddy.imageUrl;
    description.textContent = teddy.description;
    price.textContent = currency;
    addCart.textContent = 'Add To Cart';

    card.setAttribute('class', 'teddy--card')
    title.setAttribute('class', 'teddy--name')
    img.setAttribute('class', 'teddy--img')
    colors.setAttribute('class', 'teddy--colors')
    description.setAttribute('class', 'teddy--description')

    container.appendChild(card)
    card.appendChild(img)
    card.appendChild(title)
    card.appendChild(description)
    card.appendChild(price)
    card.appendChild(colors)
    card.appendChild(addCart)

    // RADIO BUTTONS FOR COLOR CHOICE

    for (i = 0; i < teddy.colors.length; i++) {
      let radio = document.createElement('input');
      let label = document.createElement('label');
      radio.type = 'radio';
      radio.name = 'colors';
      radio.value = teddy.colors[i];
      radio.id = 'color--choice';

      label.setAttribute("for", teddy.colors[i]);
      label.innerHTML = teddy.colors[i];
      colors.appendChild(radio)
      colors.appendChild(label)
    }
  })
