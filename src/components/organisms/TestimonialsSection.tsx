'use client'

import { useEffect } from "react";

export default function TestimonialsSection() {
  useEffect(() => {
    // 1. Create the script element
    const scriptId = "jotform-reviews-script";
    
    // Check if the script is already there to prevent duplicates during re-renders
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.jotform.com/website-widgets/embed/019fcd6c7cf87000816bd405e04d6eaea9e0";
      script.async = true;
      
      // 2. Append it to the document so it runs
      document.body.appendChild(script);
    }
  }, []); // The empty array ensures this only runs once when the component mounts

  return (
    <section className="py-24 bg-amber-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
          Happy Pets, Happy Clients
        </h2>
        
        {/* 3. The container Jotform will look for to inject the reviews */}
        <div 
          id="JFWebsiteWidget-019fcd6c7cf87000816bd405e04d6eaea9e0" 
          className="w-full max-w-6xl mx-auto"
        ></div>
        
      </div>
    </section>
  );
}