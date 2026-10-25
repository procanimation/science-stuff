/**
 * Turing Morphogenesis - Gray-Scott Reaction-Diffusion Simulation
 * Procanimation Science Laboratory (https://procanimation.github.io)
 * 
 * Mathematical Formulation:
 *   ∂u/∂t = D_u ∇²u - uv² + F(1 - u)
 *   ∂v/∂t = D_v ∇²v + uv² - (F + k)v
 */

let gridA, gridB, nextA, nextB;
const W = 160;
const H = 90;

const dA = 1.0;
const dB = 0.5;

// Gray-Scott parameters (Default: Leopard Spots)
let feed = 0.055;
let k = 0.062;

const PRESETS = {
  spots: { feed: 0.038, k: 0.061, name: "Leopard Spots" },
  stripes: { feed: 0.022, k: 0.051, name: "Zebra Stripes" },
  coral: { feed: 0.055, k: 0.062, name: "Brain Coral" },
  mitosis: { feed: 0.0367, k: 0.0649, name: "Dividing Cells" }
};

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  pixelDensity(1);

  initSimulation();
}

function initSimulation() {
  gridA = [];
  gridB = [];
  nextA = [];
  nextB = [];

  for (let x = 0; x < W; x++) {
    gridA[x] = new Float32Array(H);
    gridB[x] = new Float32Array(H);
    nextA[x] = new Float32Array(H);
    nextB[x] = new Float32Array(H);
    for (let y = 0; y < H; y++) {
      gridA[x][y] = 1.0;
      gridB[x][y] = 0.0;
      nextA[x][y] = 1.0;
      nextB[x][y] = 0.0;
    }
  }

  // Seed multiple active chemical clusters
  seedClusters();
}

function seedClusters() {
  const cx = Math.floor(W / 2);
  const cy = Math.floor(H / 2);

  const seeds = [
    [cx, cy],
    [cx - 30, cy - 15],
    [cx + 30, cy + 15],
    [cx - 20, cy + 20],
    [cx + 25, cy - 20]
  ];

  seeds.forEach(([sx, sy]) => {
    for (let i = -6; i <= 6; i++) {
      for (let j = -6; j <= 6; j++) {
        const nx = sx + i;
        const ny = sy + j;
        if (nx >= 0 && nx < W && ny >= 0 && ny < H && (i * i + j * j <= 36)) {
          gridB[nx][ny] = 1.0;
        }
      }
    }
  });
}

function draw() {
  background(5, 7, 15);

  // Reaction diffusion numerical solver (4 sub-steps per frame for stability)
  for (let step = 0; step < 6; step++) {
    computeStep();
  }

  // Interactive mouse seeding
  if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    const mx = Math.floor(map(mouseX, 0, width, 0, W));
    const my = Math.floor(map(mouseY, 0, height, 0, H));
    for (let i = -4; i <= 4; i++) {
      for (let j = -4; j <= 4; j++) {
        const px = mx + i;
        const py = my + j;
        if (px >= 0 && px < W && py >= 0 && py < H && (i * i + j * j <= 16)) {
          gridB[px][py] = 1.0;
        }
      }
    }
  }

  // Render to display
  renderPattern();
}

function computeStep() {
  for (let x = 1; x < W - 1; x++) {
    for (let y = 1; y < H - 1; y++) {
      const a = gridA[x][y];
      const b = gridB[x][y];

      // Discrete 5-point Laplacian stencil
      const lapA = (gridA[x - 1][y] + gridA[x + 1][y] + gridA[x][y - 1] + gridA[x][y + 1] - 4.0 * a) * 0.2;
      const lapB = (gridB[x - 1][y] + gridB[x + 1][y] + gridB[x][y - 1] + gridB[x][y + 1] - 4.0 * b) * 0.2;

      const reaction = a * b * b;
      nextA[x][y] = constrain(a + (dA * lapA - reaction + feed * (1.0 - a)), 0.0, 1.0);
      nextB[x][y] = constrain(b + (dB * lapB + reaction - (k + feed) * b), 0.0, 1.0);
    }
  }

  // Swap buffers
  const tempA = gridA;
  gridA = nextA;
  nextA = tempA;

  const tempB = gridB;
  gridB = nextB;
  nextB = tempB;
}

function renderPattern() {
  const cellW = width / W;
  const cellH = height / H;

  noStroke();
  for (let x = 0; x < W; x += 2) {
    for (let y = 0; y < H; y += 2) {
      const bVal = gridB[x][y];
      if (bVal > 0.04) {
        // Neon bioluminescent gradient
        const r = lerp(8, 0, bVal);
        const g = lerp(18, 245, bVal);
        const b = lerp(32, 212, bVal);
        fill(r, g, b, 230);
        rect(x * cellW, y * cellH, cellW * 2.2, cellH * 2.2);
      }
    }
  }
}

function setMorphPreset(presetKey) {
  const p = PRESETS[presetKey];
  if (p) {
    feed = p.feed;
    k = p.k;
    initSimulation();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
