class Cell {
  constructor() {
    this.linkedCells = [];
  }

  setNSEW(north, south, east, west) {
    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
  }

  link(cell, bidirectional = true) {
    this.linkedCells.push(cell);
    if (bidirectional) {
      cell.link(this, false);
    }
  }

  isLinked(cell) {
    return this.linkedCells.includes(cell);
  }
}

class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.grid = new Array(cols);

    for (let i = 0; i < cols; i++) {
      this.grid[i] = new Array(rows);

      for (let j = 0; j < rows; j++) {
        this.grid[i][j] = new Cell();
      }
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let item = this.grid[i][j];
        let north = this.itemAt(i, j - 1);
        let east = this.itemAt(i + 1, j);
        let south = this.itemAt(i, j + 1);
        let west = this.itemAt(i - 1, j);
        item.setNSEW(north, south, east, west);
      }
    }
  }

  itemAt(i, j) {
    if (i < 0 || i >= this.cols || j < 0 || j >= this.rows) {
      return null;
    }
    return this.grid[i][j];
  }

  show() {
    strokeWeight(2);
    noFill();
    let w = width / this.cols;
    let h = height / this.rows;
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const cell = this.grid[i][j];
        const x = i * w;
        const y = j * h;

        stroke(255);

        if (!cell.isLinked(cell.north)) {
          line(x, y, x + w, y);
        }

        if (!cell.isLinked(cell.east)) {
          line(x + w, y, x + w, y + h);
        }
      }
    }
  }

  forEachCell(f) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        f(this.grid[i][j]);
      }
    }
  }
}
