interface BlogCardProps {
  title: string;
  tag: string;
  image: string;
}

export default function BlogCard({ title, tag, image }: BlogCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="h-40 bg-slate-200 w-full relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
          {tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg leading-tight mb-2 hover:text-amber-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-amber-600 font-medium mt-4">Read Article →</p>
      </div>
    </div>
  );
}
