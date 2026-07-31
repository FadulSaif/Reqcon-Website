import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { SITE_CONFIG, ogImages } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Agil Arbetskraft – bemanningsföretag i Sverige",
  description:
    "Agil Arbetskraft är ett bemannings- och rekryteringsföretag i Sverige. Vi hjälper företag inom IT, bygg, lager och logistik, transport samt flytt och montage att hitta rätt personal, snabbt och tillförlitligt.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Agil Arbetskraft – bemanningsföretag i Sverige",
    description:
      "Bemanning och rekrytering inom IT, bygg, logistik, transport och flytt. Vi levererar rätt personal när du behöver dem, i hela Sverige.",
    type: "website",
    locale: "sv_SE",
    url: SITE_CONFIG.domain,
    images: ogImages(),
  },
};

export default function Home() {
  return <LandingPage />;
}
