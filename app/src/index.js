

/**
 * TODO
 * Count steps,
 * show best
 * save data
 * add styles
 * add autosolver
 * add check on possible to finish
 *
 * */
class Game {
    constructor(size) {
        this.solveArray = [];
        this.isGameEnabled = true;
        this.cells = [];
        this.currentStep = 1;
        this.currentCellIndex = 0;
        this.generateCells(size);
        this.cells[0].element.classList.add('possible');
        this.cells[0].element.click();
        document.querySelector('.reset-btn').addEventListener('click', ()=> this.resetCells());
        document.querySelector('.solve-btn').addEventListener('click', ()=> this.solveGame());
    }

    generateCells(size) {
        const cellsAmount = Math.pow(size, 2);
        let i = 0;
        while(i < cellsAmount) {
            const cell = new Cell(i);
            cell.element.addEventListener('click', ()=> {
                if (cell.isVisited || !cell.element.classList.contains('possible')) {
                    return;
                }
                console.log(this.currentStep);

                this.cells[this.currentCellIndex].element.classList.remove('active');
                this.checkOptions(cell.index);
                cell.openCell(this.currentStep);
                if (!this.hasMoreOptions()) {
                  alert(`No more options left, current progress ${this.currentStep}`)
                }
                this.currentStep++;
                this.currentCellIndex = cell.index;
            });
            this.cells.push(cell);
            i++;
        }
    }

    hasMoreOptions() {
      return this.cells.some((cell) => cell.element.classList.contains('possible') && !cell.isVisited);
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
        this.cells[0].element.classList.add('possible');
        this.cells[0].element.click();
        this.isGameEnabled = true;
    }

    solveGame() {
        this.isGameEnabled = false;
        this.makeSolveStep();

    }

    makeSolveStep() {
        if (this.isGameEnabled) {
            return;
        }
        /*if (this.hasMoreOptions()) {
            this.solveArray.push(this.cells.filter((cell) => cell.element.classList.contains('possible')));
        } else if(this.solveArray.length) {
            this.solveArray.pop().forEach(el => el.isAutosolveTried = false);

        }*/
        console.log('step', this.cells.filter((cell) => cell.element.classList.contains('possible') && !cell.isVisited)[0].index);
        
        this.cells.filter((cell) => cell.element.classList.contains('possible') && !cell.isVisited)[0].element.click();
        setTimeout(() => this.makeSolveStep(), 300);
    }
}


class Cell {
    constructor(index) {
        this.isAutosolveTried = false;
        this.isVisited = false;
        this.number = 0;
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

