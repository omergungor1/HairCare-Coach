import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Trackers } from "@/components/analytics/Trackers";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { WaitlistModal } from "@/components/modals/WaitlistModal";
import { WaitlistProvider } from "@/components/providers/WaitlistProvider";
import { TopBanner } from "@/components/sections/TopBanner";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://haircarecoach.app"),
  title: "HairCare Coach — Habit & Consistency App for Men's Hair Health",
  description:
    "Build an unbreakable hair routine. Track Finasteride, Minoxidil, scalp care, and progress with standardized ghost-overlay photos. Zero false promises.",
  keywords: [
    "men hair care app",
    "hair loss routine tracker",
    "minoxidil reminder",
    "finasteride tracking",
    "hair progress photo comparison",
    "scalp massage timer",
    "hair growth streak",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stop Quitting Your Hair Routine. Build Consistency That Works.",
    description:
      "The first habit companion designed for men committed to long-term hair wellness. No miracle promises, just scientific consistency.",
    url: "https://haircarecoach.app",
    siteName: "HairCare Coach",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Quitting Your Hair Routine. Build Consistency That Works.",
    description:
      "The first habit companion designed for men committed to long-term hair wellness. No miracle promises, just scientific consistency.",
  },
  icons: {
    icon: "/downloads/favicon.ico",
    shortcut: "/downloads/favicon.ico",
    apple: "/downloads/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="bg-surface-bg font-body text-content-primary antialiased selection:bg-brand-accent-soft selection:text-content-primary">
        <WaitlistProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-surface-card focus:px-4 focus:py-3 focus:text-content-primary"
          >
            Skip to content
          </a>
          <TopBanner />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WaitlistModal />
          <Trackers />
        </WaitlistProvider>
      </body>
    </html>
  );
}
