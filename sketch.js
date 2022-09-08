let size = 2;
let cell_grid;

function setup() {
  createCanvas(400, 400);
  cell_grid = new Grid(width, height, size);
  // frameRate(1)

}

function draw() {
  cell_grid.draw();
  cell_grid.next_gen();  
  // noLoop();
}
