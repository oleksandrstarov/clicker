
class Game {
    constructor(size) {
        this.cells = [];
        this.currentStep = 1;
        this.currentCellIndex = 0;
        this.generateCells(size);
        this.cells[0].element.click();
        document.querySelector('.reset').addEventListener('click', ()=> this.resetCells());
    }

    generateCells(size) {
        const cellsAmount = Math.pow(size, 2);
        let i = 0;
        while(i < cellsAmount) {
            const cell = new Cell(i);
            cell.element.addEventListener('click', ()=> {
                if (cell.isVisited) {
                    return;
                }
                this.cells[this.currentCellIndex].element.classList.remove('active');
                this.checkOptions(cell.index);
                cell.openCell(this.currentStep);
                this.currentStep++;
                this.currentCellIndex = cell.index;
            });
            this.cells.push(cell);
            i++;
        }
    }

    checkOptions(index) {
        this.cells.forEach((el) => el.element.classList.remove('possible'));
        const options = [-2, -1, 1, 2];
        const rowLength = Math.sqrt(this.cells.length);
        const columnIndex = index%rowLength;

        options.forEach((baseIndex) => {
            const additionalRightShift = Math.abs(baseIndex)%2+1;
            const rightShift = rowLength * baseIndex + index + additionalRightShift;
            
            if (rightShift >= 0 && rightShift < this.cells.length && additionalRightShift+columnIndex < rowLength) {
                this.cells[rightShift].element.classList.add('possible');
            }

            const additionalLeftShift = - Math.abs(baseIndex)%2-1;
            const leftShift = rowLength * baseIndex + index + additionalLeftShift;

            if (leftShift >= 0 && leftShift < this.cells.length && columnIndex+additionalLeftShift >= 0) {
                this.cells[leftShift].element.classList.add('possible');
            }
        });
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

    constructor(index) {
        this.element = document.createElement('div');
        this.element.classList.add('cell');
        this.index = index;
    }

    openCell(index) {
        this.isVisited = true;
        this.number = index;
        this.element.classList.add('visited');
        this.element.classList.add('active');
        this.element.innerText = this.number;
    }
}

(function() {
    const game = new Game(8);
    const parent = document.querySelector('.game');
    game.cells.forEach(({ element }) => parent.appendChild(element));
})();

