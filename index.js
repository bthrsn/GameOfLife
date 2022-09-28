// add input of cols and rows to html
// remove input on submit and create canvas with cols and rows from input

function make2DArray(cols, rows) {
  let arr = new Array(cols);

  for (let index = 0; index < arr.length; index++) {
    arr[index] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

function setGrid() {
  cols = canvas.width / resolution;
  rows = canvas.height / resolution;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  console.table(grid);
}

function renderGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let isAlive = grid[i][j]; // obv it will have 1 value from set of 2: 0 or 1
      context.beginPath();
      context.rect(x, y, resolution, resolution);
      context.fillStyle = isAlive ? "black" : "white";
      context.fill();
      context.stroke();
    }
  }

  let next = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      let neighbours = countNeighbours(grid, i, j);

      if (state === 0 && neighbours === 3) {
        next[i][j] = 1;
      } else if (state === 1 && (neighbours < 2 || neighbours > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbours(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

setGrid();
requestAnimationFrame(update);

function update() {
  renderGrid();
  requestAnimationFrame(update);
}
