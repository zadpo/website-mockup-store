"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navMenu = [
  { name: "HOME", href: "/" },
  { name: "PRODUCTS", href: "/products" },
  { name: "CART", href: "/cart" },
] as const;

export default function Header() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="border border-black">
        <div className="lg:pl-10 md:pl-4 pl-4 mx-auto">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-3xl font-bold font-gradualBold">
              GOODMOOD
            </Link>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2" aria-label="Toggle menu">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            <nav className="hidden md:flex items-center h-full">
              <ul className="flex h-full">
                {navMenu.map((item, index) => (
                  <li key={item.name} className={`h-full ${index === 0 ? "border-l border-black" : ""}`}>
                    <Link
                      href={item.href}
                      className="flex items-center h-full px-4 border-r border-black hover:bg-gray-100 transition-colors font-gradualSemibold"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center h-full px-4 border-r border-black hover:bg-gray-100 transition-colors font-gradualSemibold"
                >
                  SIGN OUT
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center h-full px-4 border-r border-black hover:bg-gray-100 transition-colors font-gradualSemibold"
                >
                  SIGN IN
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border border-black border-t-0"
          >
            <nav className="container mx-auto px-4 py-2">
              <ul className="flex flex-col">
                {navMenu.map((item) => (
                  <li key={item.name} className="border-b border-gray-200 last:border-b-0">
                    <Link
                      href={item.href}
                      className="block py-2 hover:bg-gray-100 transition-colors font-gradualSemibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {user ? (
                  <li className="border-b border-gray-200">
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 hover:bg-gray-100 transition-colors font-gradualSemibold"
                    >
                      SIGN OUT
                    </button>
                  </li>
                ) : (
                  <li className="border-b border-gray-200">
                    <Link
                      href="/signin"
                      className="block py-2 hover:bg-gray-100 transition-colors font-gradualSemibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SIGN IN
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
