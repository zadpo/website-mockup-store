"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  {
    src: "/uploads/bonaparte_canape-1920x1536.webp",
    category: "SOFAS",
    name: "LOREM",
  },
  {
    src: "/uploads/bonaparte_table-basse-1920x1536.webp",
    category: "DINING",
    name: "IPSUM ",
  },
  {
    src: "/uploads/camus_table-a-manger.webp",
    category: "BEDROOMS",
    name: "DOLOR",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setNextIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 1000); // Match this with the transition duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const currentImage = heroImages[currentIndex];
  const nextImage = heroImages[nextIndex];

  return (
    <div className="relative h-[400px] sm:h-[600px] md:h-[800px] overflow-hidden border-b border-l border-r border-black">
      {/* Main Hero Image */}
      {heroImages.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.name}
          layout="fill"
          objectFit="cover"
          priority={index === currentIndex}
          className={`transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay with text */}
      <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col justify-end items-start border-2 pl-4 sm:pl-6 md:pl-10">
        <h2
          className={`text-[12px] sm:text-[14px] md:text-[16px] -mb-1 sm:-mb-2 md:-mb-4 ml-1 sm:ml-2 text-[#403A34] transition-all duration-500 font-gradualSemibold ${
            isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
          }`}
        >
          {currentImage.category}
        </h2>
        <h1
          className={`text-[40px] sm:text-[80px] md:text-[120px] text-[#403A34] transition-all duration-500 font-gradualSemibold ${
            isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
          }`}
        >
          {currentImage.name}
        </h1>
      </div>

      {/* Preview of next image */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 w-24 h-16 sm:w-36 sm:h-24 md:w-48 md:h-32 border-2 border-white overflow-hidden">
        <Image src={nextImage.src} alt={`Preview: ${nextImage.name}`} layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <p className="text-white text-xs sm:text-sm font-semibold">{nextImage.category}</p>
        </div>
      </div>
    </div>
  );
}
