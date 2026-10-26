# Langton's Ant & The Emergent 104-Step Highway

An open-source simulation of **Langton's Ant**, an elementary 2D universal Turing machine illustrating how two trivial local rules transition from initial symmetry into $10,000$ steps of turbulent chaos, before spontaneously crystallizing into an infinite periodic highway.

Developed by [Procanimation Studio](https://procanimation.github.io).

---

## The Elementary Rules

On a 2D square grid where each cell is either white (0) or black (1):
1. **At a white cell**: Turn $90^\circ$ clockwise (Right), flip color to Black, step forward 1 cell.
2. **At a black cell**: Turn $90^\circ$ counter-clockwise (Left), flip color to White, step forward 1 cell.

### The Three Phases of Evolution
1. **Symmetry (Steps 0–450)**: Symmetrical nested geometric shapes.
2. **Chaos (Steps 450–10,200)**: Aperiodic pseudo-random walk creating digital smoke.
3. **Highway Emergence (Steps 10,400+)**: Invariable formation of an infinite periodic sequence of 104 steps advancing diagonally forever.

---

## Getting Started

Open `index.html` in your web browser:

```bash
python3 -m http.server 8000
```

Navigate to `http://localhost:8000` to interactively run the simulation.

---

## License

MIT License. Open for educational and computational research.
