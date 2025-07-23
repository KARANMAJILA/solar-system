import React from 'react';
import { cameraPresets, setAnimationPaused } from '../constants/planetData';

// Control Panel Component
export function ControlPanel({ 
  theme, 
  setTheme, 
  isAnimationPaused: isPaused, 
  setIsAnimationPaused, 
  onPresetChange,
  isAutoCamera,
  setIsAutoCamera
}) {
  const toggleAnimation = () => {
    const newPausedState = !isPaused;
    setAnimationPaused(newPausedState);
    setIsAnimationPaused(newPausedState);
  };

  return (
    <div className="absolute top-4 left-4 z-10 space-y-3">
      {/* Title */}
      <div>
        <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent`}>
          3D Solar System
        </h1>
        <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Interactive 3D model with realistic planetary distances
        </p>
      </div>
      
      {/* Main Controls */}
      <div className={`backdrop-blur-sm rounded-lg p-4 space-y-3 ${
        theme === 'dark' ? 'bg-black/80 text-white' : 'bg-white/90 text-black'
      }`}>
        
        {/* Animation & Theme Controls */}
        <div className="flex gap-2">
          <button
            onClick={toggleAnimation}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              isPaused 
                ? 'bg-green-600 hover:bg-green-500 text-white' 
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              theme === 'dark' 
                ? 'bg-yellow-600 hover:bg-yellow-500 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          
          <button
            onClick={() => setIsAutoCamera(!isAutoCamera)}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              isAutoCamera 
                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                : theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-black'
            }`}
          >
            Auto Cam
          </button>
        </div>
        
        {/* Camera Presets */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Camera Views</h3>
          <div className="grid grid-cols-3 gap-1">
            {cameraPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => onPresetChange(preset.position)}
                className="bg-blue-600/80 hover:bg-blue-500 text-white text-xs px-2 py-1 rounded transition-colors"
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}