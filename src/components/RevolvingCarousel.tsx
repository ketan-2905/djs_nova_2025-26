"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageData {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  url: string;
}

interface Props {
  images: ImageData[];
}

export default function RevolvingCarousel({ images }: Props) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        rotateY: 360,
        transition: { 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear",
        },
      });
    }
  }, [controls, isHovered]);

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.stop();
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  // Calculate which image should be considered "front" based on rotation
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }, 2000); // Sync with rotation speed
      return () => clearInterval(interval);
    }
  }, [isHovered, images.length]);

  return (
    <div className="w-full h-[80vh] flex items-center justify-center overflow-hidden relative">
      {/* Active Image Display */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 text-white p-4 rounded-lg max-w-md mx-auto"
        >
          <h3 className="text-xl font-bold mb-2">{images[activeIndex]?.title}</h3>
          <p className="text-sm text-gray-300">{images[activeIndex]?.description}</p>
        </motion.div>
      </div>

      <motion.div
        className="relative mx-auto"
        style={{
          width: "300px",
          height: "400px",
          transformStyle: "preserve-3d",
        }}
        animate={controls}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {images.map((image, index) => {
          const angle = (360 / images.length) * index;
          const radius = 500; // Circle radius
          
          // Calculate position on circle
          const x = Math.sin((angle * Math.PI) / 180) * radius;
          const z = Math.cos((angle * Math.PI) / 180) * radius;
          
          // Calculate opacity based on position (front images are more visible)
          const opacity = Math.cos((angle * Math.PI) / 180) * 0.5 + 0.5;

          return (
            <motion.div
              key={image.id}
              className="absolute top-0 left-0 w-[280px] h-[380px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-neutral-900 cursor-pointer"
              style={{
                transform: `translateX(${x}px) translateZ(${z}px)`,
                opacity: isHovered ? 1 : Math.max(0.3, opacity),
                filter: isHovered ? 'none' : `blur(${Math.abs(z) > 300 ? 2 : 0}px)`,
                zIndex: Math.round(z),
              }}
              whileHover={{ 
                scale: 1.1,
                zIndex: 1000,
              }}
              onHoverStart={() => setActiveIndex(index)}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={280}
                height={380}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
              
              {/* Hover overlay */}
              <motion.div 
                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ opacity: 1 }}
              >
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
                  <button className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                    View More
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => {
              setActiveIndex(index);
              // Optional: Rotate carousel to selected item
            }}
          />
        ))}
      </div>
    </div>
  );
}