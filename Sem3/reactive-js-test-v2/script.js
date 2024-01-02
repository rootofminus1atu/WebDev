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

        // extract into function that creates cart items
        const cards = this.products.map((product) => {
    
            const div = document.createElement('div')
    
            div.innerHTML = `
                <h1>${product.name}</h1>
                <p>${product.desc}</p>`
    
            const prodInQuantitiesArr = this.quantities.find((p) => p.productId === product.id)
    
    
            
    
            const addButton = document.createElement('button')
            addButton.onclick = () => this.mutateQuantities(() => prodInQuantitiesArr.quantity += 1)
            addButton.innerText = "Add to Cart"
            div.append(addButton)
    
            if (prodInQuantitiesArr.quantity != 0) {
                const removeButton = document.createElement('button')
                removeButton.onclick = () => this.mutateQuantities(() => prodInQuantitiesArr.quantity = 0)
                removeButton.innerText = "Remove from Cart"
                div.append(removeButton)
            }
    
    
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
        display.innerText = `Products: ${totalCount}`


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
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    mutateUserDetails(func) {
        func();
        this.saveUser();
        this.refresh();
    }

    createButton(text, onClick) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'btn btn-primary');
        button.textContent = text;
        button.onclick = onClick;
        return button;
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

    renderLoginArea(container) {
        const buttons = this.createButtons();
        if (!container) return;
        container.innerHTML = '';
        container.append(...buttons);
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
        this.renderLoginArea(document.getElementById('login-area'));
    }
}




const products = [
    { id: 1, name: 'skooma', desc: 'something something' },
    { id: 2, name: 'mead', desc: 'something something more' },
];

const shoppingCart = new CartManager(products);
const user = new UserManager();

shoppingCart.refresh();
user.refresh();