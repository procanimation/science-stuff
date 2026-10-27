// The Ulam Spiral Interactive Simulation - Procanimation Studio

const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

let MAX_N = 25000;
let isPolar = false;
let highlightEuler = true;
let zoom = 1.2;

// Sieve of Eratosthenes
const isPrime = new Uint8Array(80001);
isPrime.fill(1);
isPrime[0] = 0;
isPrime[1] = 0;
for (let p = 2; p * p <= 80000; p++) {
  if (isPrime[p]) {
    for (let i = p * p; i <= 80000; i += p) {
      isPrime[i] = 0;
    }
  }
}

// Precompute Euler polynomial values
const eulerPrimes = new Set();
for (let n = 0; n <= 300; n++) {
  const val = n * n + n + 41;
  if (val <= 80000 && isPrime[val]) {
    eulerPrimes.add(val);
  }
}

// Ulam square spiral coordinate map
function getSquareCoord(n) {
  if (n === 1) return { x: 0, y: 0 };
  const k = Math.ceil((Math.sqrt(n) - 1) / 2);
  let maxStep = 2 * k;
  let seg = maxStep;
  let d = (2 * k + 1) * (2 * k + 1) - n;

  if (d <= seg) return { x: k - d, y: -k };
  d -= seg;
  if (d <= seg) return { x: -k, y: -k + d };
  d -= seg;
  if (d <= seg) return { x: -k + d, y: k };
  d -= seg;
  return { x: k, y: k - d };
}

function render() {
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;

  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, W, H);

  // Background subtle grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x < W; x += 50) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for (let y = 0; y < H; y += 50) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();

  const step = isPolar ? (2.4 * zoom) : (3.6 * zoom);

  for (let n = 2; n <= MAX_N; n++) {
    if (!isPrime[n]) continue;

    let px, py;
    if (isPolar) {
      const r = Math.sqrt(n) * step;
      const theta = Math.sqrt(n) * Math.PI * 2;
      px = cx + r * Math.cos(theta);
      py = cy + r * Math.sin(theta);
    } else {
      const coord = getSquareCoord(n);
      px = cx + coord.x * step;
      py = cy + coord.y * step;
    }

    if (px < -10 || px > W + 10 || py < -10 || py > H + 10) continue;

    const isEuler = highlightEuler && eulerPrimes.has(n);
    if (isEuler) {
      ctx.fillStyle = '#ffb703';
      ctx.shadowColor = '#ffb703';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, 2.5 * zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#00f5d4';
      ctx.beginPath();
      ctx.arc(px, py, 1.2 * zoom, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Legend HUD
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(20, 20, 240, 60);
  ctx.strokeRect(20, 20, 240, 60);

  ctx.fillStyle = '#00f5d4';
  ctx.font = '12px monospace';
  ctx.fillText(`• Prime Numbers (π: ~${Math.round(MAX_N / Math.log(MAX_N))})`, 35, 42);

  ctx.fillStyle = '#ffb703';
  ctx.fillText(`• Euler Highway (n² + n + 41)`, 35, 62);
}

// UI listeners
const btnMode = document.getElementById('btnMode');
const btnEuler = document.getElementById('btnEuler');
const sliderN = document.getElementById('sliderN');
const valN = document.getElementById('valN');
const sliderZoom = document.getElementById('sliderZoom');
const valZoom = document.getElementById('valZoom');

btnMode.addEventListener('click', () => {
  isPolar = !isPolar;
  btnMode.textContent = isPolar ? 'Spiral Mode: Sacks (Polar)' : 'Spiral Mode: Square';
  render();
});

btnEuler.addEventListener('click', () => {
  highlightEuler = !highlightEuler;
  btnEuler.classList.toggle('active', highlightEuler);
  render();
});

sliderN.addEventListener('input', (e) => {
  MAX_N = parseInt(e.target.value);
  valN.textContent = MAX_N.toLocaleString();
  render();
});

sliderZoom.addEventListener('input', (e) => {
  zoom = parseFloat(e.target.value);
  valZoom.textContent = `${zoom.toFixed(1)}x`;
  render();
});

render();
