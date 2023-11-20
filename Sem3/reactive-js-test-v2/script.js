import { Signal, Effect } from './signals.js'

const products = [
    {
        id: 1,
        name: 'skooma',
        desc: 'something something',
    },
    {
        id: 2,
        name: 'mead',
        desc: 'something something more'
    },
]



// 1st global slice

let quantities = JSON.parse(
    localStorage.getItem('cartQuantities')) || 
    products.map((product) => ({ productId: product.id, quantity: 0 })
);

function updateLocalStorage() {
    localStorage.setItem('cartQuantities', JSON.stringify(quantities));
}
  

function refresh() {
    renderCartInfo(products, quantities)
    renderCartItems(products, quantities)
}

function mutateCartData(func) {
    func()
    updateLocalStorage()
    refresh()
}

function removeFromCart(prodInQuantitiesArr) {
    prodInQuantitiesArr.quantity = 0
}

function addToCart(prodInQuantitiesArr) {
    prodInQuantitiesArr.quantity += 1
}


function renderCartInfo(products, quantities) {
    const display = document.createElement('div')

    console.log(quantities)
    const totalCount = quantities.map(i => i.quantity).reduce((acc, curr) => acc + curr, 0)
    display.innerText = `Products: ${totalCount}`

    const container = document.getElementById('cart-info')
    container.innerHTML = ''
    container.append(display)
}


function renderCartItems(products, quantities) {

    const cards = products.map((product) => {

        const div = document.createElement('div')

        div.innerHTML = `
            <h1>${product.name}</h1>
            <p>${product.desc}</p>`

        const prodInQuantitiesArr = quantities.find((p) => p.productId === product.id);


        const button = document.createElement('button')

        if (prodInQuantitiesArr.quantity != 0) {
            button.onclick = () => mutateCartData(() => removeFromCart(prodInQuantitiesArr))
            button.innerText = "Remove from Cart"
        } else {
            button.onclick = () => mutateCartData(() => addToCart(prodInQuantitiesArr))
            button.innerText = "Add to Cart"
        }

        div.append(button)

        return div
    })

    const container = document.getElementById('cart-items')
    container.innerHTML = ''
    container.append(...cards)
}


refresh()
