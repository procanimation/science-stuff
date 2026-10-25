/**
 * XOR Bitwise Fractals - Interactive JavaScript Engine
 * Procanimation Studio • Open Source Creative Code
 */

const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
const sliderMod = document.getElementById('sliderMod');
const valMod = document.getElementById('valMod');
const sliderZoom = document.getElementById('sliderZoom');
const valZoom = document.getElementById('valZoom');
const btnPlay = document.getElementById('btnPlay');

let isPlaying = true;
btnPlay.addEventListener('click', () => {
  isPlaying = !isPlaying;
  btnPlay.textContent = isPlaying ? "Pause Animation" : "Resume Animation";
  btnPlay.style.background = isPlaying ? "#00f5d4" : "#ffbe0b";
});

sliderMod.addEventListener('input', (e) => valMod.textContent = e.target.value);
sliderZoom.addEventListener('input', (e) => valZoom.textContent = `${parseFloat(e.target.value).toFixed(1)}x`);

const off = document.createElement('canvas');
off.width = 400;
off.height = 300;
const offCtx = off.getContext('2d');

let t = 0;
function animate() {
  if (isPlaying) t += 0.5;

  const w = off.width;
  const h = off.height;
  const mod = parseInt(sliderMod.value, 10);
  const zoom = parseFloat(sliderZoom.value);
  const tInt = Math.floor(t);

  const img = offCtx.createImageData(w, h);
  const d32 = new Uint32Array(img.data.buffer);
  const cx = w / 2;
  const cy = h / 2;
  const inv = 1.0 / zoom;

  let idx = 0;
  for (let py = 0; py < h; py++) {
    const y = Math.floor(Math.abs((py - cy) * inv + 256));
    for (let px = 0; px < w; px++) {
      const x = Math.floor(Math.abs((px - cx) * inv + 256));
      const val = (x ^ y ^ tInt);
      const rem = val % mod;

      if (rem === 0) {
        const b = (val & 1) + ((val >> 1) & 1);
        d32[idx] = b === 0 ? 0xFF0BBEFF : (b === 1 ? 0xFFD4F500 : 0xFF8525F7);
      } else if (rem === 1 && mod > 2) {
        d32[idx] = 0xFFB70972;
      } else {
        d32[idx] = 0xFF170602;
      }
      idx++;
    }
  }

  offCtx.putImageData(img, 0, 0);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(off, 0, 0, canvas.width, canvas.height);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
