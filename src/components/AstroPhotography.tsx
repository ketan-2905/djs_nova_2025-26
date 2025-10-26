"use client";
import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  imgSrc: string;
  desc: string;
}

export default function AstroPhotographyGallery() {
  // 🔭 Replace these imports with your actual static images in /public/gallery/
  const imagesData: GalleryItem[] = [
    {
      id: 1,
      imgSrc: "/astrophotography/1.jpg",
      desc: "Setting up of equipment",
    },
    {
      id: 8,
      imgSrc: "/astrophotography/8.jpg",
      desc: "The Majestic Mountains",
    },
    { id: 9, imgSrc: "/astrophotography/9.jpg", desc: "The Calm Lake" },
    { id: 10, imgSrc: "/astrophotography/10.jpg", desc: "The Sun Set" },
    { id: 11, imgSrc: "/astrophotography/11.jpg", desc: "The Milky Way" },
    { id: 12, imgSrc: "/astrophotography/12.jpg", desc: "Star Trails" },
    { id: 13, imgSrc: "/astrophotography/13.jpg", desc: "The Aurora Borealis" },
    { id: 14, imgSrc: "/astrophotography/14.jpg", desc: "The Lunar Eclipse" },
  ];

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <main className="w-full min-h-screen text-white overflow-x-hidden">
      {/* 🌠 Navbar */}

      {/* 🎥 Header with Video */}
      <section className="relative h-[80vh] w-full flex items-center justify-center text-center">
        <video
          src="/astrophotography/Astrophotography.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest mb-4">
            Our Astrophotography Showcase
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base leading-relaxed tracking-[0.25px]">
            Explore the universe through our lenses — from mesmerizing lunar
            landscapes to breathtaking deep-sky captures, each image tells a
            story of wonder, patience, and discovery.
          </p>
          <button className="mt-5 border-2 rounded-full p-3">
            <a
              href="#images"
              className="px-6 py-3 rounded-full text-white font-semibold transition"
            >
              Discover
            </a>
          </button>
        </div>
      </section>

      {/* 🌌 Image Grid */}
      <section id="images" className="relative -top-20 px-6 py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {imagesData.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
              <Image
                src={item.imgSrc}
                alt={item.desc}
                width={800}
                height={600}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-center text-sm md:text-base">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🖼️ Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-auto rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.imgSrc}
              alt={selectedImage.desc}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-center mt-4 text-lg">{selectedImage.desc}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-400"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* 🪐 Footer */}
    </main>
  );
}
