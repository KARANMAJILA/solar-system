import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isAnimationPaused } from '../constants/planetData';

// Enhanced Sun Component with glow effect
export function Sun({ theme }) {
  const sunRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    if (!isAnimationPaused && sunRef.current) {
      sunRef.current.rotation.y += 0.01;
    }
    
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {/* Main Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      
      {/* Sun Glow Effect */}
      <mesh ref={glowRef} scale={1.3}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}