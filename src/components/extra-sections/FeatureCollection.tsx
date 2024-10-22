"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button2 } from "@/components/ui/Button2";

const featuredItems = [
  {
    src: "/uploads/featured-item-1.webp",
    name: "Elegance Dining Set",
    description: "A timeless dining set that combines comfort and style.",
  },
  {
    src: "/uploads/featured-item-2.webp",
    name: "Harmony Lounge Chair",
    description: "The perfect blend of modern design and relaxation.",
  },
  {
    src: "/uploads/featured-item-3.webp",
    name: "Serenity Bedroom Collection",
    description: "Transform your bedroom into a peaceful retreat.",
  },
];

export function FeaturedCollection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 border-t border-b border-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-gradualBold font-light leading-tight text-[#403A34] md:text-4xl lg:text-5xl text-center">
            FEATURED COLLECTION
          </h2>
          <p className="mt-4 text-center text-stone-600 font-gradualSemibold">
            Discover our handpicked selection of exquisite pieces
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={item.src}
                alt={item.name}
                width={400}
                height={500}
                className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105 border hover:border-black"
              />
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-[#F6F1EB] bg-opacity-100 p-4 border border-black"
              >
                <h3 className="text-lg font-gradualSemibold text-[#403A34] mb-2">{item.name}</h3>
                <p className="text-stone-600 font-gradualSemibold text-sm">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/featured-collection">
            <Button2 frontText="Explore Collection" topText="Explore Collection" />
          </Link>
        </div>
      </div>
    </section>
  );
}
