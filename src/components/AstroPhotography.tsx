
// export default AstroPhotography;
// "use client";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// interface ImageData {
//   id: number;
//   src: string;
//   alt: string;
//   title?: string;
// }

// const AstroPhotography = () => {
//   const [index, setIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

//   const images: ImageData[] = [
//     { id: 1, src: "/astro1.png", alt: "Galaxy Nebula", title: "GALAXY NEBULA" },
//     { id: 2, src: "/astro2.png", alt: "The Sunset", title: "THE SUNSET" },
//     { id: 3, src: "/astro3.png", alt: "Milky Way", title: "MILKY WAY" },
//     { id: 4, src: "/astro4.png", alt: "Aurora Borealis", title: "AURORA BOREALIS" },
//     { id: 5, src: "/astro5.png", alt: "Lunar Eclipse", title: "LUNAR ECLIPSE" },
//     { id: 6, src: "/astro6.png", alt: "Cosmic Dust", title: "COSMIC DUST" },
//     { id: 7, src: "/astro7.jpg", alt: "Star Trails", title: "STAR TRAILS" },
//   ];

//   const total = images.length;
//   const nextSlide = () => setIndex((prev) => (prev + 1) % total);
//   const prevSlide = () => setIndex((prev) => (prev - 1 + total) % total);

//   // Auto slide every 5s
//   useEffect(() => {
//     if (!isHovered) {
//       const timer = setInterval(nextSlide, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [isHovered]);

//   // Handle scroll wheel to navigate images
//   useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       if (!containerRef.current || !isHovered) return;

//       e.preventDefault(); // stop page scrolling
//       if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

//       if (e.deltaY > 0) nextSlide();
//       else if (e.deltaY < 0) prevSlide();

//       // small delay so rapid scroll doesn’t spam
//       scrollTimeout.current = setTimeout(() => {}, 400);
//     };

//     const ref = containerRef.current;
//     if (ref) ref.addEventListener("wheel", handleWheel, { passive: false });
//     return () => ref?.removeEventListener("wheel", handleWheel);
//   }, [isHovered]);

//   // Image order
//   const prev = images[(index - 1 + total) % total];
//   const current = images[index];
//   const next = images[(index + 1) % total];

//   const variants = {
//     center: { scale: 1, opacity: 1, x: 0, zIndex: 10 },
//     left: { scale: 0.8, opacity: 0.5, x: "-40%", zIndex: 5 },
//     right: { scale: 0.8, opacity: 0.5, x: "40%", zIndex: 5 },
//   };

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen bg-[url('/bg/space_bg.gif')] bg-cover bg-center bg-no-repeat 
//       flex flex-col justify-center items-center text-white px-6 py-12 overflow-hidden"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <h1 className="text-4xl mt-8 md:text-6xl font-light tracking-[0.3em] mb-12 md:mb-20 text-center">
//         NOVA ASTRO PHOTOGRAPHY
//       </h1>

//       <div className="relative w-full max-w-6xl h-[450px] flex items-center justify-center select-none">
//         {/* Left (Previous) Image */}
//         <motion.div
//           key={prev.id}
//           variants={variants}
//           animate="left"
//           transition={{ duration: 1.2, ease: "easeInOut" }}
//           className="absolute"
//         >
//           <div className="relative w-[500px] h-[350px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden">
//             <Image
//               src={prev.src}
//               alt={prev.alt}
//               fill
//               className="object-cover rounded-2xl opacity-70"
//             />
//           </div>
//         </motion.div>

//         {/* Center (Active) Image */}
//         <motion.div
//           key={current.id}
//           variants={variants}
//           animate="center"
//           drag="x"
//           dragElastic={0.4}
//           dragConstraints={{ left: 0, right: 0 }}
//           onDragEnd={(event, info) => {
//             if (info.offset.x < -100) nextSlide();
//             else if (info.offset.x > 100) prevSlide();
//           }}
//           transition={{ type: "spring", stiffness: 120, damping: 20 }}
//           className="absolute cursor-grab active:cursor-grabbing"
//         >
//           <div className="relative w-[500px] h-[350px] md:w-[650px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl hover:scale-115  hover:rotate-3 transition-all duration-300 ">
//             <Image
//               src={current.src}
//               alt={current.alt}
//               fill
//               className="object-cover rounded-2xl"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
//               <h3 className="text-2xl font-light tracking-widest">
//                 {current.title}
//               </h3>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right (Next) Image */}
//         <motion.div
//           key={next.id}
//           variants={variants}
//           animate="right"
//           transition={{ duration: 1.2, ease: "easeInOut" }}
//           className="absolute"
//         >
//           <div className="relative w-[500px] h-[350px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden">
//             <Image
//               src={next.src}
//               alt={next.alt}
//               fill
//               className="object-cover rounded-2xl opacity-70"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AstroPhotography;


// "use client";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// interface ImageData {
//   id: number;
//   src: string;
//   alt: string;
//   title?: string;
// }

// const AstroPhotography = () => {
//   const [index, setIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

//   const images: ImageData[] = [
//     { id: 1, src: "/astro1.png", alt: "Galaxy Nebula", title: "GALAXY NEBULA" },
//     { id: 2, src: "/astro2.png", alt: "The Sunset", title: "THE SUNSET" },
//     { id: 3, src: "/astro3.png", alt: "Milky Way", title: "MILKY WAY" },
//     { id: 4, src: "/astro4.png", alt: "Aurora Borealis", title: "AURORA BOREALIS" },
//     { id: 5, src: "/astro5.png", alt: "Lunar Eclipse", title: "LUNAR ECLIPSE" },
//     { id: 6, src: "/astro6.png", alt: "Cosmic Dust", title: "COSMIC DUST" },
//     { id: 7, src: "/astro7.jpg", alt: "Star Trails", title: "STAR TRAILS" },
//   ];

//   const total = images.length;

//   const nextSlide = () => setIndex((prev) => Math.min(prev + 1, total - 1));
//   const prevSlide = () => setIndex((prev) => Math.max(prev - 1, 0));

//   // Auto slide (loops normally)
//   useEffect(() => {
//     if (!isHovered) {
//       const timer = setInterval(() => {
//         setIndex((prev) => (prev + 1) % total);
//       }, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [isHovered]);

//   // Scroll control
//   useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       if (!containerRef.current || !isHovered) return;

//       // If not at bounds, prevent page scroll
//       const isAtStart = index === 0 && e.deltaY < 0;
//       const isAtEnd = index === total - 1 && e.deltaY > 0;

//       if (isAtStart || isAtEnd) {
//         // Allow normal scroll if at start or end
//         return;
//       }

//       e.preventDefault();

//       if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

//       if (e.deltaY > 0) nextSlide();
//       else if (e.deltaY < 0) prevSlide();

//       scrollTimeout.current = setTimeout(() => {}, 400);
//     };

//     const ref = containerRef.current;
//     if (ref) ref.addEventListener("wheel", handleWheel, { passive: false });
//     return () => ref?.removeEventListener("wheel", handleWheel);
//   }, [isHovered, index]);

//   // Get surrounding images safely (no looping for scroll)
//   const prev = images[index - 1];
//   const current = images[index];
//   const next = images[index + 1];

//   const variants = {
//     center: { scale: 1, opacity: 1, x: 0, zIndex: 10 },
//     left: { scale: 0.8, opacity: 0.5, x: "-40%", zIndex: 5 },
//     right: { scale: 0.8, opacity: 0.5, x: "40%", zIndex: 5 },
//   };

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen bg-[url('/bg/space_bg.gif')] bg-cover bg-center bg-no-repeat 
//       flex flex-col justify-center items-center text-white px-6 py-12 overflow-hidden"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <h1 className="text-4xl mt-8 md:text-6xl font-light tracking-[0.3em] mb-12 md:mb-20 text-center">
//         NOVA ASTRO PHOTOGRAPHY
//       </h1>

//       <div className="relative w-full max-w-6xl h-[450px] flex items-center justify-center select-none">
//         {/* Left (Previous) */}
//         {prev && (
//           <motion.div
//             key={prev.id}
//             variants={variants}
//             animate="left"
//             transition={{ duration: 1.2, ease: "easeInOut" }}
//             className="absolute"
//           >
//             <div className="relative w-[500px] h-[350px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden">
//               <Image
//                 src={prev.src}
//                 alt={prev.alt}
//                 fill
//                 className="object-cover rounded-2xl opacity-70"
//               />
//             </div>
//           </motion.div>
//         )}

//         {/* Center (Active) */}
//         <motion.div
//           key={current.id}
//           variants={variants}
//           animate="center"
//           drag="x"
//           dragElastic={0.4}
//           dragConstraints={{ left: 0, right: 0 }}
//           onDragEnd={(event, info) => {
//             if (info.offset.x < -100) nextSlide();
//             else if (info.offset.x > 100) prevSlide();
//           }}
//           transition={{ type: "spring", stiffness: 120, damping: 20 }}
//           className="absolute cursor-grab active:cursor-grabbing"
//         >
//           <div className="relative w-[500px] h-[350px] md:w-[650px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-115  hover:rotate-3">
//             <Image
//               src={current.src}
//               alt={current.alt}
//               fill
//               className="object-cover rounded-2xl"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
//               <h3 className="text-2xl font-light tracking-widest">
//                 {current.title}
//               </h3>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right (Next) */}
//         {next && (
//           <motion.div
//             key={next.id}
//             variants={variants}
//             animate="right"
//             transition={{ duration: 1.2, ease: "easeInOut" }}
//             className="absolute"
//           >
//             <div className="relative w-[500px] h-[350px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden">
//               <Image
//                 src={next.src}
//                 alt={next.alt}
//                 fill
//                 className="object-cover rounded-2xl opacity-70"
//               />
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AstroPhotography;

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageData {
  id: number;
  src: string;
  alt: string;
  title?: string;
}

const AstroPhotography = () => {
  const [index, setIndex] = useState(0);
  const [isHoveredCentral, setIsHoveredCentral] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const centralStripRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const images: ImageData[] = [
    { id: 1, src: "/astro1.png", alt: "Galaxy Nebula", title: "GALAXY NEBULA" },
    { id: 2, src: "/astro2.png", alt: "The Sunset", title: "THE SUNSET" },
    { id: 3, src: "/astro3.png", alt: "Milky Way", title: "MILKY WAY" },
    { id: 4, src: "/astro4.png", alt: "Aurora Borealis", title: "AURORA BOREALIS" },
    { id: 5, src: "/astro5.png", alt: "Lunar Eclipse", title: "LUNAR ECLIPSE" },
    { id: 6, src: "/astro6.png", alt: "Cosmic Dust", title: "COSMIC DUST" },
    { id: 7, src: "/astro7.jpg", alt: "Star Trails", title: "STAR TRAILS" },
  ];

  const total = images.length;

  const nextSlide = () => setIndex((prev) => Math.min(prev + 1, total - 1));
  const prevSlide = () => setIndex((prev) => Math.max(prev - 1, 0));

  // Auto slide (always runs unless hovering over central strip)
  useEffect(() => {
    if (!isHoveredCentral) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % total);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isHoveredCentral, total]);

  // Scroll control - only for central strip
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!centralStripRef.current || !isHoveredCentral) return;

      // If not at bounds, prevent page scroll
      const isAtStart = index === 0 && e.deltaY < 0;
      const isAtEnd = index === total - 1 && e.deltaY > 0;

      if (isAtStart || isAtEnd) {
        // Allow normal scroll if at start or end
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      if (e.deltaY > 0) nextSlide();
      else if (e.deltaY < 0) prevSlide();

      scrollTimeout.current = setTimeout(() => {}, 400);
    };

    const ref = centralStripRef.current;
    if (ref) {
      ref.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => ref?.removeEventListener("wheel", handleWheel);
  }, [isHoveredCentral, index, total]);

  // Get surrounding images safely
  const prev = images[index - 1];
  const current = images[index];
  const next = images[index + 1];

  const variants = {
    center: { scale: 1, opacity: 1, x: 0, zIndex: 10 },
    left: { scale: 0.8, opacity: 0.5, x: "-40%", zIndex: 5 },
    right: { scale: 0.8, opacity: 0.5, x: "40%", zIndex: 5 },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[url('/bg/space_bg.gif')] bg-cover bg-center bg-no-repeat 
      flex flex-col justify-center items-center text-white px-6 py-12 overflow-hidden"
    >
      <h1 className="text-4xl mt-8 md:text-6xl font-light tracking-[0.3em] mb-12 md:mb-20 text-center">
        NOVA ASTRO PHOTOGRAPHY
      </h1>

      <div className="relative w-full max-w-6xl h-[450px] flex items-center justify-center select-none">
        {/* Central Strip - Only this area triggers scroll navigation */}
        <div
          ref={centralStripRef}
          className="absolute z-20 w-1/3 h-full cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHoveredCentral(true)}
          onMouseLeave={() => setIsHoveredCentral(false)}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        />

        {/* Left (Previous) */}
        {prev && (
          <motion.div
            key={prev.id}
            variants={variants}
            animate="left"
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute"
          >
            <div className="relative w-[500px] h-[350px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={prev.src}
                alt={prev.alt}
                fill
                className="object-cover rounded-2xl opacity-70"
              />
            </div>
          </motion.div>
        )}

        {/* Center (Active) */}
        <motion.div
          key={current.id}
          variants={variants}
          animate="center"
          drag="x"
          dragElastic={0.4}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => {
            if (info.offset.x < -100) nextSlide();
            else if (info.offset.x > 100) prevSlide();
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="absolute cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-[500px] h-[350px] md:w-[650px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
              <h3 className="text-2xl font-light tracking-widest">
                {current.title}
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Right (Next) */}
        {next && (
          <motion.div
            key={next.id}
            variants={variants}
            animate="right"
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute"
          >
            <div className="relative w-[500px] h-[350px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={next.src}
                alt={next.alt}
                fill
                className="object-cover rounded-2xl opacity-70"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AstroPhotography;