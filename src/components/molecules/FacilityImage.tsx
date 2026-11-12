"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FacilityImageProps {
  images: (string | StaticImageData)[];
  alt: string;
  label: string;
  description?: string;
  span?: string;
}

export default function FacilityImage({
  images,
  alt,
  label,
  description,
  span = "",
}: Readonly<FacilityImageProps>) {
  const count = images.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (index: number) => setCurrent((index + count) % count);

  // Auto-advance the slider every 5s; pause while hovered or focused
  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, count]);

  return (
    <div
      className={`relative group rounded-2xl overflow-hidden ${span}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Image slider (crossfade) */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
        {images.map((image, index) => (
          <Image
            key={typeof image === "string" ? image : image.src}
            src={image}
            alt={index === 0 ? alt : `${alt} ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Slider controls (hidden on desktop until hover, always visible on touch) */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Gambar sebelumnya"
            className="absolute left-2 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white opacity-100 transition-opacity hover:bg-black/60 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Gambar berikutnya"
            className="absolute right-2 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white opacity-100 transition-opacity hover:bg-black/60 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
            {images.map((image, index) => (
              <button
                key={typeof image === "string" ? image : image.src}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Tampilkan gambar ${index + 1}`}
                aria-current={index === current}
                className={`h-1.5 rounded-full transition-all ${
                  index === current
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute inset-0 from-black/80 to-transparent flex items-end p-6">
        <div>
          <span className="text-white font-bold text-xl">{label}</span>
          {description && <p className="text-white/70 text-sm mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );
}
