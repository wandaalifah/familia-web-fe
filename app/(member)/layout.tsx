import { FooterSection } from "@/src/components/organisms";
import MemberHeader from "@/src/components/organisms/membership/MemberHeader";
import MembershipBannerSection from "@/src/components/organisms/membership/MembershipBannerSection";
import MembershipTabs from "@/src/components/molecules/membership/MembershipTabs";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900 flex flex-col">
      <MemberHeader />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <MembershipBannerSection />
        <MembershipTabs />
        {children}
      </main>
      <FooterSection />
    </div>
  );
}
