// Elementary Cellular Automata Runner
const canvas = document.getElementById('caCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 4;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

let currentRule = 30;
let seedType = 'single';
let isRunning = true;
let grid = [];

function getRuleBit(rule, left, center, right) {
  const idx = (left << 2) | (center << 1) | right;
  return (rule >> idx) & 1;
}

function initGrid() {
  grid = [];
  const firstRow = new Uint8Array(cols);
  if (seedType === 'single') {
    firstRow[Math.floor(cols / 2)] = 1;
  } else {
    for (let i = 0; i < cols; i++) {
      firstRow[i] = Math.random() > 0.5 ? 1 : 0;
    }
  }
  grid.push(firstRow);
  draw();
}

function step() {
  if (grid.length >= rows) {
    grid.shift();
  }
  const prevRow = grid[grid.length - 1];
  const nextRow = new Uint8Array(cols);
  for (let x = 0; x < cols; x++) {
    const left = x > 0 ? prevRow[x - 1] : prevRow[cols - 1];
    const center = prevRow[x];
    const right = x < cols - 1 ? prevRow[x + 1] : prevRow[0];
    nextRow[x] = getRuleBit(currentRule, left, center, right);
  }
  grid.push(nextRow);
}

function draw() {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < cols; x++) {
      if (row[x] === 1) {
        if (currentRule === 30) {
          ctx.fillStyle = x === Math.floor(cols / 2) ? '#f43f5e' : '#38bdf8';
        } else if (currentRule === 90) {
          ctx.fillStyle = '#a855f7';
        } else if (currentRule === 110) {
          ctx.fillStyle = '#4ade80';
        } else {
          ctx.fillStyle = '#f59e0b';
        }
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }
}

function loop() {
  if (isRunning) {
    step();
    draw();
  }
  requestAnimationFrame(loop);
}

document.getElementById('btnPlayPause').addEventListener('click', function() {
  isRunning = !isRunning;
  this.innerText = isRunning ? '❚❚ Pause' : '▶ Resume';
});

document.getElementById('btnReset').addEventListener('click', initGrid);

document.getElementById('ruleSelect').addEventListener('change', function() {
  currentRule = parseInt(this.value);
  initGrid();
});

document.getElementById('seedSelect').addEventListener('change', function() {
  seedType = this.value;
  initGrid();
});

initGrid();
requestAnimationFrame(loop);
