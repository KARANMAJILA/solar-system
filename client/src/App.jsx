import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// Planet data with enhanced information
const planetData = [
  { name: 'Mercury', size: 0.38, distance: 15, speed: 0.047, color: '#8C7853', info: 'Closest to Sun, rocky surface' },
  { name: 'Venus', size: 0.95, distance: 25, speed: 0.035, color: '#FFC649', info: 'Hottest planet, thick atmosphere' },
  { name: 'Earth', size: 1, distance: 35, speed: 0.030, color: '#6B93D6', info: 'Our home planet, supports life' },
  { name: 'Mars', size: 0.53, distance: 50, speed: 0.024, color: '#C1440E', info: 'The Red Planet, polar ice caps' },
  { name: 'Jupiter', size: 2.5, distance: 80, speed: 0.013, color: '#D8CA9D', info: 'Largest planet, Great Red Spot' },
  { name: 'Saturn', size: 2.1, distance: 120, speed: 0.009, color: '#FAD5A5', info: 'Famous rings, many moons' },
  { name: 'Uranus', size: 1.6, distance: 160, speed: 0.006, color: '#4FD0E3', info: 'Tilted axis, ice giant' },
  { name: 'Neptune', size: 1.55, distance: 200, speed: 0.005, color: '#4B70DD', info: 'Windiest planet, deep blue' }
];

// Global animation control
let isAnimationPaused = false;

// Enhanced Sun Component with glow effect
function Sun({ theme }) {
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

// Enhanced Planet Component with hover detection
function Planet({ planetInfo, onPlanetClick, hoveredPlanet, setHoveredPlanet, theme }) {
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

// Enhanced Saturn Component
function Saturn({ planetInfo, onPlanetClick, hoveredPlanet, setHoveredPlanet, theme }) {
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

// Orbit Rings Component
function OrbitRings({ theme }) {
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

// Camera Animation Component
function CameraController({ isAutoCamera }) {
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

// Enhanced Background Stars
function EnhancedStars({ theme }) {
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

// Camera Focus Helper
function useCameraFocus() {
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

// Main Scene Component
function SolarSystemScene({ theme, onPlanetClick, hoveredPlanet, setHoveredPlanet, isAutoCamera }) {
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

// Control Panel Component
function ControlPanel({ 
  theme, 
  setTheme, 
  isAnimationPaused: isPaused, 
  setIsAnimationPaused, 
  onPresetChange,
  isAutoCamera,
  setIsAutoCamera
}) {
  const presets = [
    { name: 'Overview', position: [0, 100, 300], description: 'Full system view' },
    { name: 'Inner Planets', position: [0, 30, 80], description: 'Mercury to Mars' },
    { name: 'Outer Giants', position: [0, 80, 250], description: 'Jupiter to Neptune' },
    { name: 'Side View', position: [400, 0, 0], description: 'Orbital plane view' },
    { name: 'Top Down', position: [0, 350, 0], description: 'Bird\'s eye view' },
    { name: 'Close Sun', position: [0, 20, 40], description: 'Near the Sun' }
  ];

  const toggleAnimation = () => {
    isAnimationPaused = !isAnimationPaused;
    setIsAnimationPaused(isAnimationPaused);
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
            {presets.map((preset, index) => (
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

// Planet Info Panel
function PlanetInfoPanel({ theme, hoveredPlanet, selectedPlanet }) {
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