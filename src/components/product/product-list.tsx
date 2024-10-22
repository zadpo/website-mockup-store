"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  mainImageUrl?: string;
  additionalImageUrls?: string[];
  imageUrl?: string;
}

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Products:", products);
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [products]);

  const getImageUrl = (product: Product) => {
    const url = product.mainImageUrl || product.imageUrl;
    if (!url) {
      console.warn(`No image URL found for product ${product.id}`);
      return "/placeholder.svg";
    }
    console.log(`Image URL for product ${product.id}:`, url);
    return url;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-10">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 aspect-square w-full"></div>
            <div className="mt-2 bg-gray-300 h-4 w-3/4"></div>
            <div className="mt-1 bg-gray-300 h-4 w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-10">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative overflow-hidden "
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link
            href={`/products/${product.id}`}
            className="group  overflow-hidden hover:border-black transition-opacity duration-300"
          >
            <div className="aspect-square w-full relative">
              <Image
                src={getImageUrl(product)}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300 border hover:border-black"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-[0.5px] left-0 right-0 bg-[#F6F1EB] bg-opacity-100 p-4 flex items-center justify-between border border-black"
            >
              <h3 className="text-lg font-gradualSemibold text-[#403A34] ">{product.name}</h3>
              <p className="text-[#403A34] font-gradualSemibold">${product.price}</p>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
