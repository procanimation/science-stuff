# The Chaos Game & Iterated Function Systems (IFS)

An open-source, high-performance simulation of the **Chaos Game**, exploring how stochastic Monte Carlo random iterations over contractive affine transformations construct deterministic fractal attractors like the **Barnsley Fern** and the **Sierpinski Gasket**.

Developed by [Procanimation Studio](https://procanimation.github.io).

---

## Mathematical Foundations

### Banach Fixed-Point Theorem & Hutchinson Operator
For a complete metric space $(X, d)$ with contractive mappings $f_1, \dots, f_m$:
$$d(f_i(x), f_i(y)) \le c_i d(x, y), \quad 0 \le c_i < 1$$
The Hutchinson operator:
$$F(S) = \bigcup_{i=1}^m f_i(S)$$
has a unique compact fixed-point attractor $A \subset X$ such that $F(A) = A$.

### Barnsley Fern Affine Coefficients

Each transformation $f_i(x, y) = \begin{bmatrix} a_i & b_i \\ c_i & d_i \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} + \begin{bmatrix} e_i \\ f_i \end{bmatrix}$:

| Transform | $a$ | $b$ | $c$ | $d$ | $e$ | $f$ | Probability $p$ | Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| $f_1$ | $0.00$ | $0.00$ | $0.00$ | $0.16$ | $0.00$ | $0.00$ | $0.01$ | Stem Rachis |
| $f_2$ | $0.85$ | $0.04$ | $-0.04$ | $0.85$ | $0.00$ | $1.60$ | $0.85$ | Successive Leaflets |
| $f_3$ | $0.20$ | $-0.26$ | $0.23$ | $0.22$ | $0.00$ | $1.60$ | $0.07$ | Left Sub-frond |
| $f_4$ | $-0.15$ | $0.28$ | $0.26$ | $0.24$ | $0.00$ | $0.44$ | $0.07$ | Right Sub-frond |

---

## Getting Started

Open `index.html` in your web browser:

```bash
python3 -m http.server 8000
```

Navigate to `http://localhost:8000` to interactively run the simulation.

---

## License

MIT License. Open for educational and research use.
