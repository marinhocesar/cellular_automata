let size = 3;
let grid_size = 150;
let grid_of_grids = [];
let grid_of_cells = [];
let rule;
// rule = 122849;
// rule   "012345678012345678";
// rule =  "101111000010110000";
// rule =  "001100100000100000";
// rule =  "100011100010010000";
let concentrarion;
// concentrarion = 0.55;
let clr;
clr = 255;

function setup() {
    createCanvas(600, 600);
    for (let i=0; i<width/grid_size; i++) {
        row_of_grids = []
        for (let j=0; j<height/grid_size; j++) {
            let grid_rule = rule ? rule : round(random(0,262143));
            let grid_concentration = concentrarion ? concentrarion : undefined;
            let grid_color = clr ? clr : -1;
            const grid_config = {
                "grid_width": grid_size,
                "grid_height": grid_size,
                "cell_size": size,
                "grid_rule": grid_rule,
                "start_x": i*grid_size,
                "start_y": j*grid_size,
                "color_range": grid_color,
                "concentration": grid_concentration
            };
            let new_grid = new Grid(grid_config);
            row_of_grids.push(new_grid);
        }
        grid_of_grids.push(row_of_grids);
    }


    // frameRate(0.5)
    background(255, 100, 100)

}

function draw() {
    // grid_of_cells.draw();
    // grid_of_cells.next_gen();

    for(let i=0; i<width/grid_size; i++) {
        let row = grid_of_grids[i];
        for(let j=0; j<height/grid_size; j++) {
            let grid = row[j];
            grid.draw();
            grid.next_gen();
        }
    }
    // noLoop();
}

function mouseClicked() {
    if (mouseX >= width || mouseY >= height) {
        return;
    }
    let grid_x = Math.floor(mouseX/grid_size);
    let grid_y = Math.floor(mouseY/grid_size);

    let grid_clicked = grid_of_grids[grid_x][grid_y];
    let binary = grid_clicked.rule_binary;
    let decimal = grid_clicked.rule_decimal;
    let concentrarion = grid_clicked.concentrarion;
    console.log("rule: " + binary + " // " + decimal);
    console.log("concentration: " + concentrarion);
    
}