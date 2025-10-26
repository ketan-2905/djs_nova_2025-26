// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';

// export default function EarthMoonScene() {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 15;

//     const renderer = new THREE.WebGLRenderer({ 
//       antialias: true, 
//       alpha: true,
//       powerPreference: "high-performance"
//     });
//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     mountRef.current.appendChild(renderer.domElement);

//     // Lighting setup - simulating sun from one side
//     const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
//     sunLight.position.set(5, 3, 5);
//     sunLight.castShadow = true;
//     sunLight.shadow.mapSize.width = 2048;
//     sunLight.shadow.mapSize.height = 2048;
//     scene.add(sunLight);

//     // Ambient light for subtle illumination on dark side
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
//     scene.add(ambientLight);

//     // Rim light for atmosphere effect
//     const rimLight = new THREE.DirectionalLight(0x4488ff, 0.5);
//     rimLight.position.set(-5, 0, -5);
//     scene.add(rimLight);

//     // Create Earth
//     const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    
//     // Load high-quality Earth texture
//     const textureLoader = new THREE.TextureLoader();
    
//     // Fallback texture in case loading fails
//     const createFallbackTexture = (color: number) => {
//       const canvas = document.createElement('canvas');
//       canvas.width = 256;
//       canvas.height = 256;
//       const context = canvas.getContext('2d');
//       if (context) {
//         context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
//         context.fillRect(0, 0, 256, 256);
//       }
//       return new THREE.CanvasTexture(canvas);
//     };

//     let earthTexture: THREE.Texture;
//     let earthBumpMap: THREE.Texture;
//     let earthSpecularMap: THREE.Texture;
//     let moonTexture: THREE.Texture;

//     try {
//       earthTexture = textureLoader.load(
//         'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
//         () => setLoading(false),
//         undefined,
//         () => {
//           console.warn('Failed to load Earth texture, using fallback');
//           earthTexture = createFallbackTexture(0x2233ff);
//           setLoading(false);
//         }
//       );
      
//       earthBumpMap = textureLoader.load(
//         'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
//         undefined,
//         undefined,
//         () => {
//           console.warn('Failed to load Earth bump map');
//           earthBumpMap = createFallbackTexture(0x888888);
//         }
//       );
      
//       earthSpecularMap = textureLoader.load(
//         'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
//         undefined,
//         undefined,
//         () => {
//           console.warn('Failed to load Earth specular map');
//           earthSpecularMap = createFallbackTexture(0x000000);
//         }
//       );

//       moonTexture = textureLoader.load(
//         'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg',
//         undefined,
//         undefined,
//         () => {
//           console.warn('Failed to load Moon texture, using fallback');
//           moonTexture = createFallbackTexture(0x888888);
//         }
//       );
//     } catch (error) {
//       console.error('Error loading textures:', error);
//       earthTexture = createFallbackTexture(0x2233ff);
//       earthBumpMap = createFallbackTexture(0x888888);
//       earthSpecularMap = createFallbackTexture(0x000000);
//       moonTexture = createFallbackTexture(0x888888);
//       setLoading(false);
//     }

//     const earthMaterial = new THREE.MeshPhongMaterial({
//       map: earthTexture,
//       bumpMap: earthBumpMap,
//       bumpScale: 0.05,
//       specularMap: earthSpecularMap,
//       specular: new THREE.Color(0x333333),
//       shininess: 25
//     });

//     const earth = new THREE.Mesh(earthGeometry, earthMaterial);
//     earth.castShadow = true;
//     earth.receiveShadow = true;
//     scene.add(earth);

//     // Create Moon
//     const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);

//     const moonMaterial = new THREE.MeshPhongMaterial({
//       map: moonTexture,
//       shininess: 5
//     });

//     const moon = new THREE.Mesh(moonGeometry, moonMaterial);
//     moon.castShadow = true;
//     moon.receiveShadow = true;
//     scene.add(moon);

//     // Create atmosphere glow for Earth
//     const glowGeometry = new THREE.SphereGeometry(2.15, 32, 32);
//     const glowMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         c: { value: 0.4 },
//         p: { value: 6.0 },
//         glowColor: { value: new THREE.Color(0x88ccff) },
//         viewVector: { value: camera.position }
//       },
//       vertexShader: `
//         uniform vec3 viewVector;
//         varying float intensity;
//         void main() {
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
//           intensity = pow(dot(normalize(viewVector), actual_normal), 6.0);
//         }
//       `,
//       fragmentShader: `
//         uniform vec3 glowColor;
//         varying float intensity;
//         void main() {
//           vec3 glow = glowColor * intensity;
//           gl_FragColor = vec4(glow, 0.8);
//         }
//       `,
//       side: THREE.BackSide,
//       blending: THREE.AdditiveBlending,
//       transparent: true
//     });

//     const earthGlow = new THREE.Mesh(glowGeometry, glowMaterial);
//     earth.add(earthGlow);

//     // Animation variables
//     let moonAngle = 0;
//     const moonOrbitRadius = 6;
//     const moonOrbitSpeed = 0.005;
//     const earthRotationSpeed = 0.001;
//     const moonRotationSpeed = 0.002;

//     // Earth rotation control variables
//     let isDragging = false;
//     let previousMousePosition = { x: 0, y: 0 };
//     const earthRotation = { x: 0, y: 0 };

//     // Mouse event handlers for Earth rotation
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

//       // Update Earth rotation based on mouse movement
//       earthRotation.y += deltaMove.x * 0.01;
//       earthRotation.x += deltaMove.y * 0.01;

//       // Limit vertical rotation to avoid flipping
//       earthRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, earthRotation.x));

//       previousMousePosition = { x: event.clientX, y: event.clientY };
//     };

//     const handleMouseUp = () => {
//       isDragging = false;
//     };

//     // Add mouse event listeners
//     const canvas = renderer.domElement;
//     canvas.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);

//     // Touch event handlers for mobile
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
//       earthRotation.x += deltaMove.y * 0.01;
//       earthRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, earthRotation.x));

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

//       // Apply Earth rotation from mouse/touch interaction
//       earth.rotation.x = earthRotation.x;
//       earth.rotation.y = earthRotation.y;

//       // Add automatic rotation only when not dragging
//       if (!isDragging) {
//         earth.rotation.y += earthRotationSpeed;
//         earthRotation.y += earthRotationSpeed; // Keep track of automatic rotation
//       }

//       // Moon orbit around Earth
//       moonAngle += moonOrbitSpeed;
//       moon.position.x = Math.cos(moonAngle) * moonOrbitRadius;
//       moon.position.z = Math.sin(moonAngle) * moonOrbitRadius;
//       moon.rotation.y += moonRotationSpeed;

//       // Update atmosphere glow material
//       (glowMaterial.uniforms.viewVector.value as THREE.Vector3).copy(camera.position);

//       renderer.render(scene, camera);
//     }

//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       if (!mountRef.current) return;
//       camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
      
//       if (canvas) {
//         canvas.removeEventListener('mousedown', handleMouseDown);
//         canvas.removeEventListener('touchstart', handleTouchStart);
//       }

//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }

//       // Dispose of geometries and materials
//       earthGeometry.dispose();
//       earthMaterial.dispose();
//       moonGeometry.dispose();
//       moonMaterial.dispose();
//       glowGeometry.dispose();
//       glowMaterial.dispose();
      
//       // Dispose of textures
//       earthTexture?.dispose();
//       earthBumpMap?.dispose();
//       earthSpecularMap?.dispose();
//       moonTexture?.dispose();
      
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-screen bg-transparent">
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="text-white text-xl">Loading Earth and Moon...</div>
//         </div>
//       )}
//       <div 
//         ref={mountRef} 
//         className="w-full h-full cursor-grab active:cursor-grabbing"
//         style={{ background: 'transparent' }}
//       />
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
//         <p className="text-sm opacity-75">Click and drag to rotate Earth</p>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function EarthMoonScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!mountRef.current) return;

  const container = mountRef.current;

  const setupScene = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (height === 0) return; // Wait until container has real height

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Adjust camera distance so the sphere fits in view
const sphereRadius = 2; // same as your geometry
const fov = camera.fov * (Math.PI / 180);
const aspect = width / height;

// Calculate distance from camera to fully fit sphere vertically or horizontally
const fitHeightDistance = sphereRadius / Math.sin(fov / 2);
const fitWidthDistance = sphereRadius / (Math.sin(fov / 2) * aspect);

// Use the larger one to ensure full visibility
camera.position.z = Math.max(fitHeightDistance, fitWidthDistance) * 1.1; // 1.1 adds slight padding


    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(5, 3, 5);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x4488ff, 0.5);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    const textureLoader = new THREE.TextureLoader();

    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
        () => setLoading(false)
      ),
      bumpMap: textureLoader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg"
      ),
      bumpScale: 0.05,
      specularMap: textureLoader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg"
      ),
      specular: new THREE.Color(0x333333),
      shininess: 25
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);

    const moonGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg"
      ),
      shininess: 5
    });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.castShadow = true;
    moon.receiveShadow = true;
    scene.add(moon);

    const glowGeometry = new THREE.SphereGeometry(2.1, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x88ccff) },
        viewVector: { value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
          intensity = pow(0.6 - dot(normalize(viewVector), actual_normal), 2.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, intensity * 0.7);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const earthGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    earth.add(earthGlow);

    let moonAngle = 0;
    const moonOrbitRadius = 4;
    const moonOrbitSpeed = 0.005;
    const earthRotationSpeed = 0.001;
    const moonRotationSpeed = 0.002;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const earthRotation = { x: 0, y: 0 };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };
      earthRotation.y += deltaMove.x * 0.01;
      earthRotation.x += deltaMove.y * 0.01;
      earthRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, earthRotation.x));
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => (isDragging = false);

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDragging || event.touches.length !== 1) return;
      const deltaMove = {
        x: event.touches[0].clientX - previousMousePosition.x,
        y: event.touches[0].clientY - previousMousePosition.y
      };
      earthRotation.y += deltaMove.x * 0.01;
      earthRotation.x += deltaMove.y * 0.01;
      earthRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, earthRotation.x));
      previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    };

    const handleTouchEnd = () => (isDragging = false);

    canvas.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    function animate() {
      requestAnimationFrame(animate);

      earth.rotation.x = earthRotation.x;
      earth.rotation.y = earthRotation.y;

      if (!isDragging) {
        earth.rotation.y += earthRotationSpeed;
        earthRotation.y += earthRotationSpeed;
      }

      moonAngle += moonOrbitSpeed;
      moon.position.x = Math.cos(moonAngle) * moonOrbitRadius;
      moon.position.z = Math.sin(moonAngle) * moonOrbitRadius;
      moon.rotation.y += moonRotationSpeed;

      glowMaterial.uniforms.viewVector.value.copy(camera.position);
      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
camera.updateProjectionMatrix();

const fov = camera.fov * (Math.PI / 180);
const aspect = newWidth / newHeight;
const sphereRadius = 2;
const fitHeightDistance = sphereRadius / Math.sin(fov / 2);
const fitWidthDistance = sphereRadius / (Math.sin(fov / 2) * aspect);
camera.position.z = Math.max(fitHeightDistance, fitWidthDistance) * 1.1;

renderer.setSize(newWidth, newHeight);

    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("touchstart", handleTouchStart);

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  };

  const observer = new ResizeObserver(() => {
    if (container.clientHeight > 0) {
      setupScene();
      observer.disconnect();
    }
  });

  observer.observe(container);

  return () => observer.disconnect();
}, []);


  return (
    <div className="relative w-full h-full bg-transparent">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="text-white text-xl">Loading Earth and Moon...</div>
        </div>
      )}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ background: 'transparent' }}
      />
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
        <p className="text-sm opacity-75 bg-black bg-opacity-50 px-3 py-1 rounded">
          Click and drag to rotate Earth
        </p>
      </div> */}
    </div>
  );
}