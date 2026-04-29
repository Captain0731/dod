import type { Metadata } from "next";
import { Marcellus, Playfair_Display, Poppins, Smooch_Sans } from "next/font/google";
import "./globals.css";
import "./globals.scss";
import Preloader from "@/components/common/Preloader/Preloader";

const marcellus = Marcellus({
  weight: "400",
  variable: "--font-marcellus",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const smoochSans = Smooch_Sans({
  variable: "--font-smooch",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Designs Of Dreams",
  description: "Designs Of Dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${playfair.variable} ${poppins.variable} ${smoochSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative" suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  );
}