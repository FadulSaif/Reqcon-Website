import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Kontakta Agil Arbetskraft – Bemanning & Rekrytering i Sverige",
  description:
    "Kontakta oss på Agil Arbetskraft för ett förutsättningslöst samtal om ditt personalbehov. Vi hjälper företag inom IT, bygg, lager, logistik, transport och flytt i hela Sverige.",
  alternates: {
    canonical: "/contact",
    languages: { sv: "/contact", en: "/contact" },
  },
  openGraph: {
    title: "Kontakta Agil Arbetskraft – Bemanning & Rekrytering i Sverige",
    description:
      "Ring, mejla eller fyll i formuläret — vi svarar snabbt och hjälper dig hitta rätt personal.",
    type: "website",
    locale: "sv_SE",
    url: "https://agilarbetskraft.se/contact",
  },
};

export default function Contact() {
  return <ContactPage />;
}
