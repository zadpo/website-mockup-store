import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-20">
      <div className="bg-[#F6F1EB] border-t border-[#403A34]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-gradualSemibold text-[#403A34]">About Us</h3>
              <p className="text-sm text-stone-600">
                We create sustainable and unique furniture, designed and made with care in the Philippines.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-gradualSemibold text-[#403A34]">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Products", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-sm text-stone-600 hover:text-[#403A34] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-gradualSemibold text-[#403A34]">Contact</h3>
              <p className="text-sm text-stone-600">123 Furniture Street, Manila, Philippines</p>
              <p className="text-sm text-stone-600">Email: info@goodmood.com</p>
              <p className="text-sm text-stone-600">Phone: +63 123 456 7890</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-gradualSemibold text-[#403A34]">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-stone-600 hover:text-[#403A34] transition-colors">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-stone-600 hover:text-[#403A34] transition-colors">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-stone-600 hover:text-[#403A34] transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#403A34]">
            <p className="text-sm text-center text-stone-600">
              © {new Date().getFullYear()} GOODMOOD. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
