import { notFound } from "next/navigation";
import { db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProductDetailWrapper } from "@/components/product/product-detail-wrapper";

interface Product {
  id: string;
  mainImageUrl: string;
  additionalImageUrls: string[];
  name: string;
  price: number;
  description: string;
}

const getProduct = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      mainImageUrl: data?.mainImageUrl || "",
      additionalImageUrls: data?.additionalImageUrls || [],
      name: data?.name || "",
      price: data?.price || 0,
      description: data?.description || "",
    };
  } else {
    return null;
  }
};

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8">
      <ProductDetailWrapper product={product} />
    </div>
  );
}
