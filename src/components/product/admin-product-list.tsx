"use client";
/* eslint-disable */

import { useState, useEffect } from "react";
import { db, auth } from "../../../firebase";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  mainImageUrl: string;
}

export function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef);
      const querySnapshot = await getDocs(q);

      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async () => {
    if (!productToDelete || !isAuthenticated) return;

    try {
      await deleteDoc(doc(db, "products", productToDelete));
      setProducts(products.filter((product) => product.id !== productToDelete));
      router.refresh(); // Refresh the page to update the public view
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProductToDelete(null);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Admin Product List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img src={product.mainImageUrl} alt={product.name} className="w-16 h-16 object-cover" />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" onClick={() => setProductToDelete(product.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product &quot;
                        {product.name}&quot; from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteProduct}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
