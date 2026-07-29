import { Shield, Award, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-5xl text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Familia Vet & Care
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Founded in 2010, our story began with a simple belief: pets are
            family. For over 15 years, we have been dedicated to providing
            stress-free, compassionate care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <Shield className="h-10 w-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Mission & Vision</h3>
            <p className="text-slate-600 text-sm">
              To elevate the standard of veterinary medicine through continuous
              innovation while maintaining a warm, family-oriented environment
              for every pet.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <Award className="h-10 w-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Certifications</h3>
            <p className="text-slate-600 text-sm">
              We are a fully accredited AAHA (American Animal Hospital
              Association) facility, adhering to over 900 standards of
              veterinary excellence.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <CheckCircle2 className="h-10 w-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Why Clients Trust Us</h3>
            <p className="text-slate-600 text-sm">
              With transparent pricing, state-of-the-art technology, and a
              fear-free certified staff, we prioritize your pet&apos;s comfort
              and your peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
