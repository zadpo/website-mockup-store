"use client";

import { useState } from "react";
import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignIn({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User account created:", user.uid);

        // Create a user document in Firestore
        try {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date(),
          });
          console.log("User document created in Firestore");

          // Create an empty cart subcollection
          await setDoc(doc(db, "users", user.uid, "cart", "info"), {
            itemCount: 0,
            total: 0,
          });
          console.log("Cart info document created in Firestore");

          // Verify that the document was created
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            console.log("User document verified:", userDoc.data());
          } else {
            console.error("User document not found after creation");
          }
        } catch (firestoreError) {
          console.error("Error creating Firestore documents:", firestoreError);
          setError("Failed to create user profile. Please try again.");
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully");
      }
      onClose();
    } catch (error) {
      console.error("Error in authentication:", error);
      if (isSignUp) {
        setError("Failed to create account. Please try again.");
      } else {
        setError("Failed to sign in. Please check your credentials and try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? "Create Account" : "Sign In"}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>
      <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="mt-4 w-full">
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </Button>
    </div>
  );
}
