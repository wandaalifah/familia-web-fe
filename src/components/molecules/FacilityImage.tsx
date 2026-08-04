
import Image from "next/image";
interface FacilityImageProps {
  src: string;
  alt: string;
  label: string;
  description?: string;
  span?: string;
}

export default function FacilityImage({ src, alt, label, description, span = "" }: FacilityImageProps) {
  return (
    <div className={`relative group rounded-2xl overflow-hidden ${span}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 from-black/80 to-transparent flex items-end p-6">
        <div>
          <span className="text-white font-bold text-xl">{label}</span>
          {description && <p className="text-white/70 text-sm mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );
}
