"use client";

import { useState, FormEvent } from "react";
import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { doc, getDoc, setDoc, FirestoreError } from "firebase/firestore";
import { Button2 } from "@/components/ui/Button2";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    console.log("Attempting to", isSignUp ? "sign up" : "sign in", "with email:", email);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User account created:", user.uid);

        try {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date(),
          });
          console.log("User document created in Firestore");

          await setDoc(doc(db, "users", user.uid, "cart", "info"), {
            itemCount: 0,
            total: 0,
          });
          console.log("Cart info document created in Firestore");

          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            console.log("User document verified:", userDoc.data());
          } else {
            console.error("User document not found after creation");
          }
        } catch (firestoreError) {
          console.error("Error creating Firestore documents:", firestoreError);
          setError(`Failed to create user profile: ${(firestoreError as FirestoreError).message}`);
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully");
      }
    } catch (error) {
      console.error("Error in authentication:", error);
      setError(`Authentication error: ${(error as AuthError).message}`);
    }
  };

  return (
    <div className="py-20">
      <div className="w-full max-w-md bg-stone-50 p-8 container mx-auto border border-black">
        <h2 className="text-4xl font-gradualSemibold mb-6 text-[#403A34] items-center justify-center flex">
          {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#403A34]"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#403A34]"
            />
          </div>
          <Button2
            frontText={isSignUp ? "Sign Up" : "Sign In"}
            topText={isSignUp ? "Sign Up" : "Sign In"}
            className="mx-auto"
            onClick={() => handleSubmit()}
          />
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-10 w-full text-[#403A34] hover:underline font-gradualSemibold"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
