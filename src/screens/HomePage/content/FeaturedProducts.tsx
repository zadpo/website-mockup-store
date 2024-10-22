import { ProductList } from "@/components/product/product-list";
import { db } from "../../../../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Suspense } from "react";

async function getFeaturedProducts() {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef); // Limit to 4 featured products
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        mainImageUrl: data.mainImageUrl,
      };
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) {
    return <div className="text-center py-12">No featured products available at the moment.</div>;
  }

  return (
    <section className="pt-10 ">
      <ProductList products={products} />
    </section>
  );
}

function LoadingProducts() {
  return <div className="text-center py-12">Loading featured products...</div>;
}

export function ProductPage() {
  return (
    <div className="space-y-10">
      <Suspense fallback={<LoadingProducts />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
