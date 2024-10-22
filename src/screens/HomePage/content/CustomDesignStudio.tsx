"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const woodTypes = ["Oak", "Walnut", "Maple", "Cherry"];
const finishOptions = ["Natural", "Matte", "Glossy", "Distressed"];

export function CustomDesignStudio() {
  const [selectedWood, setSelectedWood] = useState(woodTypes[0]);
  const [selectedFinish, setSelectedFinish] = useState(finishOptions[0]);
  const [dimensions, setDimensions] = useState({ width: 50, height: 50, depth: 50 });

  const handleDimensionChange = (dimension: "width" | "height" | "depth", value: number[]) => {
    setDimensions((prev) => ({ ...prev, [dimension]: value[0] }));
  };

  return (
    <section className="bg-stone-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-light text-stone-800">Custom Design Studio</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-medium text-stone-800">Select Wood Type</h3>
              <div className="flex flex-wrap gap-2">
                {woodTypes.map((wood) => (
                  <Button
                    key={wood}
                    variant={selectedWood === wood ? "default" : "outline"}
                    onClick={() => setSelectedWood(wood)}
                    className="transition-colors"
                  >
                    {wood}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium text-stone-800">Choose Finish</h3>
              <div className="flex flex-wrap gap-2">
                {finishOptions.map((finish) => (
                  <Button
                    key={finish}
                    variant={selectedFinish === finish ? "default" : "outline"}
                    onClick={() => setSelectedFinish(finish)}
                    className="transition-colors"
                  >
                    {finish}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium text-stone-800">Set Dimensions (cm)</h3>
              {(["width", "height", "depth"] as const).map((dim) => (
                <div key={dim} className="mb-4">
                  <Label htmlFor={dim} className="mb-2 block text-sm font-medium text-stone-600">
                    {dim.charAt(0).toUpperCase() + dim.slice(1)}: {dimensions[dim]}cm
                  </Label>
                  <Slider
                    id={dim}
                    min={10}
                    max={200}
                    step={1}
                    value={[dimensions[dim]]}
                    onValueChange={(value) => handleDimensionChange(dim, value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-lg bg-gradient-to-br from-stone-200 to-stone-300 p-8"
          >
            <div
              className="h-full w-full rounded-md shadow-lg transition-all duration-300"
              style={{
                backgroundColor:
                  selectedWood === "Oak"
                    ? "#D4B48C"
                    : selectedWood === "Walnut"
                    ? "#5C4033"
                    : selectedWood === "Maple"
                    ? "#F3DBAD"
                    : "#762F0B",
                opacity:
                  selectedFinish === "Natural"
                    ? 0.9
                    : selectedFinish === "Matte"
                    ? 0.7
                    : selectedFinish === "Glossy"
                    ? 1
                    : 0.6,
                width: `${dimensions.width}%`,
                height: `${dimensions.height}%`,
                transform: `translateZ(${dimensions.depth}px)`,
              }}
            />
            <p className="mt-4 text-center text-sm text-stone-600">
              {selectedWood} - {selectedFinish} Finish
            </p>
          </motion.div>
        </div>
        <div className="mt-8 text-center">
          <Button size="lg">Save Custom Design</Button>
        </div>
      </div>
    </section>
  );
}
