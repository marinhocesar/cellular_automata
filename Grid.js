class Grid {
    constructor(canvas_width, canvas_height, cell_size) {
        this.rows = canvas_width/cell_size;
        this.cols = canvas_height/cell_size;
        this.cell_size = cell_size;
        this.cell_grid = []

        this.initialize_cell_grid(); 
    }

    initialize_cell_grid() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for(let j = 0; j < this.cols; j++) {
                let cell = new Cell(i*this.cell_size,
                                    j*this.cell_size,
                                    this.cell_size);
                row.push(cell);
            }
            this.cell_grid.push(row);
        }
    }

    draw() {
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.cell_grid[i][j].show();
                this.cell_grid[i][j].calcNextState(this.cell_grid);
            }
        }       
    }

    next_gen() {
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.cell_grid[i][j].update();
            }
        }  
    }
}