import { ProductUploadForm } from "@/components/product/product-upload";

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Upload New Product</h1>
      <ProductUploadForm />
    </div>
  );
}
