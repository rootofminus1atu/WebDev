/// manages state related to the cart
export default class CartManager {
    constructor(products) {
        this.products = products
        this.quantities = this.loadQuantities()
    }

    /// loads quantities from localStorage, or creates a new object for counting quantities
    loadQuantities() {
        return JSON.parse(localStorage.getItem('cartQuantities')) 
            || this.products.map((product) => ({ 
                productId: product.id, 
                quantity: 0 
            }))
    }

    /// saves quantities to localStorage
    saveQuantities() {
        localStorage.setItem('cartQuantities', JSON.stringify(this.quantities))
    }

    /// in order to have at least SOME bootleg reactivity, whenever the `quantities` field mutated it has to be mutated with this function
    /// so that we get automatic re-rendering and saving to localStorage
    mutateQuantities(func) {
        func()
        this.saveQuantities()
        this.refresh()
    }

    /// empties the cart
    zeroOutQuantities() {
        this.mutateQuantities(() => {
            this.quantities = this.quantities.map(q => {
                return {
                    productId: q.productId,
                    quantity: 0
                }
            })
        })
    }

    /// creates a card for a product
    /// `forShop` is just a bool whose usage is explained a few lines below
    createCard(product, forShop) {
        // creating the card
        const div = document.createElement('div')
        div.setAttribute('class', 'p-3 col-12')
        if (forShop) {
            // cards in the shop page need more responsiveness
            div.classList.add('col-lg-6')
        }

        div.innerHTML = `
        <div class="card mb-3" style="padding: 0;">
            <div class="row g-0">
                <div class="col-4">
                    <img src="images/${product.imgName}" class="img-fluid rounded-start h-100" alt="${product.name}">
                </div>
                <div class="col-8">
                    <div class="card-body d-flex flex-column h-100">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.shortDesc}</p>

                        <div class="mt-auto d-flex justify-content-between text">
                            <p class="my-auto"><strong>€${product.price}</strong></p>
                            <div class="btn-group">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`


        // doing data stuff and functionality in addition to that
        const prodInQuantitiesArr = this.quantities.find((p) => p.productId === product.id)

        if (prodInQuantitiesArr.quantity !== 0) {
            const removeButton = document.createElement('button')
            removeButton.setAttribute('class', 'btn btn-outline-danger')
            removeButton.onclick = () => this.mutateQuantities(() => prodInQuantitiesArr.quantity = 0)
            removeButton.innerText = 'Remove'
            div.querySelector('.btn-group').append(removeButton)
        }

        const addButton = document.createElement('button')
        addButton.setAttribute('class', 'btn btn-outline-primary')
        addButton.onclick = () => this.mutateQuantities(() => prodInQuantitiesArr.quantity += 1)
        addButton.innerText = 'Add to Cart'
        div.querySelector('.btn-group').append(addButton)

        return div
    }

    /// renders product cards into a given container
    renderCartItems(container) {
        // i hate this script but at the same time i love how hacky it is

        // extract into function that creates cart items
        const cards = this.products.map((product) => this.createCard(product, true))
    
        if (!container) return
        container.innerHTML = ''
        container.append(...cards)
    }

    /// renders the product count display that shows how many products you have in cart
    renderProductCountDisplay(container) {
        const totalCount = this.quantities.map(i => i.quantity)
            .reduce((acc, curr) => acc + curr, 0)

        const button = document.createElement('button')
        button.setAttribute('class', 'btn btn-outline-secondary my-2 me-2')
        button.innerHTML = `<i class="bi bi-cart"></i> ${totalCount}</button>`
        button.onclick = () => window.location = '/cart.html'

        if (!container) return
        container.innerHTML = ''
        container.append(button)
    }

    /// renders product cards into a given container
    /// BUT this time it does so for only those products selected by the user
    renderCartItemsInCart(container) {
        const productsInCart = this.products.filter((product) => this.quantities.find(p => p.productId === product.id).quantity !== 0)

        
        if (productsInCart.length == 0) {
            const p = document.createElement('p')
            p.innerText = 'Hmmm... Seems like your cart is empty, check out the shop page!'

            if (!container) return
            container.innerHTML = ''
            container.append(p)
            return
        }

        const cards = productsInCart.map((product) => this.createCard(product, false))

        if (!container) return
        container.innerHTML = ''
        container.append(...cards)
    }

    /// renders details about a user's cart, like the count or total price
    renderCartDetails(container) {

        const totalCount = this.quantities.map(i => i.quantity).reduce((acc, curr) => acc + curr, 0)
        const pCount = document.createElement('p')
        pCount.innerHTML = `<strong>${totalCount}</strong> products in total`

        const totalCost = this.products
            .filter((product) => this.quantities.find(p => p.productId === product.id).quantity !== 0)
            .map(i => i.price * this.quantities.find(p => p.productId === i.id).quantity)
            .reduce((acc, curr) => acc + curr, 0)

        const pCost = document.createElement('p')
        pCost.innerHTML = `<strong>€${totalCost.toFixed(2)}</strong> in total`

        if (!container) return
        container.innerHTML = ''
        container.append(pCount, pCost)
    }

    /// re-renders what needs to be re-rendered
    refresh() {
        this.renderCartItems(document.getElementById('cart-items'))
        this.renderProductCountDisplay(document.getElementById('cart-info'))
        this.renderCartItemsInCart(document.getElementById('cart-items-in-cart'))
        this.renderCartDetails(document.getElementById('cart-details'))
    }
}

