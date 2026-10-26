const canvas = document.getElementById('collatzCanvas');
const ctx = canvas.getContext('2d');

let mode = 'tree';
let seed = 27;

function drawTree() {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const branches = [];
  function branch(node, depth, x, y, angle, length) {
    if (depth > 22 || branches.length > 2000) return;

    // 2n
    const nextEven = node * 2;
    const a1 = angle - 0.16;
    const l1 = length * 0.94;
    const nx1 = x + Math.sin(a1) * l1;
    const ny1 = y - Math.cos(a1) * l1;
    branches.push({ x1: x, y1: y, x2: nx1, y2: ny1, isOdd: false, depth });
    branch(nextEven, depth + 1, nx1, ny1, a1, l1);

    // (n-1)/3
    if ((node - 1) % 3 === 0) {
      const nextOdd = (node - 1) / 3;
      if (nextOdd > 1 && nextOdd % 2 !== 0) {
        const a2 = angle + 0.30;
        const l2 = length * 0.90;
        const nx2 = x + Math.sin(a2) * l2;
        const ny2 = y - Math.cos(a2) * l2;
        branches.push({ x1: x, y1: y, x2: nx2, y2: ny2, isOdd: true, depth });
        branch(nextOdd, depth + 1, nx2, ny2, a2, l2);
      }
    }
  }

  const rootX = canvas.width / 2;
  const rootY = canvas.height - 30;
  branch(1, 1, rootX, rootY, 0, 48);

  for (let i = 0; i < branches.length; i++) {
    const b = branches[i];
    ctx.beginPath();
    ctx.moveTo(b.x1, b.y1);
    ctx.lineTo(b.x2, b.y2);
    ctx.strokeStyle = b.isOdd ? 'rgba(245, 158, 11, 0.8)' : 'rgba(56, 189, 248, 0.65)';
    ctx.lineWidth = Math.max(0.6, 2.5 - b.depth * 0.08);
    ctx.stroke();
  }

  ctx.fillStyle = '#4ade80';
  ctx.beginPath();
  ctx.arc(rootX, rootY, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawHailstone(n) {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const seq = [n];
  let curr = n;
  while (curr !== 1 && seq.length < 500) {
    if (curr % 2 === 0) curr = curr / 2;
    else curr = 3 * curr + 1;
    seq.push(curr);
  }
  seq.push(4, 2, 1);

  const maxVal = Math.max(...seq);
  const logMax = Math.log(maxVal);
  const pad = 50;

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < seq.length; i++) {
    const x = pad + (i / seq.length) * (canvas.width - 2 * pad);
    const y = canvas.height - pad - (Math.log(seq[i]) / logMax) * (canvas.height - 2 * pad);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  for (let i = 0; i < seq.length; i++) {
    const x = pad + (i / seq.length) * (canvas.width - 2 * pad);
    const y = canvas.height - pad - (Math.log(seq[i]) / logMax) * (canvas.height - 2 * pad);
    ctx.fillStyle = seq[i] % 2 !== 0 ? '#f43f5e' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function render() {
  if (mode === 'tree') drawTree();
  else drawHailstone(seed);
}

document.getElementById('btnToggleMode').addEventListener('click', function() {
  mode = mode === 'tree' ? 'hailstone' : 'tree';
  render();
});

document.getElementById('btnPlotSeed').addEventListener('click', function() {
  seed = parseInt(document.getElementById('seedVal').value) || 27;
  mode = 'hailstone';
  render();
});

render();
