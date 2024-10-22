"use client";
/* eslint-disable */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ProductUploadForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setAdditionalImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!mainImage) {
        throw new Error("Please select a main image");
      }

      // Upload main image to Firebase Storage
      const mainImageRef = ref(storage, `products/${Date.now()}_main_${mainImage.name}`);
      await uploadBytes(mainImageRef, mainImage);
      const mainImageUrl = await getDownloadURL(mainImageRef);

      // Upload additional images to Firebase Storage
      const additionalImageUrls = await Promise.all(
        additionalImages.map(async (image) => {
          const imageRef = ref(storage, `products/${Date.now()}_${image.name}`);
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef);
        })
      );

      // Add product data to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        description,
        mainImageUrl,
        additionalImageUrls,
      });

      console.log("Product added with ID: ", docRef.id);
      router.push("/admin/upload"); // Redirect to products page after successful upload
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Error uploading product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="mainImage">Main Product Image</Label>
        <Input id="mainImage" type="file" accept="image/*" onChange={handleMainImageChange} required />
      </div>
      {mainImage && (
        <div className="w-full h-40 relative">
          <img
            src={URL.createObjectURL(mainImage)}
            alt="Main image preview"
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
      <div>
        <Label htmlFor="additionalImages">Additional Product Images (Up to 4)</Label>
        <Input
          id="additionalImages"
          type="file"
          accept="image/*"
          onChange={handleAdditionalImagesChange}
          multiple
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {additionalImages.map((image, index) => (
          <div key={index} className="w-20 h-20 relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Additional image preview ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Uploading..." : "Upload Product"}
      </Button>
    </form>
  );
}
