# Conway's Game of Life: Emergent Complexity & Cellular Automata

> A high-performance, real-time procedural implementation of John Conway's zero-player cellular automaton (B3/S23) with neon bioluminescent rendering and interactive preset loading.

## Overview

In October 1970, mathematician **John Horton Conway** introduced the Game of Life. Governed entirely by an 8-neighbor Moore matrix and four simple state transition rules, the system exhibits unbounded emergent behavior, stable oscillators, self-propelled spaceships, and universal computation (Turing completeness).

## Mathematical Formulation

### 1. Moore Neighborhood Sum
For any discrete lattice coordinate $(x, y) \in \mathbb{Z}^2$, the live neighbor count $N(x,y)$ is given by:

$$N(x,y) = \sum_{i=-1}^{1}\sum_{j=-1}^{1} C(x+i, y+j) - C(x,y)$$

Where $C(x,y) \in \{0, 1\}$.

### 2. Transition Rules (B3/S23)
The state of cell $C$ at generation $t+1$ is evaluated as:

$$C_{t+1} = 1 \iff \left(C_t = 1 \land N \in \{2, 3\}\right) \lor \left(C_t = 0 \land N = 3\right)$$

* **Underpopulation**: Any live cell with fewer than two live neighbors dies.
* **Survival**: Any live cell with two or three live neighbors lives on to the next generation.
* **Overpopulation**: Any live cell with more than three live neighbors dies.
* **Reproduction**: Any dead cell with exactly three live neighbors becomes a live cell.

## Classic Patterns Included

* **Gosper Glider Gun**: The first known gun discovered by Bill Gosper (MIT, 1970), emitting a new glider every 30 generations.
* **Pulsar**: A large period-3 oscillator displaying 13x13 orthogonal symmetry.
* **Pentadecathlon**: A period-15 linear oscillator.
* **Glider**: The smallest self-propagating spaceship moving diagonally across the grid at speed $c/4$.
* **Acorn**: A tiny 7-cell methuselah requiring 5,206 generations to stabilize.

## Running Locally

Simply open `index.html` in any modern web browser or run with any static server:

```bash
python3 -m http.server 8000
```

## License

MIT License • Procanimation Studio 2026
