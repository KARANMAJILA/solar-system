# 🌌 3D Solar System Simulation

This project is a dynamic, interactive 3D simulation of the solar system built using **Three.js**. It visually represents the planets orbiting the sun, complete with realistic textures, motion, and speed control.

## 🚀 Features

- 🪐 **3D Solar System in Motion**: Realistic planetary orbits and rotations.
- 🎮 **Real-Time Speed Control**: Adjust orbit speed of all planets live via slider.
- 🌍 **Accurate Positioning**: Scaled sizes and distances for visual clarity.
- ✨ **Interactive View**: Zoom, rotate, and explore the solar system with mouse controls.
- 🌑 **Dark Background with Stars**: Simulates the deep space environment.

## 🛠️ Tech Stack

- [Three.js](https://threejs.org/) – 3D graphics library
- [JavaScript (ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Vite](https://vitejs.dev/) – Fast frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) – For loading 3D assets


## 💡 How Planets & Orbits Were Created

- Each planet is a sphere (`THREE.SphereGeometry`) with custom textures.
- Orbital paths are visualized using `THREE.RingGeometry` or line circles.
- Orbits are animated using frame-based updates (`requestAnimationFrame`).
- Distance and size are scaled for better visual clarity.

## 🧪 Run Locally

```bash
git clone https://github.com/yourusername/solar-system.git
cd solar-system
npm install
npm run dev

