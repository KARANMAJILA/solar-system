import React from 'react';
import * as THREE from 'three';
import { planetData } from '../constants/planetData';

// Orbit Rings Component
export function OrbitRings({ theme }) {
  return (
    <>
      {planetData.map((planet, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.distance - 0.05, planet.distance + 0.05, 64]} />
          <meshBasicMaterial 
            color={theme === 'dark' ? '#333333' : '#666666'} 
            side={THREE.DoubleSide}
            transparent
            opacity={theme === 'dark' ? 0.2 : 0.3}
          />
        </mesh>
      ))}
    </>
  );
}