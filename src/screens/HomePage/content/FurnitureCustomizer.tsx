"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const furnitureParts = {
  legs: ["Tapered", "Straight", "Hairpin"],
  material: ["Oak", "Walnut", "Maple"],
  finish: ["Natural", "Dark Stain", "White Paint"],
};

type FurniturePart = keyof typeof furnitureParts;

const materialColors = {
  Oak: "#D2B48C",
  Walnut: "#5C4033",
  Maple: "#FFDAB9",
};

const finishColors = {
  Natural: "#F4A460",
  "Dark Stain": "#8B4513",
  "White Paint": "#FFFFFF",
};

function Table({ material, finish, legs }: { material: string; finish: string; legs: string }) {
  const tableTopColor = new THREE.Color(finishColors[finish as keyof typeof finishColors]);
  const legColor = new THREE.Color(materialColors[material as keyof typeof materialColors]);

  return (
    <group>
      {/* Table top */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color={tableTopColor} />
      </mesh>
      {/* Legs */}
      {[-0.9, 0.9].map((x) =>
        [-0.4, 0.4].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]}>
            <cylinderGeometry args={[0.05, legs === "Tapered" ? 0.03 : 0.05, 1, 32]} />
            <meshStandardMaterial color={legColor} />
          </mesh>
        ))
      )}
    </group>
  );
}

export function FurnitureCustomizer() {
  const [selectedParts, setSelectedParts] = useState({
    legs: furnitureParts.legs[0],
    material: furnitureParts.material[0],
    finish: furnitureParts.finish[0],
  });

  const updatePart = (part: FurniturePart, value: string) => {
    setSelectedParts((prev) => ({ ...prev, [part]: value }));
  };

  return (
    <section className="">
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-gradualBold font-light leading-tight text-[#403A34] md:text-4xl lg:text-5xl text-center mb-12">
            DESIGN YOUR PERFECT PIECE
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="w-64 h-64 bg-[#F6F1EB] mx-auto overflow-hidden">
                <Suspense fallback={<div>Loading...</div>}>
                  <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Table {...selectedParts} />
                    <OrbitControls enableZoom={false} />
                  </Canvas>
                </Suspense>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              {(Object.keys(furnitureParts) as FurniturePart[]).map((part) => (
                <div key={part} className="mb-6">
                  <h3 className="text-xl font-gradualSemibold text-[#403A34] mb-2 capitalize">{part}</h3>
                  <div className="flex space-x-2">
                    {furnitureParts[part].map((option) => (
                      <button
                        key={option}
                        onClick={() => updatePart(part, option)}
                        className={`px-4 py-2 ${
                          selectedParts[part] === option
                            ? "bg-[#403A34] text-white"
                            : "bg-[#F6F1EB] text-[#403A34]"
                        } font-gradualSemibold transition-colors`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-[#403A34] font-gradualSemibold">
              Your custom piece: {selectedParts.material} {selectedParts.finish} table with{" "}
              {selectedParts.legs} legs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
