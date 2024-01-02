function productCountDisplay(quantities) {
    const totalCount = quantities.map(i => i.quantity)
        .reduce((acc, curr) => acc + curr, 0);

    const display = document.createElement('div');
    display.innerText = `Products: ${totalCount}`;

    return display;
}