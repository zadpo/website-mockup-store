import { AdminProductList } from "@/components/product/admin-product-list";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminProductList />
    </div>
  );
}
