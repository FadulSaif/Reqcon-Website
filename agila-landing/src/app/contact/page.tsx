import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { absoluteUrl, ogImages } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakta Agil Arbetskraft – Bemanning & Rekrytering i Sverige",
  description:
    "Kontakta oss på Agil Arbetskraft för ett förutsättningslöst samtal om ditt personalbehov. Vi hjälper företag inom IT, bygg, lager, logistik, transport och flytt i hela Sverige.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Kontakta Agil Arbetskraft – Bemanning & Rekrytering i Sverige",
    description:
      "Ring, mejla eller fyll i formuläret. Vi svarar snabbt och hjälper dig hitta rätt personal.",
    type: "website",
    locale: "sv_SE",
    url: absoluteUrl("/contact"),
    images: ogImages(),
  },
};

export default function Contact() {
  return <ContactPage />;
}
