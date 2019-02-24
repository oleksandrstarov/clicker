
class Game {
    constructor(size) {
        this.cells = [];
        this.currentStep = 1;
        this.generateCells(size);
        this.cells[0].element.click();
        document.querySelector('.reset').addEventListener('click', ()=> this.resetCells());
    }

    generateCells(size) {
        const cellsAmount = Math.pow(size, 2);
        let i = 0;
        while(i < cellsAmount) {
            const cell = new Cell();
            cell.element.addEventListener('click', ()=> {
                if (cell.isVisited) {
                    return;
                }
               cell.openCell(this.currentStep);
               this.currentStep++;
            });
            this.cells.push(cell);
            i++;
        }
    }

    resetCells() {
        console.log(this.cells);
        this.cells.forEach((cell) => {
            cell.isVisited = false;
            cell.number = 0;
            cell.element.textContent = '';
            cell.element.className = 'cell'
        });
        this.currentStep = 1;
        this.cells[0].element.click();
    }
}


class Cell {
    isVisited = false;
    number = 0;

    constructor() {
        console.log('created');
        this.element = document.createElement('div');
        this.element.className = 'cell';
    }

    openCell(index) {
        this.isVisited = true;
        this.number = index;
        this.element.className += ' visited';
        this.element.innerText = this.number;
    }
}

(function() {
    const game = new Game(8);
    const parent = document.querySelector('.game');
    game.cells.forEach(({ element }) => parent.appendChild(element));
})();

