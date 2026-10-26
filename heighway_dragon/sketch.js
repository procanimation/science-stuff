const canvas = document.getElementById('dragonCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width = 600;
const H = canvas.height = 600;

let order = 12;
let angleDeg = 90;
let tessCount = 4;

function draw() {
  ctx.fillStyle = '#03050c';
  ctx.fillRect(0, 0, W, H);

  const totalSegs = 1 << order;
  document.getElementById('hudOrder').textContent = order;
  document.getElementById('hudSegs').textContent = totalSegs.toLocaleString();
  document.getElementById('hudTess').textContent = tessCount === 1 ? 'Single' : `${tessCount}x Quad`;

  // Turns
  const turns = new Int8Array(totalSegs);
  for (let k = 1; k < totalSegs; k++) {
    let temp = k;
    while ((temp & 1) === 0) temp >>= 1;
    turns[k] = (temp % 4 === 1) ? 1 : -1;
  }

  const rad = (angleDeg * Math.PI) / 180;
  const ptsX = new Float32Array(totalSegs + 1);
  const ptsY = new Float32Array(totalSegs + 1);
  let curX = 0, curY = 0;
  let curAngle = 0;

  ptsX[0] = 0;
  ptsY[0] = 0;

  for (let i = 1; i <= totalSegs; i++) {
    curX += Math.cos(curAngle);
    curY += Math.sin(curAngle);
    ptsX[i] = curX;
    ptsY[i] = curY;
    if (i < totalSegs) curAngle += turns[i] * rad;
  }

  let minX = 0, maxX = 0, minY = 0, maxY = 0;
  for (let i = 0; i <= totalSegs; i++) {
    if (ptsX[i] < minX) minX = ptsX[i];
    if (ptsX[i] > maxX) maxX = ptsX[i];
    if (ptsY[i] < minY) minY = ptsY[i];
    if (ptsY[i] > maxY) maxY = ptsY[i];
  }
  const spanX = Math.max(1, maxX - minX);
  const spanY = Math.max(1, maxY - minY);
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  const scale = Math.min((W * 0.8) / (tessCount > 1 ? Math.max(spanX, spanY) * 1.8 : spanX),
                         (H * 0.8) / (tessCount > 1 ? Math.max(spanX, spanY) * 1.8 : spanY));

  const colors = ['#f43f5e', '#38bdf8', '#f59e0b', '#10b981'];

  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.scale(scale, scale);

  for (let c = 0; c < tessCount; c++) {
    ctx.save();
    ctx.rotate((c * Math.PI) / 2);
    ctx.translate(-midX, -midY);

    ctx.beginPath();
    ctx.moveTo(ptsX[0], ptsY[0]);
    for (let i = 1; i <= totalSegs; i++) {
      ctx.lineTo(ptsX[i], ptsY[i]);
    }
    ctx.strokeStyle = colors[c];
    ctx.shadowColor = colors[c];
    ctx.shadowBlur = 8;
    ctx.lineWidth = Math.max(0.6, 2.0 / Math.sqrt(scale));
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

document.getElementById('rngOrder').addEventListener('input', (e) => {
  order = parseInt(e.target.value);
  document.getElementById('txtOrder').textContent = order;
  draw();
});

document.getElementById('rngAngle').addEventListener('input', (e) => {
  angleDeg = parseFloat(e.target.value);
  document.getElementById('txtAngle').textContent = `${Math.round(angleDeg)}°`;
  draw();
});

document.getElementById('selTess').addEventListener('change', (e) => {
  tessCount = parseInt(e.target.value);
  draw();
});

draw();
