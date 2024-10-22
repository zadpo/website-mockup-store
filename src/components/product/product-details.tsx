"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SignIn } from "@/components/auth/sign-in";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";
import { Button2 } from "../ui/Button2";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  mainImageUrl: string;
  additionalImageUrls?: string[];
}

interface ProductDetailProps {
  product: Product;
  onCartUpdate: () => void;
}

export function ProductDetail({ product, onCartUpdate }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [addingToCart, setAddingToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [imageFallbacks, setImageFallbacks] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      if (currentUser) {
        setShowSignIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageError = (imageKey: string) => {
    setImageFallbacks((prev) => ({ ...prev, [imageKey]: true }));
  };

  const handleAddToCart = async () => {
    if (user) {
      setAddingToCart(true);
      try {
        const cartRef = doc(db, "users", user.uid, "cart", "info");
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
          await updateDoc(cartRef, {
            itemCount: increment(quantity),
            total: increment(product.price * quantity),
          });
        } else {
          await setDoc(cartRef, {
            itemCount: quantity,
            total: product.price * quantity,
          });
        }

        const productRef = doc(db, "users", user.uid, "cart", product.id);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          await updateDoc(productRef, {
            quantity: increment(quantity),
          });
        } else {
          await setDoc(productRef, {
            name: product.name,
            price: product.price,
            quantity: quantity,
            imageUrl: product.mainImageUrl,
          });
        }

        setQuantity(1);
        onCartUpdate();
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setAddingToCart(false);
      }
    } else {
      console.log("User not logged in. Showing sign-in modal.");
      setShowSignIn(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const currentImageUrl =
    currentImageIndex === -1
      ? product.mainImageUrl
      : (product.additionalImageUrls && product.additionalImageUrls[currentImageIndex]) ||
        product.mainImageUrl;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <Image
            src={imageFallbacks["main"] ? "/placeholder.svg" : currentImageUrl}
            alt={product.name}
            width={1000}
            height={1000}
            className="h-full w-full object-cover object-center"
            onError={() => handleImageError("main")}
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setCurrentImageIndex(-1)}
            className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
              currentImageIndex === -1 ? "" : ""
            }`}
          >
            <Image
              src={imageFallbacks["main"] ? "/placeholder.svg" : product.mainImageUrl}
              alt={`${product.name} main thumbnail`}
              width={80}
              height={80}
              className="h-full w-full object-cover object-center"
              onError={() => handleImageError("main")}
            />
          </button>
          {product.additionalImageUrls &&
            product.additionalImageUrls.map((url, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                  index === currentImageIndex ? "" : ""
                }`}
              >
                <Image
                  src={imageFallbacks[`additional-${index}`] ? "/placeholder.svg" : url}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover object-center"
                  onError={() => handleImageError(`additional-${index}`)}
                />
              </button>
            ))}
        </div>
      </div>
      <div>
        <h1 className="text-[60px] font-gradualSemibold text-[#403A34]">{product.name}</h1>
        <p className="mt-2 text-xl font-gradualSemibold text-[#403A34]">${product.price.toFixed(2)}</p>
        <p className="mt-4 text-gray-600 font-gradualSemibold text-[#403A34]">{product.description}</p>
        <div className="mt-6 flex items-center">
          <label htmlFor="quantity" className="mr-2 font-gradualSemibold text-[#403A34]">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-white border-black border bg-[#403A34] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-1"
          />
        </div>
        {/* <Button onClick={handleAddToCart} className="mt-6" disabled={addingToCart}>
          {addingToCart ? "Adding to Cart..." : "Add to Cart"}
        </Button> */}
        <Button2
          onClick={handleAddToCart}
          disabled={addingToCart}
          frontText="ADD TO CART"
          topText="ADD TO CART"
          className="mt-6"
        />
      </div>
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Please Sign In</h2>
            <SignIn onClose={() => setShowSignIn(false)} />
            <Button onClick={() => setShowSignIn(false)} className="mt-4 w-full">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
