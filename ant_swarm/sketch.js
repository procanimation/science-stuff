// =============================================================================
// ANT SWARM INTELLIGENCE & STIGMERGY — PROCANIMATION WORLD
// Ant Colony Optimization (ACO) & Pheromone Trail Formation
// =============================================================================

let ants = [];
const NUM_ANTS = 450;
let nest, food;
let mazeWalls = [];
const GRID_SCALE = 8;
let gridCols, gridRows;
let pheromones;

let evapRate = 0.985;
let showHeatmap = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gridCols = Math.floor(width / GRID_SCALE);
  gridRows = Math.floor(height / GRID_SCALE);
  pheromones = new Float32Array(gridCols * gridRows);

  nest = { x: width * 0.5, y: 120, r: 35 };
  food = { x: width * 0.5, y: height - 120, r: 40 };

  initMaze();

  ants = [];
  for (let i = 0; i < NUM_ANTS; i++) {
    let a = random(TWO_PI);
    ants.push({
      x: nest.x + cos(a) * random(5, 25),
      y: nest.y + sin(a) * random(5, 25),
      angle: a,
      speed: random(3.5, 4.8),
      hasFood: false
    });
  }
}

function initMaze() {
  let cy = height * 0.5;
  let cx = width * 0.5;
  mazeWalls = [
    // Top barrier with offset openings
    { x1: 50, y1: cy - 180, x2: cx - 80, y2: cy - 180, w: 12 },
    { x1: cx + 80, y1: cy - 180, x2: width - 50, y2: cy - 180, w: 12 },

    // Central diamond obstacle creating two alternative paths (Short vs Long)
    { x1: cx - 180, y1: cy - 60, x2: cx + 180, y2: cy - 60, w: 14 },
    { x1: cx - 180, y1: cy - 60, x2: cx - 260, y2: cy + 100, w: 14 },
    { x1: cx + 180, y1: cy - 60, x2: cx + 260, y2: cy + 100, w: 14 },

    // Central constriction
    { x1: 80, y1: cy + 100, x2: cx - 60, y2: cy + 100, w: 12 },
    { x1: cx + 60, y1: cy + 100, x2: width - 80, y2: cy + 100, w: 12 },

    // Lower funnel
    { x1: cx - 140, y1: cy + 220, x2: cx + 140, y2: cy + 220, w: 12 }
  ];
}

function distToSegment(px, py, x1, y1, x2, y2) {
  let l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (l2 === 0) return dist(px, py, x1, y1);
  let t = max(0, min(1, ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2));
  return dist(px, py, x1 + t * (x2 - x1), y1 + t * (y2 - y1));
}

function getPhero(x, y) {
  let gx = Math.floor(x / GRID_SCALE);
  let gy = Math.floor(y / GRID_SCALE);
  if (gx < 0 || gx >= gridCols || gy < 0 || gy >= gridRows) return 0;
  return pheromones[gy * gridCols + gx];
}

function depositPhero(x, y, amt) {
  let gx = Math.floor(x / GRID_SCALE);
  let gy = Math.floor(y / GRID_SCALE);
  if (gx >= 0 && gx < gridCols && gy >= 0 && gy < gridRows) {
    let idx = gy * gridCols + gx;
    pheromones[idx] = min(1.0, pheromones[idx] + amt);
  }
}

function draw() {
  background(6, 9, 18);

  // Evaporation
  for (let i = 0; i < pheromones.length; i++) {
    pheromones[i] *= evapRate;
  }

  // Draw Pheromone Field
  if (showHeatmap) {
    noStroke();
    for (let gy = 0; gy < gridRows; gy += 2) {
      for (let gx = 0; gx < gridCols; gx += 2) {
        let val = pheromones[gy * gridCols + gx];
        if (val > 0.02) {
          fill(255, 190, 40, val * 220);
          rect(gx * GRID_SCALE, gy * GRID_SCALE, GRID_SCALE * 2, GRID_SCALE * 2);
        }
      }
    }
  }

  // Draw Walls
  for (let w of mazeWalls) {
    stroke(77, 226, 208, 40);
    strokeWeight(w.w + 10);
    line(w.x1, w.y1, w.x2, w.y2);
    stroke(77, 226, 208);
    strokeWeight(w.w);
    line(w.x1, w.y1, w.x2, w.y2);
  }

  // Draw Nest & Food
  fill(0, 245, 212, 50);
  noStroke();
  circle(nest.x, nest.y, nest.r * 2.5);
  fill(0, 245, 212);
  circle(nest.x, nest.y, nest.r * 2);

  fill(255, 190, 11, 50);
  circle(food.x, food.y, food.r * 2.5);
  fill(255, 190, 11);
  circle(food.x, food.y, food.r * 2);

  // Update & Draw Ants
  for (let ant of ants) {
    if (!ant.hasFood) {
      let dF = dist(ant.x, ant.y, food.x, food.y);
      if (dF < food.r) {
        ant.hasFood = true;
        ant.angle += PI;
      } else if (dF < 200) {
        let targetA = atan2(food.y - ant.y, food.x - ant.x);
        ant.angle = lerp(ant.angle, targetA, 0.2);
      } else {
        // Sensor check
        let sDist = 28;
        let pC = getPhero(ant.x + cos(ant.angle) * sDist, ant.y + sin(ant.angle) * sDist);
        let pL = getPhero(ant.x + cos(ant.angle + 0.5) * sDist, ant.y + sin(ant.angle + 0.5) * sDist);
        let pR = getPhero(ant.x + cos(ant.angle - 0.5) * sDist, ant.y + sin(ant.angle - 0.5) * sDist);

        if (pC > 0.02 || pL > 0.02 || pR > 0.02) {
          if (pL > pR) ant.angle += 0.22;
          else if (pR > pL) ant.angle -= 0.22;
        } else {
          ant.angle += random(-0.35, 0.35) + (ant.y < food.y ? 0.04 : -0.04);
        }
      }
    } else {
      depositPhero(ant.x, ant.y, 0.4);
      let dN = dist(ant.x, ant.y, nest.x, nest.y);
      if (dN < nest.r) {
        ant.hasFood = false;
        ant.angle += PI;
      } else {
        let targetA = atan2(nest.y - ant.y, nest.x - ant.x);
        ant.angle = lerp(ant.angle, targetA, 0.15) + random(-0.1, 0.1);
      }
    }

    let nx = ant.x + cos(ant.angle) * ant.speed;
    let ny = ant.y + sin(ant.angle) * ant.speed;
    let hit = false;
    for (let w of mazeWalls) {
      if (distToSegment(nx, ny, w.x1, w.y1, w.x2, w.y2) < w.w + 4) {
        hit = true;
        ant.angle += random(1.2, 2.2);
        break;
      }
    }
    if (!hit) {
      ant.x = constrain(nx, 20, width - 20);
      ant.y = constrain(ny, 40, height - 40);
    }

    push();
    translate(ant.x, ant.y);
    rotate(ant.angle);
    noStroke();
    if (ant.hasFood) {
      fill(255, 214, 10);
      circle(5, 0, 6);
      fill(255, 180, 0, 200);
      ellipse(0, 0, 8, 4);
    } else {
      fill(0, 245, 212, 180);
      ellipse(0, 0, 7, 3.5);
    }
    pop();
  }
}

function mouseDragged() {
  // Move food to mouse position
  if (dist(mouseX, mouseY, food.x, food.y) < 80) {
    food.x = mouseX;
    food.y = mouseY;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gridCols = Math.floor(width / GRID_SCALE);
  gridRows = Math.floor(height / GRID_SCALE);
  pheromones = new Float32Array(gridCols * gridRows);
  initMaze();
}
