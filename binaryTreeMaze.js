function binaryTreeMaze(grid) {
  grid.forEachCell(cell => {
    let neighbours = [];
    const northernCell = cell.north;
    const easternCell = cell.east;
    if (northernCell) {
      neighbours.push(northernCell);
    }
    if (easternCell) {
      neighbours.push(easternCell);
    }

    const neighbour = random(neighbours);

    if (neighbour) {
      cell.link(neighbour);
    }
  });
}
