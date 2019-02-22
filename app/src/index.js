(function component() {
    let i = 0;
    const parent = document.querySelector('.game');
    while(i < 64) {
        let element = document.createElement('div');
        element.className='cell';
        console.log(element);
        parent.appendChild(element);
        i++;
    }
})();
