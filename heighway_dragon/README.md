# The Heighway Dragon Curve & 2D Plane Tessellation

An open-source interactive simulation of the **Heighway Dragon**, discovered in 1966 by NASA physicists John Heighway, Bruce Banks, and William Harter.

## Mathematical Foundation
The Heighway Dragon is constructed by repeatedly folding a paper strip in half and unfolding each fold to a 90° angle.

### L-System Formalism
- **Alphabet**: $\{F, +, -\}$
- **Axiom**: $FX$
- **Production Rules**:
  - $X \to X + YF+$
  - $Y \to -FX - Y$

### Dimensions & Properties
- **Space-Filling Interior**: Topological Hausdorff dimension $d = 2$.
- **Fractal Boundary**: Hausdorff dimension $d_H \approx 1.523627...$, satisfying $2^{d_H/2} + 2^{d_H} = \dots$.
- **4-Fold Tessellation**: Four dragon curves rotated by 0°, 90°, 180°, and 270° interlock seamlessly to tile the entire two-dimensional plane without overlap.

## Running Locally
Open `index.html` in your web browser or run:
```bash
python3 -m http.server 8000
```
