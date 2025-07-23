import React, { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { isAnimationPaused } from '../constants/planetData';

// Enhanced Planet Component with hover detection
export function Planet({ planetInfo, onPlanetClick, hoveredPlanet, setHoveredPlanet, theme }) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (!isAnimationPaused && orbitRef.current && planetRef.current) {
      orbitRef.current.rotation.y = time * planetInfo.speed;
      planetRef.current.rotation.y += 0.02;
    }
  });

  const handleClick = useCallback(() => {
    onPlanetClick(planetInfo);
  }, [planetInfo, onPlanetClick]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    setHoveredPlanet(planetInfo);
    document.body.style.cursor = 'pointer';
  }, [planetInfo, setHoveredPlanet]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setHoveredPlanet(null);
    document.body.style.cursor = 'default';
  }, [setHoveredPlanet]);

  return (
    <group ref={orbitRef}>
      <mesh 
        ref={planetRef} 
        position={[planetInfo.distance, 0, 0]}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        scale={isHovered ? 1.2 : 1}
      >
        <sphereGeometry args={[planetInfo.size, 16, 16]} />
        <meshLambertMaterial 
          color={planetInfo.color}
          emissive={isHovered ? planetInfo.color : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Planet Label */}
      {isHovered && (
        <Html position={[planetInfo.distance, planetInfo.size + 2, 0]}>
          <div className={`px-2 py-1 rounded text-xs font-semibold pointer-events-none ${
            theme === 'dark' ? 'bg-black/80 text-white' : 'bg-white/90 text-black'
          } backdrop-blur-sm`}>
            <div className="text-center">
              <div className="font-bold">{planetInfo.name}</div>
              <div className="text-xs opacity-75">{planetInfo.info}</div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}