const canvas = document.getElementById('chaosCanvas');
const ctx = canvas.getContext('2d');

let isRunning = true;
let preset = 'fern';
let curX = 0, curY = 0;

const fernTransforms = [
  { a: 0.0,  b: 0.0,   c: 0.0,   d: 0.16, e: 0.0, f: 0.0,  p: 0.01, col: '#f59e0b' },
  { a: 0.85, b: 0.04,  c: -0.04, d: 0.85, e: 0.0, f: 1.6,  p: 0.85, col: 'rgba(74, 222, 128, 0.65)' },
  { a: 0.2,  b: -0.26, c: 0.23,  d: 0.22, e: 0.0, f: 1.6,  p: 0.07, col: 'rgba(56, 189, 248, 0.8)' },
  { a: -0.15,b: 0.28,  c: 0.26,  d: 0.24, e: 0.0, f: 0.44, p: 0.07, col: 'rgba(163, 230, 53, 0.8)' }
];

const triVerts = [
  { x: 400, y: 50 },
  { x: 100, y: 550 },
  { x: 700, y: 550 }
];

function reset() {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  curX = 0;
  curY = 0;
}

function stepFern() {
  const r = Math.random();
  let t = fernTransforms[1];
  if (r < 0.01) t = fernTransforms[0];
  else if (r < 0.86) t = fernTransforms[1];
  else if (r < 0.93) t = fernTransforms[2];
  else t = fernTransforms[3];

  const nx = t.a * curX + t.b * curY + t.e;
  const ny = t.c * curX + t.d * curY + t.f;
  curX = nx;
  curY = ny;

  const scale = 55;
  const px = canvas.width / 2 + curX * scale;
  const py = canvas.height - 20 - curY * scale;

  ctx.fillStyle = t.col;
  ctx.fillRect(px, py, 1.2, 1.2);
}

function stepSierpinski() {
  const v = triVerts[Math.floor(Math.random() * 3)];
  curX = (curX + v.x) / 2;
  curY = (curY + v.y) / 2;

  ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
  ctx.fillRect(curX, curY, 1.4, 1.4);
}

function loop() {
  if (isRunning) {
    for (let i = 0; i < 3000; i++) {
      if (preset === 'fern') stepFern();
      else stepSierpinski();
    }
  }
  requestAnimationFrame(loop);
}

document.getElementById('btnPlayPause').addEventListener('click', function() {
  isRunning = !isRunning;
  this.innerText = isRunning ? '❚❚ Pause' : '▶ Resume';
});

document.getElementById('btnClear').addEventListener('click', reset);

document.getElementById('presetSelect').addEventListener('change', function() {
  preset = this.value;
  reset();
});

reset();
requestAnimationFrame(loop);
