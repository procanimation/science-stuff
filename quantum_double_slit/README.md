# The Quantum Double Slit Experiment

> A real-time procedural physics simulation of wave-particle duality, de Broglie matter waves, the Born probability rule, and the observer effect (wavefunction collapse).

## Overview

The double-slit experiment demonstrates the fundamental paradox of quantum mechanics: microscopic particles (photons, electrons, neutrons, atoms) behave simultaneously as localized particles and delocalized probability waves. When unmeasured, single particles pass through both slits in quantum superposition, creating an interference pattern. When a detector observes which slit the particle enters, the wavefunction collapses into classical behavior.

## Mathematical Formulation

### 1. de Broglie Matter Wavelength
In 1924, Louis de Broglie showed that any particle with momentum $p = mv$ possesses an associated wavelength:

$$\lambda = \frac{h}{p} = \frac{h}{mv}$$

### 2. Schrödinger Wave Equation
The temporal evolution of the probability amplitude $\psi(x, y, t)$ is governed by:

$$i\hbar \frac{\partial \psi}{\partial t} = \hat{H}\psi = \left(-\frac{\hbar^2}{2m}\nabla^2 + V\right)\psi$$

### 3. The Born Rule & Interference Fringes
The probability density $P(x)$ of measuring a particle at position $x$ on the detection screen is:

$$P(x) = |\psi_{\text{total}}(x)|^2 = |\psi_1(x) + \psi_2(x)|^2 = |\psi_1|^2 + |\psi_2|^2 + 2\text{Re}(\psi_1^* \psi_2)$$

The cross-term $2\text{Re}(\psi_1^* \psi_2) = 2\sqrt{I_1 I_2}\cos\delta$ generates the alternating constructive and destructive interference fringes.

Constructive condition:
$$d \sin\theta = m\lambda \quad (m \in \mathbb{Z})$$

### 4. Wavefunction Collapse
Measuring which slit the particle traversed forces quantum decoherence, removing the phase coherence $\delta$. The interference cross-term vanishes:

$$P_{\text{measured}}(x) = |\psi_1(x)|^2 + |\psi_2(x)|^2$$

Yielding two classical Gaussian distributions instead of interference fringes.

## Running Locally

Open `index.html` in any browser or launch a local server:

```bash
python3 -m http.server 8000
```

## License

MIT License • Procanimation Studio 2026
