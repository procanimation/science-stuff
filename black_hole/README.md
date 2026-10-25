# Black Hole Gravitational Lensing & Geodesic Raymarching

> Real-time numerical raymarching in curved four-dimensional spacetime using the Schwarzschild metric and relativistic Doppler beaming.

## Overview

When viewing a black hole surrounded by an accretion disk, light from the rear plane of the disk bends both **over the north pole** and **under the south pole**, creating a distinctive dual-halo structure first modeled accurately by Kip Thorne and Double Negative for the film *Interstellar* (2014).

## Mathematical Formulation

### 1. The Schwarzschild Metric
The spacetime geometry surrounding a static spherical mass $M$ in spherical coordinates $(t, r, \theta, \phi)$ is given by:

$$ds^2 = -\left(1 - \frac{r_s}{r}\right) c^2 dt^2 + \left(1 - \frac{r_s}{r}\right)^{-1} dr^2 + r^2 \left(d\theta^2 + \sin^2\theta \, d\phi^2\right)$$

Where the Schwarzschild radius is:
$$r_s = \frac{2GM}{c^2}$$

### 2. Null Geodesic Acceleration
Photons travel along null geodesics ($ds^2 = 0$). In numerical raymarching, light rays experience an effective radial inward acceleration:

$$\frac{d^2 \mathbf{x}}{dt^2} = -\frac{3 r_s |\mathbf{r} \times \mathbf{v}|^2}{2 r^5} \mathbf{r}$$

### 3. Key Physical Boundaries
* **Event Horizon ($R_s$)**: Escape velocity equals $c$. All light paths terminate.
* **Photon Sphere ($1.5 R_s$)**: Light orbits in unstable circular loops, producing the bright golden Einstein ring.
* **Innermost Stable Circular Orbit (ISCO, $3.0 R_s$)**: The inner boundary of cold accretion disks ($6M$).
* **Relativistic Doppler Beaming**: Plasma moving at relativistic Keplerian velocity $v \approx c\sqrt{\frac{R_s}{2r}}$ concentrates forward radiation by $\delta^4$, blueshifting the approaching side and dimming the receding side.

## Running Locally

Open `index.html` in any modern WebGL-compatible browser. Click and drag with the mouse to orbit the observer camera in 3D spacetime.

## License
MIT License • Procanimation Studio 2026
