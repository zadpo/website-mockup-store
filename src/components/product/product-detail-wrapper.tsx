"use client";
/* eslint-disable */

import { useState } from "react";
import { ProductDetail } from "@/components/product/product-details";

interface Product {
  id: string;
  mainImageUrl: string;
  additionalImageUrls: string[];
  name: string;
  price: number;
  description: string;
}

interface ProductDetailWrapperProps {
  product: Product;
}

export function ProductDetailWrapper({ product }: ProductDetailWrapperProps) {
  const [cartKey, setCartKey] = useState(0);

  const handleCartUpdate = () => {
    setCartKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="  py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProductDetail onCartUpdate={handleCartUpdate} product={product} />
        </div>
        {/* <div className="md:col-span-1">
          <Cart key={cartKey} />
        </div> */}
      </div>
    </div>
  );
}
