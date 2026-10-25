# Von Kármán Vortex Streets & Fluid Turbulence

[![Live Simulation](https://img.shields.io/badge/Live_Lab-procanimation.github.io-blue?style=for-the-badge)](https://procanimation.github.io/experiments/von-karman-vortex.html)
[![YouTube Short](https://img.shields.io/badge/YouTube_Short-Procanimation_Studio-red?style=for-the-badge&logo=youtube)](https://youtube.com/@procanimation)

> A procedural fluid mechanics simulation demonstrating boundary layer separation, alternating counter-rotating vortex trails, Strouhal shedding frequencies, and aeroelastic resonance flutter.

---

## 🌊 Mathematical Physics

When fluid flows past a blunt obstacle (such as a cylinder of diameter $D$ at free-stream velocity $U$), the flow regime is governed by the dimensionless **Reynolds Number**:

$$Re = \frac{\rho \cdot U \cdot D}{\mu}$$

* **$Re < 40$**: Laminar steady flow with a symmetric closed recirculation bubble behind the obstacle.
* **$47 < Re < 200$**: The laminar wake becomes unstable; the boundary layers separate alternately from the top and bottom surfaces, shedding counter-rotating vortices that organize into an alternating staggered street.
* **$Re > 300$**: Transition to turbulent vortex shedding and three-dimensional wake instabilities.

### The Strouhal Shedding Law

The periodic vortex shedding frequency $f$ follows the dimensionless **Strouhal Number**:

$$St = \frac{f \cdot D}{U} \approx 0.21$$

Every time a vortex detaches, it generates an asymmetric low-pressure pocket on that side, creating a fluctuating transverse **Lift Force** on the structure:

$$L(t) = \frac{1}{2} \rho U^2 D \cdot C_L \sin(2\pi f t)$$

If the shedding frequency $f$ matches the mechanical resonant frequency of the structure, catastrophic aeroelastic flutter occurs—the phenomenon that destroyed the **Tacoma Narrows Bridge** in 1940.

---

## 🚀 Running Locally

Open `index.html` in any modern web browser or serve via:

```bash
npx serve .
```

---

## 📚 References
* Von Kármán, Th. (1911). *Über den Mechanismus des Flüssigkeits- und Luftwiderstandes*. Physikalische Zeitschrift.
* Strouhal, V. (1878). *Über eine besondere Art der Tonerregung*. Annalen der Physik und Chemie.
* Procanimation Studio: [procanimation.github.io](https://procanimation.github.io)
