function Node(i, j) {
  /*
  f: f score
  g: g score
  h: heuristic
  */
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.sw = 0;
  this.sh = 0;
  this.neighbors = [];
  this.prev = null;
  if (randInt)
    if (random(10) <= 4) this.obs = true;    // to assign random obstacles
    else this.obs = false;

  this.display = function (colour) {
    if (this.isObs()) fill(0);
    else fill(colour);
    stroke(0);
    rect(this.j * nw, this.i * nh, nw, nh);

    if (mouseIsPressed) {
      if (mouseX >= this.j * nw && mouseX <= this.j * nw + nw &&
        mouseY >= this.i * nh && mouseY <= this.i * nh + nh)
        if (start && end) this.obs = true;
    }
  }

  this.addNeighbors = function (grid) {
    if (this.i < rows - 1)
      this.neighbors.push(grid[this.i + 1][this.j]);
    if (this.i > 0)
      this.neighbors.push(grid[this.i - 1][this.j]);
    if (this.j < cols - 1)
      this.neighbors.push(grid[this.i][this.j + 1]);
    if (this.j > 0)
      this.neighbors.push(grid[this.i][this.j - 1]);
    if (this.i < rows - 1 && this.j < cols - 1)
      this.neighbors.push(grid[this.i + 1][this.j + 1]);
    if (this.i > 0 && this.j > 0)
      this.neighbors.push(grid[this.i - 1][this.j - 1]);
    if (this.j < cols - 1 && this.i > 0)
      this.neighbors.push(grid[this.i - 1][this.j + 1]);
    if (this.j > 0 && this.i < rows - 1)
      this.neighbors.push(grid[this.i + 1][this.j - 1]);
  }

  this.isObs = function () {
    return this.obs;
  }

  this.remObs = function () {
    this.obs = false;
  }
}