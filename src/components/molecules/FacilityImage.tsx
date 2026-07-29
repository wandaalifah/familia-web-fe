interface FacilityImageProps {
  src: string;
  alt: string;
  label: string;
  span?: string;
}

export default function FacilityImage({ src, alt, label, span = "" }: FacilityImageProps) {
  return (
    <div className={`relative group rounded-2xl overflow-hidden ${span}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
        <span className="text-white font-bold text-xl">{label}</span>
      </div>
    </div>
  );
}
