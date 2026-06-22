import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Agil Workforce — Staffing the Future",
  description:
    "Reliable workforce solutions for modern businesses. Agil connects companies with qualified professionals across construction, logistics, warehousing, transportation, industrial operations, and IT.",
  keywords: ["workforce", "recruitment", "staffing", "workers", "employment", "Agil", "Sweden", "construction", "logistics"],
  openGraph: {
    title: "Agil Workforce — Staffing the Future",
    description:
      "Premium workforce solutions for modern businesses. Connecting skills with opportunity across Sweden.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* TODO: Client must provide licensed Konnect Medium font files before production */}
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
