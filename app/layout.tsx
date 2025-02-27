import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";
import SessionWrapper from "@/components/SessionWrapper"; // Import the wrapper

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Travel for you | Next.js",
  description: "Travel landing page using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <SessionWrapper>  {/* ✅ Ensure the session wrapper is here */}
          <ResponsiveNav />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
