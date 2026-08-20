import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#168f99",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "OceanArabic | Arabic Adventures with Nooru";
  const description = "A playful Arabic learning adventure aligned to the Maldivian primary curriculum, with lessons, practice, games and rewards.";
  return {
    metadataBase: base,
    title,
    description,
    applicationName: "OceanArabic",
    manifest: "/manifest.webmanifest",
    category: "education",
    keywords: ["Arabic learning", "Maldives", "primary education", "children", "OceanArabic", "Atollingo"],
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/assets/nooru.png" },
    openGraph: { type: "website", url: base, title, description, siteName: "OceanArabic", locale: "en_MV", images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "OceanArabic Arabic adventures with Nooru" }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", base).toString()] },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
