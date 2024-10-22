"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const philosophies = [
  {
    title: "SIMPLICITY",
    description: "We believe in the power of clean lines and uncluttered spaces.",
  },
  {
    title: "FUNCTIONALITY",
    description: "Every piece is designed with purpose and practicality in mind.",
  },
  {
    title: "SUSTAINABILITY",
    description: "We're committed to eco-friendly practices and materials.",
  },
];

export function DesignPhilosophy() {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: [0, -100, 0],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <section className="">
      <div className="flex flex-col px-4 border border-black py-16">
        <motion.h2
          animate={false} // replace it with "controls" to see the animation
          className="flex  items-center justify-center mb-12 text-center lg:text-[150px] md:text-[50px] text-[32px] text-[#403A34] font-gradualSemibold whitespace-nowrap overflow-hidden"
        >
          OUR PHILOSOPHY
        </motion.h2>
        <div className="grid gap-8 lg:grid-cols-3 ">
          {philosophies.map((philosophy, index) => (
            <motion.div
              key={philosophy.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center mt-10"
            >
              <div className="flex flex-col items-center justify-center lg:w-[300px] md:w-[300px]">
                <h3 className="mb-2 lg:text-[32px] md:text-[32px] text-[22px] font-gradualSemibold text-[#403A34]">
                  {philosophy.title}
                </h3>
                <p className="text-stone-600 font-gradualSemibold text-[16px]">{philosophy.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
