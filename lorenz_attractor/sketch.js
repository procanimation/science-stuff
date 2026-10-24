/**
 * The Lorenz Strange Attractor — 3D Deterministic Chaos Simulation
 * Open Source Research & Visualization by Procanimation Studio
 * Website: https://procanimation.github.io
 * YouTube: https://youtube.com/@procanimation
 *
 * System Parameters:
 *   sigma = 10.0 (Prandtl Number)
 *   rho   = 28.0 (Rayleigh Number)
 *   beta  = 8.0 / 3.0 (Geometric Factor)
 *
 * Dual Trajectories:
 *   Trajectory A: Cyan    (x0 = 0.1000, y0 = 0.0, z0 = 0.0)
 *   Trajectory B: Magenta (x0 = 0.1001, y0 = 0.0, z0 = 0.0)
 *   Delta Perturbation = 0.0001 (Sensitive dependence on initial conditions)
 */

(function () {
  const container = document.getElementById('canvas-container') || document.body;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x04060c, 0.0018);

  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.set(0, 8, 85);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x04060c, 1.0);
  container.appendChild(renderer.domElement);

  // Attractor Constants
  const sigma = 10.0;
  const rho = 28.0;
  const beta = 8.0 / 3.0;
  const MAX_POINTS = 3200;

  function createTrajectory(initX, hexColor) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(MAX_POINTS * 3);
    const colors = new Float32Array(MAX_POINTS * 3);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Glowing Lead Head
    const headGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const headMat = new THREE.MeshBasicMaterial({ color: hexColor });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    scene.add(headMesh);

    return {
      x: initX, y: 0.0, z: 0.0,
      points: [],
      line: line,
      head: headMesh,
      color: new THREE.Color(hexColor)
    };
  }

  const trajA = createTrajectory(0.1000, 0x00f5d4); // Cyan
  const trajB = createTrajectory(0.1001, 0xf72585); // Magenta (0.0001 offset)

  function integrate(t, dt) {
    const dx = sigma * (t.y - t.x) * dt;
    const dy = (t.x * (rho - t.z) - t.y) * dt;
    const dz = (t.x * t.y - beta * t.z) * dt;

    t.x += dx;
    t.y += dy;
    t.z += dz;

    t.points.push(new THREE.Vector3(t.x, t.y, t.z - 25)); // Center Z around 0
    if (t.points.length > MAX_POINTS) {
      t.points.shift();
    }

    // Update Buffer
    const pos = t.line.geometry.attributes.position.array;
    const cols = t.line.geometry.attributes.color.array;
    const len = t.points.length;

    for (let i = 0; i < len; i++) {
      const pt = t.points[i];
      pos[i * 3] = pt.x * 1.5;
      pos[i * 3 + 1] = pt.y * 1.5;
      pos[i * 3 + 2] = pt.z * 1.5;

      const alpha = (i / len);
      cols[i * 3] = t.color.r * alpha;
      cols[i * 3 + 1] = t.color.g * alpha;
      cols[i * 3 + 2] = t.color.b * alpha;
    }

    t.line.geometry.setDrawRange(0, len);
    t.line.geometry.attributes.position.needsUpdate = true;
    t.line.geometry.attributes.color.needsUpdate = true;

    // Update head
    t.head.position.set(t.x * 1.5, t.y * 1.5, (t.z - 25) * 1.5);
  }

  // Pre-seed points
  for (let k = 0; k < 180; k++) {
    integrate(trajA, 0.008);
    integrate(trajB, 0.008);
  }

  // Mouse Orbit Interaction
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - width / 2) * 0.001;
    mouseY = (e.clientY - height / 2) * 0.001;
  });

  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);

    // 6 numerical integration substeps per frame
    const dt = 0.010;
    for (let s = 0; s < 6; s++) {
      integrate(trajA, dt);
      integrate(trajB, dt);
    }

    // Smooth cinematic orbital camera rotation
    t += 0.012;
    const camAngle = t * 0.35 + mouseX;
    const camDist = 78 + Math.sin(t * 0.25) * 10;
    camera.position.x = Math.sin(camAngle) * camDist;
    camera.position.z = Math.cos(camAngle) * camDist;
    camera.position.y = 10 + Math.sin(t * 0.4) * 14 + (mouseY * 40);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
