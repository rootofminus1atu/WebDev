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
    products.map((product) => ({ 
        productId: product.id, 
        quantity: 0 
    })
);

function mutateQuantities(func) {
    func()
    localStorage.setItem('cartQuantities', JSON.stringify(quantities));
    refresh()
}



function refresh() {
    renderProductCountDisplay(products, quantities)
    renderCartItems(products, quantities)
    renderCartItemDetails(products, quantities)
    renderLoginArea()
}




function renderProductCountDisplay(products, quantities) {
    const display = document.createElement('div')

    console.log(quantities)
    const totalCount = quantities.map(i => i.quantity).reduce((acc, curr) => acc + curr, 0)
    display.innerText = `Products: ${totalCount}`

    const container = document.getElementById('cart-info')
    if (!container) return
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


        

        const addButton = document.createElement('button')
        addButton.onclick = () => mutateQuantities(() => prodInQuantitiesArr.quantity += 1)
        addButton.innerText = "Add to Cart"
        div.append(addButton)

        if (prodInQuantitiesArr.quantity != 0) {
            const removeButton = document.createElement('button')
            removeButton.onclick = () => mutateQuantities(() => prodInQuantitiesArr.quantity = 0)
            removeButton.innerText = "Remove from Cart"
            div.append(removeButton)
        }


        return div
    })

    const container = document.getElementById('cart-items')
    if (!container) return
    container.innerHTML = ''
    container.append(...cards)
}

function renderCartItemDetails(products, quantities) {

    const productsInCart = products.filter((product) => quantities.find(p => p.productId === product.id).quantity !== 0)

    const cards = productsInCart.map((product) => {
        const div = document.createElement('div')

        div.innerHTML = `
            <h1>${product.name}</h1>
            <p>${product.desc}</p>`


        const p = document.createElement('p')
        p.innerText = `Quantity: ${quantities.find((p) => p.productId === product.id).quantity}`
        div.append(p)

        
        const prodInQuantitiesArr = quantities.find((p) => p.productId === product.id);

        const removeButton = document.createElement('button')
        removeButton.onclick = () => mutateQuantities(() => prodInQuantitiesArr.quantity = 0)
        removeButton.innerText = "Remove from Cart"
        div.append(removeButton)


        return div
    })

    const container = document.getElementById('cart-item-details')
    if (!container) return
    container.innerHTML = ''
    container.append(...cards)
}





const user = {
    name: 'waltuh',
    password: 'finger'
}

let loggedIn = JSON.parse(
    localStorage.getItem('loggedIn') || false
)

function mutateLoggedIn(func) {
    func()
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
    refresh()
} 


function createButtons() {
    if (!loggedIn) {
        const loginButton = document.createElement('button')
        loginButton.setAttribute('type', 'button')
        loginButton.setAttribute('class', 'btn btn-primary')
        loginButton.innerText = 'Login'
        loginButton.onclick = () => mutateLoggedIn(() => loggedIn = true)

        return [loginButton]
    } else {
        const logoutButton = document.createElement('button')
        logoutButton.setAttribute('type', 'button')
        logoutButton.setAttribute('class', 'btn btn-primary')
        logoutButton.innerText = 'Logout'
        logoutButton.onclick = () => mutateLoggedIn(() => loggedIn = false)

        const accountButton = document.createElement('button')
        accountButton.setAttribute('type', 'button')
        accountButton.setAttribute('class', 'btn btn-primary')
        accountButton.innerText = 'Account'


        return [logoutButton, accountButton]
    }
}

function renderLoginArea() {
    const buttons = createButtons()

    const container = document.getElementById('login-area')
    if (!container) return
    container.innerHTML = ''
    container.append(...buttons)
}


refresh()
