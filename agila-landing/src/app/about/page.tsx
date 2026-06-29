import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "Om Agil Arbetskraft – Bemanningsföretag i Sverige",
  description:
    "Lär känna Agil Arbetskraft — ett svenskt bemannings- och rekryteringsföretag som specialiserar sig på IT, bygg, logistik, transport och flytt. Vi bygger broar mellan rätt kompetens och rätt arbetsgivare.",
  alternates: {
    canonical: "/about",
    languages: { sv: "/about", en: "/about" },
  },
  openGraph: {
    title: "Om Agil Arbetskraft – Bemanningsföretag i Sverige",
    description:
      "Vi är ett bemannings- och rekryteringsföretag med fokus på att matcha rätt kompetens med rätt uppdrag — i hela Sverige.",
    type: "website",
    locale: "sv_SE",
    url: "https://agilarbetskraft.se/about",
  },
};

export default function About() {
  return <AboutPage />;
}
