# Chladni Patterns & 2D Standing Wave Cymatics

An open-source physical simulation of **Chladni Figures**, modeling 2D Helmholtz acoustic eigenmodes and sand particle displacement on resonant vibrating plates.

Developed by [Procanimation Studio](https://procanimation.github.io).

---

## The Physics of Chladni Figures

On a square vibrating plate with free edges, 2D standing acoustic waves satisfy:
$$\psi(x, y) = a \sin\left(\frac{n \pi x}{L}\right) \sin\left(\frac{m \pi y}{L}\right) - b \sin\left(\frac{m \pi x}{L}\right) \sin\left(\frac{n \pi y}{L}\right) = 0$$

Particles on the plate experience vertical accelerations directly proportional to the standing wave amplitude $|\psi(x, y)|$. Where $|\psi| > 0$ (antinodes), particles bounce violently; along curves where $\psi(x, y) = 0$ (nodal lines), the plate is completely motionless, causing particles to settle into geometric mandalas.

---

## Getting Started

Open `index.html` in your browser:

```bash
python3 -m http.server 8000
```

Navigate to `http://localhost:8000` to interactively adjust modal parameters $(m, n)$ and observe real-time cymatic sand settlement.

---

## License

MIT License. Open for educational and acoustics research.
