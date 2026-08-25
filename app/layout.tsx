import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global metadata for the application
export const metadata: Metadata = {
  metadataBase: new URL("https://familiavetandcare.com"),
  title: {
    default: "Familia Vet & Care Solo Surakarta - Klinik Hewan Terpercaya | Dokter Hewan Profesional",
    template: "%s | Familia Vet & Care Solo",
  },
  description:
    "Familia Vet & Care adalah klinik hewan terpercaya di Solo Surakarta yang menyediakan layanan kesehatan hewan profesional: pemeriksaan, konsultasi, vaksinasi, operasi, sterilisasi, grooming, scaling gigi, pet hotel, rawat inap, dan home visit. Ditangani oleh dokter hewan berpengalaman (drh. Ade, drh. Arief, drh. Grace) dengan fasilitas modern dan nyaman di Jajar, Laweyan, Surakarta. Hubungi +62 812 2766 2988.",
  keywords: [
    // Brand
    "familia vet and care",
    "familia vet solo",
    "familia vet surakarta",
    "familia vet care",
    // Primary Services - Klinik & Dokter Hewan
    "klinik hewan solo",
    "klinik hewan surakarta",
    "klinik hewan terpercaya solo",
    "klinik hewan terbaik solo",
    "klinik hewan terdekat",
    "dokter hewan solo",
    "dokter hewan surakarta",
    "dokter hewan terpercaya",
    "dokter hewan profesional",
    "veteriner solo",
    "veteriner surakarta",
    "rumah sakit hewan solo",
    // Layanan Medis
    "pemeriksaan hewan solo",
    "konsultasi dokter hewan solo",
    "vaksinasi hewan solo",
    "vaksinasi kucing solo",
    "vaksinasi anjing solo",
    "operasi hewan solo",
    "sterilisasi hewan solo",
    "sterilisasi kucing solo",
    "sterilisasi anjing solo",
    "kastrasi hewan solo",
    "pengobatan hewan solo",
    "perawatan gigi hewan solo",
    "scaling gigi hewan solo",
    "dental care hewan",
    "rawat inap hewan solo",
    "perawatan intensif hewan",
    // Grooming & Perawatan
    "grooming hewan solo",
    "grooming kucing solo",
    "grooming anjing solo",
    "grooming terdekat",
    "perawatan hewan peliharaan",
    "mandi kucing solo",
    "mandi anjing solo",
    // Pet Hotel & Penitipan
    "pet hotel solo",
    "pet hotel surakarta",
    "penitipan hewan solo",
    "penitipan kucing solo",
    "penitipan anjing solo",
    "pet boarding solo",
    "tempat penitipan hewan",
    // Home Visit
    "home visit dokter hewan solo",
    "dokter hewan panggilan solo",
    "homevisit hewan",
    "layanan dokter hewan ke rumah",
    // Lokasi Spesifik
    "klinik hewan laweyan",
    "klinik hewan jajar solo",
    "klinik hewan surakarta jawa tengah",
    "klinik hewan jawa tengah",
    "dokter hewan di solo",
    // Hewan Peliharaan
    "klinik kucing solo",
    "klinik anjing solo",
    "dokter kucing solo",
    "dokter anjing solo",
    "perawatan kucing solo",
    "perawatan anjing solo",
    "hewan peliharaan solo",
    // Bahasa Inggris (untuk expat & turis)
    "veterinary clinic solo",
    "vet solo surakarta",
    "pet care solo",
    "animal hospital solo",
    "pet grooming solo",
    "pet hotel surakarta",
    "trusted vet solo",
  ],
  authors: [{ name: "Familia Vet & Care", url: "https://familia-vet.com" }],
  creator: "Familia Vet & Care",
  publisher: "Familia Vet & Care",
  icons: {
    icon: [
      { url: "/small-icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/small-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/small-icon.png"],
  },
  // manifest: "/site.webmanifest", (for PWA, if needed)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://familiavetandcare.com",
    siteName: "Familia Vet & Care Solo Surakarta",
    title: "Familia Vet & Care - Klinik Hewan Terpercaya di Solo Surakarta",
    description:
      "Layanan kesehatan hewan profesional di Solo: pemeriksaan, vaksinasi, operasi, grooming, pet hotel, rawat inap, dan home visit. Dokter hewan berpengalaman dengan fasilitas modern. Hubungi +62 812 2766 2988.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Familia Vet & Care - Klinik Hewan Terpercaya Solo Surakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Familia Vet & Care - Klinik Hewan Terpercaya Solo Surakarta",
    description:
      "Layanan kesehatan hewan profesional: vaksinasi, operasi, grooming, pet hotel, home visit. Dokter hewan berpengalaman di Solo. Hubungi +62 812 2766 2988.",
    images: ["/og-image.jpg"],
    creator: "@familiavetandcare",
  },
  alternates: {
    canonical: "https://familiavetandcare.com",
  },
  category: "veterinary clinic",
  other: {
    "business:contact_data:street_address": "Gg. Nanas I No.11, RT.01/RW.07, Jajar",
    "business:contact_data:locality": "Surakarta",
    "business:contact_data:region": "Jawa Tengah",
    "business:contact_data:postal_code": "57144",
    "business:contact_data:country_name": "Indonesia",
    "business:contact_data:phone_number": "+6281227662988",
    "business:contact_data:email": "familiavetandcare@gmail.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="5GbqOaXCNiaVe0CX5gDDLchPnT7N7KcraUqMGI1qNl4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VeterinaryCare",
              "@id": "https://familiavetandcare.com",
              name: "Familia Vet & Care",
              alternateName: "Familia Vet Solo",
              url: "https://familiavetandcare.com",
              telephone: "+6281227662988",
              email: "familiavetandcare@gmail.com",
              description:
                "Klinik hewan terpercaya di Solo Surakarta. Layanan: pemeriksaan, vaksinasi, operasi, grooming, pet hotel, rawat inap, home visit.",
              image: "https://familiavetandcare.com/og-image.jpg",
              logo: "https://familiavetandcare.com/small-icon.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gg. Nanas I No.11, RT.01/RW.07, Jajar",
                addressLocality: "Surakarta",
                addressRegion: "Jawa Tengah",
                postalCode: "57144",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -7.5499560745440855,
                longitude: 110.78999407574709,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "10:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday"],
                  opens: "12:00",
                  closes: "18:00",
                },
              ],
              priceRange: "$$",
              medicalSpecialty: "Veterinary",
              availableService: [
                { "@type": "MedicalProcedure", name: "Pemeriksaan & Konsultasi" },
                { "@type": "MedicalProcedure", name: "Vaksinasi" },
                { "@type": "MedicalProcedure", name: "Operasi & Sterilisasi" },
                { "@type": "MedicalProcedure", name: "Perawatan Gigi (Scaling)" },
                { "@type": "MedicalProcedure", name: "Grooming" },
                { "@type": "MedicalProcedure", name: "Home Visit" },
                { "@type": "MedicalProcedure", name: "Pet Hotel" },
                { "@type": "MedicalProcedure", name: "Rawat Inap" },
              ],
              employee: [
                { "@type": "Person", name: "drh. Ade", jobTitle: "Veterinarian" },
                { "@type": "Person", name: "drh. Arief", jobTitle: "Veterinarian" },
                { "@type": "Person", name: "drh. Grace", jobTitle: "Veterinarian" },
              ],
              hasMap:
                "https://www.google.com/maps/place/Familia+Vet+%26+Care/@-7.5499560745440855,110.78999407574709,17z",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
