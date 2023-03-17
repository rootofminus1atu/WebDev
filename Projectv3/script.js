const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

let css = `.hero { 
    height: ${screenHeight}px; 
    max-width: ${screenWidth}px; 
}

body {
    max-width: ${screenWidth}px;
}

header {
    max-width: ${screenWidth}px;
}
`

styleElement.innerHTML = css;