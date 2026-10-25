/**
 * Conway's Game of Life (B3/S23)
 * Procanimation Studio • Open Source Procedural Simulation
 */

const canvas = document.getElementById("lifeCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 8;
let cols = 0, rows = 0;
let grid, nextGrid, age, decay;
let isRunning = true;
let genCount = 0;

function resize() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  cols = Math.floor(canvas.width / CELL_SIZE);
  rows = Math.floor(canvas.height / CELL_SIZE);
  grid = new Uint8Array(cols * rows);
  nextGrid = new Uint8Array(cols * rows);
  age = new Float32Array(cols * rows);
  decay = new Float32Array(cols * rows);
  loadPreset("gosper");
}

function idx(x, y) {
  return ((y + rows) % rows) * cols + ((x + cols) % cols);
}

function setCell(x, y, v) {
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    grid[idx(x, y)] = v;
    if (v) age[idx(x, y)] = 0;
  }
}

function addGosper(ox, oy) {
  const coords = [
    [1, 5], [2, 5], [1, 6], [2, 6],
    [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9],
    [15, 6], [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6],
    [21, 3], [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6],
    [25, 1], [25, 2], [25, 6], [25, 7],
    [35, 3], [35, 4], [36, 3], [36, 4]
  ];
  coords.forEach(([dx, dy]) => setCell(ox + dx, oy + dy, 1));
}

function addPulsar(cx, cy) {
  for (let dx of [-4, -3, -2, 2, 3, 4]) {
    for (let dy of [-6, -1, 1, 6]) setCell(cx + dx, cy + dy, 1);
  }
  for (let dy of [-4, -3, -2, 2, 3, 4]) {
    for (let dx of [-6, -1, 1, 6]) setCell(cx + dx, cy + dy, 1);
  }
}

function addGlider(x, y) {
  [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]].forEach(([dx, dy]) => setCell(x + dx, y + dy, 1));
}

function loadPreset(name) {
  grid.fill(0);
  nextGrid.fill(0);
  age.fill(0);
  decay.fill(0);
  genCount = 0;

  const mx = Math.floor(cols / 2);
  const my = Math.floor(rows / 2);

  if (name === "gosper") {
    addGosper(Math.max(5, mx - 25), Math.max(5, my - 12));
  } else if (name === "pulsar") {
    addPulsar(mx, my);
  } else if (name === "pentadecathlon") {
    for (let dy = -4; dy <= 5; dy++) {
      if (dy === -3 || dy === 2) {
        setCell(mx - 1, my + dy, 1);
        setCell(mx + 1, my + dy, 1);
      } else {
        setCell(mx, my + dy, 1);
      }
    }
  } else if (name === "gliders") {
    for (let i = 0; i < 6; i++) {
      addGlider(5 + i * 16, 5 + i * 8);
    }
  } else if (name === "acorn") {
    [[1, 0], [3, 1], [0, 2], [1, 2], [4, 2], [5, 2], [6, 2]].forEach(([dx, dy]) => setCell(mx + dx - 3, my + dy - 1, 1));
  }
}

function step() {
  genCount++;
  for (let y = 0; y < rows; y++) {
    const ya = (y - 1 + rows) % rows;
    const yb = (y + 1) % rows;
    for (let x = 0; x < cols; x++) {
      const xl = (x - 1 + cols) % cols;
      const xr = (x + 1) % cols;
      const n =
        grid[ya * cols + xl] + grid[ya * cols + x] + grid[ya * cols + xr] +
        grid[y * cols + xl] + grid[y * cols + xr] +
        grid[yb * cols + xl] + grid[yb * cols + x] + grid[yb * cols + xr];

      const cur = grid[y * cols + x];
      let next = 0;
      if (cur === 1 && (n === 2 || n === 3)) next = 1;
      else if (cur === 0 && n === 3) next = 1;

      const i = y * cols + x;
      nextGrid[i] = next;

      if (next === 1) {
        age[i] = cur === 1 ? age[i] + 1 : 0;
        decay[i] = 1.0;
      } else {
        if (cur === 1) decay[i] = 1.0;
        else decay[i] = Math.max(0, decay[i] - 0.15);
        age[i] = 0;
      }
    }
  }
  const temp = grid; grid = nextGrid; nextGrid = temp;
}

function draw() {
  ctx.fillStyle = "#030816";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const alive = grid[i] === 1;
      const d = decay[i];
      const px = x * CELL_SIZE;
      const py = y * CELL_SIZE;

      if (alive) {
        const a = age[i];
        if (a === 0) ctx.fillStyle = "#ffffff";
        else if (a < 10) ctx.fillStyle = "#00f5d4";
        else if (a < 30) ctx.fillStyle = "#06d6a0";
        else ctx.fillStyle = "#ffbe0b";
        ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      } else if (d > 0.05) {
        ctx.fillStyle = `rgba(114, 9, 183, ${d * 0.4})`;
        ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      }
    }
  }
}

let lastTick = 0;
function animate(time) {
  if (isRunning && time - lastTick > 45) {
    step();
    lastTick = time;
  }
  draw();
  requestAnimationFrame(animate);
}

// Mouse Paint
let isPainting = false;
canvas.addEventListener("mousedown", (e) => { isPainting = true; paint(e); });
window.addEventListener("mouseup", () => isPainting = false);
canvas.addEventListener("mousemove", (e) => { if (isPainting) paint(e); });

function paint(e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
  const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
  setCell(x, y, 1);
}

// UI buttons
const btnPlay = document.getElementById("btnPlayPause");
btnPlay.addEventListener("click", () => {
  isRunning = !isRunning;
  btnPlay.textContent = isRunning ? "Pause" : "Resume";
});
document.getElementById("btnStep").addEventListener("click", () => { step(); draw(); });
document.getElementById("btnClear").addEventListener("click", () => {
  grid.fill(0); nextGrid.fill(0); age.fill(0); decay.fill(0); genCount = 0; draw();
});
document.getElementById("btnRandom").addEventListener("click", () => {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Math.random() < 0.2 ? 1 : 0;
    age[i] = 0; decay[i] = 0;
  }
  genCount = 0;
});
document.getElementById("selectPreset").addEventListener("change", (e) => loadPreset(e.target.value));

window.addEventListener("resize", resize);
resize();
requestAnimationFrame(animate);
