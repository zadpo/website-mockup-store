"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function TermsAndConditionsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("termsAccepted");
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    setAccepted(true);
    setIsOpen(false);
  };

  if (accepted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
          >
            <h2 className="mb-4 text-2xl font-bold">Terms and Conditions</h2>
            <ScrollArea className="h-64 rounded-md border p-4">
              <div className="space-y-4 text-sm">
                <p className="font-semibold text-red-600">
                  IMPORTANT: This is not an official website. This is a portfolio project created for
                  demonstration purposes only.
                </p>
                <p>
                  By accessing this website, you acknowledge that this is an unofficial demonstration website
                  created as a portfolio project. It is not affiliated with or endorsed by Goodwood or any
                  other company mentioned.
                </p>
                <h3 className="font-semibold">1. Use of Content</h3>
                <p>
                  The images used on this website are sourced from Goodwood. You can find the official
                  Goodwood Facebook page here:{" "}
                  <Link
                    href="https://www.facebook.com/goodwood.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.facebook.com/goodwood.ph
                  </Link>
                </p>
                <p>
                  These images are used for demonstration purposes only and should not be reproduced or used
                  elsewhere without permission from Goodwood.
                </p>
                <h3 className="font-semibold">2. No Real Transactions</h3>
                <p>
                  This website does not process any real transactions. Any forms or interactive elements are
                  for demonstration only and do not actually submit or store any data.
                </p>
                <h3 className="font-semibold">3. Disclaimer of Liability</h3>
                <p>
                  The creator of this portfolio project is not responsible for any misuse or misunderstanding
                  resulting from the use of this demonstration website.
                </p>
                <h3 className="font-semibold">4. Intellectual Property</h3>
                <p>
                  The design and code of this website, excluding the content sourced from Goodwood, are the
                  intellectual property of the portfolio owner.
                </p>
                <h3 className="font-semibold">5. Contact</h3>
                <p>
                  For any questions or concerns about this portfolio project, please contact the creator
                  directly. Do not contact Goodwood regarding any aspect of this demonstration website.
                </p>
              </div>
            </ScrollArea>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Decline
              </Button>
              <Button onClick={handleAccept}>Accept</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
