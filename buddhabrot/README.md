# The Buddhabrot & Nebulabrot Complex Trajectory Simulator

An open-source implementation of **Melinda Green's 1993 Buddhabrot**, mapping the orbital density histogram of escaping complex numbers under the recurrence $z_{n+1} = z_n^2 + c$.

## Mathematical Foundation
In classical Mandelbrot visualization, each point $c \in \mathbb{C}$ is tested to see how many iterations are required before $|z_k| > 2$. The parameter plane is colored solely by this escape time.

In the **Buddhabrot**:
1. We iterate $z_{k+1} = z_k^2 + c$ starting from $z_0 = 0$.
2. If the sequence **does not escape** within $N_{\max}$ steps (points inside the main cardioid and bulbs), the entire trajectory is discarded.
3. If the sequence **escapes** at step $K$, every intermediate coordinate $z_1, z_2, \dots, z_K$ increments the corresponding bin in a 2D density histogram $H(x, y)$.
4. Rotating the complex coordinates 90° counterclockwise orients the Buddha silhouette upright.

## The Nebulabrot Tri-Wavelength Technique
Analogous to astronomical false-color imagery (Hubble/JWST):
- **Red Channel**: Low iterations ($20 \le K < 120$) capture the vast, diffuse ethereal outer aura.
- **Green Channel**: Medium iterations ($120 \le K < 550$) trace the torso, limbs, and concentric halo arcs.
- **Blue Channel**: Deep iterations ($550 \le K < 2200$) illuminate the intricate micro-filaments along the spine and third eye.

## Running Locally
Open `index.html` in any modern web browser or serve via:
```bash
python3 -m http.server 8000
```
