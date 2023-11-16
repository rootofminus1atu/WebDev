import {
    Signal,
    Effect,
    Computed
} from './signals.js'

const EMIT = 'rx-emit'
const REACT = 'rx-react'

const elems = document.querySelectorAll(`[${EMIT}], [${REACT}]`);
const arr = Array.from(elems)
const grouped = []

arr.map(element => {
    const eAttr = element.getAttribute(EMIT);
    const rAttr = element.getAttribute(REACT);
    
    // group them
});

// then do some magic with signals effects etc


