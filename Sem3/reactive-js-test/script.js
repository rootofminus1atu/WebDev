import {
    Signal,
    Effect,
    Computed
} from './signals.js'

const products = [
    {
        name: 'Skooma',
        desc: 'skooma desc',
        price: 20,
        inCard: false,
    },
    {
        name: 'Mead',
        desc: 'mead desc',
        price: 10,
        inCard: false,
    }
]

const grid = document.getElementById('shopping-grid')
products.forEach(prod => {
    const htmlText = `
        <div class="item">
            <h3>${prod.name}</h3>
            <p>${prod.desc}</p>
            <button>Add to cart</button>
        </div>`

    grid.innerHTML += htmlText
})


let chosen = new Signal([])
let amount = new Computed(() => chosen.value.length)

const display = document.getElementById("display")

const items = Array.from(document.getElementsByClassName('item'))
items.forEach(item => item.addEventListener('click', () => {


    chosen.value = [...chosen.value, "hi"]
}))

new Effect(() => {
    display.innerText = `${amount.value} items`
})

// yeah ok this is prob not worth it

