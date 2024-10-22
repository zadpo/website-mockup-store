"use client";
/* eslint-disable */

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import { collection, query, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export function Cart() {
  const [user] = useAuthState(auth);
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const cartRef = collection(db, "users", user.uid, "cart");
      const q = query(cartRef);
      const querySnapshot = await getDocs(q);

      const fetchedItems: CartItem[] = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== "info") {
          const data = doc.data();
          fetchedItems.push({
            id: doc.id,
            name: data.name || "",
            price: data.price || 0,
            quantity: data.quantity || 0,
            imageUrl: data.imageUrl || "/placeholder.svg",
          } as CartItem);
        }
      });

      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const selectedTotal = items
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout.");
    } else {
      console.log("Checking out with items:", selectedItems);
      // Implement checkout logic here
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!user) return;

    try {
      // Delete the item from Firestore
      await deleteDoc(doc(db, "users", user.uid, "cart", itemId));

      // Update the cart info document
      const cartInfoRef = doc(db, "users", user.uid, "cart", "info");
      const deletedItem = items.find((item) => item.id === itemId);
      if (deletedItem) {
        await updateDoc(cartInfoRef, {
          itemCount: items.length - 1,
          total:
            items.reduce((sum, item) => sum + item.price * item.quantity, 0) -
            deletedItem.price * deletedItem.quantity,
        });
      }

      // Update the local state
      setItems(items.filter((item) => item.id !== itemId));
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto  py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Loading cart items...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="  px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Please sign in to view your cart.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className=" py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div>
        {items.map((item) => (
          <div key={item.id} className="flex items-center py-4 border-b">
            <Checkbox
              id={`item-${item.id}`}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => toggleItemSelection(item.id)}
            />
            <Image
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-md ml-4"
            />
            <div className="ml-4 flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <p className="font-semibold mr-4">${(item.price * item.quantity).toFixed(2)}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteItem(item.id)}
              aria-label={`Delete ${item.name} from cart`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold">Selected Total: ${selectedTotal.toFixed(2)}</p>
          <Button onClick={handleCheckout} disabled={selectedItems.length === 0}>
            Checkout Selected Items
          </Button>
        </div>
      </div>
    </div>
  );
}
