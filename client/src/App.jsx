import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SolarSystemScene } from './components/SolarSystemScene';
import { ControlPanel } from './components/ControlPanel';
import { PlanetInfoPanel } from './components/PlanetInfoPanel';

// Main App Component
function App() {
  const [theme, setTheme] = useState('dark');
  const [cameraPosition, setCameraPosition] = useState([0, 100, 300]);
  const [isAnimationPausedState, setIsAnimationPausedState] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isAutoCamera, setIsAutoCamera] = useState(true);

  const handlePresetChange = (newPosition) => {
    setCameraPosition(newPosition);
    setIsAutoCamera(false); // Disable auto camera when manually changing
  };

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    setIsAutoCamera(false);
    
    // Focus camera on clicked planet
    const focusPosition = [
      planet.distance * 1.5,
      planet.size * 5,
      planet.distance * 0.8
    ];
    setCameraPosition(focusPosition);
  };

  return (
    <div className={`w-full h-screen relative overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-100'
    }`}>
      
      <ControlPanel 
        theme={theme}
        setTheme={setTheme}
        isAnimationPaused={isAnimationPausedState}
        setIsAnimationPaused={setIsAnimationPausedState}
        onPresetChange={handlePresetChange}
        isAutoCamera={isAutoCamera}
        setIsAutoCamera={setIsAutoCamera}
      />
      
      <PlanetInfoPanel 
        theme={theme}
        hoveredPlanet={hoveredPlanet}
        selectedPlanet={selectedPlanet}
      />
      
      <Canvas 
        camera={{ 
          position: cameraPosition, 
          fov: 75,
          near: 0.1,
          far: 2000
        }}
        className="w-full h-full"
        key={`${cameraPosition.join(',')}-${theme}`}
      >
        <SolarSystemScene 
          theme={theme}
          onPlanetClick={handlePlanetClick}
          hoveredPlanet={hoveredPlanet}
          setHoveredPlanet={setHoveredPlanet}
          isAutoCamera={isAutoCamera}
        />
      </Canvas>
      
      <div className={`absolute bottom-4 left-4 text-xs transition-colors ${
        theme === 'dark' ? 'text-white/60' : 'text-black/60'
      }`}>
        <p>Built with Three.js & React Three Fiber</p>
        <p>🎮 Full Interactive Experience</p>
      </div>
      
      <div className={`absolute bottom-4 right-4 backdrop-blur-sm rounded-lg p-2 text-xs transition-colors ${
        theme === 'dark' ? 'bg-black/80 text-gray-400' : 'bg-white/80 text-gray-600'
      }`}>
        <p>🎥 Camera: {isAutoCamera ? 'Auto-Moving' : 'Manual Control'}</p>
        <p>⚡ Animation: {isAnimationPausedState ? 'Paused' : 'Running'}</p>
        <p>🎨 Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
      </div>
    </div>
  );
}

export default App;