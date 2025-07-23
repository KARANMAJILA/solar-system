import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { planetData } from '../constants/planetData';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { Saturn } from './Saturn';
import { OrbitRings } from './OrbitRings';
import { EnhancedStars } from './EnhancedStars';
import { CameraController } from './CameraController';

// Main Scene Component
export function SolarSystemScene({ theme, onPlanetClick, hoveredPlanet, setHoveredPlanet, isAutoCamera }) {
  return (
    <>
      <ambientLight intensity={theme === 'dark' ? 0.2 : 0.4} />
      <pointLight position={[0, 0, 0]} intensity={theme === 'dark' ? 3 : 2} />
      <directionalLight position={[20, 20, 10]} intensity={theme === 'dark' ? 0.8 : 0.6} />
      <directionalLight position={[-20, -20, -10]} intensity={theme === 'dark' ? 0.3 : 0.4} />
      
      <EnhancedStars theme={theme} />
      
      <Sun theme={theme} />
      <OrbitRings theme={theme} />
      
      {planetData.map((planet, index) => (
        planet.name === 'Saturn' ? (
          <Saturn 
            key={index} 
            planetInfo={planet} 
            onPlanetClick={onPlanetClick}
            hoveredPlanet={hoveredPlanet}
            setHoveredPlanet={setHoveredPlanet}
            theme={theme}
          />
        ) : (
          <Planet 
            key={index} 
            planetInfo={planet} 
            onPlanetClick={onPlanetClick}
            hoveredPlanet={hoveredPlanet}
            setHoveredPlanet={setHoveredPlanet}
            theme={theme}
          />
        )
      ))}
      
      <CameraController isAutoCamera={isAutoCamera} />
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={50}
        maxDistance={800}
        autoRotate={false}
      />
    </>
  );
}