// TODO: 
// extract element creation

class CartManager {
    constructor(products) {
        this.products = products
        this.quantities = this.loadQuantities()
    }

    loadQuantities() {
        return JSON.parse(localStorage.getItem('cartQuantities')) 
            || this.products.map((product) => ({ 
                productId: product.id, 
                quantity: 0 
            }))
    }

    saveQuantities() {
        localStorage.setItem('cartQuantities', JSON.stringify(this.quantities));
    }

    mutateQuantities(func) {
        func();
        this.saveQuantities();
        this.refresh();
    }

    renderCartItems(container) {
        // i hate this script but at the same time i love how hacky it is

        // extract into function that creates cart items
        const cards = this.products.map((product) => {
    
            // creating the card
            const div = document.createElement('div')
            div.setAttribute('class', 'p-3 col-lg-6 col-12')
    
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
        })
    

        if (!container) return
        container.innerHTML = ''
        container.append(...cards)
    }

    
    renderProductCountDisplay(container) {
        const totalCount = this.quantities.map(i => i.quantity)
            .reduce((acc, curr) => acc + curr, 0)
        
        // extract into create count tracker funciton
        const display = document.createElement('div')
        display.setAttribute('class', 'text-white')
        display.innerHTML = `
        <i class="bi bi-cart"></i> ${totalCount}`


        if (!container) return
        container.innerHTML = ''
        container.append(display)
    }

    renderCartItemsInCart(container) {
        const productsInCart = this.products.filter((product) => this.quantities.find(p => p.productId === product.id).quantity !== 0)

        const cards = productsInCart.map((product) => {
            const div = document.createElement('div')

            div.innerHTML = `
                <h1>${product.name}</h1>
                <p>${product.desc}</p>`


            const p = document.createElement('p')
            p.innerText = `Quantity: ${this.quantities.find((p) => p.productId === product.id).quantity}`
            div.append(p)

            
            const prodInQuantitiesArr = this.quantities.find((p) => p.productId === product.id);

            const removeButton = document.createElement('button')
            removeButton.onclick = () => this.mutateQuantities(() => prodInQuantitiesArr.quantity = 0)
            removeButton.innerText = "Remove from Cart"
            div.append(removeButton)


            return div
        })

        if (!container) return
        container.innerHTML = ''
        container.append(...cards)
    }

    refresh() {
        this.renderCartItems(document.getElementById('cart-items'))
        this.renderProductCountDisplay(document.getElementById('cart-info'))
        this.renderCartItemsInCart(document.getElementById('cart-items-in-cart'))
    }
}






class UserManager {
    constructor() {
        this.user = this.loadUser()
        
        this.setupLoginForm()
        this.setupUserDetailsForm()
    }

    loadUser() {
        return JSON.parse(localStorage.getItem('user')) || {
            email: 'walter@example.com',
            password: 'somepassword',
            name: 'Walter White',
            address: '123 Main St, Albuquerque',
            loggedIn: false
        }
    }

    saveUser() {
        localStorage.setItem('user', JSON.stringify(this.user))
    }

    mutateUserDetails(func) {
        func()
        this.saveUser()
        this.refresh()
    }

    createButton(text, onClick) {
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.setAttribute('class', 'btn btn-primary')
        button.textContent = text
        button.onclick = onClick
        return button
    }

    createNavItem(text, href, onClick) {
        /*
        <li class="nav-item">
            <a class="nav-link" href="account.html">Account</a>
        </li>
        */
        const a = document.createElement('a')
        a.setAttribute('class', 'nav-link')
        a.href = href
        a.onclick = onClick
        a.innerText = text

        return a
    }

    createButtons() {
        if (!this.user.loggedIn) {
            return [
                this.createButton('Login', () => {
                    window.location.href = '/login.html'
                })
            ];
        } else {
            return [
                this.createButton('Logout', () => {
                    this.mutateUserDetails(() => this.user.loggedIn = false)
                    window.location.href = '/index.html'
                }),
                this.createButton('Account', () => {
                    window.location.href = '/account.html'
                }),
            ];
        }
    }


    renderLoginArea() {
        // previous:
        // const buttons = this.createButtons()
        const buttons = this.createButtons()

        const cont = document.getElementById('login-account-area')
        if (!cont) return;
        cont.innerHTML = ''
        cont.append(...buttons)

        return;


        const loginArea = document.getElementById('login-area')
        if (!loginArea) return;
        const accountArea = document.getElementById('account-area')
        if (!accountArea) return;

        console.log('woo no none')
        loginArea.innerHTML = ''
        accountArea.innerHTML = ''

        if (!this.user.loggedIn) {
            const loginItem = this.createNavItem('Login', '/login.html')

            loginArea.append(loginItem)
        } else {
            const logoutItem = this.createNavItem('Logout', '/index.html', () => {
                this.mutateUserDetails(() => this.user.loggedIn = false)
            })
            const accountItem = this.createNavItem('Account', '/account.html')

            loginArea.append(logoutItem)
            accountArea.append(accountItem)
        }


    }

    setupLoginForm() {
        const loginForm = document.getElementById('login-form')

        if (!loginForm) {
            console.warn('Login form not found on the current page.')
            return
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault()
            this.handleLogin()
        });
    }

    handleLogin() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        if (email === this.user.email && password === this.user.password) {
            this.mutateUserDetails(() => {
                this.mutateUserDetails(() => this.user.loggedIn = true)
                window.location.href = '/index.html'
            });
        } else {
            alert('Invalid email or password. Please try again.')
        }
    }

    setupUserDetailsForm() {
        const userDetailsForm = document.getElementById('user-details-form')

        if (!userDetailsForm) {
            console.warn('User details form not found on the current page.')
            return
        }

        // adding onsubmit
        userDetailsForm.addEventListener('submit', (e) => {
            // e.preventDefault();
            this.updateUserDetails()
        });

        // populating the fields
        const nameInput = document.getElementById('name')
        const addressInput = document.getElementById('address')

        if (nameInput && addressInput) {
            nameInput.value = this.user.name || ''
            addressInput.value = this.user.address || ''
        }
    }

    updateUserDetails() {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;

        this.mutateUserDetails(() => {
            this.user.name = name;
            this.user.address = address;
        });

        alert('User details updated successfully!');
    }

    refresh() {
        this.renderLoginArea();
    }
}




const products = [
    { 
        id: 1, 
        name: 'Skooma', 
        shortDesc: '90% proof Khajitian skooma', 
        longDesc: '',
        imgName: 'skooma.jpg',
        price: 19.99
    },
    { 
        id: 2, 
        name: 'Nord Mead', 
        shortDesc: 'From farms near Whiterun',
        longDesc: '',
        imgName: 'nord-mead-transformed.jpeg',
        price: 14.99
    },
    { 
        id: 3, 
        name: 'Sweetroll', 
        shortDesc: 'The popular delicacy of Skyrim',
        longDesc: '',
        imgName: 'sweetroll.png',
        price: 3.99
    },
    { 
        id: 4, 
        name: 'Horker Meat', 
        shortDesc: 'Rare and exquisite',
        longDesc: '',
        imgName: 'horker-meat-transformed.jpeg',
        price: 49.99
    },
    { 
        id: 5, 
        name: 'Alto Wine', 
        shortDesc: 'Traditional, rich and aromatic',
        longDesc: '',
        imgName: 'alto-wine.jpg',
        price: 8.99
    },
    { 
        id: 6, 
        name: 'Ash Yam', 
        shortDesc: 'Rare sweet potato variant from Solstheim',
        longDesc: '',
        imgName: 'ash-yam.jpg',
        price: 14.99
    },
    { 
        id: 7, 
        name: 'Mammoth Cheese', 
        shortDesc: 'Ancient aroma, perfect for prestigeous dishes',
        longDesc: '',
        imgName: 'mammoth-cheese.jpg',
        price: 84.99
    },
    { 
        id: 8, 
        name: 'Snowberry Crostata', 
        shortDesc: 'A true classic from Haafingar',
        longDesc: '',
        imgName: 'snowberry-crostata.jpg',
        price: 2.49
    },
    { 
        id: 9, 
        name: 'Boiled Creme Treat', 
        shortDesc: "Whiterun Jarl's favorite pastry",
        longDesc: '',
        imgName: 'boiled-creme-treat.jpg',
        price: 3.49
    },
    { 
        id: 10, 
        name: 'Goat Cheese Wheel', 
        shortDesc: "Cultivated in The Reach",
        longDesc: '',
        imgName: 'goat-cheese-wheel.png',
        price: 24.99
    },
];

const shoppingCart = new CartManager(products);
const user = new UserManager();

shoppingCart.refresh();
user.refresh();