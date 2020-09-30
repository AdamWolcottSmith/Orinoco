
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

      const urlString = '/orinoco/frontend/product.html?id=' + teddy._id;
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