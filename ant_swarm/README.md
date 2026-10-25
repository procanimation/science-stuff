# Ant Swarm Intelligence & Stigmergy (Ant Colony Optimization)

Interactive simulation of decentralized swarm intelligence, stigmergy, and Ant Colony Optimization (ACO) formulated by Marco Dorigo (1992).

Part of the **[Procanimation Studio](https://procanimation.github.io)** procedural physics series.

---

## 🔬 Scientific Foundations

### 1. Stigmergy
First coined by French biologist Pierre-Paul Grassé in 1959, **stigmergy** describes indirect coordination through environmental modification:
- Individual agents have no long-term memory, global map, or central communication.
- When an ant finds food, it deposits a chemical **pheromone trail** $\tau$ on its return journey.
- The pheromones evaporate over time at rate $\rho$.

### 2. Shortest Path Discovery via Positive Feedback
If two paths connect the nest to food:
1. Ants choose paths randomly at the start.
2. Ants on the **shorter path** complete round trips faster than ants on the longer path.
3. The shorter route receives more pheromone reinforcement per minute.
4. Higher pheromone concentration attracts more subsequent foragers, generating an exponential positive feedback loop until the whole swarm converges onto the mathematically shortest path.

### 3. Transition Rule (Dorigo ACO, 1992)
The probability $p_{ij}^k$ that ant $k$ chooses to move from node $i$ to node $j$ is:

$$p_{ij}^k = \frac{[\tau_{ij}]^\alpha \cdot [\eta_{ij}]^\beta}{\sum_{l \in \text{allowed}} [\tau_{il}]^\alpha \cdot [\eta_{il}]^\beta}$$

Where:
- $\tau_{ij}$: Pheromone trail intensity
- $\eta_{ij} = \frac{1}{d_{ij}}$: Heuristic visibility (inverse of distance)
- $\alpha, \beta$: Weighting parameters controlling the balance between trail following and local greediness.

---

## 🚀 Running Locally
Open `index.html` in any modern web browser or run:
```bash
npx serve .
```

Drag the golden food source with your cursor to watch the colony re-route in real time!
