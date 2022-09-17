class Cell {
    constructor(x, y, size, rule_alive, rule_dead){
        this.x = x;
        this.y = y;
        this.index_i = x/size;
        this.index_j = y/size;
        this.size = size;
        this.state = round(random(0,0.55));
        this.future_state = this.state;
        this.rule_alive = rule_alive;
        this.rule_dead = rule_dead;
        this.has_changed = true;
    }

    show() {
        if (!this.has_changed) {
            return;
        }
        
        noStroke();
        if (this.state == 0) {
            fill(0);
        }
        else {
            fill(255);
        }

        rect(this.x, this.y, this.size)

    }

    calcNear(cell_grid) {
        let near_alive = 0;
        
        for(let i = -1; i < 2; i++) {
            for(let j = -1; j < 2; j++) {

                let index_x = i + this.index_i; 
                let index_y = j + this.index_j; 

                if (i == 0 && j == 0) {
                    continue;
                }
                if (index_x < 0                 ||
                    index_y < 0                 ||
                    index_x >= cell_grid.length ||
                    index_y >= cell_grid[0].length
                    )
                {
                    continue;
                }

                let near = cell_grid[index_x][index_y].state;
                
                if (near == 1) {
                    near_alive += 1;
                }
            }
        }
        return near_alive;
    }

    calcNextState(cell_grid) {
        let near_alive = this.calcNear(cell_grid);

        if (this.state == 0 ) {
            this.future_state = this.rule_dead[near_alive];
        }
        else
        {
            this.future_state = this.rule_alive[near_alive];
        }

        this.has_changed = !(this.state == this.future_state);
    }

    update() {
        if (!this.has_changed) {
            return;
        }

        this.state = this.future_state;
    }
}