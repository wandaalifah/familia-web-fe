"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/small-icon.png" className="w-20" />
          <span className="-ml-2 text-xl font-bold tracking-tight">Familia Vet & Care</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#promo" className="hover:text-[#d6c3a5] transition-colors">Promo</a>
          <a href="#about" className="hover:text-[#d6c3a5] transition-colors">About Us</a>
          <a href="#services" className="hover:text-[#d6c3a5] transition-colors">Services</a>
          <a href="#vets" className="hover:text-[#d6c3a5] transition-colors">Our Vets</a>
          <a href="#facilities" className="hover:text-[#d6c3a5] transition-colors">Facilities</a>
          <a href="#contact" className="hover:text-[#d6c3a5] transition-colors">Contact</a>
          <a href="#merchandise" className="hover:text-[#d6c3a5] transition-colors">Merchandise</a>
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
            <a href="#about" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>About Us</a>
            <a href="#services" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#vets" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>Our Vets</a>
            <a href="#facilities" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>Facilities</a>
            <a href="#contact" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>Contact</a>
            <a href="#merchandise" className="hover:text-[#d6c3a5] transition-colors py-2" onClick={() => setIsOpen(false)}>Merchandise</a>
          </div>
        </nav>
      )}
    </header>
  );
}
