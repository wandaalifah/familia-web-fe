import { Heart, Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactInfoItem, SocialLink } from "@/src/components/molecules";

export default function FooterSection() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="space-y-4 col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-white mb-6">
            <Heart className="h-6 w-6 text-amber-500 fill-amber-500" />
            <span className="text-2xl font-bold tracking-tight">
              Familia Vet & Care
            </span>
          </div>
          <p className="text-slate-400 max-w-sm">
            We are dedicated to providing the highest level of veterinary
            medicine along with friendly, compassionate service.
          </p>
          <div className="flex gap-4 pt-4">
            <SocialLink href="#" icon={Mail} />
            <SocialLink href="#" icon={Mail} />
            <SocialLink href="#" icon={Mail} />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
          <ContactInfoItem icon={MapPin}>
            <p>
              123 Pet Avenue, Animal City,
              <br />
              AC 90210
            </p>
          </ContactInfoItem>
          <ContactInfoItem icon={Phone}>
            <p>(555) 123-4567</p>
          </ContactInfoItem>
          <ContactInfoItem icon={Phone} iconColor="text-green-500">
            <a
              href="https://wa.me/1234567890"
              className="hover:text-white transition-colors"
            >
              WhatsApp: (555) 987-6543
            </a>
          </ContactInfoItem>
          <ContactInfoItem icon={Mail}>
            <p>hello@familiavet.com</p>
          </ContactInfoItem>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg mb-4">Opening Hours</h4>
          <ContactInfoItem icon={Clock}>
            <ul className="space-y-2">
              <li className="flex justify-between w-full gap-4">
                <span>Mon - Fri:</span> <span>8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between w-full gap-4">
                <span>Saturday:</span> <span>9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between w-full gap-4">
                <span>Sunday:</span>{" "}
                <span className="text-red-400">Emergencies Only</span>
              </li>
            </ul>
          </ContactInfoItem>
          <div className="w-full h-32 bg-slate-800 rounded-lg mt-4 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
              [ Google Maps Integration ]
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Familia Vet & Care. All rights reserved.</p>
      </div>
    </footer>
  );
}
