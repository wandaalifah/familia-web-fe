import { BlogCard } from "@/src/components/molecules";

const blogs = [
  {
    title: "Puppy Vaccination Schedule: What You Need to Know",
    tag: "Health",
    image: "https://source.unsplash.com/random/400x300/?pet,dog,cat,0",
  },
  {
    title: "The Ultimate Guide to Cat Nutrition",
    tag: "Diet",
    image: "https://source.unsplash.com/random/400x300/?pet,dog,cat,1",
  },
  {
    title: "Preventing Ticks and Fleas in Summer",
    tag: "Prevention",
    image: "https://source.unsplash.com/random/400x300/?pet,dog,cat,2",
  },
  {
    title: "Emergency Pet First Aid Basics",
    tag: "Safety",
    image: "https://source.unsplash.com/random/400x300/?pet,dog,cat,3",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Pet Care Tips & Blog
            </h2>
            <p className="text-slate-600">
              Expert advice to keep your best friend healthy.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {blogs.map((blog, idx) => (
            <BlogCard key={idx} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
