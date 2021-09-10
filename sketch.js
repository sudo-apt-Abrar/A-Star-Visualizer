var rows = 60;
var cols = 100;
var grid = new Array(rows);

var openSet;
var closedSet;

var randInt = false;

var start;
var end;

var nw, nh;      // node width and node height
var bh = 40;     // button height

var path;

var find;
var cleared;

function setup() {
  createCanvas(1000, 650);

  for (let i = 0; i < rows; i++)
    grid[i] = new Array(cols);

  openSet = [];
  closedSet = [];
  path = [];

  nw = width / cols;
  nh = (height - bh) / rows;   // to make space for buttons

  initGrid();
  setNeighbors();

  start = undefined;
  end = undefined;

  find = false;
  cleared = true;
}

function draw() {
  background(50);

  if (!start && mouseIsPressed) selStart();
  if (!end && mouseIsPressed) selEnd();

  strokeWeight(1);
  updateColours();
  if (find) evaluateNodes();
  renderStartButton();
  strokeWeight(1);
  renderClearButton();
  strokeWeight(1);
  renderRandomButton();
}

function initGrid() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      grid[i][j] = new Node(i, j);
}

function selStart() {
  if (mouseY < height - bh) {
    setStart((int)(mouseY / nh), (int)(mouseX / nw));
    mouseIsPressed = false;
    openSet.push(start);
    start.display(color(128, 0, 128));
    startSet = true;
  }
}

function selEnd() {
  if (mouseY < height - bh) {
    setEnd((int)(mouseY / nh), (int)(mouseX / nw));
    mouseIsPressed = false;
    end.display(color(128, 0, 128));
    endSet = true;
  }
}

function setStart(i, j) {
  start = grid[i][j];
  start.remObs();
}

function setEnd(i, j) {
  end = grid[i][j];
  end.remObs();
}

function setNeighbors() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      grid[i][j].addNeighbors(grid);
}

function evaluateNodes() {
  if (openSet.length > 0) {
    var current = openSet[0];

    if (current == end) {
      console.log("Path Found!");
      find = false;
    }

    openSet.shift();
    closedSet.push(current);

    var neighbors = current.neighbors;

    evaluateNeighbors(neighbors, current);

  } else {
    console.log("No solution :(");
    find = false;
  }
}

function evaluateNeighbors(neighbors, node) {
  for (var i = 0; i < neighbors.length; i++) {
    var neighbor = neighbors[i];

    if (!closedSet.includes(neighbor) && !neighbor.isObs()) {
      var potentialG = node.g + 1;

      if (openSet.includes(neighbor)) {
        if (potentialG < neighbor.g) {
          updateNodeAttributes(neighbor, node, potentialG);
        }
      } else {
        openSet.push(neighbor);
        updateNodeAttributes(neighbor, node, potentialG);
        insertionSort(openSet);    // since the open set would always be almost sorted if not sorted
      }
    }
    updatePath(node);
  }
}

function updatePath(node) {
  path = [];
  var tmp = node;
  path.push(tmp);
  while (tmp.prev) {
    tmp = tmp.prev;
    path.push(tmp);
  }
}

function insertionSort(list) {
  for (var i = 1; i < list.length; ++i) {
    var key = list[i];
    var j = i - 1;
    while (j >= 0 && list[j].f > key.f)
      list[j + 1] = list[j--];
    list[j + 1] = key;
  }
}

function updateNodeAttributes(node, prev, newG) {
  node.g = newG;
  node.h = heuristic(node, end);
  node.f = node.g + node.h;
  node.prev = prev;
}

function updateColours() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      grid[i][j].display(color(255));

  for (let i = 0; i < openSet.length; i++)
    openSet[i].display(color(255, 150, 0));    // open set

  for (let i = 0; i < closedSet.length; i++)
    closedSet[i].display(color(255, 0, 0));    // closed set

  if (path != null)
    for (let i = 0; i < path.length; i++)
      path[i].display(color(0, 255, 0));       // path

  if (end)
    if (find) end.display(color(128, 0, 128));
    else end.display(color(0, 255, 0));
}

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);      // Euclidean distance
}

function renderStartButton() {
  var startButton = new Button(0, height - bh, width / 3, bh, 255, 255, 255, "Find Path");
  startButton.update();
  startButton.display();
  if (cleared && startButton.isClicked()) {
    cleared = false;
    find = true;
    startButton.unClick();
  }
}

function renderClearButton() {
  var clearButton = new Button(width / 3, height - bh, width / 3, bh, 255, 255, 255, "Clear");
  clearButton.update();
  clearButton.display();
  if (clearButton.isClicked()) {
    randInt = false;
    setup();
    clearButton.unClick();
  }
}

function renderRandomButton() {
  var randomButton = new Button(2 * width / 3, height - bh, width / 3, bh, 255, 255, 255, "Random");
  randomButton.update();
  randomButton.display();
  if (randomButton.isClicked()) {
    randInt = true;
    setup();
  }
}