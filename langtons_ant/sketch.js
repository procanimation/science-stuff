const canvas = document.getElementById('antCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 4;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

let grid = new Uint8Array(cols * rows);
let antX = Math.floor(cols / 2);
let antY = Math.floor(rows / 2);
let antDir = 0;
const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

let stepCount = 0;
let isRunning = true;

function reset() {
  grid.fill(0);
  antX = Math.floor(cols / 2);
  antY = Math.floor(rows / 2);
  antDir = 0;
  stepCount = 0;
  render();
}

function step() {
  const idx = antY * cols + antX;
  if (grid[idx] === 0) {
    antDir = (antDir + 1) % 4;
    grid[idx] = 1;
  } else {
    antDir = (antDir + 3) % 4;
    grid[idx] = 0;
  }
  antX = (antX + dx[antDir] + cols) % cols;
  antY = (antY + dy[antDir] + rows) % rows;
  stepCount++;
}

function render() {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    const rowOffset = y * cols;
    for (let x = 0; x < cols; x++) {
      if (grid[rowOffset + x] === 1) {
        if (stepCount >= 10400 && (x > cols / 2 + 10 || y > rows / 2 + 10)) {
          ctx.fillStyle = '#4ade80';
        } else {
          ctx.fillStyle = '#38bdf8';
        }
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 0.5, cellSize - 0.5);
      }
    }
  }

  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.arc(antX * cellSize + cellSize / 2, antY * cellSize + cellSize / 2, cellSize, 0, Math.PI * 2);
  ctx.fill();
}

function loop() {
  if (isRunning) {
    for (let i = 0; i < 40; i++) {
      step();
    }
    render();
  }
  requestAnimationFrame(loop);
}

document.getElementById('btnPlayPause').addEventListener('click', function() {
  isRunning = !isRunning;
  this.innerText = isRunning ? '❚❚ Pause' : '▶ Resume';
});

document.getElementById('btnReset').addEventListener('click', reset);

document.getElementById('btnFastForward').addEventListener('click', function() {
  while (stepCount < 10300) {
    step();
  }
  render();
});

reset();
requestAnimationFrame(loop);
