# The Lorenz Strange Attractor — 3D Chaos Simulation

[![Procanimation Lab](https://img.shields.io/badge/Procanimation-Interactive_Lab-00f5d4)](https://procanimation.github.io/experiments/lorenz-attractor.html)
[![YouTube Short](https://img.shields.io/badge/YouTube-Watch_Short-FF0000)](https://www.youtube.com/shorts/T9CM8CtTHuY)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black)](https://threejs.org)

In 1963, meteorologist and mathematician **Edward Lorenz** simplified atmospheric convection equations to a 3D deterministic non-linear system. Despite being entirely deterministic with zero randomness, the system exhibits **sensitive dependence on initial conditions**—the foundational principle of modern chaos theory commonly known as the **Butterfly Effect**.

---

## 📐 Mathematical Formulation

The Lorenz equations are given by the three coupled non-linear differential equations:

$$\frac{dx}{dt} = \sigma (y - x)$$

$$\frac{dy}{dt} = x (\rho - z) - y$$

$$\frac{dz}{dt} = x y - \beta z$$

### Standard Canonical Constants:
- $\sigma = 10.0$ (Prandtl number: ratio of fluid viscosity to thermal conductivity)
- $\rho = 28.0$ (Rayleigh number: temperature difference driving convection)
- $\beta = \frac{8}{3} \approx 2.667$ (Geometric aspect ratio of convection cells)

---

## 🦋 The Dual Diverging Trajectories

This simulation integrates two trajectories simultaneously starting with a difference of just $\Delta x = 0.0001$:
* **Trajectory A (Cyan)**: Initial condition $(x_0, y_0, z_0) = (0.1000, 0.0, 0.0)$
* **Trajectory B (Magenta)**: Initial condition $(x_0, y_0, z_0) = (0.1001, 0.0, 0.0)$

Due to the positive maximal Lyapunov exponent ($\lambda_{\max} \approx 0.9056$), the two orbits stay aligned for several cycles before rapidly diverging into completely different butterfly wings.

---

## 🚀 How to Run Locally

1. Open `index.html` in any modern web browser:
   ```bash
   open index.html
   ```
2. Move your mouse to orbit the camera interactively in 3D space.

---

## 🔗 Links & Resources

* **Interactive WebGL Lab**: [https://procanimation.github.io/experiments/lorenz-attractor.html](https://procanimation.github.io/experiments/lorenz-attractor.html)
* **YouTube Short**: [https://www.youtube.com/shorts/T9CM8CtTHuY](https://www.youtube.com/shorts/T9CM8CtTHuY)
* **Procanimation Portfolio**: [https://procanimation.github.io](https://procanimation.github.io)
