const canvas = document.getElementById('buddhaCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width = 540;
const H = canvas.height = 720;

const bufR = new Float32Array(W * H);
const bufG = new Float32Array(W * H);
const bufB = new Float32Array(W * H);

const minReal = -2.05, maxReal = 0.95;
const minImag = -1.35, maxImag = 1.35;

let totalSamples = 0;
let totalEscaped = 0;
let isRunning = true;
let palette = 'nebulabrot';

function sample(batch) {
  for (let s = 0; s < batch; s++) {
    totalSamples++;
    const cr = minReal + Math.random() * (maxReal - minReal);
    const ci = minImag + Math.random() * (maxImag - minImag);

    // Cardioid / bulb test
    const q = (cr - 0.25) * (cr - 0.25) + ci * ci;
    if (q * (q + (cr - 0.25)) < 0.25 * ci * ci) continue;
    if ((cr + 1.0) * (cr + 1.0) + ci * ci < 0.0625) continue;

    let zr = 0, zi = 0;
    let escaped = false;
    let escapeStep = 0;
    const pathR = [];
    const pathI = [];

    for (let i = 0; i < 2200; i++) {
      const zr2 = zr * zr;
      const zi2 = zi * zi;
      if (zr2 + zi2 > 4.0) {
        escaped = true;
        escapeStep = i;
        break;
      }
      const nzr = zr2 - zi2 + cr;
      const nzi = 2.0 * zr * zi + ci;
      zr = nzr;
      zi = nzi;
      pathR.push(zr);
      pathI.push(zi);
    }

    if (escaped && escapeStep >= 20) {
      totalEscaped++;
      for (let j = 1; j < escapeStep; j++) {
        const r = pathR[j];
        const im = pathI[j];
        const gx = Math.floor(((im - minImag) / (maxImag - minImag)) * W);
        const gy = Math.floor(((maxReal - r) / (maxReal - minReal)) * H);

        if (gx >= 0 && gx < W && gy >= 0 && gy < H) {
          const idx = gy * W + gx;
          if (escapeStep < 120) bufR[idx] += 1.0;
          else if (escapeStep < 550) bufG[idx] += 1.0;
          else bufB[idx] += 1.0;
        }
      }
    }
  }
}

const imgData = ctx.createImageData(W, H);
const px = imgData.data;

function draw() {
  let maxR = 1, maxG = 1, maxB = 1;
  for (let i = 0; i < W * H; i++) {
    if (bufR[i] > maxR) maxR = bufR[i];
    if (bufG[i] > maxG) maxG = bufG[i];
    if (bufB[i] > maxB) maxB = bufB[i];
  }
  const logR = Math.log(1 + maxR);
  const logG = Math.log(1 + maxG);
  const logB = Math.log(1 + maxB);
  const gamma = 0.75;

  for (let i = 0; i < W * H; i++) {
    const vr = Math.pow(Math.log(1 + bufR[i]) / logR, gamma);
    const vg = Math.pow(Math.log(1 + bufG[i]) / logG, gamma);
    const vb = Math.pow(Math.log(1 + bufB[i]) / logB, gamma);

    const p = i * 4;
    if (palette === 'nebulabrot') {
      px[p]     = Math.min(255, (vr * 1.5 + vg * 0.2) * 255);
      px[p + 1] = Math.min(255, (vg * 1.35 + vb * 0.3) * 255);
      px[p + 2] = Math.min(255, (vb * 1.85 + vr * 0.25) * 255);
    } else if (palette === 'amber') {
      const lum = (vr * 0.4 + vg * 0.45 + vb * 0.5) * 1.45;
      px[p]     = Math.min(255, lum * 255 * 1.15);
      px[p + 1] = Math.min(255, lum * 190);
      px[p + 2] = Math.min(255, lum * 80 + vb * 60);
    } else {
      px[p]     = Math.min(255, (vb * 1.4 + vr * 0.6) * 255);
      px[p + 1] = Math.min(255, (vg * 1.2 + vb * 0.4) * 255);
      px[p + 2] = Math.min(255, (vb * 1.8 + vg * 0.5) * 255);
    }
    px[p + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

  document.getElementById('hudSamples').textContent = totalSamples.toLocaleString();
  document.getElementById('hudEscaped').textContent = totalEscaped.toLocaleString();
}

function loop() {
  if (isRunning) {
    sample(2500);
    draw();
  }
  requestAnimationFrame(loop);
}

document.getElementById('btnPause').addEventListener('click', (e) => {
  isRunning = !isRunning;
  e.target.textContent = isRunning ? '⏸ Pause' : '▶ Resume';
});

document.getElementById('btnClear').addEventListener('click', () => {
  bufR.fill(0); bufG.fill(0); bufB.fill(0);
  totalSamples = 0; totalEscaped = 0;
  draw();
});

document.getElementById('selPalette').addEventListener('change', (e) => {
  palette = e.target.value;
  document.getElementById('hudMode').textContent = e.target.options[e.target.selectedIndex].text;
  draw();
});

loop();
