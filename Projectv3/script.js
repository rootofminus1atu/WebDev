const screenWidth = window.screen.width  // for max width
const screenHeight = screen.availHeight  // for hero image

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);


let css = `
.max-width {
    max-width: ${screenWidth}px; 
    margin: 0 auto;
}

.hero { 
    height: ${screenHeight}px;
}
`

styleElement.innerHTML = css;








// better fixed header effect

window.addEventListener('scroll', function() {
    var header = document.querySelector('header')
    var scrolled = window.scrollY > 60

    if (scrolled && !header.classList.contains('scrolled')) {
        header.classList.add('scrolled')
    } else if (!scrolled && header.classList.contains('scrolled')) {
        header.classList.remove('scrolled')
    }
});