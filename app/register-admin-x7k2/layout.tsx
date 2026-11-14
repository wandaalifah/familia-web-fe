import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Registration",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
