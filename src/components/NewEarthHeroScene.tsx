"use client";

// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';

// export default function EarthHeroScene() {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const width = mountRef.current.clientWidth;
//     const height = mountRef.current.clientHeight;

//     // --- Scene Setup ---
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
//     // Position camera to view the top half of the Earth
//     const EARTH_RADIUS = 2; // Earth radius as defined below
//     const CAMERA_DISTANCE = 8; // Distance from the center of the Earth
//     // Camera is placed further back and slightly above the center
//     camera.position.set(0, 1, CAMERA_DISTANCE); 

//     const renderer = new THREE.WebGLRenderer({ 
//       antialias: true, 
//       alpha: true, // Crucial for transparent background
//       powerPreference: "high-performance"
//     });
      
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
//     mountRef.current.innerHTML = '';
//     mountRef.current.appendChild(renderer.domElement);

//     // --- Lighting Setup ---
    
//     // 1. Primary Sun/Star Light
//     const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
//     sunLight.position.set(5, 5, 5); // From top-right-front
//     sunLight.castShadow = true;
//     scene.add(sunLight);

//     // 2. Ambient Light (for overall visibility)
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
//     scene.add(ambientLight);

//     // 3. Glare/Hero Light (focused on the top visible part)
//     const glareLight = new THREE.SpotLight(0xaaffff, 5, 15, Math.PI / 10, 0.5, 2);
//     // Positioned high and centered to create the bright spot/glare on the top of the Earth
//     glareLight.position.set(0, 5, 0); 
//     glareLight.target.position.set(0, 0, 0); // Aimed at the center of the scene (where Earth is)
//     scene.add(glareLight);
//     scene.add(glareLight.target);
    

//     // --- Create Earth ---
//     const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
//     const textureLoader = new THREE.TextureLoader();
      
//     const earthMaterial = new THREE.MeshPhongMaterial({
//       map: textureLoader.load(
//         'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
//         () => setLoading(false)
//       ),
//       bumpMap: textureLoader.load(
//         'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
//       ),
//       bumpScale: 0.05,
//       specularMap: textureLoader.load(
//         'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'
//       ),
//       specular: new THREE.Color(0x333333),
//       shininess: 25
//     });

//     const earth = new THREE.Mesh(earthGeometry, earthMaterial);
//     earth.castShadow = true;
//     earth.receiveShadow = true;
    
//     // Position Earth so its center is below the viewport's center, making only the top half visible
//     // 0 is the center, -EARTH_RADIUS positions the top of the sphere at the center of the viewport
//     // Let's adjust it slightly lower than center for the desired effect
//     earth.position.y = -EARTH_RADIUS * 0.7; 
//     scene.add(earth);

//     // --- Atmosphere glow ---
//     const glowGeometry = new THREE.SphereGeometry(EARTH_RADIUS * 1.05, 32, 32);
//     const glowMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         glowColor: { value: new THREE.Color(0x88ccff) },
//         // Use a position vector relative to the Earth for better glow effect
//         viewVector: { value: camera.position } 
//       },
//       vertexShader: `
//         uniform vec3 viewVector;
//         varying float intensity;
//         void main() {
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
//           // Calculate intensity based on the angle between view direction and normal
//           intensity = pow(0.7 - dot(normalize(viewVector - position.xyz), actual_normal), 2.0); 
//         }
//       `,
//       fragmentShader: `
//         uniform vec3 glowColor;
//         varying float intensity;
//         void main() {
//           vec3 glow = glowColor * intensity;
//           gl_FragColor = vec4(glow, intensity * 0.7);
//         }
//       `,
//       side: THREE.BackSide,
//       blending: THREE.AdditiveBlending,
//       transparent: true
//     });

//     const earthGlow = new THREE.Mesh(glowGeometry, glowMaterial);
//     earth.add(earthGlow);
    
//     // --- Interaction Variables and Handlers (Keep the original logic) ---
//     const earthRotationSpeed = 0.001; // For auto-rotation

//     let isDragging = false;
//     let previousMousePosition = { x: 0, y: 0 };
//     const earthRotation = { x: 0, y: 0 };

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

//       // Only allow rotation around the Y-axis (left/right drag) for a more fixed hero view
//       earthRotation.y += deltaMove.x * 0.01;
//       // earthRotation.x += deltaMove.y * 0.01; // Optional: Keep X-rotation locked or limited

//       previousMousePosition = { x: event.clientX, y: event.clientY };
//     };

//     const handleMouseUp = () => {
//       isDragging = false;
//     };

//     const canvas = renderer.domElement;
//     canvas.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);
    
//     // Touch events (keep original logic)
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
//       earthRotation.y += deltaMove.x * 0.01;
//       // earthRotation.x += deltaMove.y * 0.01;
      
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


//     // --- Animation Loop ---
//     function animate() {
//       requestAnimationFrame(animate);

//       // Apply Earth rotation
//       earth.rotation.x = earthRotation.x;
//       earth.rotation.y = earthRotation.y;

//       // Automatic rotation when not dragging
//       if (!isDragging) {
//         earthRotation.y += earthRotationSpeed;
//       }

//       // Update atmosphere
//       glowMaterial.uniforms.viewVector.value.copy(camera.position);

//       renderer.render(scene, camera);
//     }

//     animate();

//     // --- Handle Resize and Cleanup (Keep original logic) ---
//     const handleResize = () => {
//       if (!mountRef.current) return;
//       const newWidth = mountRef.current.clientWidth;
//       const newHeight = mountRef.current.clientHeight;
        
//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(newWidth, newHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
        
//       canvas.removeEventListener('mousedown', handleMouseDown);
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
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//           <div className="text-white text-xl">Loading Earth...</div>
//         </div>
//       )}
//       <div 
//         ref={mountRef} 
//         className="w-full h-full cursor-grab active:cursor-grabbing"
//         style={{ background: 'transparent' }}
//       />
//     </div>
//   );
// }

// "use client";
// // components/HeroicEarth.tsx
// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
// import { motion, useScroll, useTransform } from 'framer-motion';

// // --- Types ---
// interface EarthProps {
//   scrollProgress: number;
// }

// // Custom Earth Component (The 3D model and logic)
// const EarthModel: React.FC<EarthProps> = ({ scrollProgress }) => {
//   // Load a simple sphere as a placeholder for the Earth model
//   // In a real app, you'd use useGLTF to load a detailed Earth model
//   const meshRef = useRef<any>(null!);
  
//   // Use scrollProgress to control rotation
//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       // Rotate the Earth based on scroll (e.g., a full rotation over 100vh)
//       meshRef.current.rotation.y = scrollProgress * Math.PI * 4; 
//     }
//   });

//   // Example for simple glare effect: A directional light or a custom shader would be better
//   const LightGlare = () => (
//     <pointLight 
//       position={[5, 5, 5]} 
//       intensity={1.5} 
//       color="#e6e6ff" // Soft white/blue for a stellar glare
//     />
//   );
  
//   return (
//     <>
//       <LightGlare />
//       {/* Basic Earth representation: A sphere with a blue/green material */}
//       <mesh ref={meshRef} position={[0, 0, 0]}>
//         <sphereGeometry args={[1, 64, 64]} />
//         {/* Placeholder: Use a PBR texture for a realistic look in a real project */}
//         <meshStandardMaterial color="#0044ff" metalness={0.5} roughness={0.7} />
//       </mesh>
//     </>
//   );
// };

// // --- Main Component ---
// const HeroicEarth: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null!);
//   const { scrollYProgress } = useScroll({ target: containerRef });

//   // Use useTransform to map scroll progress (0 to 1) to a value suitable for the Earth component
//   const earthRotationProgress = useTransform(scrollYProgress, [0, 1], [0, 1]); // 0 to 1

//   // Map scroll progress for text visibility/position
//   const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]); 
//   const textY = useTransform(scrollYProgress, [0, 0.5], [100, 0]); // Slide up effect

//   // This is the container for the 3D canvas
//   // The '50vh' height is half the Heroic section's height.
//   // The 'absolute' positioning places it correctly relative to the parent Hero.
//   // The 'bottom-0' ensures it's at the bottom edge.
//   return (
//     <div 
//       ref={containerRef} 
//       className="relative w-full h-[150vh]" // Set a larger height for scroll effect
//     >
//       {/* 3D Canvas occupying full width and 50% height of the *visible* area */}
//       <div 
//         className="sticky top-0 w-full h-[100vh]" // Sticky container for the 3D element
//       >
//         <div className="absolute bottom-0 w-full h-[50vh] z-10">
//           <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
//             {/* The Environment map provides realistic light and reflections */}
//             <Environment preset="night" background={false} /> 
            
//             {/* The Earth Model */}
//             <EarthModel scrollProgress={earthRotationProgress.get()} />

//             {/* Optional: Add controls for debugging */}
//             {/* <OrbitControls enableZoom={false} /> */}
//           </Canvas>
//         </div>

//         {/* Scroll-Triggered Text Overlay */}
//         <motion.div 
//           className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white text-center p-4 z-20"
//           style={{ 
//             opacity: textOpacity, 
//             y: textY,
//             pointerEvents: 'none' // Don't block interaction
//           }}
//         >
//           <h2 className="text-5xl font-bold">Discover Your World</h2>
//           <p className="mt-2 text-xl">The journey begins as you scroll...</p>
//         </motion.div>

//         {/* --- FADE EFFECT at the Bottom --- */}
//         {/* This creates a gradient overlay to make the bottom 50% of the Earth 'faded' */}
//         <div className="absolute bottom-0 w-full h-[50vh] z-20">
//           <div className="w-full h-full bg-gradient-to-t from-black to-transparent" />
//         </div>
//       </div>
      
//       {/* Padding content to enable the scroll */}
//       <div className="h-[50vh]" /> 
//     </div>
//   );
// };

// export default HeroicEarth;
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / window.innerHeight, 1); // cap 0–1
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* === Background 3D Sphere === */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 5]} intensity={1.2} />
          <pointLight position={[0, -3, 3]} intensity={1.5} color="#88ccff" />
          <Suspense fallback={null}>
            <RotatingSphere rotationProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* === Text Overlay === */}
      <div className="z-10 text-center">
        <h1 className="text-6xl font-bold mb-4">Explore the World of 3D</h1>
        <p className="text-gray-300 text-lg">Scroll down to experience the motion</p>
      </div>

      {/* === Optional Overlay Shade (for better text contrast) === */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent -z-5 pointer-events-none" />
    </section>
  );
}

interface RotatingSphereProps {
  rotationProgress: number;
}

function RotatingSphere({ rotationProgress }: RotatingSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture("/textures/2k_earth_daymap.jpg");

  // Rotate sphere based on scroll
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotationProgress * Math.PI * 2;
    }
  }, [rotationProgress]);

  // Gentle auto-rotation
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <>
      <mesh ref={meshRef} scale={[6, 6, 6]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.45}
          metalness={0.25}
          emissive="#111"
          emissiveIntensity={0.4}
        />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}
