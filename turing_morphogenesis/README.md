# Turing Morphogenesis (Reaction-Diffusion System)

An interactive procedural simulation of Alan Turing's groundbreaking 1952 paper, *"The Chemical Basis of Morphogenesis"*, implemented via the **Gray-Scott Reaction-Diffusion Model**.

[![Procanimation Science](https://img.shields.io/badge/Procanimation-Live_Lab-00f5d4?style=for-the-badge)](https://procanimation.github.io/experiments/turing-morphogenesis.html)
[![YouTube Short](https://img.shields.io/badge/YouTube-Watch_Short-ff0000?style=for-the-badge&logo=youtube)](https://youtube.com/@procanimation)

---

## 📐 The Mathematics

In 1952, Alan Turing posed a fundamental biological question:
> *How does a spherically symmetric, homogeneous ball of identical embryonic cells know where to grow arms, zebra stripes, or leopard spots?*

He discovered that when two chemical substances (an **activator $u$** and an **inhibitor $v$**) diffuse through space at different rates ($D_v \gg D_u$) and react with each other, tiny thermal fluctuations spontaneously amplify into stable periodic spatial patterns (stripes, spots, labyrinths, or spirals).

### Gray-Scott Partial Differential Equations
$$\frac{\partial u}{\partial t} = D_u \nabla^2 u - uv^2 + F(1 - u)$$
$$\frac{\partial v}{\partial t} = D_v \nabla^2 v + uv^2 - (F + k)v$$

Where:
* $u$: Concentration of chemical reactant $A$ (fed continuously at rate $F$).
* $v$: Concentration of chemical reactant $B$ (decays/killed at rate $k$).
* $D_u, D_v$: Diffusion coefficients of the two species ($D_u = 1.0, D_v = 0.5$).
* $\nabla^2$: 2D discrete Laplacian operator computed via finite difference stencils:
$$\nabla^2 f(x, y) \approx f(x+1, y) + f(x-1, y) + f(x, y+1) + f(x, y-1) - 4f(x, y)$$

---

## 🧪 Parameter Regimes

| Pattern Type | Feed Rate ($F$) | Kill Rate ($k$) | Biological Equivalent |
|---|---|---|---|
| **Spots** | $0.038$ | $0.061$ | Leopard Rosettes, Ladybug Spots |
| **Stripes** | $0.022$ | $0.051$ | Zebra Stripes, Angelfish Bands |
| **Brain Coral** | $0.055$ | $0.062$ | Marine Coral Labyrinths, Fingerprints |
| **Mitosis** | $0.0367$ | $0.0649$ | Replicating Solitary Bacteria |

---

## 🚀 Running Locally

1. Open `index.html` directly in any web browser.
2. Click and drag your mouse across the canvas to seed active reactant clusters.
3. Use the HUD preset buttons to switch between spots, stripes, and labyrinths.

---

## 🔗 Live Laboratory & Portfolio
Experience the full 4K WebGL interactive simulation at [procanimation.github.io/experiments/turing-morphogenesis.html](https://procanimation.github.io/experiments/turing-morphogenesis.html).
