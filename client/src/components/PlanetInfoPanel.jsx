import React from 'react';
import { planetData } from '../constants/planetData';

// Planet Info Panel
export function PlanetInfoPanel({ theme, hoveredPlanet, selectedPlanet }) {
  const displayPlanet = hoveredPlanet || selectedPlanet;
  
  return (
    <div className={`absolute top-4 right-4 backdrop-blur-sm rounded-lg p-4 max-w-xs transition-colors ${
      theme === 'dark' ? 'bg-black/80 text-white' : 'bg-white/90 text-black'
    }`}>
      <h3 className="text-lg font-bold mb-2 text-yellow-400">
        {displayPlanet ? displayPlanet.name : 'Solar System Scale'}
      </h3>
      
      {displayPlanet ? (
        <div className="space-y-2">
          <div className="text-sm">
            <p className="text-yellow-300">📍 Distance: {displayPlanet.distance * 10}M km from Sun</p>
            <p className="text-blue-300">📏 Size: {(displayPlanet.size * 12756).toFixed(0)} km diameter</p>
            <p className="text-green-300">🔄 Speed: {(displayPlanet.speed * 100).toFixed(1)}% of Earth's speed</p>
          </div>
          <div className="text-xs border-t pt-2 opacity-75">
            {displayPlanet.info}
          </div>
        </div>
      ) : (
        <div className="space-y-1 text-sm">
          <p className="text-yellow-300">🌟 Sun (center) - Diameter: 1.4M km</p>
          {planetData.map((planet, index) => (
            <p key={index} className="text-gray-400">
              🪐 {planet.name} - {planet.distance * 10}M km
            </p>
          ))}
        </div>
      )}
      
      <div className={`mt-3 text-xs border-t pt-2 ${
        theme === 'dark' ? 'text-gray-400 border-gray-600' : 'text-gray-600 border-gray-400'
      }`}>
        <p>• Click planets to focus camera</p>
        <p>• Hover for detailed info</p>
        <p>• Use controls to navigate</p>
        {displayPlanet && <p className="text-yellow-400 mt-1">* Currently viewing: {displayPlanet.name}</p>}
      </div>
    </div>
  );
}