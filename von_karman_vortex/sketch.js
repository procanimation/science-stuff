/**
 * Von Kármán Vortex Streets - Interactive Simulation
 * Procanimation Studio • Open Source Science Repository
 */

const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
const sliderRe = document.getElementById('sliderRe');
const valRe = document.getElementById('valRe');
const sliderR = document.getElementById('sliderR');
const valR = document.getElementById('valR');
const btnStrake = document.getElementById('btnStrake');

let strakeActive = false;
btnStrake.addEventListener('click', () => {
  strakeActive = !strakeActive;
  btnStrake.style.background = strakeActive ? '#facc15' : '#00f5d4';
});

sliderRe.addEventListener('input', (e) => valRe.textContent = e.target.value);
sliderR.addEventListener('input', (e) => valR.textContent = e.target.value);

let t = 0;
function animate() {
  t += 0.035;
  const w = canvas.width;
  const h = canvas.height;
  const currentRe = parseFloat(sliderRe.value);
  const R = parseFloat(sliderR.value);
  const cx = 180;
  const cy = h * 0.5;
  const U = 260;
  const fShed = 1.35;
  const waveSpeed = U * 0.85;
  const lambda = waveSpeed / fShed;

  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, w, h);

  // Background grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 40; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 40; y < h; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Draw vortex wake
  if (currentRe > 45) {
    const amp = Math.min(45.0, (currentRe - 45) * 0.35) * (strakeActive ? 0.2 : 1.0);
    const steps = 120;

    // Cyan streamline (upper/clockwise)
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00f5d4';
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = cx + R + (i / steps) * (w - cx - R);
      const dx = x - cx;
      const env = Math.sin((i / steps) * Math.PI) * Math.exp(-dx / (w * 0.75));
      const y = cy - 10 - amp * env * Math.sin((dx / lambda) * Math.PI * 2 - t * fShed * Math.PI * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Magenta streamline (lower/counter-clockwise)
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#f72585';
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = cx + R + (i / steps) * (w - cx - R);
      const dx = x - cx;
      const env = Math.sin((i / steps) * Math.PI) * Math.exp(-dx / (w * 0.75));
      const y = cy + 10 + amp * env * Math.sin((dx / lambda) * Math.PI * 2 - t * fShed * Math.PI * 2 + Math.PI);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Rotating glowing vortex centers
    ctx.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 6; k++) {
      const xL = cx + 50 + k * lambda + ((t * waveSpeed) % lambda);
      const yL = cy - 38;
      const xR = cx + 50 + (k + 0.5) * lambda + ((t * waveSpeed) % lambda);
      const yR = cy + 38;

      if (xL < w - 20) {
        ctx.fillStyle = 'rgba(0, 245, 212, 0.4)';
        ctx.beginPath();
        ctx.arc(xL, yL, 26 * (strakeActive ? 0.3 : 1.0), 0, Math.PI * 2);
        ctx.fill();
      }
      if (xR < w - 20) {
        ctx.fillStyle = 'rgba(247, 37, 133, 0.4)';
        ctx.beginPath();
        ctx.arc(xR, yR, 26 * (strakeActive ? 0.3 : 1.0), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  } else {
    // Laminar flow
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#38bdf8';
    [-15, 15].forEach(off => {
      ctx.beginPath();
      ctx.moveTo(0, cy + off);
      ctx.lineTo(w, cy + off);
      ctx.stroke();
    });
  }

  // Cylinder obstacle
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = strakeActive ? '#facc15' : '#38bdf8';
  ctx.stroke();

  if (strakeActive) {
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    for (let a = 0; a < 3; a++) {
      ctx.beginPath();
      const ang = t * 2.5 + a * (Math.PI * 2 / 3);
      ctx.arc(cx, cy, R + 6, ang, ang + 1.2);
      ctx.stroke();
    }
  }

  // Cylinder core
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
