import { create } from "zustand";
import {
  ICoupon,
  IMemberProfile,
  IPet,
  IPointsLedgerEntry,
  IVoucher,
} from "@/src/interfaces/member/membership";
import {
  Home,
  Hotel,
  Scissors,
  Sparkles,
  Syringe,
  Ticket,
} from "lucide-react";

const MOCK_USER: IMemberProfile = {
  firstName: "Budi",
  lastName: "Santoso",
  email: "budi.santoso@example.com",
  phone: "+62 812-3456-7890",
  memberId: "FVC-882910",
  tier: "Gold Tier",
  points: 750,
  nextTierPoints: 1000,
  nextTierName: "Platinum",
  joinDate: "15 Jan 2022",
  totalVisits: 18,
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

const MOCK_PETS: IPet[] = [
  {
    id: "pet-1",
    name: "Milo",
    species: "Anjing (Dog)",
    breed: "Golden Retriever",
    birthdate: "2021-10-12",
    gender: "Jantan (Neutered)",
    weight: "28.5 kg",
    microchipId: "985141002931",
    avatar:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&auto=format&fit=crop&q=80",
    lastVisitDate: "28 Okt 2026",
    medicalHistory: [
      {
        id: "m-1",
        date: "11 November 2026",
        weight: "6.50 kg",
        temp: "38.5 °C",
        type: "Rawat Inap",
        category: "Rawat Inap",
        diagnosis: "Otitis Externa ringan telinga kanan",
        treatment:
          "Flushing pembersihan kanal telinga & aplikasi tetes anti-inflamasi",
        prescriptions: ["Otic Ear Drops (3 tetes/hari selama 7 hari)"],
        vetName: "drh. Hendra Wijaya",
        clinicLocation: "Kebayoran Baru Branch",
        followUp: "22 Mei 2026 (Sembuh Total)",
        status: "Selesai",
        rawatInapRecap: {
          kondisi: "Stabil & Aktif",
          beratBadan: "4.2 kg",
          suhu: "38.5 °C",
          makan: "Habis 1 Porsi",
          pup: "Normal (1x)",
          pip: "Lancar (2x)",
          muntah: "Tidak ada (-)",
          catatan:
            "Pasien merespons pengobatan dengan baik, nafsu makan sudah kembali.",
        },
      },
      {
        id: "m-2",
        date: "28 Okt 2026",
        weight: "2.50 kg",
        temp: "38.5 °C",
        type: "Konsultasi & Pemeriksaan Rutin",
        category: "Rawat Jalan",
        treatment:
          "Pembersihan karang gigi ringan, hidrasi IV ringan, & injeksi Vitamin B-Complex",
        prescriptions: [
          "Vet-Dental Oral Gel (2x/hari)",
          "Multivitamin Anabul (1x/hari)",
        ],
        vetName: "drh. Sarah Melati, M.Si",
        clinicLocation: "BSD City Main Branch",
        followUp: "14 Nov 2026 (Kontrol Plak Gigi)",
        status: "Selesai",
      },
      {
        id: "m-3",
        date: "15 Mei 2026",
        weight: "1.50 kg",
        temp: "38.5 °C",
        type: "Pemeriksaan Telinga & Kulit",
        category: "Rawat Jalan",
        diagnosis: "Otitis Externa ringan telinga kanan",
        treatment:
          "Flushing pembersihan kanal telinga & aplikasi tetes anti-inflamasi",
        prescriptions: ["Otic Ear Drops (3 tetes/hari selama 7 hari)"],
        vetName: "drh. Hendra Wijaya",
        clinicLocation: "Kebayoran Baru Branch",
        followUp: "22 Mei 2026 (Sembuh Total)",
        status: "Selesai",
      },
    ],
    vaccines: [
      {
        id: "v-1",
        name: "Vaksin Rabies Quad",
        dateGiven: "15 Okt 2025",
        dueDate: "15 Okt 2026",
        status: "Completed",
        vetName: "drh. Sarah Melati, M.Si",
        clinicLocation: "BSD City Main Branch",
        batchNumber: "RB-2024-0982",
      },
      {
        id: "v-2",
        name: "DHPPi (Distemper, Parvo, Hepatitis)",
        dateGiven: "12 Mei 2025",
        dueDate: "12 Mei 2026",
        status: "Completed",
        vetName: "drh. Sarah Melati, M.Si",
        clinicLocation: "BSD City Main Branch",
        batchNumber: "DH-8831-A",
      },
      {
        id: "v-3",
        name: "Bordetella (Kennel Cough)",
        dateGiven: "05 Nov 2025",
        dueDate: "05 Nov 2026",
        status: "Upcoming",
        vetName: "drh. Hendra Wijaya",
        clinicLocation: "Kebayoran Baru Branch",
        batchNumber: "BC-1022-X",
      },
    ],
  },
  {
    id: "pet-2",
    name: "Luna",
    species: "Kucing (Cat)",
    breed: "British Shorthair",
    birthdate: "2022-05-05",
    gender: "Betina (Spayed)",
    weight: "4.2 kg",
    microchipId: "985141004112",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80",
    lastVisitDate: "02 Des 2026",
    medicalHistory: [
      {
        id: "m-4",
        date: "02 Des 2026",
        type: "Grooming Medis & Cek Jamur",
        category: "Dermatologi",
        diagnosis: "Kulit sehat, pembentukan hairball ringan",
        treatment:
          "Bathing terapeutik jamur & pemberian gel pelebur hairball",
        prescriptions: ["Hairball Relief Paste (2x seminggu)"],
        vetName: "drh. Amanda Putri",
        clinicLocation: "Dago Bandung Branch",
        followUp: "-",
        status: "Selesai",
      },
    ],
    vaccines: [
      {
        id: "v-4",
        name: "Feline Rabies Vaccine",
        dateGiven: "02 Des 2025",
        dueDate: "02 Des 2026",
        status: "Completed",
        vetName: "drh. Amanda Putri",
        clinicLocation: "Dago Bandung Branch",
        batchNumber: "FR-9912-K",
      },
      {
        id: "v-5",
        name: "FVRCP (Tricat Trio)",
        dateGiven: "10 Jun 2025",
        dueDate: "10 Jun 2026",
        status: "Completed",
        vetName: "drh. Amanda Putri",
        clinicLocation: "Dago Bandung Branch",
        batchNumber: "TR-4001-B",
      },
    ],
  },
  {
    id: "pet-3",
    name: "Oliver",
    species: "Kelinci (Rabbit)",
    breed: "Holland Lop",
    birthdate: "2023-01-14",
    gender: "Jantan",
    weight: "1.8 kg",
    microchipId: "985141008891",
    avatar:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&auto=format&fit=crop&q=80",
    lastVisitDate: "20 Mar 2026",
    medicalHistory: [
      {
        id: "m-5",
        date: "20 Mar 2026",
        type: "Pemeriksaan Gigi & Pencernaan",
        category: "Pemeriksaan",
        diagnosis: "Gigi seri atas sedikit panjang (overgrowth ringan)",
        treatment:
          "Trimming gigi incisor & pemberian suplemen serat tinggi",
        prescriptions: [
          "Timothy High-Fiber Hay Extra",
          "Probiotik Saluran Cerna Kelinci",
        ],
        vetName: "drh. Hendra Wijaya",
        clinicLocation: "Kebayoran Baru Branch",
        followUp: "20 Jun 2026 (Cek Gigi Berkala)",
        status: "Selesai",
      },
    ],
    vaccines: [
      {
        id: "v-6",
        name: "RHDV2 (Rabbit Hemorrhagic)",
        dateGiven: "20 Mar 2025",
        dueDate: "20 Mar 2026",
        status: "Completed",
        vetName: "drh. Hendra Wijaya",
        clinicLocation: "Kebayoran Baru Branch",
        batchNumber: "RH-1102-M",
      },
    ],
  },
];

const MOCK_COUPONS: ICoupon[] = [
  {
    id: "c1",
    title: "Free Premium Pet Grooming",
    pointsCost: 500,
    category: "Grooming",
    description:
      "Berlaku untuk paket Full Spa & Grooming anabul (Semua ukuran & ras).",
    expiryDays: "30 Hari setelah klaim",
    badge: "Best Seller",
    icon: Scissors,
  },
  {
    id: "c2",
    title: "Diskon 20% Paket Vaksinasi",
    pointsCost: 300,
    category: "Medis",
    description:
      "Diskon 20% untuk semua jenis vaksinasi tahunan di seluruh cabang.",
    expiryDays: "14 Hari setelah klaim",
    badge: "Populer",
    icon: Syringe,
  },
  {
    id: "c3",
    title: "Free Dental Checkup & Scalling 10%",
    pointsCost: 450,
    category: "Medis",
    description:
      "Pemeriksaan kesehatan gigi gratis & diskon 10% tindakan scalling.",
    expiryDays: "60 Hari setelah klaim",
    badge: "Rekomendasi Vet",
    icon: Sparkles,
  },
  {
    id: "c4",
    title: "Voucher Pet Shop Rp 50.000",
    pointsCost: 250,
    category: "Pet Shop",
    description:
      "Potongan Rp 50.000 untuk pembelian makanan & mainan min. Rp 200.000.",
    expiryDays: "30 Hari setelah klaim",
    badge: "Favorit",
    icon: Ticket,
  },
  {
    id: "c5",
    title: "Free Pet Hotel 1 Malam",
    pointsCost: 700,
    category: "Hotel",
    description:
      "Menginap 1 malam di Suite Room Pet Hotel Familia (Include makanan premium).",
    expiryDays: "45 Hari setelah klaim",
    badge: "Eksklusif Gold",
    icon: Hotel,
  },
  {
    id: "c6",
    title: "Diskon 50% House Call Visit",
    pointsCost: 350,
    category: "Layanan",
    description:
      "Potongan 50% biaya kunjungan dokter hewan ke rumah Anda.",
    expiryDays: "30 Hari setelah klaim",
    badge: "Praktis",
    icon: Home,
  },
];

const MOCK_VOUCHERS: IVoucher[] = [
  {
    id: "mv-1",
    title: "Voucher Pet Shop Rp 50.000",
    code: "FVC-SHOP50K-8821",
    expiry: "30 Nov 2026",
    status: "Aktif",
    category: "Pet Shop",
    pointsSpent: 250,
  },
  {
    id: "mv-2",
    title: "Free Dental Checkup",
    code: "FVC-DENTAL-9902",
    expiry: "15 Des 2026",
    status: "Aktif",
    category: "Medis",
    pointsSpent: 450,
  },
];

const MOCK_LEDGER: IPointsLedgerEntry[] = [
  {
    id: "h1",
    type: "earned",
    title: "Poin Kunjungan Medis (Milo & Luna)",
    date: "02 Nov 2026 - 14:20 WIB",
    amount: "+120 Pts",
    reference: "INV-20261102-004",
    branch: "BSD City Main Branch",
    note: "Pemeriksaan rutin & pembelian suplemen",
  },
  {
    id: "h2",
    type: "spent",
    title: "Penukaran: Free Dental Checkup",
    date: "28 Okt 2026 - 10:15 WIB",
    amount: "-450 Pts",
    reference: "RED-9902",
    branch: "Aplikasi Online",
    note: "Kupon berlaku hingga 15 Des 2026",
  },
  {
    id: "h3",
    type: "earned",
    title: "Poin Grooming Spa Milo",
    date: "15 Okt 2026 - 16:45 WIB",
    amount: "+85 Pts",
    reference: "INV-20261015-089",
    branch: "Kebayoran Baru Branch",
    note: "Full Spa & Microbubble wash",
  },
  {
    id: "h4",
    type: "earned",
    title: "Bonus Poin Ulang Tahun Member",
    date: "01 Okt 2026 - 09:00 WIB",
    amount: "+200 Pts",
    reference: "SYS-BDAY-2026",
    branch: "Sistem Reward Familia",
    note: "Spesial Ulang Tahun Budi Santoso",
  },
];

interface IMemberMembershipStore {
  user: IMemberProfile;
  pets: IPet[];
  coupons: ICoupon[];
  myVouchers: IVoucher[];
  historyLedger: IPointsLedgerEntry[];
  updateUserProfile: (data: Partial<IMemberProfile>) => void;
  redeemCoupon: (coupon: ICoupon) => boolean;
}

export const useMemberMembershipStore = create<IMemberMembershipStore>()(
  (set, get) => ({
    user: MOCK_USER,
    pets: MOCK_PETS,
    coupons: MOCK_COUPONS,
    myVouchers: MOCK_VOUCHERS,
    historyLedger: MOCK_LEDGER,

    updateUserProfile: (data) =>
      set({ user: { ...get().user, ...data } }),

    redeemCoupon: (coupon) => {
      const { user, myVouchers, historyLedger } = get();

      if (user.points < coupon.pointsCost) {
        return false;
      }

      const newVoucherCode = `FVC-${coupon.category.toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      const newVoucher: IVoucher = {
        id: `mv-${Date.now()}`,
        title: coupon.title,
        code: newVoucherCode,
        expiry: "30 Des 2026",
        status: "Aktif",
        category: coupon.category,
        pointsSpent: coupon.pointsCost,
      };

      const newLedgerItem: IPointsLedgerEntry = {
        id: `h-${Date.now()}`,
        type: "spent",
        title: `Penukaran: ${coupon.title}`,
        date:
          "Hari ini - " +
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        amount: `-${coupon.pointsCost} Pts`,
        reference: newVoucherCode,
        branch: "Aplikasi Online",
        note: "Kupon berhasil diklaim",
      };

      set({
        user: { ...user, points: user.points - coupon.pointsCost },
        myVouchers: [newVoucher, ...myVouchers],
        historyLedger: [newLedgerItem, ...historyLedger],
      });

      return true;
    },
  })
);
