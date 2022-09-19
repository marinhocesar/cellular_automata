class Cell {
    constructor(config){
        this.x = config.x;
        this.y = config.y;
        this.start_x = config.start_x;
        this.start_y = config.start_y;
        this.size = config.size;
        this.index_i = this.x/this.size;
        this.index_j = this.y/this.size;
        this.state = round(random(0,config.concentration));
        this.future_state = this.state;
        this.rule_alive = config.rule_alive;
        this.rule_dead = config.rule_dead;
        this.has_changed = true;
        this.alive_color = config.alive_color;
        this.dead_color = config.dead_color;
    }

    show() {
        if (!this.has_changed) {
            return;
        }
        
        noStroke();
        if (this.state == 0) {
            fill(this.dead_color);
        }
        else {
            fill(this.alive_color);
        }

        rect(this.x+this.start_x, this.y+this.start_y, this.size)

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