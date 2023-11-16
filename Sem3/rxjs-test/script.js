import { templatize } from "./templatize.js"
import { products } from "./data.js"


const sg = document.getElementById("shopping-grid")
templatize(sg, products)

const inCartItems = []  // later get through localstorage
// all fields from products
// + quantity

function addToCart(inCartItems, newItem) {
    const existingItem = inCartItems.find(item => item.id === newItem.id);

    if (!existingItem) {
        inCartItems.push({ ...newItem, quantity: 1 });
    } else {
        existingItem.quantity += 1;
    }
}

const buttons = Array.from(document.getElementsByClassName("add-to-cart"))

buttons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        const item = products[index]
        
        addToCart(inCartItems, item)
    })
})