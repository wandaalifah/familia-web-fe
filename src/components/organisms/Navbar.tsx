import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-amber-500 fill-amber-500" />
          <span className="text-xl font-bold tracking-tight">Familia Vet & Care</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-amber-500 transition-colors">About Us</a>
          <a href="#services" className="hover:text-amber-500 transition-colors">Services</a>
          <a href="#vets" className="hover:text-amber-500 transition-colors">Our Vets</a>
          <a href="#facilities" className="hover:text-amber-500 transition-colors">Facilities</a>
          <a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-amber-500 text-white hover:bg-amber-600 h-10 px-4 py-2"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
}
