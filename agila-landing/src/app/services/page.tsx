import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Våra Tjänster – Bemanning & Rekrytering inom IT, Bygg, Logistik och Transport",
  description:
    "Agil Arbetskraft erbjuder bemanning och rekrytering inom fem branscher: IT, bygg och anläggning, lager och logistik, transport samt flytt och montage. Snabb leverans i hela Sverige.",
  alternates: {
    canonical: "/services",
    languages: { sv: "/services", en: "/services" },
  },
  openGraph: {
    title: "Våra Tjänster – Agil Arbetskraft | Bemanning i Sverige",
    description:
      "Fem specialiserade tjänsteområden. En partner. Vi levererar rätt personal till ditt företag oavsett bransch.",
    type: "website",
    locale: "sv_SE",
    url: "https://agilarbetskraft.se/services",
  },
};

export default function Services() {
  return <ServicesPage />;
}
