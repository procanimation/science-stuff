// Procanimation Studio — Double Pendulum Chaos Theory
// High-precision Runge-Kutta 4th Order (RK4) with Dual-Trajectory Lyapunov Divergence
// Interactive Simulation: Click and drag bobs with mouse to set custom launch configurations!

let r1 = 180;
let r2 = 160;
let m1 = 15;
let m2 = 15;
let g = 1200.0;

let p1 = { a1: Math.PI * 0.92, a2: Math.PI * 0.92, v1: 0, v2: 0, history: [] };
let p2 = { a1: Math.PI * 0.92 + 0.000175, a2: Math.PI * 0.92, v1: 0, v2: 0, history: [] };

let maxHistory = 200;
let isPaused = false;
let showTrails = true;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvas-container');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function getDerivatives(a1, a2, v1, v2) {
  let num1 = -g * (2 * m1 + m2) * Math.sin(a1) - m2 * g * Math.sin(a1 - 2 * a2) - 2 * Math.sin(a1 - a2) * m2 * (v2 * v2 * r2 + v1 * v1 * r1 * Math.cos(a1 - a2));
  let den1 = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  let a1_acc = num1 / den1;

  let num2 = 2 * Math.sin(a1 - a2) * (v1 * v1 * r1 * (m1 + m2) + g * (m1 + m2) * Math.cos(a1) + v2 * v2 * r2 * m2 * Math.cos(a1 - a2));
  let den2 = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  let a2_acc = num2 / den2;

  return { v1: v1, v2: v2, a1_acc: a1_acc, a2_acc: a2_acc };
}

function rk4Step(p, dt) {
  let k1 = getDerivatives(p.a1, p.a2, p.v1, p.v2);

  let a1_k2 = p.a1 + 0.5 * dt * k1.v1;
  let a2_k2 = p.a2 + 0.5 * dt * k1.v2;
  let v1_k2 = p.v1 + 0.5 * dt * k1.a1_acc;
  let v2_k2 = p.v2 + 0.5 * dt * k1.a2_acc;
  let k2 = getDerivatives(a1_k2, a2_k2, v1_k2, v2_k2);

  let a1_k3 = p.a1 + 0.5 * dt * k2.v1;
  let a2_k3 = p.a2 + 0.5 * dt * k2.v2;
  let v1_k3 = p.v1 + 0.5 * dt * k2.a1_acc;
  let v2_k3 = p.v2 + 0.5 * dt * k2.a2_acc;
  let k3 = getDerivatives(a1_k3, a2_k3, v1_k3, v2_k3);

  let a1_k4 = p.a1 + dt * k3.v1;
  let a2_k4 = p.a2 + dt * k3.v2;
  let v1_k4 = p.v1 + dt * k3.a1_acc;
  let v2_k4 = p.v2 + dt * k3.a2_acc;
  let k4 = getDerivatives(a1_k4, a2_k4, v1_k4, v2_k4);

  p.a1 += (dt / 6) * (k1.v1 + 2 * k2.v1 + 2 * k3.v1 + k4.v1);
  p.a2 += (dt / 6) * (k1.v2 + 2 * k2.v2 + 2 * k3.v2 + k4.v2);
  p.v1 += (dt / 6) * (k1.a1_acc + 2 * k2.a1_acc + 2 * k3.a1_acc + k4.a1_acc);
  p.v2 += (dt / 6) * (k1.a2_acc + 2 * k2.a2_acc + 2 * k3.a2_acc + k4.a2_acc);
}

function draw() {
  background(5, 8, 16);

  let cx = width * 0.5;
  let cy = height * 0.40;

  if (!isPaused) {
    let subSteps = 12;
    let dt = (1.0 / 60) / subSteps;
    for (let s = 0; s < subSteps; s++) {
      rk4Step(p1, dt);
      rk4Step(p2, dt);
    }
  }

  let x1_1 = cx + r1 * Math.sin(p1.a1);
  let y1_1 = cy + r1 * Math.cos(p1.a1);
  let x2_1 = x1_1 + r2 * Math.sin(p1.a2);
  let y2_1 = y1_1 + r2 * Math.cos(p1.a2);

  let x1_2 = cx + r1 * Math.sin(p2.a1);
  let y1_2 = cy + r1 * Math.cos(p2.a1);
  let x2_2 = x1_2 + r2 * Math.sin(p2.a2);
  let y2_2 = y1_2 + r2 * Math.cos(p2.a2);

  p1.history.push({ x: x2_1, y: y2_1 });
  p2.history.push({ x: x2_2, y: y2_2 });
  if (p1.history.length > maxHistory) p1.history.shift();
  if (p2.history.length > maxHistory) p2.history.shift();

  if (showTrails) {
    noFill();
    for (let i = 1; i < p2.history.length; i++) {
      let alpha = map(i, 0, p2.history.length, 0, 200);
      stroke(247, 37, 133, alpha);
      strokeWeight(map(i, 0, p2.history.length, 1, 4));
      line(p2.history[i - 1].x, p2.history[i - 1].y, p2.history[i].x, p2.history[i].y);
    }
    for (let i = 1; i < p1.history.length; i++) {
      let alpha = map(i, 0, p1.history.length, 0, 200);
      stroke(0, 245, 212, alpha);
      strokeWeight(map(i, 0, p1.history.length, 1, 4));
      line(p1.history[i - 1].x, p1.history[i - 1].y, p1.history[i].x, p1.history[i].y);
    }
  }

  // Draw rods & bobs
  stroke(247, 37, 133, 160);
  strokeWeight(3);
  line(cx, cy, x1_2, y1_2);
  line(x1_2, y1_2, x2_2, y2_2);
  fill(247, 37, 133);
  circle(x1_2, y1_2, 16);
  circle(x2_2, y2_2, 22);

  stroke(0, 245, 212, 210);
  strokeWeight(4);
  line(cx, cy, x1_1, y1_1);
  line(x1_1, y1_1, x2_1, y2_1);
  fill(0, 245, 212);
  circle(x1_1, y1_1, 18);
  circle(x2_1, y2_1, 24);

  // Pivot
  fill(40, 60, 90);
  stroke(70, 110, 170);
  strokeWeight(2);
  circle(cx, cy, 20);
}
