"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const materials = [
  { name: "Oak", description: "Durable and timeless", image: "/placeholder.svg?height=400&width=400" },
  {
    name: "Leather",
    description: "Luxurious and long-lasting",
    image: "/placeholder.svg?height=400&width=400",
  },
  { name: "Wool", description: "Cozy and sustainable", image: "/placeholder.svg?height=400&width=400" },
  { name: "Steel", description: "Modern and sturdy", image: "/placeholder.svg?height=400&width=400" },
];

export function MaterialShowcase() {
  const [activeMaterial, setActiveMaterial] = useState(materials[0]);

  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-light text-stone-800">Our Premium Materials</h2>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <motion.div
            key={activeMaterial.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <Image
              src={activeMaterial.image}
              alt={activeMaterial.name}
              width={600}
              height={400}
              className="h-auto w-full rounded-lg object-cover shadow-lg"
            />
          </motion.div>
          <div className="w-full lg:w-1/2">
            <ul className="space-y-4">
              {materials.map((material) => (
                <li key={material.name}>
                  <button
                    onClick={() => setActiveMaterial(material)}
                    className={`w-full rounded-lg p-4 text-left transition-colors ${
                      activeMaterial.name === material.name
                        ? "bg-stone-200 shadow-md"
                        : "bg-white hover:bg-stone-50"
                    }`}
                  >
                    <h3 className="text-lg font-medium text-stone-800">{material.name}</h3>
                    <p className="mt-1 text-sm text-stone-600">{material.description}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
