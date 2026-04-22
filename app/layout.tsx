import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Base Social Mini",
    description: "Connect, share, and build on Base.",
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: "https://picsum.photos/seed/baseog/1200/630",
        button: {
          title: "Launch Mini App",
          action: {
            type: "launch_miniapp",
            name: "Base Social Mini",
            url: process.env.APP_URL || "https://ais-dev-nmv5g7rjq65am7rifjpnpy-615601803900.asia-southeast1.run.app",
            splashImageUrl: "https://picsum.photos/seed/basesplash/800/600",
            splashBackgroundColor: "#000000",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
