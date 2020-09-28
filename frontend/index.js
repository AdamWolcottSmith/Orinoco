// console.log('les git wierd');
// //
// get all the products from http://localhost:3000/api/teddies
// XMLHttpRequest

// create elements for color, price, img, description, name, and then insert html 
// addClasslist for style sheet 

// loop over products array 

// let xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     let teddyArr = JSON.parse(this.responseText);
//     document.getElementById("product--container").innerHTML = teddyArr[0].colors;
//     console.log(xhttp);
//     console.log(teddyArr);
//   }
// };
// xhttp.open('GET', 'http://localhost:3000/api/teddies/');
// xhttp.send();

////

const products = document.getElementById('products')

const container = document.createElement('div')
container.setAttribute('class', 'container')

products.appendChild(container)

let request = new XMLHttpRequest()
request.open('GET', 'http://localhost:3000/api/teddies/', true)
request.onload = function () {
  // Begin accessing JSON data here
  let data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach((teddy) => {
      const card = document.createElement('a')

      card.setAttribute('class', 'card')

      const urlString = '/orinoco/frontend/product.html?=' + teddy._id;
      console.log(urlString)

      card.setAttribute('href', urlString)

      const img = document.createElement('img')
      img.setAttribute('class', 'product--img')
      img.src = teddy.imageUrl

      const h2 = document.createElement('h2')
      h2.textContent = teddy.name

      const p = document.createElement('p')
      teddy.description = teddy.description.substring(0, 300)
      p.textContent = `${teddy.description}...`

      const hover = document.createElement('div')
      hover.setAttribute('class', 'middle')

      const hoverText = document.createElement('div')
      hoverText.setAttribute('class', 'text')
      hoverText.innerHTML = 'More Info'

      container.appendChild(card)
      card.appendChild(hover)
      hover.appendChild(hoverText)
      card.appendChild(img)
      card.appendChild(h2)
      card.appendChild(p)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()