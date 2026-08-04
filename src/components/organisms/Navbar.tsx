"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center">
            <Image src="/small-icon.png" alt="Familia Vet & Care" width={80} height={80} className="w-20" />
            <span className="-ml-2 text-xl font-bold tracking-tight">Familia Vet & Care</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <Link href="/promo" className="hover:text-[#d6c3a5] transition-colors">Promo</Link>
          <Link href="/about" className="hover:text-[#d6c3a5] transition-colors">About Us</Link>
          <Link href="/services" className="hover:text-[#d6c3a5] transition-colors">Services</Link>
          <Link href="/vets" className="hover:text-[#d6c3a5] transition-colors">Our Vets</Link>
          <Link href="/facilities" className="hover:text-[#d6c3a5] transition-colors">Facilities</Link>
          <Link href="/contact" className="hover:text-[#d6c3a5] transition-colors">Contact</Link>
          <Link href="/merchandise" className="hover:text-[#d6c3a5] transition-colors">
            Merchandise
          </Link>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-[#d6c3a5] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <nav className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm font-medium text-slate-600">
            <Link href="/promo" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>
              Promo
            </Link>
            <Link href="/about" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link href="/services" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/vets" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>
              Our Vets
            </Link>
            <Link href="/facilities" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>
              Facilities
            </Link>
            <Link href="/contact" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link href="/merchandise" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>
              Merchandise
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
