let grid;
function setup() {
  createCanvas(600, 600);
  grid = new Grid(50, 50);
  binaryTreeMaze(grid);
}

function draw() {
  background(55);

  grid.show();
}
