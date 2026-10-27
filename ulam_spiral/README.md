# The Ulam Spiral & Prime Number Constellations

[![Live Simulation](https://img.shields.io/badge/Live_Lab-procanimation.github.io-blue?style=for-the-badge)](https://procanimation.github.io/experiments/ulam-spiral.html)
[![YouTube Short](https://img.shields.io/badge/YouTube_Short-Procanimation_Studio-red?style=for-the-badge&logo=youtube)](https://youtube.com/@procanimation)

> A high-performance discrete mathematics and prime density simulation mapping prime constellations on square and polar spirals (Ulam Spiral and Sacks Spiral), highlighting Euler's lucky prime polynomial ($n^2 + n + 41$).

---

## ⚡ Mathematical Background

In 1963, mathematician **Stanislaw Ulam** drew a grid while attending a boring scientific presentation. Starting with $1$ at the center, he spiraled integers outward:

```
17--16--15--14--13
 |               |
18   5---4---3  12
 |   |       |   |
19   6   1---2  11
 |   |           |
20   7---8---9--10
 |
21--22--23--24--25
```

When marking only prime numbers ($2, 3, 5, 7, 11, 13, 17, 19, 23 \dots$), an astonishing non-random phenomenon emerged: **primes align along unbroken diagonal rays across vast distances**.

### The Euler Polynomial Highway

Centuries before Ulam, in 1772, **Leonhard Euler** discovered the quadratic polynomial:

$$P(n) = n^2 + n + 41$$

For all integers $0 \le n \le 39$, this formula produces 40 consecutive distinct prime numbers:
$41, 43, 47, 53, 61, 71, 83, 97, 113, 131, 151, \dots$

On the Ulam grid, any quadratic equation of the form:

$$4n^2 + bn + c$$

forms a straight 45-degree diagonal line. The Ulam spiral visually demonstrates that primes cluster along certain quadratic polynomials with far higher density than expected by random chance (formalized by the **Hardy-Littlewood Conjecture F**).

### Polar Coordinates (Sacks Spiral)

By mapping integer $n$ in polar coordinates:

$$r = \sqrt{n}, \quad \theta = \sqrt{n} \cdot 2\pi$$

squares of consecutive integers align along the horizontal axis, and Euler's polynomial forms an Archimedean spiral ray, proving prime clustering is an intrinsic property of number theory rather than a grid artifact.

---

## 🚀 Running Locally

Open `index.html` in any browser or run:

```bash
npx serve .
```

---

## 📚 References
* Ulam, S. M. (1964). *A Visual Display of Some Properties of the Distribution of Primes*.
* Hardy, G. H., & Littlewood, J. E. (1923). *Some problems of 'Partitio Numerorum'; III: On the expression of a number as a sum of primes*.
* Procanimation Studio: [procanimation.github.io](https://procanimation.github.io)
