import React, { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { isAnimationPaused } from '../constants/planetData';

// Enhanced Saturn Component
export function Saturn({ planetInfo, onPlanetClick, hoveredPlanet, setHoveredPlanet, theme }) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const ringRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (!isAnimationPaused && orbitRef.current && planetRef.current) {
      orbitRef.current.rotation.y = time * planetInfo.speed;
      planetRef.current.rotation.y += 0.02;
      
      if (ringRef.current) {
        ringRef.current.rotation.z += 0.005;
      }
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
      <group 
        position={[planetInfo.distance, 0, 0]}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        scale={isHovered ? 1.2 : 1}
      >
        <mesh ref={planetRef}>
          <sphereGeometry args={[planetInfo.size, 16, 16]} />
          <meshLambertMaterial 
            color={planetInfo.color}
            emissive={isHovered ? planetInfo.color : '#000000'}
            emissiveIntensity={isHovered ? 0.2 : 0}
          />
        </mesh>
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planetInfo.size * 1.2, planetInfo.size * 1.8, 32]} />
          <meshLambertMaterial 
            color="#C4A484" 
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Saturn Label */}
        {isHovered && (
          <Html position={[0, planetInfo.size + 3, 0]}>
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
    </group>
  );
}