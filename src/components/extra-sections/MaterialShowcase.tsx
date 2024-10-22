"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const materials = [
  { name: "Wood", color: "#8B4513" },
  { name: "Leather", color: "#8B4513" },
  { name: "Metal", color: "#C0C0C0" },
  { name: "Fabric", color: "#D3D3D3" },
];

export function MaterialShowcase() {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  return (
    <section className="py-16 bg-[#F6F1EB]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-gradualBold font-light leading-tight text-[#403A34] md:text-4xl lg:text-5xl text-center mb-12">
          OUR MATERIALS
        </h2>
        <div className="flex justify-center space-x-4">
          {materials.map((material) => (
            <motion.div
              key={material.name}
              className="relative cursor-pointer"
              onHoverStart={() => setSelectedMaterial(material.name)}
              onHoverEnd={() => setSelectedMaterial(null)}
            >
              <motion.div
                className="w-16 h-16 rounded-full"
                style={{ backgroundColor: material.color }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.div
                className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow"
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: selectedMaterial === material.name ? 1 : 0,
                  y: selectedMaterial === material.name ? 0 : -10,
                }}
              >
                <p className="text-sm font-gradualSemibold text-[#403A34]">{material.name}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center mt-12 text-[#403A34] font-gradualSemibold max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          We carefully select premium materials to ensure the highest quality and longevity in every piece we
          create.
        </motion.p>
      </div>
    </section>
  );
}
