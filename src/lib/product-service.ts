import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Product {
  name: string;
  price: number;
  description: string;
  image: File;
}

export async function addProduct(product: Product) {
  try {
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `products/${product.image.name}`);
    await uploadBytes(imageRef, product.image);
    const imageUrl = await getDownloadURL(imageRef);

    // Add product data to Firestore
    const docRef = await addDoc(collection(db, "products"), {
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: imageUrl,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
}
