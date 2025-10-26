"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type MediaItem = {
  type: string; // "image" | "video"
  src: string;
  alt?: string;
};

interface CarouselProps {
  items: MediaItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState<MediaItem | null>(null);
  const videoRefs = useRef<(HTMLVideoElement|null)[]>([]);

  useEffect(() => {
  videoRefs.current.forEach((video, idx) => {
    if (!video) return;
    if (idx === current) {
      video.play().catch(() => {}); // play center
    } else {
      video.pause();                // pause others
    }
  });
}, [current]);


  const prev = () =>
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  const next = () => setCurrent((prev) => (prev + 1) % items.length);

  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
       <h2 className=" text-3xl md:text-5xl font-semibold mb-12 tracking-[0.2rem]">
        Past Glimps
      </h2>
      {/* Carousel Container */}
      <div className="relative w-full max-w-4xl md:max-w-6xl h-68 md:h-[600px] flex items-center justify-center overflow-hidden">
        {items.map((item, index) => {
          const offset = index - current;

          // Only show prev, current, next for performance
          if (offset < -1 || offset > 1) return null;

          const isCenter = offset === 0;

          return (
            <motion.div
              key={index}
              initial={{
                scale: 0.8,
                rotate: offset * 10,
                x: offset * 150,
                opacity: 0,
              }}
              animate={{
                scale: isCenter ? 1 : 0.8,
                rotate: offset * 10,
                x: offset * 150,
                opacity: 1,
                zIndex: isCenter ? 10 : 5,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute cursor-pointer"
              onClick={() => isCenter && setExpanded(item)}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt || ""}
                  className="w-64 h-40 md:w-[600px] md:h-[450px] object-cover rounded-xl shadow-lg"
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el; 
                  }}
                  src={item.src}
                  className="w-64 h-40 md:w-[600px] md:h-[450px] object-cover rounded-xl shadow-lg"
                  loop
                />
              )}
            </motion.div>
          );
        })}

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-50"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-50"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setExpanded(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setExpanded(null)}
            >
              <X />
            </button>
            {expanded.type === "image" ? (
              <img
                src={expanded.src}
                alt={expanded.alt || ""}
                className="max-w-full max-h-full rounded-lg shadow-2xl"
              />
            ) : (
              <video
                src={expanded.src}
                className="w-full max-w-4xl aspect-video rounded-lg shadow-2xl"
                controls
                autoPlay
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
