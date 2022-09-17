let size = 10;
let cell_grid;

function setup() {
    createCanvas(600, 600);
    cell_grid = new Grid(width,
                        height,
                        size,
                        // 129487
                        // 49184
                        // "001100000000100100"
                        round(random(0,262143))
                        );

    frameRate(10)

}

function draw() {
    cell_grid.draw();
    cell_grid.next_gen();
    // noLoop();
}
