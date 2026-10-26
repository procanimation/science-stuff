# The Collatz Conjecture: Hailstone Numbers & The Inverse Fractal Tree

An open-source simulation and graph visualizer for the **Collatz Conjecture** ($3n + 1$), exploring forward chaotic hailstone trajectories and the colossal inverse directed tree connecting all integers to root $1$.

Developed by [Procanimation Studio](https://procanimation.github.io).

---

## Mathematical Formulation

The Collatz map $f: \mathbb{N} \to \mathbb{N}$:
$$f(n) = \begin{cases} n/2 & \text{if } n \equiv 0 \pmod 2 \\ 3n + 1 & \text{if } n \equiv 1 \pmod 2 \end{cases}$$

### The Inverse Collatz Tree
Reversing the dynamics gives the predecessor set:
$$T^{-1}(n) = \{2n\} \cup \left\{ \frac{n-1}{3} \;\middle|\; n \equiv 4 \pmod 6 \right\}$$
Every integer sprouts an even ancestor ($2n$) bent by angle $-\theta$, and conditionally an odd ancestor ($(n-1)/3$) bent by $+\phi$, constructing an infinite directed tree spanning the natural numbers.

---

## Getting Started

Open `index.html` in your web browser:

```bash
python3 -m http.server 8000
```

Navigate to `http://localhost:8000` to interactively plot hailstone numbers or explore the tree.

---

## License

MIT License. Open for educational and computational research.
