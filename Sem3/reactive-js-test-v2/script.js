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

// or load from local storage
const quantities = new Signal(products.map((product) => (
    {
        productId: product.id,
        quantity: 0
    }
)))

// work on this
new Effect(() => {
    renderCartItems(products, quantities.value)
    renderCartButton()
})


  
function removeFromCart(prodInQuantitiesArr) {
    console.log(`Removing product with ID ${prodInQuantitiesArr.productId} from the cart`)

    prodInQuantitiesArr.quantity = 0

    console.log(`Updated quantities to ${prodInQuantitiesArr.quantity}`)
}

function addToCart(prodInQuantitiesArr) {
    console.log(`Adding product with ID ${prodInQuantitiesArr.productId} to the cart`);

    prodInQuantitiesArr.quantity += 1

    console.log(`Updated quantities to ${prodInQuantitiesArr.quantity}`);
}
  


function renderCartItems(products, quantities) {

    const cards = products.map((product) => {

        const div = document.createElement('div')

        div.innerHTML = `
            <h1>${product.name}</h1>
            <p>${product.desc}</p>
            `

        const prodInQuantitiesArr = quantities.find((p) => p.productId === product.id);

        const button = document.createElement('button')

        
        if (prodInQuantitiesArr.quantity != 0) {
            button.onclick = () => removeFromCart(prodInQuantitiesArr)
            button.innerText = "Remove from Cart"
        } else {
            button.onclick = () => addToCart(prodInQuantitiesArr)
            button.innerText = "Add to Cart"
        }

        div.append(button)

        return div
    })

    const container = document.getElementById('cart-items')
    container.innerHTML = ''
    container.append(...cards)


}



renderCartItems(products, quantities)
