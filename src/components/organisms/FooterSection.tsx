'use client'

import { Phone, Mail, MapPin } from "lucide-react";
import { ContactInfoItem } from "@/src/components/molecules";
import InstagramIcon from "@/src/components/atoms/InstagramIcon";
import Image from "next/image";

export default function FooterSection() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-10 md:gap-6">
        <div className="space-y-4 col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-white mb-6">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden relative">
              <Image src="/small-icon.png" alt="Familia Vet & Care" fill className="object-contain" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Familia Vet & Care
            </span>
          </div>
          <p className="text-slate-400 max-w-sm font-bold">
            Treat Your Pets Like Our Own Familia.
          </p>
          <p className="text-slate-400 max-w-sm">
            Memberikan layanan kesehatan hewan yang profesional, hangat, dan terpercaya untuk setiap anggota keluarga berbulu.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg mb-4">Hubungi Kami</h4>
          <ContactInfoItem icon={MapPin}>
            <p>
              Gg. Nanas I No.11, RT.01/RW.07
              <br />
              Jajar, Kec. Laweyan
              <br />
              Kota Surakarta, Jawa Tengah 57144
            </p>
          </ContactInfoItem>
          <ContactInfoItem icon={Phone} iconColor="text-green-500">
            <a
              href="https://wa.me/6281227662988"
              className="hover:text-white transition-colors"
            >
              +62 812 2766 2988
            </a>
          </ContactInfoItem>
          <ContactInfoItem icon={Mail} iconColor="text-blue-500">
            <a
              href="mailto:familiavetandcare@gmail.com"
              className="hover:text-white transition-colors"
            >
              familiavetandcare@gmail.com
            </a>
          </ContactInfoItem>
          <ContactInfoItem icon={InstagramIcon} iconColor="text-white">
            <a
              href="https://www.instagram.com/familiavetandcare/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @familiavetandcare
            </a>
          </ContactInfoItem>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg mb-4">Jam Operasional</h4>
          <ul className="space-y-2">
            <li className="flex justify-between w-full gap-1">
              <span>Senin - Sabtu:</span> <span>10:00 - 18:00 WIB</span>
            </li>
            <li className="flex justify-between w-full gap-1">
              <span>Minggu & Hari Libur:</span> <span>12:00 - 18:00 WIB</span>
            </li>
          </ul>
          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-amber-400 text-xs font-semibold mb-1">
                Butuh pemeriksaan di luar jam praktik?
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Silakan lakukan reservasi terlebih dahulu. Kami tetap dapat melayani sesuai ketersediaan dokter dengan biaya layanan di luar jam operasional.
              </p>
            </div>
          <div className="w-full h-32 bg-slate-800 rounded-lg mt-4 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.2293046459795!2d110.78999407574709!3d-7.5499560745440855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a152baede49f9%3A0xa707119baefc71b4!2sFamilia%20Vet%20%26%20Care!5e0!3m2!1sen!2sid!4v1785669424922!5m2!1sen!2sid" width="600" height="450" className="border-0" allowFullScreen={true} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
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
