/**
 * The Quantum Double Slit Experiment Simulation
 * Procanimation Studio • Open Source Procedural Physics
 */

const canvas = document.getElementById("quantumCanvas");
const ctx = canvas.getContext("2d");

let isObserverActive = false;
let slitDist = 140;
let wavelength = 28.0;

function resize() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}

function draw(time) {
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const emitterY = 50;
  const barrierY = 150;
  const screenY = canvas.height - 70;
  const s1x = cx - slitDist / 2;
  const s2x = cx + slitDist / 2;

  // 1. Incoming Wavefronts
  for (let i = 0; i < 5; i++) {
    const r = ((time * 0.08 + i * wavelength) % (barrierY - emitterY));
    const a = (1.0 - r / (barrierY - emitterY)) * 0.3;
    ctx.strokeStyle = `rgba(0, 245, 212, ${a})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, emitterY, r, 0, Math.PI);
    ctx.stroke();
  }

  // 2. Post-Slit Waves or Collapsed Beams
  if (!isObserverActive) {
    const maxR = screenY - barrierY + 80;
    for (let i = 0; i < 10; i++) {
      const r = ((time * 0.08 + i * wavelength) % maxR);
      const a = (1.0 - r / maxR) * 0.25;
      ctx.strokeStyle = `rgba(0, 245, 212, ${a})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(s1x, barrierY, r, 0, Math.PI);
      ctx.stroke();

      ctx.strokeStyle = `rgba(114, 9, 183, ${a})`;
      ctx.beginPath();
      ctx.arc(s2x, barrierY, r, 0, Math.PI);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = "rgba(247, 37, 133, 0.08)";
    ctx.beginPath();
    ctx.moveTo(s1x - 8, barrierY); ctx.lineTo(s1x - 45, screenY); ctx.lineTo(s1x + 45, screenY); ctx.lineTo(s1x + 8, barrierY);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(s2x - 8, barrierY); ctx.lineTo(s2x - 45, screenY); ctx.lineTo(s2x + 45, screenY); ctx.lineTo(s2x + 8, barrierY);
    ctx.fill();
  }

  // 3. Barrier
  ctx.fillStyle = "#0f172a";
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 2;
  ctx.fillRect(20, barrierY - 4, s1x - 12 - 20, 8);
  ctx.strokeRect(20, barrierY - 4, s1x - 12 - 20, 8);
  ctx.fillRect(s1x + 12, barrierY - 4, s2x - s1x - 24, 8);
  ctx.strokeRect(s1x + 12, barrierY - 4, s2x - s1x - 24, 8);
  ctx.fillRect(s2x + 12, barrierY - 4, canvas.width - (s2x + 12) - 20, 8);
  ctx.strokeRect(s2x + 12, barrierY - 4, canvas.width - (s2x + 12) - 20, 8);

  // Emitter
  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#00f5d4";
  ctx.beginPath();
  ctx.arc(cx, emitterY, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Observer laser if active
  if (isObserverActive) {
    ctx.fillStyle = "rgba(247, 37, 133, 0.25)";
    ctx.strokeStyle = "#f72585";
    ctx.beginPath();
    ctx.arc(s1x, barrierY, 18, 0, Math.PI * 2);
    ctx.arc(s2x, barrierY, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // 4. Probability Screen Curve
  ctx.fillStyle = "#070c18";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.fillRect(20, screenY, canvas.width - 40, 50);
  ctx.strokeRect(20, screenY, canvas.width - 40, 50);

  const k = (2 * Math.PI) / wavelength;
  ctx.strokeStyle = isObserverActive ? "#f72585" : "#00f5d4";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let x = 20; x <= canvas.width - 20; x += 3) {
    let val = 0;
    if (!isObserverActive) {
      const d1 = Math.hypot(x - s1x, screenY - barrierY);
      const d2 = Math.hypot(x - s2x, screenY - barrierY);
      const delta = k * (d2 - d1);
      val = Math.pow(Math.cos(delta * 0.5), 2);
    } else {
      const g1 = Math.exp(-Math.pow((x - s1x) / 35, 2));
      const g2 = Math.exp(-Math.pow((x - s2x) / 35, 2));
      val = 0.5 * (g1 + g2);
    }
    const y = (screenY + 45) - val * 40;
    if (x === 20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  requestAnimationFrame(draw);
}

// UI Controls
const btnToggle = document.getElementById("btnToggle");
btnToggle.addEventListener("click", () => {
  isObserverActive = !isObserverActive;
  btnToggle.textContent = isObserverActive ? "Turn Detector OFF (Restore Superposition)" : "Turn Detector ON (Observe Slits)";
  btnToggle.style.background = isObserverActive ? "#f72585" : "#00f5d4";
  btnToggle.style.color = isObserverActive ? "#fff" : "#020617";
});

document.getElementById("sliderDist").addEventListener("input", (e) => {
  slitDist = parseFloat(e.target.value);
  document.getElementById("valDist").textContent = slitDist + " μm";
});

document.getElementById("sliderWave").addEventListener("input", (e) => {
  wavelength = parseFloat(e.target.value);
  document.getElementById("valWave").textContent = wavelength.toFixed(0) + " nm";
});

window.addEventListener("resize", resize);
resize();
requestAnimationFrame(draw);
