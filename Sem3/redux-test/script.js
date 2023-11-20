

function createSlice(config) {

}


const cartSlice = createSlice({
    name: 'cart',
    initialState: [
        {
            name: 'skooma',
            desc: 'description of skooma'
        },
        {
            name: 'mead',
            desc: 'more desc'
        }
    ],
    reducers: {
        addToCart(state, action) {
            
        }
    }
})