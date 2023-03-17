const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

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