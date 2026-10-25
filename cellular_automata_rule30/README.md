# Elementary Cellular Automata: Rule 30 & Rule 110 Simulation

An open-source, high-performance procedural simulation of 1D Elementary Cellular Automata (ECA), exploring deterministic aperiodic chaos (Rule 30) and Turing-complete universal computation (Rule 110).

Developed by [Procanimation Studio](https://procanimation.github.io).

---

## Mathematical Overview

In 1983, Stephen Wolfram classified all $2^8 = 256$ elementary cellular automata into four qualitative dynamical classes:
- **Class 1**: Evolves to a homogeneous state (all 0s or all 1s).
- **Class 2**: Evolves into simple periodic or nested structures (e.g., Rule 90 Sierpinski Gasket).
- **Class 3**: Generates aperiodic, chaotic behavior (e.g., Rule 30).
- **Class 4**: Generates localized complex structures that interact and transmit information, yielding universal Turing computation (e.g., Rule 110).

### Boolean Formulations

| Rule | Binary Byte | Boolean Logic Formula | Qualitative Behavior |
| :--- | :--- | :--- | :--- |
| **Rule 30** | `00011110` | $p \oplus (q \lor r)$ | Aperiodic Chaos, PRNG, Sensitive to initial conditions |
| **Rule 90** | `01011010` | $p \oplus r$ | Modulo 2 Pascal Triangle, Sierpinski Gasket ($D \approx 1.585$) |
| **Rule 110** | `01101110` | $(q \land \neg p) \lor (q \oplus r)$ | Cook's Theorem: Turing Complete, Universal Computation |
| **Rule 184** | `10111000` | $(p \land \neg q) \lor (q \land r)$ | Traffic Flow Model, Ballistic Annihilation |

---

## Getting Started

Open `index.html` in any modern web browser or run with a local server:

```bash
python3 -m http.server 8000
```

Navigate to `http://localhost:8000` to interactively switch rules, toggle seed initializations, and observe emergent dynamics.

---

## License

MIT License. Feel free to use, modify, and build upon this simulation for research and creative coding.
