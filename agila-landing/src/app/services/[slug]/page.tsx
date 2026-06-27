import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { SERVICES_CONFIG } from "@/lib/services-data";
import { translations } from "@/lib/translations";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES_CONFIG[resolvedParams.slug];
  if (!service) return { title: "Not Found" };

  // Generate Swedish-first metadata
  const svTitle = translations["sv"][`services.${resolvedParams.slug}.title`] || resolvedParams.slug;
  const svDesc = translations["sv"][`services.${resolvedParams.slug}.cardDesc`] || "";

  return {
    title: `${svTitle} | Agil Arbetskraft`,
    description: svDesc,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = SERVICES_CONFIG[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  return <ServiceDetailPage slug={resolvedParams.slug} />;
}
