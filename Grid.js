class Grid {
    constructor(canvas_width, canvas_height, cell_size, rule = 49184) {
        this.rows = canvas_width / cell_size;
        this.cols = canvas_height / cell_size;
        this.cell_size = cell_size;
        this.cell_grid = [];
        this.rule_alive = [];
        this.rule_dead = [];
        this.initialize_rules(rule);
        this.initialize_cell_grid();
        console.log("rule=" + this.rule_alive.map(x => str(x)).join('') + this.rule_dead.map(x => str(x)).join(''))
        console.log(binary_to_decimal(this.rule_alive.map(x => str(x)).join('') + this.rule_dead.map(x => str(x)).join('')))
        // 011110001100110000
    }
    
    initialize_cell_grid() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                let cell = new Cell(i * this.cell_size,
                    j * this.cell_size,
                    this.cell_size,
                    this.rule_alive,
                    this.rule_dead);
                    row.push(cell);
                }
                this.cell_grid.push(row);
            }
        }
        
        initialize_rules(rule) {
        let rule_int;
        let rule_str;
        if (typeof rule == "number") {
            if (rule < 0 || rule > 262143 || rule - round(rule) != 0) {
                rule_int = 49184;
            }
            else {
                rule_int = rule;
            }
            rule_str = decimal_to_binary(rule_int);
        }
        else if (typeof rule == "string") {
            rule_str = rule;
        }

        if (rule_str != '') {
            if (rule_str.length > 18 || rule_str.length <= 0) {
                rule_str = "001100000000100000";
            }
            else if (rule_str.length < 18) {
                while (rule_str.length < 18) {
                    rule_str = '0' + rule_str;
                }
            }
            this.rule_alive = rule_str.substring(0, 9).split('').map(x => int(x));
            this.rule_dead = rule_str.substring(9, 18).split('').map(x => int(x));
        }
    }

    draw() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cell_grid[i][j].show();
                this.cell_grid[i][j].calcNextState(this.cell_grid);
            }
        }
    }

    next_gen() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cell_grid[i][j].update();
            }
        }
    }
}