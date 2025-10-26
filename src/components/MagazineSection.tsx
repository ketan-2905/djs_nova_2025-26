"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface Magazine {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  coverImage: string;
  pdfUrl: string;
}

interface MagazineSectionProps {
  className?: string;
}

export default function MagazineSection({
  className = "",
}: MagazineSectionProps) {
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(
    null
  );
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const magazine1Ref = useRef<HTMLDivElement>(null);
  const magazine2Ref = useRef<HTMLDivElement>(null);

  const magazines: Magazine[] = [
    {
      id: 1,
      title: "Magazine Volume 1",
      subtitle: "Magazine Unveiling",
      date: "September 2024",
      coverImage: "/magazine/magazin_1.png", // Update with actual path
      pdfUrl: "/magazine/volume1.pdf", // Update with actual path
    },
    {
      id: 2,
      title: "Magazine Volume 2",
      subtitle: "Latest Release",
      date: "October 2024",
      coverImage: "/magazine/magazin_2.png", // Update with actual path
      pdfUrl: "/magazine/volume2.pdf", // Update with actual path
    },
  ];

  // Floating animation effect
  useEffect(() => {
    const magazine1 = magazine1Ref.current;
    const magazine2 = magazine2Ref.current;

    if (!magazine1 || !magazine2) return;

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.02;

      // Different frequencies for each magazine to create variation
      const y1 = Math.sin(time) * 5;
      const y2 = Math.sin(time * 1.3) * 5;
      const rotation1 = Math.sin(time * 0.8) * 2;
      const rotation2 = Math.sin(time * 1.1) * 2;

      if (magazine1) {
        magazine1.style.transform = `translateY(${y1}px) rotate(${rotation1}deg)`;
      }
      if (magazine2) {
        magazine2.style.transform = `translateY(${y2}px) rotate(${rotation2}deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMagazineClick = (magazine: Magazine) => {
    setSelectedMagazine(magazine);
    setIsPdfOpen(true);
  };

  const closePdf = () => {
    setIsPdfOpen(false);
    setSelectedMagazine(null);
  };

  return (
    <section className={`w-full py-16 px-4 text-white ${className} tracking-[2.5px]`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-white">
          Our Magazines
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore our latest publications and groundbreaking research
        </p>
      </div>

      {/* Magazine Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {magazines.map((magazine, index) => (
            <div
              key={magazine.id}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => handleMagazineClick(magazine)}
            >
              {/* Magazine Container with Floating Effect */}
              <div
                ref={index === 0 ? magazine1Ref : magazine2Ref}
                className="relative transition-all duration-300 group-hover:scale-105 group-hover:z-10"
                style={{
                  transition: "transform 0.3s ease",
                }}
              >
                {/* 3D Sphere */}
                {/* Shine Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>

              {/* Magazine Info */}
              <div className="text-center mt-6 space-y-2 flex flex-col items-center">
                <div className="">
                  <Image
                    src={magazine.coverImage}
                    alt={magazine.title}
                    width={255}
                    height={360}
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {magazine.title}
                  </h3>
                  <p className="text-lg text-gray-300 font-medium">
                    {magazine.subtitle}
                  </p>
                  <p className="text-sm text-gray-400">{magazine.date}</p>
                  <div className="pt-2">
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-all transform group-hover:scale-110">
                      Read Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {/* {isPdfOpen && selectedMagazine && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedMagazine.title}
              </h3>
              <button
                onClick={closePdf}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex-1 p-4">
              <iframe
                src={`${selectedMagazine.pdfUrl}#view=FitH`}
                className="w-full h-full border rounded"
                title={`PDF Viewer - ${selectedMagazine.title}`}
              />
              <div className="mt-4 text-center text-gray-600 text-sm">
                <p>Can't view the PDF? <a href={selectedMagazine.pdfUrl} download className="text-blue-600 hover:underline">Download it here</a></p>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {isPdfOpen && selectedMagazine && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
          {/* Main container */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700/50 shadow-2xl rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden backdrop-blur-md">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-2 border-b border-gray-700/60">
              <h3 className="text-2xl font-semibold text-white tracking-wide">
                {selectedMagazine.title}
              </h3>
              <button
                onClick={closePdf}
                className="text-gray-400 hover:text-white text-3xl font-bold transition-transform transform hover:scale-110"
              >
                ×
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 p-2 bg-transparent rounded-b-2xl overflow-hidden backdrop-blur-md">
              <iframe
                src={`${selectedMagazine.pdfUrl}#view=Fit`}
                className="w-full h-full rounded-lg border border-gray-600/30 shadow-lg bg-transparent"
                title={`PDF Viewer - ${selectedMagazine.title}`}
                style={{ background: "transparent" }}
              />
            </div>

            {/* Footer (Download link) */}
            <div className="py-3 text-center text-gray-400 text-sm border-t border-gray-700/60">
              <p>
                Can’t view the PDF?{" "}
                <a
                  href={selectedMagazine.pdfUrl}
                  download
                  className="text-blue-400 hover:text-blue-300 hover:underline transition"
                >
                  Download it here
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
