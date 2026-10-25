// =============================================================================
// PROCANIMATION STUDIO: BLACK HOLE GRAVITATIONAL LENSING & GENERAL RELATIVITY
// Standalone WebGL Raymarcher: Geodesic Integration in Schwarzschild Metric
// =============================================================================

const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, alpha: false });

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const vsSource = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const fsSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_rs;
  uniform float u_pitch;
  uniform float u_yaw;

  #define PI 3.14159265359
  #define MAX_STEPS 90
  #define STEP_SIZE 0.105

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.7, 314.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.15; a *= 0.5; }
    return v;
  }

  vec3 getBackground(vec3 dir) {
    vec2 uv = vec2(atan(dir.z, dir.x), asin(dir.y));
    float stars = pow(hash(floor(uv * 140.0)), 30.0) * 1.5;
    float gal = smoothstep(0.4, 0.0, abs(dir.y + 0.1 * sin(dir.x * 2.5)));
    vec3 neb = mix(vec3(0.02, 0.03, 0.09), vec3(0.12, 0.04, 0.22), fbm(uv * 4.0));
    return neb * (0.35 + 0.65 * gal) + vec3(stars);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    float rs = u_rs;
    float isco = 3.0 * rs;
    float diskOut = 7.5 * rs;

    float cy = cos(u_yaw); float sy = sin(u_yaw);
    float cp = cos(u_pitch); float sp = sin(u_pitch);

    vec3 ro = vec3(5.2 * sy * cp, 5.2 * sp, 5.2 * cy * cp);
    vec3 ta = vec3(0.0, 0.0, 0.0);
    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = cross(uu, ww);
    vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.8 * ww);

    vec3 pos = ro; vec3 vel = rd;
    vec3 diskColorAccum = vec3(0.0);
    float diskAccum = 0.0;
    bool captured = false;

    for (int i = 0; i < MAX_STEPS; i++) {
      float r = length(pos);
      if (r <= rs) { captured = true; break; }
      if (r > 15.0) break;

      vec3 oldPos = pos;
      float dt = STEP_SIZE * min(1.0, r * 0.7);
      pos += vel * dt;

      vec3 hVec = cross(pos, vel);
      float h2 = dot(hVec, hVec);
      vec3 accel = -1.5 * rs * h2 * pos / pow(r, 5.0);
      vel = normalize(vel + accel * dt);

      if (oldPos.y * pos.y < 0.0) {
        float tIntersect = -oldPos.y / (pos.y - oldPos.y);
        vec3 hitPos = mix(oldPos, pos, tIntersect);
        float hitR = length(hitPos.xz);
        if (hitR >= isco && hitR <= diskOut) {
          float phi = atan(hitPos.z, hitPos.x);
          float keplerSpeed = sqrt(rs / (2.0 * hitR));
          float rotAngle = phi - u_time * (2.2 / sqrt(hitR));
          float density = fbm(vec2(hitR * 4.0, rotAngle * 2.5));
          float falloff = smoothstep(isco, isco + 0.4 * rs, hitR) * (1.0 - smoothstep(diskOut - 1.2 * rs, diskOut, hitR));
          density = pow(density, 1.3) * falloff * 2.2;

          vec3 vDisk = normalize(vec3(-hitPos.z, 0.0, hitPos.x)) * keplerSpeed;
          float cosTheta = dot(normalize(vel), vDisk);
          float gamma = 1.0 / sqrt(max(0.01, 1.0 - keplerSpeed * keplerSpeed));
          float doppler = 1.0 / (gamma * (1.0 - cosTheta));
          float beaming = pow(doppler, 3.2);

          vec3 hue = (cosTheta > 0.08) ?
            mix(vec3(1.0, 0.65, 0.2), vec3(0.35, 0.92, 1.0), smoothstep(0.08, 0.55, cosTheta)) :
            mix(vec3(1.0, 0.5, 0.1), vec3(0.92, 0.16, 0.05), smoothstep(-0.08, -0.55, cosTheta));
          hue *= sqrt(max(0.01, 1.0 - rs / hitR));

          diskColorAccum += (1.0 - diskAccum) * hue * beaming * density;
          diskAccum += (1.0 - diskAccum) * clamp(density * 0.75, 0.0, 1.0);
          if (diskAccum >= 0.95) break;
        }
      }
    }

    vec3 col = captured ? diskColorAccum : (diskColorAccum + (1.0 - diskAccum) * getBackground(vel));
    float rayMin = length(cross(ro, rd));
    col += vec3(0.95, 0.65, 0.28) * (0.035 / (abs(rayMin - 1.5 * rs * 1.1) + 0.04)) * 0.35;

    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.85));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function createShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  return s;
}
const prog = gl.createProgram();
gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, vsSource));
gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
gl.linkProgram(prog); gl.useProgram(prog);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
const aPos = gl.getAttribLocation(prog, "a_pos");
gl.enableVertexAttribArray(aPos);
gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

const uRes = gl.getUniformLocation(prog, "u_resolution");
const uTime = gl.getUniformLocation(prog, "u_time");
const uRs = gl.getUniformLocation(prog, "u_rs");
const uPitch = gl.getUniformLocation(prog, "u_pitch");
const uYaw = gl.getUniformLocation(prog, "u_yaw");

let pitch = 0.38;
let yaw = 0.0;
let mass = 0.72;

let isDragging = false;
let lastX = 0, lastY = 0;

canvas.addEventListener("mousedown", (e) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
window.addEventListener("mouseup", () => { isDragging = false; });
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  let dx = e.clientX - lastX;
  let dy = e.clientY - lastY;
  yaw += dx * 0.008;
  pitch = Math.max(-1.4, Math.min(1.4, pitch - dy * 0.008));
  lastX = e.clientX; lastY = e.clientY;
});

let startTime = performance.now();
function renderLoop() {
  let t = (performance.now() - startTime) * 0.001;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform2f(uRes, canvas.width, canvas.height);
  gl.uniform1f(uTime, t);
  gl.uniform1f(uRs, mass);
  gl.uniform1f(uPitch, pitch);
  gl.uniform1f(uYaw, yaw);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
