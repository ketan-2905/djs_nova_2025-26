"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageData {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  url?: string;
}

const AstroPhotography = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle image
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const images: ImageData[] = [
    {
      id: 1,
      src: "/astro1.png",
      alt: "Galaxy Nebula",
      title: "GALAXY NEBULA",
      description:
        "A stunning view of distant galaxy formations and cosmic dust clouds in the deep space.",
      url: "#",
    },
    {
      id: 2,
      src: "/astro2.png",
      alt: "The Sunset",
      title: "THE SUNSET",
      description:
        "Beautiful sunset with cosmic alignment showing the perfect blend of earthly and celestial beauty.",
      url: "#",
    },
    {
      id: 3,
      src: "/astro3.png",
      alt: "Milky Way",
      title: "MILKY WAY",
      description:
        "The core of our home galaxy captured with long exposure techniques from a dark sky location.",
      url: "#",
    },
    {
      id: 4,
      src: "/astro4.png", // Add more images as needed
      alt: "Northern Lights",
      title: "AURORA BOREALIS",
      description:
        "Colorful aurora dancing in the polar skies with stars visible in the background.",
      url: "#",
    },
    {
      id: 5,
      src: "/astro5.png",
      alt: "Lunar Eclipse",
      title: "LUNAR ECLIPSE",
      description:
        "The blood moon during total lunar eclipse with detailed crater visibility.",
      url: "#",
    },
  ];

  // Adjust visible images based on current index
  const getVisibleImages = () => {
    const total = images.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    return {
      prev: images[prevIndex],
      current: images[currentIndex],
      next: images[nextIndex],
    };
  };

  const visibleImages = getVisibleImages();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <section className="relative min-h-screen bg-[url('/bg/space_bg.gif')] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-white px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl mt-8 md:text-6xl font-light tracking-[0.3em] mb-12 md:mb-20 text-center">
        NOVA ASTRO PHOTOGRAPHY
      </h1>

      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-20 p-3 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Images Container */}
        <div className="relative flex items-center justify-center w-full h-[400px] md:h-[500px]">
          {/* Previous Image (Left) */}
          <div
            className="absolute left-0 z-10 w-[380px] h-[350px] md:w-[600px] md:h-[550px] opacity-70 transform -translate-x-12 scale-75 transition-all duration-500 cursor-pointer"
            onClick={prevSlide}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800/50">
              <Image
                src={visibleImages.prev.src}
                alt={visibleImages.prev.alt}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>

          {/* Current Main Image (Center) */}
          <div
            className="relative z-20 w-[450px] h-[350px] md:w-[650px] md:h-[450px] transform transition-all duration-500 cursor-pointer hover:scale-105"
            onClick={openModal}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden  p-1">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={visibleImages.current.src}
                  alt={visibleImages.current.alt}
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <h3 className="text-xl md:text-2xl font-light tracking-widest text-center">
                    {visibleImages.current.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Next Image (Right) */}
          <div
            className="absolute right-0 z-10 w-[280px] h-[280px] md:w-[600px] md:h-[550px] opacity-70 transform translate-x-12 scale-75 transition-all duration-500 cursor-pointer"
            onClick={nextSlide}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800/50">
              <Image
                src={visibleImages.next.src}
                alt={visibleImages.next.alt}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-20 p-3 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Dots Indicator */}
      {/* <div className="flex space-x-3 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div> */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            {/* Modal Content */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden">
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src={visibleImages.current.src}
                  alt={visibleImages.current.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-light tracking-widest mb-4">
                  {visibleImages.current.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {visibleImages.current.description}
                </p>

                {visibleImages.current.url && (
                  <div className="flex space-x-4">
                    <a
                      href={visibleImages.current.url}
                      className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      View Full Resolution
                    </a>
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AstroPhotography;
