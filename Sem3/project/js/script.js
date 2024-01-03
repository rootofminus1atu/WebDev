import UserManager from "./userManager.js"
import CartManager from "./cartManager.js"
import products from "./products.js"


// creating managers
const shoppingCart = new CartManager(products)
const user = new UserManager(shoppingCart)

// initial renders
shoppingCart.refresh()
user.refresh()