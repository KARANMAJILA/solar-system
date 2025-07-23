import React from 'react';
import { Stars } from '@react-three/drei';
import { isAnimationPaused } from '../constants/planetData';

// Enhanced Background Stars
export function EnhancedStars({ theme }) {
  return (
    <Stars 
      radius={800} 
      depth={100} 
      count={theme === 'dark' ? 8000 : 4000} 
      factor={6} 
      saturation={0} 
      fade 
      speed={isAnimationPaused ? 0 : 1}
    />
  );
}