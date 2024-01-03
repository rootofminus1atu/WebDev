/// manages state tied to the user, like login state, user details, etc.
export default class UserManager {
    constructor(shoppingCart) {
        this.user = this.loadUser()
        this.shoppingCart = shoppingCart

        this.setupLoginForm()
        this.setupUserDetailsForm()
        this.setupCheckoutForm()
    }

    /// loads user data from localStorage, or creates a new dummy user
    loadUser() {
        return JSON.parse(localStorage.getItem('user')) || {
            email: 'walter@example.com',
            password: 'somepassword',
            firstName: 'Walter',
            lastName: 'White',
            dateOfBirth: '20/01/2009',
            addressLine1: '308 Negra Arroyo Lane',
            addressLine2: 'Albuquerque',
            addressLine3: 'New Mexico',
            loggedIn: false
        }
    }

    /// saves the user to localStorage
    saveUser() {
        localStorage.setItem('user', JSON.stringify(this.user))
    }

    /// in order to have at least SOME bootleg reactivity, whenever the `user` field is mutated it has to be mutated with this function
    /// so that we get automatic re-rendering and saving to localStorage
    mutateUserDetails(func) {
        func()
        this.saveUser()
        this.refresh()
    }

    /// helper method to create login/logout/account buttons
    createButton(text, onClick) {
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.setAttribute('class', 'btn btn-primary me-2 my-2')
        button.textContent = text
        button.onclick = onClick
        return button
    }

    /// creates appropriate buttons, based on the loggedIn state of the user
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

    /// renders the approriate buttons in the login area
    renderLoginArea() {
        const buttons = this.createButtons()

        const cont = document.getElementById('login-account-area')
        if (!cont) return;
        cont.innerHTML = ''
        cont.append(...buttons)
    }

    /// sets up the login form
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

    /// handles the login form
    handleLogin() {
        const showToast = () => {
            const toastEl = document.getElementById('invalid-password-toast')
            const toast = new bootstrap.Toast(toastEl)
            toast.show()
        };
    
        const hideToast = () => {
            const toastEl = document.getElementById('invalid-password-toast')
            const toast = new bootstrap.Toast(toastEl)
            toast.hide()
        };

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        if (email === this.user.email && password === this.user.password) {
            this.mutateUserDetails(() => {
                this.mutateUserDetails(() => this.user.loggedIn = true)
                hideToast()
                window.location.href = '/index.html'
            });
        } else {
            showToast()
        }
    }

    /// sets up the form that's used to change user details, like first name, etc.
    setupUserDetailsForm() {
        const userDetailsForm = document.getElementById('user-details-form')

        if (!userDetailsForm) {
            console.warn('User details form not found on the current page.')
            return
        }

        // adding onsubmit
        userDetailsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserDetailsForm()
        });

        // populating the fields
        document.getElementById('first-name').value = this.user.firstName
        document.getElementById('last-name').value = this.user.lastName
        document.getElementById('date-of-birth').value = this.user.dateOfBirth
        document.getElementById('address-line-1').value = this.user.addressLine1
        document.getElementById('address-line-2').value = this.user.addressLine2
        document.getElementById('address-line-3').value = this.user.addressLine3
    }

    /// handles the user details form
    handleUserDetailsForm() {
        this.mutateUserDetails(() => {
            this.user.firstName = document.getElementById('first-name').value
            this.user.lastName = document.getElementById('last-name').value
            this.user.dateOfBirth = document.getElementById('date-of-birth').value
            this.user.addressLine1 = document.getElementById('address-line-1').value
            this.user.addressLine2 = document.getElementById('address-line-2').value
            this.user.addressLine3 = document.getElementById('address-line-3').value
        });

        const updateSuccessToast = new bootstrap.Toast(document.getElementById('update-success-toast'))
        updateSuccessToast.show()
    }

    /// sets up the checkout form
    setupCheckoutForm() {
        const checkoutForm = document.getElementById('checkout-form')

        if (!checkoutForm) {
            console.warn('Checkout form not found on the current page.')
            return
        }

        // adding onsubmit
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault()
            this.processCheckout()
        });

        if (!this.user.loggedIn) {
            return;
        }

        document.getElementById('address-line-1').value = this.user.addressLine1
        document.getElementById('address-line-2').value = this.user.addressLine2
        document.getElementById('address-line-3').value = this.user.addressLine3
    }

    /// processes the checkout form
    processCheckout() {
        if (!this.user.loggedIn) {
            window.location = '/login.html'
            return
        }

        this.shoppingCart.zeroOutQuantities()

        const checkoutSuccessToast = new bootstrap.Toast(document.getElementById('checkout-success-toast'))
        checkoutSuccessToast.show()
    }

    /// re-renders what needs to be re-rendered
    refresh() {
        this.renderLoginArea();
    }
}