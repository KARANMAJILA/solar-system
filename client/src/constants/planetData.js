
export const planetData = [
  { name: 'Mercury', size: 0.38, distance: 15, speed: 0.047, color: '#8C7853', info: 'Closest to Sun, rocky surface' },
  { name: 'Venus', size: 0.95, distance: 25, speed: 0.035, color: '#FFC649', info: 'Hottest planet, thick atmosphere' },
  { name: 'Earth', size: 1, distance: 35, speed: 0.030, color: '#6B93D6', info: 'Our home planet, supports life' },
  { name: 'Mars', size: 0.53, distance: 50, speed: 0.024, color: '#C1440E', info: 'The Red Planet, polar ice caps' },
  { name: 'Jupiter', size: 2.5, distance: 80, speed: 0.013, color: '#D8CA9D', info: 'Largest planet, Great Red Spot' },
  { name: 'Saturn', size: 2.1, distance: 120, speed: 0.009, color: '#FAD5A5', info: 'Famous rings, many moons' },
  { name: 'Uranus', size: 1.6, distance: 160, speed: 0.006, color: '#4FD0E3', info: 'Tilted axis, ice giant' },
  { name: 'Neptune', size: 1.55, distance: 200, speed: 0.005, color: '#4B70DD', info: 'Windiest planet, deep blue' }
];

// Global animation control
export let isAnimationPaused = false;

export const setAnimationPaused = (paused) => {
  isAnimationPaused = paused;
};

// Camera presets
export const cameraPresets = [
  { name: 'Overview', position: [0, 100, 300], description: 'Full system view' },
  { name: 'Inner Planets', position: [0, 30, 80], description: 'Mercury to Mars' },
  { name: 'Outer Giants', position: [0, 80, 250], description: 'Jupiter to Neptune' },
  { name: 'Side View', position: [400, 0, 0], description: 'Orbital plane view' },
  { name: 'Top Down', position: [0, 350, 0], description: 'Bird\'s eye view' },
  { name: 'Close Sun', position: [0, 20, 40], description: 'Near the Sun' }
];