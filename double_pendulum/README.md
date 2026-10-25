# Chaos Theory: The Double Pendulum & Lagrangian Mechanics

[![Live Interactive Web Lab](https://img.shields.io/badge/Live%20Simulation-Procanimation%20Studio-00f5d4)](https://procanimation.github.io/experiments/chaos-theory-double-pendulum.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-f72585.svg)](LICENSE)

An open-source, high-precision Runge-Kutta 4th-order (RK4) implementation of the **double compound pendulum** demonstrating sensitive dependence on initial conditions (the "Butterfly Effect") and Lyapunov divergence.

---

## 📐 Mathematical Formulation

### 1. The Lagrangian
In Cartesian coordinates, Newton's second law ($\mathbf{F} = m\mathbf{a}$) yields intractable constraint forces along the rigid pendulum rods. Joseph-Louis Lagrange solved this in 1788 by defining generalized angular coordinates $(\theta_1, \theta_2)$ and setting:

$$\mathcal{L} = T - V$$

Where kinetic energy $T$ and potential energy $V$ are:

$$T = \frac{1}{2}(m_1 + m_2)l_1^2 \dot{\theta}_1^2 + \frac{1}{2}m_2 l_2^2 \dot{\theta}_2^2 + m_2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2)$$

$$V = -(m_1 + m_2)g l_1 \cos\theta_1 - m_2 g l_2 \cos\theta_2$$

### 2. Equations of Motion
Applying the Euler-Lagrange equation:

$$\frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{\theta}_i}\right) - \frac{\partial \mathcal{L}}{\partial \theta_i} = 0$$

Yields the coupled angular accelerations:

$$\ddot{\theta}_1 = \frac{-g(2m_1+m_2)\sin\theta_1 - m_2 g \sin(\theta_1 - 2\theta_2) - 2\sin(\theta_1-\theta_2)m_2(\dot{\theta}_2^2 l_2 + \dot{\theta}_1^2 l_1 \cos(\theta_1-\theta_2))}{l_1 (2m_1 + m_2 - m_2 \cos(2\theta_1 - 2\theta_2))}$$

$$\ddot{\theta}_2 = \frac{2\sin(\theta_1-\theta_2)(\dot{\theta}_1^2 l_1 (m_1+m_2) + g(m_1+m_2)\cos\theta_1 + \dot{\theta}_2^2 l_2 m_2 \cos(\theta_1-\theta_2))}{l_2 (2m_1 + m_2 - m_2 \cos(2\theta_1 - 2\theta_2))}$$

### 3. Lyapunov Divergence
For an infinitesimal perturbation $\Delta\theta_0 = 0.001^\circ$, trajectory separation in 4D phase space $(\theta_1, \theta_2, \omega_1, \omega_2)$ grows exponentially:

$$\Delta\theta(t) \sim \Delta\theta_0 \cdot e^{\lambda t}$$

Where $\lambda > 0$ is the maximal Lyapunov exponent, proving that long-term determinism is practically non-computable.

---

## 🚀 Running Locally

```bash
git clone https://github.com/procanimation/Science_stuff.git
cd Science_stuff/double_pendulum
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

---

## 📚 Academic Citations
- Lagrange, J.-L. (1788). *Mécanique Analytique*.
- Strogatz, S. H. (2014). *Nonlinear Dynamics and Chaos: With Applications to Physics, Biology, Chemistry, and Engineering*. Westview Press.

Produced by **[Procanimation Studio](https://procanimation.github.io)**.
