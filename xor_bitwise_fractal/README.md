# XOR Bitwise Fractals & Discrete Geometry

[![Live Simulation](https://img.shields.io/badge/Live_Lab-procanimation.github.io-blue?style=for-the-badge)](https://procanimation.github.io/experiments/xor-bitwise-fractal.html)
[![YouTube Short](https://img.shields.io/badge/YouTube_Short-Procanimation_Studio-red?style=for-the-badge&logo=youtube)](https://youtube.com/@procanimation)

> An exploratory discrete mathematics simulation demonstrating how the binary Exclusive OR (XOR) operator spawns the Sierpinski Gasket, Walsh-Hadamard orthogonal matrices, and infinite self-similar tapestries.

---

## ⚡ The Mathematics of Bitwise Fractals

In digital logic and the Galois field $\mathbb{F}_2$, the **Exclusive OR** operator ($\oplus$) acts as addition without carry:

$$A \oplus B = (A \lor B) \land \neg(A \land B)$$

### Sierpinski Gasket Emergence

When plotted over an integer plane $(x, y) \in \mathbb{N}^2$, the condition:

$$(x \oplus y) < 2^k \quad \text{or} \quad (x \ \& \ y) = 0$$

produces the **Sierpinski Triangle**, a fractal with exact Hausdorff dimension:

$$D = \frac{\ln 3}{\ln 2} \approx 1.58496$$

### Dynamic Modulo Tapestries

Extending the binary evaluation with a temporal offset and modulo arithmetic:

$$f(x, y, t) = (x \oplus y \oplus t) \pmod m$$

* **$m = 2$**: Classical Sierpinski Gasket lattices.
* **$m = 3$**: Hexagonal and triangular Moorish Islamic geometric star mandalas.
* **$m = 5, 7$**: Higher-order crystalline patterns exhibiting hyper-dimensional Walsh-Hadamard transform properties.

---

## 🚀 Running Locally

Open `index.html` in any browser or launch:

```bash
npx serve .
```

---

## 📚 References
* Wolfram, S. (2002). *A New Kind of Science*. Wolfram Media.
* Mandelbrot, B. (1982). *The Fractal Geometry of Nature*. W. H. Freeman.
* Procanimation Studio: [procanimation.github.io](https://procanimation.github.io)
