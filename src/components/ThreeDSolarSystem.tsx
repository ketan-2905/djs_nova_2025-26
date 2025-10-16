// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';

// export default function TiltedSolarSystem() {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const width = mountRef.current.clientWidth;
//     const height = mountRef.current.clientHeight;

//     // Scene setup
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x000011);
    
//     const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
//     camera.position.set(0, 8, 25);
//     camera.lookAt(0, 0, 0);

//     const renderer = new THREE.WebGLRenderer({ 
//       antialias: true, 
//       alpha: true,
//       powerPreference: "high-performance"
//     });
    
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
//     mountRef.current.innerHTML = '';
//     mountRef.current.appendChild(renderer.domElement);

//     // Lighting
//     const sunLight = new THREE.PointLight(0xffffff, 2, 100);
//     sunLight.castShadow = true;
//     scene.add(sunLight);

//     const ambientLight = new THREE.AmbientLight(0x333355, 0.3);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0x4488ff, 0.5);
//     directionalLight.position.set(-10, 10, -10);
//     scene.add(directionalLight);

//     // Starfield background
//     const starGeometry = new THREE.BufferGeometry();
//     const starCount = 5000;
//     const starPositions = new Float32Array(starCount * 3);

//     for (let i = 0; i < starCount * 3; i++) {
//       starPositions[i] = (Math.random() - 0.5) * 2000;
//     }

//     starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
//     const starMaterial = new THREE.PointsMaterial({
//       color: 0xffffff,
//       size: 2,
//       sizeAttenuation: true
//     });
//     const stars = new THREE.Points(starGeometry, starMaterial);
//     scene.add(stars);

//     // Create solar system group with tilt
//     const solarSystem = new THREE.Group();
//     solarSystem.rotation.x = Math.PI / 6; // 30 degree tilt
//     scene.add(solarSystem);

//     const textureLoader = new THREE.TextureLoader();
//     let texturesLoaded = 0;
//     const totalTextures = 9;

//     const onTextureLoad = () => {
//       texturesLoaded++;
//       if (texturesLoaded === totalTextures) {
//         setLoading(false);
//       }
//     };


// const planets = [
//   {
//     name: 'mercury',
//     radius: 0.4,
//     distance: 4,
//     speed: 0.04,
//     color: 0x8C7853,
//     // Updated to SolarSystemScope texture
//     // Texture source: /textures/2k_mercury.jpg
//     texture: '/textures/2k_mercury.jpg'
//   },
//   {
//     name: 'venus',
//     radius: 0.6,
//     distance: 6,
//     speed: 0.015,
//     color: 0xE6CDAB,
//     // Updated to SolarSystemScope texture
//     // Texture source: /textures/2k_venus_surface.jpg
//     texture: '/textures/2k_venus_surface.jpg'
//   },
//   {
//     name: 'earth',
//     radius: 0.7,
//     distance: 8,
//     speed: 0.01,
//     color: 0x2233ff,
//     // Updated to SolarSystemScope texture
//     // Texture source: /textures/2k_earth_daymap.jpg
//     texture: '/textures/2k_earth_daymap.jpg'
//   },
//   {
//     name: 'mars',
//     radius: 0.5,
//     distance: 10,
//     speed: 0.008,
//     color: 0xC1440E,
//     // Updated to SolarSystemScope texture
//     // Texture source: /textures/2k_mars.jpg
//     texture: '/textures/2k_mars.jpg'
//   },
//   {
//     name: 'jupiter',
//     radius: 1.5,
//     distance: 13,
//     speed: 0.004,
//     color: 0xC19A6B,
//     // Updated to SolarSystemScope texture
//     // Texture source: /textures/2k_jupiter.jpg
//     texture: '/textures/2k_jupiter.jpg'
//   },
//   {
//     name: 'saturn',
//     radius: 1.2,
//     distance: 16,
//     speed: 0.003,
//     color: 0xE3CFA9,
//     // Updated to SolarSystemScope texture
//     // Texture source: /textures/2k_saturn.jpg
//     texture: '/textures/2k_saturn.jpg',
//     // Ring texture updated to SolarSystemScope source
//     // Texture source: /textures/2k_saturn_ring_alpha.png
//     ringTexture: '/textures/2k_saturn_ring_alpha.png',
//     ringInnerRadius: 1.5,
//     ringOuterRadius: 2.5
//   },
//   {
//     name: 'uranus',
//     radius: 0.9,
//     distance: 19,
//     speed: 0.002,
//     color: 0x4FD0E7,
//     // Updated to SolarSystemScope texture
//     // Texture source: /textures/2k_uranus.jpg
//     texture: '/textures/2k_uranus.jpg'
//   },
//   {
//     name: 'neptune',
//     radius: 0.9,
//     distance: 22,
//     speed: 0.001,
//     color: 0x4B70DD,
//     // Updated to SolarSystemScope texture
//     // Texture source: /textures/2k_neptune.jpg
//     texture: '/textures/2k_neptune.jpg'
//   }
// ];


//     // Create Sun
//     const sunGeometry = new THREE.SphereGeometry(2, 64, 64);
//     const sunMaterial = new THREE.MeshBasicMaterial({
//       map: textureLoader.load(
//         '/textures/2k_sun.jpg',
//         onTextureLoad
//       )
//     });
//     const sun = new THREE.Mesh(sunGeometry, sunMaterial);
//     sunLight.position.copy(sun.position);
//     solarSystem.add(sun);

//     // Sun glow effect
//     const sunGlowGeometry = new THREE.SphereGeometry(2.3, 32, 32);
//     const sunGlowMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         glowColor: { value: new THREE.Color(0xff4500) },
//         viewVector: { value: camera.position }
//       },
//       vertexShader: `
//         uniform vec3 viewVector;
//         varying float intensity;
//         void main() {
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
//           intensity = pow(0.8 - dot(normalize(viewVector), actual_normal), 2.0);
//         }
//       `,
//       fragmentShader: `
//         uniform vec3 glowColor;
//         varying float intensity;
//         void main() {
//           vec3 glow = glowColor * intensity;
//           gl_FragColor = vec4(glow, intensity * 0.5);
//         }
//       `,
//       side: THREE.BackSide,
//       blending: THREE.AdditiveBlending,
//       transparent: true
//     });
//     const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
//     sun.add(sunGlow);

//     const planetMeshes: THREE.Mesh[] = [];
//     const planetGroups: THREE.Group[] = [];

//     // Create planets
//     planets.forEach(planet => {
//       const planetGroup = new THREE.Group();
//       solarSystem.add(planetGroup);

//       const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
//       let material;

//       if (planet.texture) {
//         material = new THREE.MeshPhongMaterial({
//           map: textureLoader.load(planet.texture, onTextureLoad),
//           shininess: 10
//         });
//       } else {
//         material = new THREE.MeshPhongMaterial({
//           color: planet.color,
//           shininess: 10
//         });
//       }

//       const planetMesh = new THREE.Mesh(geometry, material);
//       planetMesh.castShadow = true;
//       planetMesh.receiveShadow = true;
//       planetMesh.userData = { name: planet.name };
//       planetGroup.add(planetMesh);

//       // Create orbit ring
//       const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.1, planet.distance + 0.1, 64);
//       const orbitMaterial = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//         side: THREE.DoubleSide,
//         transparent: true,
//         opacity: 0.1
//       });
//       const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
//       orbit.rotation.x = Math.PI / 2;
//       solarSystem.add(orbit);

//       // Saturn's rings
//       if (planet.name === 'saturn') {
//         const ringGeometry = new THREE.RingGeometry(planet.radius + 0.3, planet.radius + 1, 32);
//         const ringMaterial = new THREE.MeshPhongMaterial({
//           color: 0xE3CFA9,
//           side: THREE.DoubleSide,
//           transparent: true,
//           opacity: 0.8
//         });
//         const ring = new THREE.Mesh(ringGeometry, ringMaterial);
//         ring.rotation.x = Math.PI / 3;
//         planetMesh.add(ring);
//       }

//       planetMeshes.push(planetMesh);
//       planetGroups.push(planetGroup);
//     });

//     // Animation variables
//     const planetAngles = planets.map(() => Math.random() * Math.PI * 2);
    
//     // Interaction controls
//     let isDragging = false;
//     let previousMousePosition = { x: 0, y: 0 };
//     const systemRotation = { x: Math.PI / 6, y: 0 };

//     const handleMouseDown = (event: MouseEvent) => {
//       isDragging = true;
//       previousMousePosition = { x: event.clientX, y: event.clientY };
//     };

//     const handleMouseMove = (event: MouseEvent) => {
//       if (!isDragging) return;

//       const deltaMove = {
//         x: event.clientX - previousMousePosition.x,
//         y: event.clientY - previousMousePosition.y
//       };

//       systemRotation.y += deltaMove.x * 0.01;
//       systemRotation.x += deltaMove.y * 0.01;
//       systemRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, systemRotation.x));
      
//       previousMousePosition = { x: event.clientX, y: event.clientY };
//     };

//     const handleMouseUp = () => {
//       isDragging = false;
//     };

//     // Planet selection
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();

//     const handleClick = (event: MouseEvent) => {
//       const rect = renderer.domElement.getBoundingClientRect();
//       mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(planetMeshes);

//       if (intersects.length > 0) {
//         const planetName = intersects[0].object.userData.name;
//         setSelectedPlanet(planetName);
//       } else {
//         setSelectedPlanet(null);
//       }
//     };

//     const canvas = renderer.domElement;
//     canvas.addEventListener('mousedown', handleMouseDown);
//     canvas.addEventListener('click', handleClick);
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);

//     // Touch events
//     const handleTouchStart = (event: TouchEvent) => {
//       if (event.touches.length === 1) {
//         isDragging = true;
//         previousMousePosition = {
//           x: event.touches[0].clientX,
//           y: event.touches[0].clientY
//         };
//       }
//     };

//     const handleTouchMove = (event: TouchEvent) => {
//       if (!isDragging || event.touches.length !== 1) return;
      
//       const deltaMove = {
//         x: event.touches[0].clientX - previousMousePosition.x,
//         y: event.touches[0].clientY - previousMousePosition.y
//       };
      
//       systemRotation.y += deltaMove.x * 0.01;
//       systemRotation.x += deltaMove.y * 0.01;
//       systemRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, systemRotation.x));
      
//       previousMousePosition = {
//         x: event.touches[0].clientX,
//         y: event.touches[0].clientY
//       };
//     };

//     const handleTouchEnd = () => {
//       isDragging = false;
//     };

//     canvas.addEventListener('touchstart', handleTouchStart);
//     window.addEventListener('touchmove', handleTouchMove);
//     window.addEventListener('touchend', handleTouchEnd);

//     // Animation loop
//     function animate() {
//       requestAnimationFrame(animate);

//       // Update solar system rotation
//       solarSystem.rotation.x = systemRotation.x;
//       solarSystem.rotation.y = systemRotation.y;

//       // Automatic rotation when not dragging
//       if (!isDragging) {
//         systemRotation.y += 0.001;
//       }

//       // Animate planets
//       planets.forEach((planet, index) => {
//         planetAngles[index] += planet.speed;
//         const group = planetGroups[index];
//         group.position.x = Math.cos(planetAngles[index]) * planet.distance;
//         group.position.z = Math.sin(planetAngles[index]) * planet.distance;
        
//         // Rotate planet on its axis
//         const planetMesh = planetMeshes[index];
//         planetMesh.rotation.y += 0.01;
//       });

//       // Rotate sun
//       sun.rotation.y += 0.002;

//       // Update glow effects
//       sunGlow.material.uniforms.viewVector.value.copy(camera.position);

//       renderer.render(scene, camera);
//     }

//     animate();

//     // Handle resize
//     const handleResize = () => {
//       if (!mountRef.current) return;
//       const newWidth = mountRef.current.clientWidth;
//       const newHeight = mountRef.current.clientHeight;
      
//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(newWidth, newHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
      
//       canvas.removeEventListener('mousedown', handleMouseDown);
//       canvas.removeEventListener('click', handleClick);
//       canvas.removeEventListener('touchstart', handleTouchStart);

//       if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement);
//       }

//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-full bg-transparent">
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
//           <div className="text-white text-xl">Loading Solar System...</div>
//         </div>
//       )}
      
//       <div 
//         ref={mountRef} 
//         className="w-full h-full cursor-grab active:cursor-grabbing rounded-lg"
//       />
      
//       <div className="absolute bottom-4 left-4 text-white z-10 bg-black bg-opacity-50 px-3 py-2 rounded">
//         <p className="text-sm opacity-90">Drag to rotate • Click planets to select</p>
//         {selectedPlanet && (
//           <p className="text-lg font-bold mt-1 capitalize">{selectedPlanet}</p>
//         )}
//       </div>

//       <div className="absolute top-4 left-4 text-white z-10 bg-black bg-opacity-50 px-3 py-2 rounded">
//         <h2 className="text-xl font-bold">Solar System</h2>
//         <p className="text-sm opacity-75">Tilted 30° • All planets visible</p>
//       </div>
//     </div>
//   );
// }


/*
SolarSystem.tsx
A type-safe Next.js-ready React component using @react-three/fiber + @react-three/drei + three.
Place this file in your components/ folder and install dependencies:

npm install three @react-three/fiber @react-three/drei

Usage:
import dynamic from 'next/dynamic'
const SolarSystem = dynamic(() => import('@/components/SolarSystem'), { ssr: false })
<SolarSystem width={800} height={800} />

Notes:
- Textures paths already referenced in the planets array (you provided). Put the textures in public/textures/.
- Canvas is transparent (alpha) so the page background shows through.
*/
// "use client";
// import React, { useRef, useMemo, useState } from 'react';
// import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
// import { OrbitControls, Html, useTexture, } from '@react-three/drei';
// import * as THREE from 'three';

// type PlanetDef = {
//   name: string;
//   radius: number;
//   distance: number;
//   speed: number;
//   color: number;
//   texture?: string;
//   ringTexture?: string;
//   ringInnerRadius?: number;
//   ringOuterRadius?: number;
// };

// const planets: PlanetDef[] = [
//   { name: 'mercury', radius: 0.4, distance: 4, speed: 0.04, color: 0x8c7853, texture: '/textures/2k_mercury.jpg' },
//   { name: 'venus', radius: 0.6, distance: 6, speed: 0.015, color: 0xe6cdab, texture: '/textures/2k_venus_surface.jpg' },
//   { name: 'earth', radius: 0.7, distance: 8, speed: 0.01, color: 0x2233ff, texture: '/textures/2k_earth_daymap.jpg' },
//   { name: 'mars', radius: 0.5, distance: 10, speed: 0.008, color: 0xc1440e, texture: '/textures/2k_mars.jpg' },
//   { name: 'jupiter', radius: 1.5, distance: 13, speed: 0.004, color: 0xc19a6b, texture: '/textures/2k_jupiter.jpg' },
//   { name: 'saturn', radius: 1.2, distance: 16, speed: 0.003, color: 0xe3cfa9, texture: '/textures/2k_saturn.jpg', ringTexture: '/textures/2k_saturn_ring_alpha.png', ringInnerRadius: 1.5, ringOuterRadius: 2.5 },
//   { name: 'uranus', radius: 0.9, distance: 19, speed: 0.002, color: 0x4fd0e7, texture: '/textures/2k_uranus.jpg' },
//   { name: 'neptune', radius: 0.9, distance: 22, speed: 0.001, color: 0x4b70dd, texture: '/textures/2k_neptune.jpg' }
// ];

// function usePlanetTextures(list: PlanetDef[]) {
//   const textureMap = useTexture(
//     list
//       .map((p) => p.texture)
//       .filter(Boolean) as string[]
//   );
//   // useTexture returns either a single texture or array depending on input; normalize
//   const map: Record<string, THREE.Texture | undefined> = {};
//   list.forEach((p, i) => {
//     if (!p.texture) return;
//     const tex = Array.isArray(textureMap) ? textureMap.shift() : textureMap;
//     map[p.name] = tex as THREE.Texture;
//   });
//   return map;
// }

// function Planet({ planet, texture, onClick }: { planet: PlanetDef; texture?: THREE.Texture; onClick: (name: string) => void }) {
//   const ref = useRef<THREE.Mesh>(null!);
//   const groupRef = useRef<THREE.Group>(null!);
//   const [angle] = useState(Math.random() * Math.PI * 2);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     const a = angle + t * planet.speed;
//     const x = planet.distance * Math.cos(a);
//     const z = planet.distance * Math.sin(a);
//     groupRef.current.position.set(x, 0, z);
//     // rotate planet slowly for realism
//     if (ref.current) ref.current.rotation.y += 0.002 + planet.speed * 0.1;
//   });

//   return (
//     <group ref={groupRef}>
//       {/* Orbit ring */}
//       <mesh rotation={[Math.PI / 2, 0, 0]}>
//         <ringGeometry args={[planet.radius + 0.02, planet.radius + 0.03, 64]} />
//         <meshBasicMaterial transparent opacity={0.15} side={THREE.DoubleSide} />
//       </mesh>

//       <mesh
//         ref={ref}
//         onClick={(e: ThreeEvent<MouseEvent>) => {
//           e.stopPropagation();
//           onClick(planet.name);
//         }}
//         castShadow
//         receiveShadow
//       >
//         <sphereGeometry args={[planet.radius, 64, 64]} />
//         {texture ? (
//           <meshStandardMaterial map={texture} metalness={0.1} roughness={0.7} />
//         ) : (
//           <meshStandardMaterial color={planet.color} metalness={0.1} roughness={0.7} />
//         )}
//       </mesh>

//       {/* Special ring for Saturn */}
//       {planet.ringTexture && (
//         <mesh rotation={[0.95, 0, 0]}>
//           <ringGeometry args={[planet.ringInnerRadius ?? 1.5, planet.ringOuterRadius ?? 2.3, 128]} />
//           <meshBasicMaterial map={useTexture(planet.ringTexture)} transparent side={THREE.DoubleSide} />
//         </mesh>
//       )}
//     </group>
//   );
// }

// export default function SolarSystem({ width = 800, height = 800 }: { width?: number; height?: number }) {
//   const textureMap = usePlanetTextures(planets);
//   const sunTexture = useTexture('/textures/2k_sun.jpg');

//   const [focused, setFocused] = useState<string | null>(null);

//   const handlePlanetClick = (name: string) => {
//     setFocused((f) => (f === name ? null : name));
//   };

//   // Arrange planets on slight grid offsets for the "square grid arranged" feel
//   const planetPositions = useMemo(() => {
//     // We still use orbital motion, but we add tiny snapping to grid lines for the initial positions
//     return planets.map((p, i) => ({ ...p, gridOffset: (i % 2 === 0 ? 0.3 : -0.3) }));
//   }, []);

//   return (
//     <div style={{ width, height, touchAction: 'none', position: 'relative' }}>
//       <Canvas
//         shadows
//         gl={{ alpha: true, antialias: true }}
//         camera={{ position: [0, 12, 30], fov: 45 }}
//         style={{ background: 'transparent' }}
//       >
//         {/* Lighting */}
//         <ambientLight intensity={0.35} />
//         {/* Sun as point light source */}
//         <pointLight intensity={2.5} distance={200} castShadow position={[0, 0, 0]} />

//         {/* Sun mesh */}
//         <mesh position={[0, 0, 0]}>
//           <sphereGeometry args={[2, 64, 64]} />
//           <meshBasicMaterial toneMapped={false} map={sunTexture} />
//         </mesh>

//         {/* Grid helper - square grid */}
//         <gridHelper args={[60, 60, '#888888', '#444444']} position={[0, -2.0, 0]} />

//         {/* Planets */}
//         {planets.map((p) => (
//           <Planet key={p.name} planet={p} texture={textureMap[p.name]} onClick={handlePlanetClick} />
//         ))}

//         {/* Controls */}
//         <OrbitControls enablePan enableZoom enableRotate />

//         {/* Small fog for depth */}
//         <fog attach="fog" args={[0x000000, 40, 120]} />
//       </Canvas>

//       {/* UI overlay */}
//       {focused && (
//         <div
//           style={{
//             position: 'absolute',
//             right: 12,
//             top: 12,
//             background: 'rgba(0,0,0,0.6)',
//             color: 'white',
//             padding: 10,
//             borderRadius: 8,
//             fontFamily: 'Inter, system-ui, sans-serif',
//             fontSize: 13
//           }}
//         >
//           <strong>{focused.toUpperCase()}</strong>
//           <div style={{ marginTop: 6, opacity: 0.9 }}>Click the name to deselect</div>
//           <div style={{ marginTop: 8 }}>
//             <button
//               onClick={() => setFocused(null)}
//               style={{ padding: '6px 8px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// export default function TiltedSolarSystem() {
//   const mountRef = useRef<HTMLDivElement | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const width = () => mountRef.current!.clientWidth;
//     const height = () => mountRef.current!.clientHeight;

//     // Scene and renderer (transparent)
//     const scene = new THREE.Scene();
//     // keep background null so renderer stays transparent
//     scene.background = null;

//     const camera = new THREE.PerspectiveCamera(45, width() / height(), 0.1, 5000);

//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//       powerPreference: "high-performance",
//     });
//     renderer.setSize(width(), height());
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     // clear alpha explicitly
//     renderer.setClearColor(0x000000, 0);

//     mountRef.current.innerHTML = "";
//     mountRef.current.appendChild(renderer.domElement);

//     // Lights — keep neutral so textures aren't color-tinted; main illumination from Sun
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // tiny neutral ambient
//     scene.add(ambientLight);

//     const sunLight = new THREE.PointLight(0xffffff, 2.5, 1000, 2);
//     sunLight.castShadow = true;
//     scene.add(sunLight);

//     // Subtle directional fill so dark sides still show details
//     const dir = new THREE.DirectionalLight(0xffffff, 0.15);
//     dir.position.set(-10, 10, -10);
//     scene.add(dir);

//     // stars (subtle)
//     const starGeometry = new THREE.BufferGeometry();
//     const starCount = 2000;
//     const positions = new Float32Array(starCount * 3);
//     for (let i = 0; i < starCount * 3; i++) {
//       positions[i] = (Math.random() - 0.5) * 2000;
//     }
//     starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//     const starMaterial = new THREE.PointsMaterial({
//       size: 1,
//       sizeAttenuation: true,
//       transparent: true,
//       opacity: 0.9,
//     });
//     const stars = new THREE.Points(starGeometry, starMaterial);
//     scene.add(stars);

//     // Solar system group (tilted)
//     const solarSystem = new THREE.Group();
//     solarSystem.rotation.x = Math.PI / 6; // 30deg tilt initially
//     scene.add(solarSystem);

//     const textureLoader = new THREE.TextureLoader();
//     let texturesLoaded = 0;
//     const totalTextures = 9;

//     const onTextureLoad = () => {
//       texturesLoaded++;
//       if (texturesLoaded >= totalTextures) {
//         // when textures done, hide any overlay (we only show overlay while loading)
//         setLoading(false);
//       }
//     };

//     const planets = [
//       { name: "mercury", radius: 0.4, distance: 4, speed: 0.04, texture: "/textures/2k_mercury.jpg" },
//       { name: "venus", radius: 0.6, distance: 6, speed: 0.015, texture: "/textures/2k_venus_surface.jpg" },
//       { name: "earth", radius: 0.7, distance: 8, speed: 0.01, texture: "/textures/2k_earth_daymap.jpg" },
//       { name: "mars", radius: 0.5, distance: 10, speed: 0.008, texture: "/textures/2k_mars.jpg" },
//       { name: "jupiter", radius: 1.5, distance: 13, speed: 0.004, texture: "/textures/2k_jupiter.jpg" },
//       {
//         name: "saturn",
//         radius: 1.2,
//         distance: 16,
//         speed: 0.003,
//         texture: "/textures/2k_saturn.jpg",
//         ringTexture: "/textures/2k_saturn_ring_alpha.png",
//         ringInnerRadius: 1.5,
//         ringOuterRadius: 2.5,
//       },
//       { name: "uranus", radius: 0.9, distance: 19, speed: 0.002, texture: "/textures/2k_uranus.jpg" },
//       { name: "neptune", radius: 0.9, distance: 22, speed: 0.001, texture: "/textures/2k_neptune.jpg" },
//     ];

//     // Create Sun (emissive so it glows without tinting others)
//     const sunGeo = new THREE.SphereGeometry(2, 64, 64);
//     const sunTex = textureLoader.load("/textures/2k_sun.jpg", onTextureLoad);
//     const sunMat = new THREE.MeshBasicMaterial({
//       map: sunTex,
//     });
//     const sun = new THREE.Mesh(sunGeo, sunMat);
//     sun.castShadow = false;
//     sun.receiveShadow = false;
//     solarSystem.add(sun);
//     sunLight.position.copy(sun.position);

//     // subtle glow (backside additive)
//     const glowGeo = new THREE.SphereGeometry(2.3, 32, 32);
//     const glowMat = new THREE.ShaderMaterial({
//       uniforms: { glowColor: { value: new THREE.Color(0xffa054) }, viewVector: { value: camera.position } },
//       vertexShader: `
//         uniform vec3 viewVector;
//         varying float intensity;
//         void main(){
//           vec3 vNormal = normalize(normalMatrix * normal);
//           vec3 vNormView = normalize( (modelViewMatrix * vec4(position,1.0)).xyz );
//           intensity = pow(0.5 - dot(vNormal, normalize(viewVector)), 2.0);
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform vec3 glowColor;
//         varying float intensity;
//         void main(){
//           gl_FragColor = vec4(glowColor, intensity * 0.45);
//         }
//       `,
//       side: THREE.BackSide,
//       blending: THREE.AdditiveBlending,
//       transparent: true,
//     });
//     const sunGlow = new THREE.Mesh(glowGeo, glowMat);
//     sun.add(sunGlow);

//     // Create planets and groups
//     const planetMeshes: THREE.Mesh[] = [];
//     const planetGroups: THREE.Group[] = [];

//     planets.forEach((p) => {
//       const group = new THREE.Group();
//       solarSystem.add(group);

//       const geo = new THREE.SphereGeometry(p.radius, 32, 32);

//       // Use MeshStandardMaterial without color tint — textures only
//       let mat: THREE.MeshStandardMaterial;
//       if (p.texture) {
//         const tex = textureLoader.load(p.texture, onTextureLoad);
//         mat = new THREE.MeshStandardMaterial({
//           map: tex,
//           metalness: 0,
//           roughness: 0.4,
//         });
//       } else {
//         mat = new THREE.MeshStandardMaterial({
//           color: 0x888888,
//           metalness: 0,
//           roughness: 0.4,
//         });
//       }

//       const mesh = new THREE.Mesh(geo, mat);
//       mesh.castShadow = true;
//       mesh.receiveShadow = true;
//       mesh.userData = { name: p.name };
//       group.add(mesh);

//       // orbit ring (subtle)
//       const orbitGeo = new THREE.RingGeometry(p.distance - 0.05, p.distance + 0.05, 128);
//       const orbitMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
//       const orbit = new THREE.Mesh(orbitGeo, orbitMat);
//       orbit.rotation.x = Math.PI / 2;
//       solarSystem.add(orbit);

//       // Saturn rings use alpha map if provided (keeps texture look)
//       if (p.name === "saturn" && p.ringTexture) {
//         const ringGeo = new THREE.RingGeometry(p.radius + 0.35, p.radius + 1.1, 64);
//         const ringTex = textureLoader.load(p.ringTexture, onTextureLoad);
//         const ringMat = new THREE.MeshStandardMaterial({
//           map: ringTex,
//           side: THREE.DoubleSide,
//           transparent: true,
//           metalness: 0,
//           roughness: 1,
//         });
//         const ringMesh = new THREE.Mesh(ringGeo, ringMat);
//         ringMesh.rotation.x = Math.PI / 3;
//         mesh.add(ringMesh);
//       }

//       planetMeshes.push(mesh);
//       planetGroups.push(group);
//     });

//     // Calculate view fit so whole system visible at a glance
//     const maxExtent = Math.max(...planets.map((p) => p.distance + (p.radius || 0)));
//     camera.position.set(0, Math.max(8, maxExtent * 0.45 + 8), Math.max(25, maxExtent * 1.9));
//     camera.lookAt(0, 0, 0);

//     // Animation / interaction setup
//     const planetAngles = planets.map(() => Math.random() * Math.PI * 2);

//     // Drag to rotate
//     let isDragging = false;
//     let prevPos = { x: 0, y: 0 };
//     const systemRotation = { x: solarSystem.rotation.x, y: solarSystem.rotation.y };

//     const onPointerDown = (e: MouseEvent | TouchEvent) => {
//       isDragging = true;
//       const p = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent);
//       prevPos = { x: (p as any).clientX, y: (p as any).clientY };
//       // change cursor
//       renderer.domElement.style.cursor = "grabbing";
//     };

//     const onPointerMoveDrag = (e: MouseEvent | TouchEvent) => {
//       if (!isDragging) return;
//       const p = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent);
//       const curr = { x: (p as any).clientX, y: (p as any).clientY };
//       const delta = { x: curr.x - prevPos.x, y: curr.y - prevPos.y };

//       systemRotation.y += delta.x * 0.01;
//       systemRotation.x += delta.y * 0.01;
//       systemRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, systemRotation.x));

//       prevPos = curr;
//     };

//     const onPointerUp = () => {
//       isDragging = false;
//       renderer.domElement.style.cursor = "grab";
//     };

//     renderer.domElement.addEventListener("mousedown", onPointerDown as any);
//     window.addEventListener("mousemove", onPointerMoveDrag as any);
//     window.addEventListener("mouseup", onPointerUp);
//     renderer.domElement.addEventListener("touchstart", onPointerDown as any, { passive: true });
//     window.addEventListener("touchmove", onPointerMoveDrag as any, { passive: true });
//     window.addEventListener("touchend", onPointerUp);

//     // Hover highlighting using raycaster (no text UI shown)
//     const raycaster = new THREE.Raycaster();
//     const pointer = new THREE.Vector2();
//     let hoveredIndex: number | null = null;

//     const onPointerMove = (event: MouseEvent) => {
//       const rect = renderer.domElement.getBoundingClientRect();
//       pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//       raycaster.setFromCamera(pointer, camera);
//       const intersects = raycaster.intersectObjects(planetMeshes, false);

//       if (intersects.length > 0) {
//         const idx = planetMeshes.indexOf(intersects[0].object as THREE.Mesh);
//         if (idx !== hoveredIndex) {
//           // reset previous
//           if (hoveredIndex !== null && planetMeshes[hoveredIndex]) {
//             planetMeshes[hoveredIndex].scale.setScalar(1);
//           }
//           hoveredIndex = idx;
//           planetMeshes[hoveredIndex].scale.setScalar(1.12); // gentle highlight scale
//           renderer.domElement.style.cursor = "pointer";
//         }
//       } else {
//         if (hoveredIndex !== null && planetMeshes[hoveredIndex]) {
//           planetMeshes[hoveredIndex].scale.setScalar(1);
//         }
//         hoveredIndex = null;
//         renderer.domElement.style.cursor = "grab";
//       }
//     };

//     renderer.domElement.addEventListener("mousemove", onPointerMove);

//     // Disable zoom intentionally (no orbit controls) — camera is fixed to give full view at a glance

//     // Animation loop
//     let rafId: number;
//     function animate() {
//       rafId = requestAnimationFrame(animate);

//       // update rotation from interactions
//       solarSystem.rotation.x = systemRotation.x;
//       solarSystem.rotation.y = systemRotation.y;

//       // gentle auto-rotate when not dragging
//       if (!isDragging) {
//         systemRotation.y += 0.0009;
//       }

//       // update planets orbit and rotation
//       planets.forEach((p, i) => {
//         planetAngles[i] += p.speed;
//         const g = planetGroups[i];
//         g.position.x = Math.cos(planetAngles[i]) * p.distance;
//         g.position.z = Math.sin(planetAngles[i]) * p.distance;

//         // rotate planet on axis
//         planetMeshes[i].rotation.y += 0.01;
//       });

//       // rotate sun slowly
//       sun.rotation.y += 0.0015;

//       // update glow view vector
//       if ((sunGlow.material as any).uniforms) {
//         (sunGlow.material as any).uniforms.viewVector.value.copy(camera.position);
//       }

//       renderer.render(scene, camera);
//     }

//     animate();

//     // resize handling
//     const onResize = () => {
//       if (!mountRef.current) return;
//       const w = mountRef.current.clientWidth;
//       const h = mountRef.current.clientHeight;
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//       renderer.setSize(w, h);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     };
//     window.addEventListener("resize", onResize);

//     // cleanup
//     return () => {
//       window.removeEventListener("resize", onResize);
//       window.removeEventListener("mousemove", onPointerMove as any);
//       renderer.domElement.removeEventListener("mousemove", onPointerMove);
//       renderer.domElement.removeEventListener("mousedown", onPointerDown as any);
//       window.removeEventListener("mouseup", onPointerUp);
//       window.removeEventListener("mousemove", onPointerMoveDrag as any);
//       renderer.domElement.removeEventListener("touchstart", onPointerDown as any);
//       window.removeEventListener("touchmove", onPointerMoveDrag as any);
//       window.removeEventListener("touchend", onPointerUp);

//       cancelAnimationFrame(rafId);

//       // dispose geometries and materials
//       planetMeshes.forEach((m) => {
//         if (m.geometry) m.geometry.dispose();
//         const mat = m.material as THREE.Material;
//         if (mat) {
//           if ((mat as any).map) (mat as any).map.dispose();
//           mat.dispose();
//         }
//       });

//       // dispose sun
//       if (sun.geometry) sun.geometry.dispose();
//       if (sun.material) {
//         const mat = sun.material as any;
//         if (mat.map) mat.map.dispose();
//         sun.material.dispose();
//       }

//       // renderer cleanup
//       renderer.dispose();
//       if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   // UI: only show a tiny, transparent loader while textures load.
//   // After load === false, nothing (no texts/labels/overlays) will be visible.
//   return (
//     <div className="relative w-full h-full">
//       {loading && (
//         <div
//           className="absolute inset-0 z-30 flex items-center justify-center"
//           style={{ pointerEvents: "none", background: "transparent" }}
//         >
//           <div
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: "50%",
//               border: "3px solid rgba(255,255,255,0.2)",
//               borderTop: "3px solid rgba(255,255,255,0.9)",
//               animation: "spin 1s linear infinite",
//             }}
//           />
//           <style>
//             {`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}
//           </style>
//         </div>
//       )}

//       <div
//         ref={mountRef}
//         className="w-full h-full cursor-grab active:cursor-grabbing rounded-lg"
//         style={{ touchAction: "none" }}
//       />
//       {/* No HUD / no descriptive text after load — transparent and clean */}
//     </div>
//   );
// }
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// // Import color space constants directly if you need them.
// // THREE.ColorSpace is a more modern approach.
// import { SRGBColorSpace } from "three";

// export default function TiltedSolarSystem() {
//   const mountRef = useRef<HTMLDivElement | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const width = () => mountRef.current!.clientWidth;
//     const height = () => mountRef.current!.clientHeight;

//     // Scene and renderer (transparent)
//     const scene = new THREE.Scene();
//     scene.background = null;

//     const camera = new THREE.PerspectiveCamera(
//       45,
//       width() / height(),
//       0.1,
//       5000
//     );

//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//       powerPreference: "high-performance",
//     });
//     renderer.setSize(width(), height());
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.setClearColor(0x000000, 0);

//     // ensure correct color output (Fixed)
//     // Use outputColorSpace instead of outputEncoding.
//     renderer.outputColorSpace = SRGBColorSpace; 

//     // physically-correct light falloff (Fixed)
//     // physicallyCorrectLights is now true by default, but setting it doesn't hurt.
//     // If your THREE.js version is very new, you might not need this line.
//     // The property has been removed. We remove the line entirely as it's default now.

//     mountRef.current.innerHTML = "";
//     mountRef.current.appendChild(renderer.domElement);

//     // Lights — keep neutral so textures aren't color-tinted; main illumination from Sun
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.08); // slightly higher so shadow sides keep texture detail
//     scene.add(ambientLight);

//     // Sun light - stronger and physically correct decay
//     const sunLight = new THREE.PointLight(0xffffff, 3.2, 1000, 1); // intensity higher, decay 1
//     sunLight.castShadow = true;
//     // shadow settings (optional tuning)
//     sunLight.shadow.bias = -0.0005;
//     sunLight.shadow.mapSize.width = 1024;
//     sunLight.shadow.mapSize.height = 1024;
//     scene.add(sunLight);

//     // subtle directional fill (very low) to prevent complete black occlusion
//     const dir = new THREE.DirectionalLight(0xffffff, 0.08);
//     dir.position.set(-10, 10, -10);
//     scene.add(dir);

//     // stars (subtle)
//     const starGeometry = new THREE.BufferGeometry();
//     const starCount = 2000;
//     const positions = new Float32Array(starCount * 3);
//     for (let i = 0; i < starCount * 3; i++) {
//       positions[i] = (Math.random() - 0.5) * 2000;
//     }
//     starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//     const starMaterial = new THREE.PointsMaterial({
//       size: 1,
//       sizeAttenuation: true,
//       transparent: true,
//       opacity: 0.9,
//     });
//     const stars = new THREE.Points(starGeometry, starMaterial);
//     scene.add(stars);

//     // Solar system group (tilted)
//     const solarSystem = new THREE.Group();
//     solarSystem.rotation.x = Math.PI / 6; // 30deg tilt initially
//     scene.add(solarSystem);

//     const textureLoader = new THREE.TextureLoader();
//     let texturesLoaded = 0;
//     // The sun, 8 planets, and 1 Saturn ring texture = 10 total textures
//     const totalTextures = 10; // Corrected count based on array definition

//     const onTextureLoad = () => {
//       texturesLoaded++;
//       if (texturesLoaded >= totalTextures) {
//         setLoading(false);
//       }
//     };

//     const planets = [
//       { name: "mercury", radius: 0.4, distance: 4, speed: 0.04, texture: "/textures/2k_mercury.jpg" },
//       { name: "venus", radius: 0.6, distance: 6, speed: 0.015, texture: "/textures/2k_venus_surface.jpg" },
//       { name: "earth", radius: 0.7, distance: 8, speed: 0.01, texture: "/textures/2k_earth_daymap.jpg" },
//       { name: "mars", radius: 0.5, distance: 10, speed: 0.008, texture: "/textures/2k_mars.jpg" },
//       { name: "jupiter", radius: 1.5, distance: 13, speed: 0.004, texture: "/textures/2k_jupiter.jpg" },
//       {
//         name: "saturn",
//         radius: 1.2,
//         distance: 16,
//         speed: 0.003,
//         texture: "/textures/2k_saturn.jpg",
//         ringTexture: "/textures/2k_saturn_ring_alpha.png",
//         ringInnerRadius: 1.5,
//         ringOuterRadius: 2.5,
//       },
//       { name: "uranus", radius: 0.9, distance: 19, speed: 0.002, texture: "/textures/2k_uranus.jpg" },
//       { name: "neptune", radius: 0.9, distance: 22, speed: 0.001, texture: "/textures/2k_neptune.jpg" },
//     ];

//     // Create Sun (emissive so it glows without tinting others)
//     const sunGeo = new THREE.SphereGeometry(2, 64, 64);
//     const sunTex = textureLoader.load("/textures/2k_sun.jpg", onTextureLoad);
//     // ensure correct encoding for sun texture as well (Removed: no longer needed)
//     const sunMat = new THREE.MeshBasicMaterial({
//       map: sunTex,
//     });
//     const sun = new THREE.Mesh(sunGeo, sunMat);
//     sun.castShadow = false;
//     sun.receiveShadow = false;
//     solarSystem.add(sun);
//     sunLight.position.copy(sun.position);

//     // NOTE: removed colored glow/ring around the sun per your request.
//     // If you later want a subtle white halo instead, we can add a gentle, low-alpha white shader.

//     // Create planets and groups
//     const planetMeshes: THREE.Mesh[] = [];
//     const planetGroups: THREE.Group[] = [];

//     planets.forEach((p) => {
//       const group = new THREE.Group();
//       solarSystem.add(group);

//       const geo = new THREE.SphereGeometry(p.radius, 32, 32);

//       // Use MeshStandardMaterial with texture only and reasonable roughness so details and highlights show
//       let mat: THREE.MeshStandardMaterial;
//       if (p.texture) {
//         const tex = textureLoader.load(p.texture, onTextureLoad);
//         // Important: sRGB encoding for color textures is now default (Removed: texture.encoding)
//         mat = new THREE.MeshStandardMaterial({
//           map: tex,
//           metalness: 0,
//           roughness: 0.35, // lower roughness for subtle specular highlights (not too shiny)
//         });
//         mat.needsUpdate = true;
//       } else {
//         mat = new THREE.MeshStandardMaterial({
//           color: 0x888888,
//           metalness: 0,
//           roughness: 0.35,
//         });
//       }

//       const mesh = new THREE.Mesh(geo, mat);
//       mesh.castShadow = true;
//       mesh.receiveShadow = true;
//       mesh.userData = { name: p.name };
//       group.add(mesh);

//       // orbit ring (subtle)
//       const orbitGeo = new THREE.RingGeometry(
//         p.distance - 0.05,
//         p.distance + 0.05,
//         128
//       );
//       const orbitMat = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//         transparent: true,
//         opacity: 0.06,
//         side: THREE.DoubleSide,
//       });
//       const orbit = new THREE.Mesh(orbitGeo, orbitMat);
//       orbit.rotation.x = Math.PI / 2;
//       solarSystem.add(orbit);

//       // Saturn rings use alpha map if provided (keeps texture look).
//       if (p.name === "saturn" && p.ringTexture) {
//         const ringGeo = new THREE.RingGeometry(
//           p.radius + 0.35,
//           p.radius + 1.1,
//           64
//         );
//         const ringTex = textureLoader.load(p.ringTexture, onTextureLoad);
//         // Removed: ringTex.encoding = THREE.sRGBEncoding;

//         const ringMat = new THREE.MeshStandardMaterial({
//           map: ringTex,
//           side: THREE.DoubleSide,
//           transparent: true,
//           metalness: 0,
//           roughness: 1,
//         });
//         const ringMesh = new THREE.Mesh(ringGeo, ringMat);
//         ringMesh.rotation.x = Math.PI / 3;
//         mesh.add(ringMesh);
//       }

//       planetMeshes.push(mesh);
//       planetGroups.push(group);
//     });

//     // Calculate view fit so whole system visible at a glance
//     const maxExtent = Math.max(
//       ...planets.map((p) => p.distance + (p.radius || 0))
//     );
//     camera.position.set(
//       0,
//       Math.max(8, maxExtent * 0.45 + 8),
//       Math.max(25, maxExtent * 1.9)
//     );
//     camera.lookAt(0, 0, 0);

//     // Animation / interaction setup
//     const planetAngles = planets.map(() => Math.random() * Math.PI * 2);

//     // Drag to rotate
//     let isDragging = false;
//     let prevPos = { x: 0, y: 0 };
//     const systemRotation = {
//       x: solarSystem.rotation.x,
//       y: solarSystem.rotation.y,
//     };

//     const onPointerDown = (e: MouseEvent | TouchEvent) => {
//       isDragging = true;
//       const p = (e as TouchEvent).touches
//         ? (e as TouchEvent).touches[0]
//         : (e as MouseEvent);
//       prevPos = { x: (p as any).clientX, y: (p as any).clientY };
//       renderer.domElement.style.cursor = "grabbing";
//     };

//     const onPointerMoveDrag = (e: MouseEvent | TouchEvent) => {
//       if (!isDragging) return;
//       const p = (e as TouchEvent).touches
//         ? (e as TouchEvent).touches[0]
//         : (e as MouseEvent);
//       const curr = { x: (p as any).clientX, y: (p as any).clientY };
//       const delta = { x: curr.x - prevPos.x, y: curr.y - prevPos.y };

//       systemRotation.y += delta.x * 0.01;
//       systemRotation.x += delta.y * 0.01;
//       systemRotation.x = Math.max(
//         -Math.PI / 2,
//         Math.min(Math.PI / 2, systemRotation.x)
//       );

//       prevPos = curr;
//     };

//     const onPointerUp = () => {
//       isDragging = false;
//       renderer.domElement.style.cursor = "grab";
//     };

//     renderer.domElement.addEventListener("mousedown", onPointerDown as any);
//     window.addEventListener("mousemove", onPointerMoveDrag as any);
//     window.addEventListener("mouseup", onPointerUp);
//     renderer.domElement.addEventListener("touchstart", onPointerDown as any, {
//       passive: true,
//     });
//     window.addEventListener("touchmove", onPointerMoveDrag as any, {
//       passive: true,
//     });
//     window.addEventListener("touchend", onPointerUp);

//     // Hover highlighting using raycaster (no text UI shown)
//     const raycaster = new THREE.Raycaster();
//     const pointer = new THREE.Vector2();
//     let hoveredIndex: number | null = null;

//     const onPointerMove = (event: MouseEvent) => {
//       const rect = renderer.domElement.getBoundingClientRect();
//       pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//       raycaster.setFromCamera(pointer, camera);
//       const intersects = raycaster.intersectObjects(planetMeshes, false);

//       if (intersects.length > 0) {
//         const idx = planetMeshes.indexOf(intersects[0].object as THREE.Mesh);
//         if (idx !== hoveredIndex) {
//           if (hoveredIndex !== null && planetMeshes[hoveredIndex]) {
//             planetMeshes[hoveredIndex].scale.setScalar(1);
//           }
//           hoveredIndex = idx;
//           planetMeshes[hoveredIndex].scale.setScalar(1.12);
//           renderer.domElement.style.cursor = "pointer";
//         }
//       } else {
//         if (hoveredIndex !== null && planetMeshes[hoveredIndex]) {
//           planetMeshes[hoveredIndex].scale.setScalar(1);
//         }
//         hoveredIndex = null;
//         renderer.domElement.style.cursor = "grab";
//       }
//     };

//     renderer.domElement.addEventListener("mousemove", onPointerMove);

//     // Animation loop
//     let rafId: number;
//     function animate() {
//       rafId = requestAnimationFrame(animate);

//       solarSystem.rotation.x = systemRotation.x;
//       solarSystem.rotation.y = systemRotation.y;

//       if (!isDragging) {
//         systemRotation.y += 0.0009;
//       }

//       planets.forEach((p, i) => {
//         planetAngles[i] += p.speed;
//         const g = planetGroups[i];
//         g.position.x = Math.cos(planetAngles[i]) * p.distance;
//         g.position.z = Math.sin(planetAngles[i]) * p.distance;

//         planetMeshes[i].rotation.y += 0.01;
//       });

//       sun.rotation.y += 0.0015;

//       // point light follows sun (still at center in this setup)
//       sunLight.position.copy(sun.position);

//       renderer.render(scene, camera);
//     }

//     animate();

//     // resize handling
//     const onResize = () => {
//       if (!mountRef.current) return;
//       const w = mountRef.current.clientWidth;
//       const h = mountRef.current.clientHeight;
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//       renderer.setSize(w, h);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     };
//     window.addEventListener("resize", onResize);

//     // cleanup
//     return () => {
//       window.removeEventListener("resize", onResize);
//       window.removeEventListener("mousemove", onPointerMove as any);
//       renderer.domElement.removeEventListener("mousemove", onPointerMove);
//       renderer.domElement.removeEventListener("mousedown", onPointerDown as any);
//       window.removeEventListener("mouseup", onPointerUp);
//       window.removeEventListener("mousemove", onPointerMoveDrag as any);
//       renderer.domElement.removeEventListener("touchstart", onPointerDown as any);
//       window.removeEventListener("touchmove", onPointerMoveDrag as any);
//       window.removeEventListener("touchend", onPointerUp);

//       cancelAnimationFrame(rafId);

//       // dispose geometries and materials
//       planetMeshes.forEach((m) => {
//         if (m.geometry) m.geometry.dispose();
//         const mat = m.material as THREE.Material;
//         if (mat) {
//           if ((mat as any).map) (mat as any).map.dispose();
//           mat.dispose();
//         }
//       });

//       // dispose sun
//       if (sun.geometry) sun.geometry.dispose();
//       if (sun.material) {
//         const mat = sun.material as any;
//         if (mat.map) mat.map.dispose();
//         sun.material.dispose();
//       }

//       // renderer cleanup
//       renderer.dispose();
//       if (
//         mountRef.current &&
//         renderer.domElement.parentNode === mountRef.current
//       ) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   // UI: only show a tiny, transparent loader while textures load.
//   // After load === false, nothing (no texts/labels/overlays) will be visible.
//   return (
//     <div className="relative w-full h-full">
//       {loading && (
//         <div
//           className="absolute inset-0 z-30 flex items-center justify-center"
//           style={{ pointerEvents: "none", background: "transparent" }}
//         >
//           <div
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: "50%",
//               border: "3px solid rgba(255,255,255,0.2)",
//               borderTop: "3px solid rgba(255,255,255,0.9)",
//               animation: "spin 1s linear infinite",
//             }}
//           />
//           <style>
//             {`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}
//           </style>
//         </div>
//       )}

//       <div
//         ref={mountRef}
//         className="w-full h-full cursor-grab active:cursor-grabbing rounded-lg"
//         style={{ touchAction: "none" }}
//       />
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { SRGBColorSpace } from "three";

// export default function TiltedSolarSystem() {
//   const mountRef = useRef<HTMLDivElement | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const width = () => mountRef.current!.clientWidth;
//     const height = () => mountRef.current!.clientHeight;

//     // --- SCENE SETUP ---
//     const scene = new THREE.Scene();
//     scene.background = null; // Transparent background

//     const camera = new THREE.PerspectiveCamera(
//       45,
//       width() / height(),
//       0.1,
//       5000
//     );

//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//       powerPreference: "high-performance",
//     });
//     renderer.setSize(width(), height());
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.setClearColor(0x000000, 0);
    
//     // Correct color space setting for modern Three.js (Replaces outputEncoding)
//     renderer.outputColorSpace = SRGBColorSpace; 

//     mountRef.current.innerHTML = "";
//     mountRef.current.appendChild(renderer.domElement);

//     // --- LIGHTING FIX: Increased Contrast and Definition ---
    
//     // 1. Ambient Light (Greatly Reduced for deeper shadows)
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.02); 
//     scene.add(ambientLight);

//     // 2. Sun Light (Increased intensity to punch through the reduced ambient light)
//     const sunLight = new THREE.PointLight(0xffffff, 5.0, 1000, 1); 
//     sunLight.castShadow = true;
//     sunLight.shadow.bias = -0.0005;
//     sunLight.shadow.mapSize.width = 1024;
//     sunLight.shadow.mapSize.height = 1024;
//     scene.add(sunLight);

//     // Subtle directional fill
//     const dir = new THREE.DirectionalLight(0xffffff, 0.08);
//     dir.position.set(-10, 10, -10);
//     scene.add(dir);

//     // --- STARS ---
//     const starGeometry = new THREE.BufferGeometry();
//     const starCount = 2000;
//     const positions = new Float32Array(starCount * 3);
//     for (let i = 0; i < starCount * 3; i++) {
//       positions[i] = (Math.random() - 0.5) * 2000;
//     }
//     starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//     const starMaterial = new THREE.PointsMaterial({
//       size: 1,
//       sizeAttenuation: true,
//       transparent: true,
//       opacity: 0.9,
//     });
//     const stars = new THREE.Points(starGeometry, starMaterial);
//     scene.add(stars);

//     // Solar system group (tilted)
//     const solarSystem = new THREE.Group();
//     solarSystem.rotation.x = Math.PI / 6; // 30deg tilt initially
//     scene.add(solarSystem);

//     const textureLoader = new THREE.TextureLoader();
//     let texturesLoaded = 0;
//     const totalTextures = 10; // Sun + 8 Planets + 1 Ring

//     const onTextureLoad = () => {
//       texturesLoaded++;
//       if (texturesLoaded >= totalTextures) {
//         setLoading(false);
//       }
//     };

//     // --- PLANET DATA FIX: Reduced orbital distances (Scale Down) ---
//     const planets = [
//       { name: "mercury", radius: 0.4, distance: 2.5, speed: 0.04, texture: "/textures/2k_mercury.jpg" },
//       { name: "venus", radius: 0.6, distance: 4.0, speed: 0.015, texture: "/textures/2k_venus_surface.jpg" },
//       { name: "earth", radius: 0.7, distance: 5.5, speed: 0.01, texture: "/textures/2k_earth_daymap.jpg" },
//       { name: "mars", radius: 0.5, distance: 7.0, speed: 0.008, texture: "/textures/2k_mars.jpg" },
//       { name: "jupiter", radius: 1.5, distance: 9.0, speed: 0.004, texture: "/textures/2k_jupiter.jpg" },
//       {
//         name: "saturn",
//         radius: 1.2,
//         distance: 11.0, // Reduced from 16
//         speed: 0.003,
//         texture: "/textures/2k_saturn.jpg",
//         ringTexture: "/textures/2k_saturn_ring_alpha.png",
//         ringInnerRadius: 1.5,
//         ringOuterRadius: 2.5,
//       },
//       { name: "uranus", radius: 0.9, distance: 13.0, speed: 0.002, texture: "/textures/2k_uranus.jpg" },
//       { name: "neptune", radius: 0.9, distance: 15.0, speed: 0.001, texture: "/textures/2k_neptune.jpg" }, // Reduced from 22
//     ];

//     // Create Sun
//     const sunGeo = new THREE.SphereGeometry(2, 64, 64);
//     const sunTex = textureLoader.load("/textures/2k_sun.jpg", onTextureLoad);
//     const sunMat = new THREE.MeshBasicMaterial({
//       map: sunTex,
//     });
//     const sun = new THREE.Mesh(sunGeo, sunMat);
//     sun.castShadow = false;
//     sun.receiveShadow = false;
//     solarSystem.add(sun);
//     sunLight.position.copy(sun.position);

//     // Create planets and groups
//     const planetMeshes: THREE.Mesh[] = [];
//     const planetGroups: THREE.Group[] = [];

//     planets.forEach((p) => {
//       const group = new THREE.Group();
//       solarSystem.add(group);

//       const geo = new THREE.SphereGeometry(p.radius, 32, 32);

//       let mat: THREE.MeshStandardMaterial;
//       if (p.texture) {
//         const tex = textureLoader.load(p.texture, onTextureLoad);
//         // tex.encoding is deprecated and removed. Default sRGB is used.
//         mat = new THREE.MeshStandardMaterial({
//           map: tex,
//           metalness: 0,
//           roughness: 0.35,
//         });
//         mat.needsUpdate = true;
//       } else {
//         mat = new THREE.MeshStandardMaterial({
//           color: 0x888888,
//           metalness: 0,
//           roughness: 0.35,
//         });
//       }

//       const mesh = new THREE.Mesh(geo, mat);
//       mesh.castShadow = true;
//       mesh.receiveShadow = true;
//       mesh.userData = { name: p.name };
//       group.add(mesh);

//       // orbit ring (subtle)
//       const orbitGeo = new THREE.RingGeometry(
//         p.distance - 0.02,
//         p.distance + 0.02,
//         128
//       );
//       const orbitMat = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//         transparent: true,
//         opacity: 0.08, // slightly brighter orbits
//         side: THREE.DoubleSide,
//       });
//       const orbit = new THREE.Mesh(orbitGeo, orbitMat);
//       orbit.rotation.x = Math.PI / 2;
//       solarSystem.add(orbit);

//       // Saturn rings
//       if (p.name === "saturn" && p.ringTexture) {
//         const ringGeo = new THREE.RingGeometry(
//           p.radius + 0.35,
//           p.radius + 1.1,
//           64
//         );
//         const ringTex = textureLoader.load(p.ringTexture, onTextureLoad);
//         const ringMat = new THREE.MeshStandardMaterial({
//           map: ringTex,
//           side: THREE.DoubleSide,
//           transparent: true,
//           metalness: 0,
//           roughness: 1,
//         });
//         const ringMesh = new THREE.Mesh(ringGeo, ringMat);
//         ringMesh.rotation.x = Math.PI / 3;
//         mesh.add(ringMesh);
//       }

//       planetMeshes.push(mesh);
//       planetGroups.push(group);
//     });

//     // --- CAMERA FIX: Adjusted to fit the new, smaller system ---
//     const maxExtent = Math.max(
//       ...planets.map((p) => p.distance + (p.radius || 0))
//     ); // Now around 15.5
    
//     // Position the camera further back based on the new max extent
//     camera.position.set(
//       0,
//       maxExtent * 0.5, // Look down slightly
//       maxExtent * 2.5 // Pull back significantly
//     );
//     camera.lookAt(0, 0, 0);

//     // Animation / interaction setup
//     const planetAngles = planets.map(() => Math.random() * Math.PI * 2);

//     // Drag to rotate
//     let isDragging = false;
//     let prevPos = { x: 0, y: 0 };
//     const systemRotation = {
//       x: solarSystem.rotation.x,
//       y: solarSystem.rotation.y,
//     };

//     const onPointerDown = (e: MouseEvent | TouchEvent) => {
//       isDragging = true;
//       const p = (e as TouchEvent).touches
//         ? (e as TouchEvent).touches[0]
//         : (e as MouseEvent);
//       prevPos = { x: (p as any).clientX, y: (p as any).clientY };
//       renderer.domElement.style.cursor = "grabbing";
//     };

//     const onPointerMoveDrag = (e: MouseEvent | TouchEvent) => {
//       if (!isDragging) return;
//       const p = (e as TouchEvent).touches
//         ? (e as TouchEvent).touches[0]
//         : (e as MouseEvent);
//       const curr = { x: (p as any).clientX, y: (p as any).clientY };
//       const delta = { x: curr.x - prevPos.x, y: curr.y - prevPos.y };

//       // Apply drag rotation
//       systemRotation.y += delta.x * 0.005; // Reduced sensitivity
//       systemRotation.x += delta.y * 0.005; // Reduced sensitivity
      
//       // Clamp vertical rotation
//       systemRotation.x = Math.max(
//         -Math.PI / 2,
//         Math.min(Math.PI / 2, systemRotation.x)
//       );

//       prevPos = curr;
//     };

//     const onPointerUp = () => {
//       isDragging = false;
//       renderer.domElement.style.cursor = "grab";
//     };

//     // Attach listeners
//     renderer.domElement.addEventListener("mousedown", onPointerDown as any);
//     window.addEventListener("mousemove", onPointerMoveDrag as any);
//     window.addEventListener("mouseup", onPointerUp);
//     renderer.domElement.addEventListener("touchstart", onPointerDown as any, {
//       passive: true,
//     });
//     window.addEventListener("touchmove", onPointerMoveDrag as any, {
//       passive: true,
//     });
//     window.addEventListener("touchend", onPointerUp);

//     // Hover highlighting using raycaster
//     const raycaster = new THREE.Raycaster();
//     const pointer = new THREE.Vector2();
//     let hoveredIndex: number | null = null;

//     const onPointerMove = (event: MouseEvent) => {
//       const rect = renderer.domElement.getBoundingClientRect();
//       pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//       raycaster.setFromCamera(pointer, camera);
//       const intersects = raycaster.intersectObjects(planetMeshes, false);

//       if (intersects.length > 0) {
//         const idx = planetMeshes.indexOf(intersects[0].object as THREE.Mesh);
//         if (idx !== hoveredIndex) {
//           if (hoveredIndex !== null && planetMeshes[hoveredIndex]) {
//             planetMeshes[hoveredIndex].scale.setScalar(1);
//           }
//           hoveredIndex = idx;
//           planetMeshes[hoveredIndex].scale.setScalar(1.12);
//           renderer.domElement.style.cursor = "pointer";
//         }
//       } else {
//         if (hoveredIndex !== null && planetMeshes[hoveredIndex]) {
//           planetMeshes[hoveredIndex].scale.setScalar(1);
//         }
//         hoveredIndex = null;
//         renderer.domElement.style.cursor = "grab";
//       }
//     };

//     renderer.domElement.addEventListener("mousemove", onPointerMove);

//     // Animation loop
//     let rafId: number;
//     function animate() {
//       rafId = requestAnimationFrame(animate);

//       // Apply user rotation
//       solarSystem.rotation.x = systemRotation.x;
//       solarSystem.rotation.y = systemRotation.y;

//       // Gentle auto-rotation when not dragging
//       if (!isDragging) {
//         systemRotation.y += 0.0004; // Slower auto-rotation
//       }

//       // Planet orbits and self-rotation
//       planets.forEach((p, i) => {
//         planetAngles[i] += p.speed;
//         const g = planetGroups[i];
//         g.position.x = Math.cos(planetAngles[i]) * p.distance;
//         g.position.z = Math.sin(planetAngles[i]) * p.distance;

//         planetMeshes[i].rotation.y += 0.01;
//       });

//       // Sun self-rotation
//       sun.rotation.y += 0.0015;

//       sunLight.position.copy(sun.position);

//       renderer.render(scene, camera);
//     }

//     animate();

//     // resize handling
//     const onResize = () => {
//       if (!mountRef.current) return;
//       const w = mountRef.current.clientWidth;
//       const h = mountRef.current.clientHeight;
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//       renderer.setSize(w, h);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     };
//     window.addEventListener("resize", onResize);

//     // cleanup
//     return () => {
//       // Remove all listeners
//       window.removeEventListener("resize", onResize);
//       window.removeEventListener("mousemove", onPointerMove as any);
//       renderer.domElement.removeEventListener("mousemove", onPointerMove);
//       renderer.domElement.removeEventListener("mousedown", onPointerDown as any);
//       window.removeEventListener("mouseup", onPointerUp);
//       window.removeEventListener("mousemove", onPointerMoveDrag as any);
//       renderer.domElement.removeEventListener("touchstart", onPointerDown as any);
//       window.removeEventListener("touchmove", onPointerMoveDrag as any);
//       window.removeEventListener("touchend", onPointerUp);

//       cancelAnimationFrame(rafId);

//       // Dispose resources
//       planetMeshes.forEach((m) => {
//         if (m.geometry) m.geometry.dispose();
//         const mat = m.material as THREE.Material;
//         if (mat) {
//           if ((mat as any).map) (mat as any).map.dispose();
//           mat.dispose();
//         }
//       });

//       if (sun.geometry) sun.geometry.dispose();
//       if (sun.material) {
//         const mat = sun.material as any;
//         if (mat.map) mat.map.dispose();
//         sun.material.dispose();
//       }

//       renderer.dispose();
//       if (
//         mountRef.current &&
//         renderer.domElement.parentNode === mountRef.current
//       ) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   // UI: Show a loader while textures load
//   return (
//     <div className="relative w-full h-full">
//       {loading && (
//         <div
//           className="absolute inset-0 z-30 flex items-center justify-center"
//           style={{ pointerEvents: "none", background: "rgba(0, 0, 0, 0.1)" }}
//         >
//           <div
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: "50%",
//               border: "3px solid rgba(255,255,255,0.2)",
//               borderTop: "3px solid rgba(255,255,255,0.9)",
//               animation: "spin 1s linear infinite",
//             }}
//           />
//           <style>
//             {`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}
//           </style>
//         </div>
//       )}

//       <div
//         ref={mountRef}
//         className="w-full h-full cursor-grab active:cursor-grabbing rounded-lg"
//         style={{ touchAction: "none" }}
//       />
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SRGBColorSpace } from "three";

// Define a type for the planet data structure, ensuring it's strongly typed.
interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  texture: string;
  ringTexture?: string;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
}

export default function TiltedSolarSystem() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Use non-null assertion as we check for mountRef.current above
    const currentMount = mountRef.current!;

    const width = () => currentMount.clientWidth;
    const height = () => currentMount.clientHeight;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    const camera = new THREE.PerspectiveCamera(
      45,
      width() / height(),
      0.1,
      5000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width(), height());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);

    // Correct color space setting for modern Three.js
    renderer.outputColorSpace = SRGBColorSpace;

    currentMount.innerHTML = "";
    currentMount.appendChild(renderer.domElement);

    // --- LIGHTING FIX: Increased Contrast and Definition ---

    // 1. Ambient Light (Greatly Reduced for deeper shadows)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
    scene.add(ambientLight);

    // 2. Sun Light (Increased intensity to punch through the reduced ambient light)
    const sunLight = new THREE.PointLight(0xffffff, 5.0, 1000, 1);
    sunLight.castShadow = true;
    sunLight.shadow.bias = -0.0005;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Subtle directional fill
    const dir = new THREE.DirectionalLight(0xffffff, 0.08);
    dir.position.set(-10, 10, -10);
    scene.add(dir);

    // --- STARS ---
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2000;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Solar system group (tilted)
    const solarSystem = new THREE.Group();
    solarSystem.rotation.x = Math.PI / 6; // 30deg tilt initially
    scene.add(solarSystem);

    const textureLoader = new THREE.TextureLoader();
    let texturesLoaded = 0;
    const totalTextures = 10; // Sun + 8 Planets + 1 Ring

    const onTextureLoad = () => {
      texturesLoaded++;
      if (texturesLoaded >= totalTextures) {
        setLoading(false);
      }
    };

    // --- PLANET DATA FIX: Reduced orbital distances (Scale Down) ---
    const planets: PlanetData[] = [ // Use the defined PlanetData type
      { name: "mercury", radius: 0.4, distance: 2.5, speed: 0.04, texture: "/textures/2k_mercury.jpg" },
      { name: "venus", radius: 0.6, distance: 4.0, speed: 0.015, texture: "/textures/2k_venus_surface.jpg" },
      { name: "earth", radius: 0.7, distance: 5.5, speed: 0.01, texture: "/textures/2k_earth_daymap.jpg" },
      { name: "mars", radius: 0.5, distance: 7.0, speed: 0.008, texture: "/textures/2k_mars.jpg" },
      { name: "jupiter", radius: 1.5, distance: 9.0, speed: 0.004, texture: "/textures/2k_jupiter.jpg" },
      {
        name: "saturn",
        radius: 1.2,
        distance: 11.0, // Reduced from 16
        speed: 0.003,
        texture: "/textures/2k_saturn.jpg",
        ringTexture: "/textures/2k_saturn_ring_alpha.png",
        ringInnerRadius: 1.5,
        ringOuterRadius: 2.5,
      },
      { name: "uranus", radius: 0.9, distance: 13.0, speed: 0.002, texture: "/textures/2k_uranus.jpg" },
      { name: "neptune", radius: 0.9, distance: 15.0, speed: 0.001, texture: "/textures/2k_neptune.jpg" }, // Reduced from 22
    ];

    // Create Sun
    const sunGeo = new THREE.SphereGeometry(2, 64, 64);
    const sunTex = textureLoader.load("/textures/2k_sun.jpg", onTextureLoad);
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.castShadow = false;
    sun.receiveShadow = false;
    solarSystem.add(sun);
    sunLight.position.copy(sun.position);

    // Create planets and groups
    const planetMeshes: THREE.Mesh[] = [];
    const planetGroups: THREE.Group[] = [];

    planets.forEach((p) => {
      const group = new THREE.Group();
      solarSystem.add(group);

      const geo = new THREE.SphereGeometry(p.radius, 32, 32);

      let mat: THREE.MeshStandardMaterial;
      if (p.texture) {
        const tex = textureLoader.load(p.texture, onTextureLoad);
        mat = new THREE.MeshStandardMaterial({
          map: tex,
          metalness: 0,
          roughness: 0.35,
        });
        mat.needsUpdate = true;
      } else {
        mat = new THREE.MeshStandardMaterial({
          color: 0x888888,
          metalness: 0,
          roughness: 0.35,
        });
      }

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { name: p.name };
      group.add(mesh);

      // orbit ring (subtle)
      const orbitGeo = new THREE.RingGeometry(
        p.distance - 0.02,
        p.distance + 0.02,
        128
      );
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08, // slightly brighter orbits
        side: THREE.DoubleSide,
      });
      const orbit = new THREE.Mesh(orbitGeo, orbitMat);
      orbit.rotation.x = Math.PI / 2;
      solarSystem.add(orbit);

      // Saturn rings
      if (p.name === "saturn" && p.ringTexture) {
        // Use non-null assertion for ringInnerRadius and ringOuterRadius as they are guaranteed for Saturn
        const ringGeo = new THREE.RingGeometry(
          p.radius + 0.35,
          p.radius + 1.1,
          64
        );
        const ringTex = textureLoader.load(p.ringTexture, onTextureLoad);
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          metalness: 0,
          roughness: 1,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 3;
        mesh.add(ringMesh);
      }

      planetMeshes.push(mesh);
      planetGroups.push(group);
    });

    // --- CAMERA FIX: Adjusted to fit the new, smaller system ---
    const maxExtent = Math.max(
      ...planets.map((p) => p.distance + (p.radius || 0))
    ); // Now around 15.5

    // Position the camera further back based on the new max extent
    camera.position.set(
      0,
      maxExtent * 0.5, // Look down slightly
      maxExtent * 2.5 // Pull back significantly
    );
    camera.lookAt(0, 0, 0);

    // Animation / interaction setup
    const planetAngles = planets.map(() => Math.random() * Math.PI * 2);

    // Drag to rotate
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };
    const systemRotation = {
      x: solarSystem.rotation.x,
      y: solarSystem.rotation.y,
    };

    // Unified type for mouse or touch events for drag logic
    type PointerEvent = MouseEvent | TouchEvent;

    // Helper to get clientX/clientY from mouse or touch event
    const getClientPosition = (e: PointerEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      if ('clientX' in e) {
        return { x: e.clientX, y: e.clientY };
      }
      return { x: 0, y: 0 };
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      const pos = getClientPosition(e);
      prevPos = { x: pos.x, y: pos.y };
      renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerMoveDrag = (e: PointerEvent) => {
      if (!isDragging) return;
      // Prevent scrolling on touch
      if (e instanceof TouchEvent) {
          e.preventDefault();
      }

      const curr = getClientPosition(e);
      const delta = { x: curr.x - prevPos.x, y: curr.y - prevPos.y };

      // Apply drag rotation
      systemRotation.y += delta.x * 0.005; // Reduced sensitivity
      systemRotation.x += delta.y * 0.005; // Reduced sensitivity

      // Clamp vertical rotation
      systemRotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, systemRotation.x)
      );

      prevPos = curr;
    };

    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    // Attach listeners - using the correctly typed functions
    renderer.domElement.addEventListener("mousedown", onPointerDown as (e: MouseEvent) => void);
    window.addEventListener("mousemove", onPointerMoveDrag as (e: MouseEvent) => void);
    window.addEventListener("mouseup", onPointerUp);
    renderer.domElement.addEventListener("touchstart", onPointerDown as (e: TouchEvent) => void, {
      passive: true, // Use passive for better performance, but need to consider 'preventDefault' in move
    });
    window.addEventListener("touchmove", onPointerMoveDrag as (e: TouchEvent) => void, {
      passive: false, // Must be false to allow touch-based drag rotation
    });
    window.addEventListener("touchend", onPointerUp);

    // Hover highlighting using raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredIndex: number | null = null;

    const onPointerMove = (event: MouseEvent) => {
      if (isDragging) return; // Ignore raycasting while dragging
      
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      // Ensure only planet meshes are checked for intersection
      const intersects = raycaster.intersectObjects(planetMeshes, false);

      if (intersects.length > 0) {
        // The intersected object must be one of the planetMeshes
        const intersectedMesh = intersects[0].object as THREE.Mesh;
        const idx = planetMeshes.indexOf(intersectedMesh);

        if (idx !== hoveredIndex) {
          // Reset previous hover
          if (hoveredIndex !== null && planetMeshes[hoveredIndex]) {
            planetMeshes[hoveredIndex].scale.setScalar(1);
          }
          // Set new hover
          hoveredIndex = idx;
          planetMeshes[hoveredIndex].scale.setScalar(1.12);
          renderer.domElement.style.cursor = "pointer";
        }
      } else {
        // No intersection
        if (hoveredIndex !== null && planetMeshes[hoveredIndex]) {
          planetMeshes[hoveredIndex].scale.setScalar(1);
        }
        hoveredIndex = null;
        renderer.domElement.style.cursor = "grab";
      }
    };

    renderer.domElement.addEventListener("mousemove", onPointerMove);

    // Animation loop
    let rafId: number;
    function animate() {
      rafId = requestAnimationFrame(animate);

      // Apply user rotation
      solarSystem.rotation.x = systemRotation.x;
      solarSystem.rotation.y = systemRotation.y;

      // Gentle auto-rotation when not dragging
      if (!isDragging) {
        systemRotation.y += 0.0004; // Slower auto-rotation
      }

      // Planet orbits and self-rotation
      planets.forEach((p, i) => {
        planetAngles[i] += p.speed;
        const g = planetGroups[i];
        g.position.x = Math.cos(planetAngles[i]) * p.distance;
        g.position.z = Math.sin(planetAngles[i]) * p.distance;

        planetMeshes[i].rotation.y += 0.01;
      });

      // Sun self-rotation
      sun.rotation.y += 0.0015;

      // sunLight position tracks sun
      sunLight.position.copy(sun.position);

      renderer.render(scene, camera);
    }

    animate();

    // resize handling
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      // Remove all listeners with correct types
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousemove", onPointerMove);

      renderer.domElement.removeEventListener("mousedown", onPointerDown as (e: MouseEvent) => void);
      window.removeEventListener("mousemove", onPointerMoveDrag as (e: MouseEvent) => void);
      window.removeEventListener("mouseup", onPointerUp);

      renderer.domElement.removeEventListener("touchstart", onPointerDown as (e: TouchEvent) => void);
      window.removeEventListener("touchmove", onPointerMoveDrag as (e: TouchEvent) => void);
      window.removeEventListener("touchend", onPointerUp);


      cancelAnimationFrame(rafId);

      // Dispose resources
      planetMeshes.forEach((m) => {
        if (m.geometry) m.geometry.dispose();
        // Use type assertion for materials
        const mat = m.material as THREE.Material;
        if (mat) {
          if ((mat as THREE.MeshStandardMaterial).map) (mat as THREE.MeshStandardMaterial).map!.dispose();
          mat.dispose();
        }
      });

      if (sun.geometry) sun.geometry.dispose();
      if (sun.material) {
        const mat = sun.material as THREE.MeshBasicMaterial;
        if (mat.map) mat.map.dispose();
        mat.dispose();
      }

      renderer.dispose();
      if (
        mountRef.current &&
        renderer.domElement.parentNode === mountRef.current
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // UI: Show a loader while textures load
  return (
    <div className="relative w-full h-full">
      {loading && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ pointerEvents: "none", background: "rgba(0, 0, 0, 0.1)" }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.2)",
              borderTop: "3px solid rgba(255,255,255,0.9)",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>
            {`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}
          </style>
        </div>
      )}

      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-lg"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}