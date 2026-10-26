const canvas = document.getElementById('chladniCanvas');
const ctx = canvas.getContext('2d');

let m = 3;
let n = 5;
const numParticles = 16000;
const pX = new Float32Array(numParticles);
const pY = new Float32Array(numParticles);
const vX = new Float32Array(numParticles);
const vY = new Float32Array(numParticles);

function reset() {
  for (let i = 0; i < numParticles; i++) {
    pX[i] = (Math.random() * 2 - 1) * 0.94;
    pY[i] = (Math.random() * 2 - 1) * 0.94;
    vX[i] = 0;
    vY[i] = 0;
  }
}

function chladni(u, v) {
  const x = (u + 1) * 0.5 * Math.PI;
  const y = (v + 1) * 0.5 * Math.PI;
  return Math.sin(n * x) * Math.sin(m * y) - Math.sin(m * x) * Math.sin(n * y);
}

function updatePhysics() {
  const eps = 0.01;
  for (let i = 0; i < numParticles; i++) {
    const u = pX[i];
    const v = pY[i];
    const val = chladni(u, v);
    const valDx = chladni(u + eps, v);
    const valDy = chladni(u, v + eps);

    const gradX = (Math.abs(valDx) - Math.abs(val)) / eps;
    const gradY = (Math.abs(valDy) - Math.abs(val)) / eps;

    vX[i] = vX[i] * 0.70 - gradX * 0.007 + (Math.random() - 0.5) * 0.003 * Math.abs(val);
    vY[i] = vY[i] * 0.70 - gradY * 0.007 + (Math.random() - 0.5) * 0.003 * Math.abs(val);

    pX[i] = Math.max(-0.95, Math.min(0.95, pX[i] + vX[i]));
    pY[i] = Math.max(-0.95, Math.min(0.95, pY[i] + vY[i]));
  }
}

function render() {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const half = canvas.width / 2;
  for (let i = 0; i < numParticles; i++) {
    const sx = half + pX[i] * (half - 15);
    const sy = half + pY[i] * (half - 15);

    if (i % 6 === 0) ctx.fillStyle = '#ffffff';
    else if (i % 2 === 0) ctx.fillStyle = '#fbbf24';
    else ctx.fillStyle = '#f59e0b';

    ctx.fillRect(sx, sy, 1.4, 1.4);
  }
}

function loop() {
  updatePhysics();
  render();
  requestAnimationFrame(loop);
}

document.getElementById('btnShake').addEventListener('click', reset);

document.getElementById('mSlider').addEventListener('input', function() {
  m = parseInt(this.value);
  reset();
});

document.getElementById('nSlider').addEventListener('input', function() {
  n = parseInt(this.value);
  reset();
});

reset();
requestAnimationFrame(loop);
