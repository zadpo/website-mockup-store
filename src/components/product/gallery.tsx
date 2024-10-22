"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button2 } from "../ui/Button2";
import { useState, useEffect } from "react";

const products = [
  { src: "/uploads/bonaparte_canape-1920x1536.webp", name: "Bonaparte Sofa", price: "$1,299" },
  { src: "/uploads/bonaparte_fauteuilV2-2-480x384.webp", name: "Bonaparte Armchair", price: "$799" },
  { src: "/uploads/SOFA_02_PP-480x360.webp", name: "Modern Sofa", price: "$1,499" },
  { src: "/uploads/camus_banc.webp", name: "Camus Bench", price: "$599" },
];

export function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="animate-pulse mb-24">
          <div className="bg-gray-300 h-12 w-3/4"></div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-72 w-full"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-12">
          <div className="bg-gray-300 h-10 w-40"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-24"
      >
        <div className="pr-[264px] flex">
          <h2 className="text-3xl font-gradualBold font-light leading-tight text-[#403A34] md:text-4xl lg:text-5xl">
            GOODMOOD, DESIGN SUSTAINABLE AND UNIQUE FURNITURE MADE IN THE PHILIPPINES.
          </h2>
        </div>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative overflow-hidden"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={product.src}
              alt={product.name}
              width={400}
              height={300}
              className="h-72 w-full object-cover transition-transform duration-300 hover:scale-105  border hover:border-black"
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-[0.5px] left-0 right-0 bg-[#F6F1EB] bg-opacity-100 p-4 flex items-center justify-between border border-black"
            >
              <h3 className="text-lg font-gradualSemibold text-[#403A34] ">{product.name}</h3>
              <p className="text-[#403A34] font-gradualSemibold">{product.price}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center py-12">
        <Link href="/products">
          <Button2 frontText="View All Products" topText="View All Products" />
        </Link>
      </div>
    </div>
  );
}
