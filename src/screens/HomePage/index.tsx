"use client";
import { DesignPhilosophy, FurnitureCustomizer, Hero, MaterialShowcase } from "./content";
import { Gallery } from "@/components/product/gallery";

export function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <Gallery />
      <DesignPhilosophy />
      <MaterialShowcase />
      <FurnitureCustomizer />
      {/* <ParallaxView /> */}
    </div>
  );
}
