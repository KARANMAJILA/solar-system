import React, { useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { isAnimationPaused } from '../constants/planetData';

// Camera Animation Component
export function CameraController({ isAutoCamera }) {
  useFrame((state) => {
    if (isAutoCamera && !isAnimationPaused) {
      const time = state.clock.getElapsedTime();
      
      const radius = 150 + Math.sin(time * 0.2) * 50;
      const height = 80 + Math.sin(time * 0.15) * 40;
      
      state.camera.position.x = Math.cos(time * 0.1) * radius;
      state.camera.position.z = Math.sin(time * 0.1) * radius;
      state.camera.position.y = height;
      
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// Camera Focus Helper Hook
export function useCameraFocus() {
  const { camera, controls } = useThree();
  
  const focusOnPlanet = useCallback((planet) => {
    const targetPosition = new THREE.Vector3(
      planet.distance * 1.5,
      planet.size * 5,
      planet.distance * 0.8
    );
    
    // Smooth camera transition
    const currentPosition = camera.position.clone();
    const steps = 60;
    let currentStep = 0;
    
    const animate = () => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      camera.position.lerpVectors(currentPosition, targetPosition, eased);
      camera.lookAt(planet.distance, 0, 0);
      
      if (currentStep < steps) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [camera]);
  
  return { focusOnPlanet };
}