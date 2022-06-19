const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const resolution = 40;
canvas.width = 400;
canvas.height = 400;

const columns = canvas.width / resolution;
const rows = canvas.height / resolution;
const grid = new Array(columns)
  .fill(null)
  .map(() =>
    new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2))
  );

render(grid);
console.log("grid: ", grid);

function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      context.beginPath();
      context.rect(col * resolution, row * resolution, resolution, resolution);
      context.fillStyle = cell ? "black" : "white";
      context.fill();
      context.stroke();
    }
  }
}
