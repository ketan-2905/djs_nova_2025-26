// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// interface RotatingSphereProps {
//   textureUrl: string; // Earth or Moon texture
//   bumpUrl?: string;
//   specularUrl?: string;
// }

// export default function RotatingSphere({
//   textureUrl,
//   bumpUrl,
//   specularUrl,
// }: RotatingSphereProps) {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!mountRef.current) return;
//     const container = mountRef.current;

//     const setupScene = () => {
//       const width = container.clientWidth;
//       const height = container.clientHeight;
//       if (height === 0) return;

//       // Scene setup
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
//       camera.position.z = 5;

//       const renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//         powerPreference: "high-performance",
//       });
//       renderer.setSize(width, height);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       container.innerHTML = "";
//       container.appendChild(renderer.domElement);

//       // Lights
//       const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
//       sunLight.position.set(5, 3, 5);
//       scene.add(sunLight);

//       const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//       scene.add(ambientLight);

//       // Textures
//       const loader = new THREE.TextureLoader();
//       const materialConfig: THREE.MeshPhongMaterialParameters = {
//         map: loader.load(textureUrl, () => setLoading(false)),
//         shininess: 25,
//         specular: new THREE.Color(0x333333),
//       };

//       if (bumpUrl) {
//         materialConfig.bumpMap = loader.load(bumpUrl);
//         materialConfig.bumpScale = 0.05;
//       }

//       if (specularUrl) {
//         materialConfig.specularMap = loader.load(specularUrl);
//       }

//       const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
//       const sphereMaterial = new THREE.MeshPhongMaterial(materialConfig);
//       const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//       scene.add(sphere);

//       // Glow effect
//       const glowGeometry = new THREE.SphereGeometry(2.1, 32, 32);
//       const glowMaterial = new THREE.ShaderMaterial({
//         uniforms: {
//           glowColor: { value: new THREE.Color(0x88ccff) },
//           viewVector: { value: camera.position },
//         },
//         vertexShader: `
//           uniform vec3 viewVector;
//           varying float intensity;
//           void main() {
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//             vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
//             intensity = pow(0.6 - dot(normalize(viewVector), actual_normal), 2.0);
//           }
//         `,
//         fragmentShader: `
//           uniform vec3 glowColor;
//           varying float intensity;
//           void main() {
//             vec3 glow = glowColor * intensity;
//             gl_FragColor = vec4(glow, intensity * 0.7);
//           }
//         `,
//         side: THREE.BackSide,
//         blending: THREE.AdditiveBlending,
//         transparent: true,
//       });

//       const glow = new THREE.Mesh(glowGeometry, glowMaterial);
//       sphere.add(glow);

//       // Interaction
//       let isDragging = false;
//       let previous = { x: 0, y: 0 };
//       const rotation = { x: 0, y: 0 };

//       const handleDown = (x: number, y: number) => {
//         isDragging = true;
//         previous = { x, y };
//       };

//       const handleMove = (x: number, y: number) => {
//         if (!isDragging) return;
//         const dx = x - previous.x;
//         const dy = y - previous.y;
//         rotation.y += dx * 0.01;
//         rotation.x += dy * 0.01;
//         rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));
//         previous = { x, y };
//       };

//       const handleUp = () => (isDragging = false);

//       const canvas = renderer.domElement;
//       canvas.addEventListener("mousedown", (e) => handleDown(e.clientX, e.clientY));
//       window.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY));
//       window.addEventListener("mouseup", handleUp);

//       canvas.addEventListener("touchstart", (e) =>
//         handleDown(e.touches[0].clientX, e.touches[0].clientY)
//       );
//       window.addEventListener("touchmove", (e) =>
//         handleMove(e.touches[0].clientX, e.touches[0].clientY)
//       );
//       window.addEventListener("touchend", handleUp);

//       const animate = () => {
//         requestAnimationFrame(animate);
//         sphere.rotation.x = rotation.x;
//         sphere.rotation.y = rotation.y;
//         if (!isDragging) rotation.y += 0.002;
//         glowMaterial.uniforms.viewVector.value.copy(camera.position);
//         renderer.render(scene, camera);
//       };
//       animate();

//       const handleResize = () => {
//         const newWidth = container.clientWidth;
//         const newHeight = container.clientHeight;
//         camera.aspect = newWidth / newHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(newWidth, newHeight);
//       };
//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//         window.removeEventListener("mousemove", (e) =>
//           handleMove(e.clientX, e.clientY)
//         );
//         window.removeEventListener("mouseup", handleUp);
//         renderer.dispose();
//       };
//     };

//     const observer = new ResizeObserver(() => {
//       if (container.clientHeight > 0) {
//         setupScene();
//         observer.disconnect();
//       }
//     });

//     observer.observe(container);
//     return () => observer.disconnect();
//   }, [textureUrl, bumpUrl, specularUrl]);

//   return (
//     <div className="relative w-full h-full bg-transparent">
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
//           <div className="text-white text-lg">Loading Sphere...</div>
//         </div>
//       )}
//       <div
//         ref={mountRef}
//         className="w-full h-full cursor-grab active:cursor-grabbing"
//         style={{ background: "transparent" }}
//       />
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface RotatableSphereProps {
  textureUrl: string;
  bumpMapUrl?: string;
  specularMapUrl?: string;
  glowColor?: string;
  sphereRadius?: number;
  width: string | number;
  height: string | number;
  className?: string;
}

export default function RotatableSphere({
  textureUrl,
  bumpMapUrl,
  specularMapUrl,
  glowColor = "0x88ccff",
  sphereRadius = 1.5,
  width = "100%",
  height = "400px",
  className = "",
}: RotatableSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    const setupScene = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (height === 0) return;

      // Scene setup
      const scene = new THREE.Scene();

      // Calculate camera position based on sphere radius to ensure it fits perfectly
      const cameraDistance = sphereRadius * 3.5;
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = cameraDistance;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      // Lighting setup
      const mainLight = new THREE.DirectionalLight(0xffffff, 2);
      mainLight.position.set(5, 3, 5);
      mainLight.castShadow = true;
      scene.add(mainLight);

      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const rimLight = new THREE.DirectionalLight(0x4488ff, 0.6);
      rimLight.position.set(-5, 0, -5);
      scene.add(rimLight);

      const textureLoader = new THREE.TextureLoader();

      // Create sphere geometry with configurable radius
      const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 64, 64);

      // Create material with configurable textures
      const materialProps: THREE.MeshPhongMaterialParameters = {
        map: textureLoader.load(textureUrl, () => setLoading(false)),
        shininess: 20,
      };

      // Add optional maps if provided
      if (bumpMapUrl) {
        materialProps.bumpMap = textureLoader.load(bumpMapUrl);
        materialProps.bumpScale = 0.03;
      }

      if (specularMapUrl) {
        materialProps.specularMap = textureLoader.load(specularMapUrl);
        materialProps.specular = new THREE.Color(0x333333);
      }

      const sphereMaterial = new THREE.MeshPhongMaterial(materialProps);

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      scene.add(sphere);

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(
        sphereRadius * 1.05,
        32,
        32
      );
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color(glowColor) },
          viewVector: { value: camera.position },
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
        transparent: true,
      });

      const sphereGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(sphereGlow);

      // Rotation and interaction
      const sphereRotation = { x: 0, y: 0 };
      const autoRotationSpeed = 0.002;
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      // Mouse event handlers
      const handleMouseDown = (event: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y,
        };
        sphereRotation.y += deltaMove.x * 0.01;
        sphereRotation.x += deltaMove.y * 0.01;
        sphereRotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, sphereRotation.x)
        );
        previousMousePosition = { x: event.clientX, y: event.clientY };
      };

      const handleMouseUp = () => (isDragging = false);

      const canvas = renderer.domElement;
      canvas.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      // Touch event handlers
      const handleTouchStart = (event: TouchEvent) => {
        if (event.touches.length === 1) {
          isDragging = true;
          previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
          };
        }
      };

      const handleTouchMove = (event: TouchEvent) => {
        if (!isDragging || event.touches.length !== 1) return;
        const deltaMove = {
          x: event.touches[0].clientX - previousMousePosition.x,
          y: event.touches[0].clientY - previousMousePosition.y,
        };
        sphereRotation.y += deltaMove.x * 0.01;
        sphereRotation.x += deltaMove.y * 0.01;
        sphereRotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, sphereRotation.x)
        );
        previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      };

      const handleTouchEnd = () => (isDragging = false);

      canvas.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.x = sphereRotation.x;
        sphere.rotation.y = sphereRotation.y;

        // Auto-rotate when not dragging
        if (!isDragging) {
          sphere.rotation.y += autoRotationSpeed;
          sphereRotation.y += autoRotationSpeed;
        }

        glowMaterial.uniforms.viewVector.value.copy(camera.position);
        renderer.render(scene, camera);
      }

      animate();

      // Handle resize
      const handleResize = () => {
        if (!container) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup function
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
  }, [textureUrl, bumpMapUrl, specularMapUrl, glowColor, sphereRadius]);

  return (
    <div
      className={`relative bg-transparent ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
