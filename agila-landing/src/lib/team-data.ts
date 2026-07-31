// ─── Central Data Map: Team Members & Service Routing ───
// This is the single source of truth for mapping services to team members.
// Used by the /contact page for dynamic form routing.

export interface TeamMember {
  id: string;
  name: string;
  titleKey: string;
  email: string;
  phone: string;
  image: string;
  bioKey: string;
  services: string[]; // URL-safe slugs matching SERVICE_OPTIONS
}

export interface ServiceOption {
  slug: string;
  labelKey: string;
  memberId: string | null; // null = general inbox
}

// PLACEHOLDER: bios (bio.*) and service tags are samples pending real copy.
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "fadi",
    name: "Fadi Rabah",
    titleKey: "role.ceo",
    email: "fadi.rabah@reqcon.se",
    phone: "070-939 51 11",
    image: "/assets/team-fadi.jpg",
    bioKey: "bio.fadi",
    services: ["staffing", "warehouse"],
  },
  {
    id: "anton",
    name: "Anton af Bjur",
    titleKey: "role.coordinator",
    email: "Anton@reqcon.se",
    phone: "073-302 30 35",
    image: "/assets/team-placeholder.jpg",
    bioKey: "bio.anton",
    services: ["recruitment", "hire-to-permanent"],
  },
  {
    id: "markus",
    name: "Markus Nyberg",
    titleKey: "role.consultantManager",
    email: "Markus.nyberg@agilarbetskraft.se",
    phone: "070-554 81 47",
    image: "/assets/team-placeholder.jpg",
    bioKey: "bio.markus",
    services: ["construction", "logistics", "transport", "cleaning", "moving", "workshop"],
  },
  {
    id: "anel",
    name: "Anel Pasic",
    titleKey: "role.itManager",
    email: "anel.pasic@reqcon.se",
    phone: "070-853 19 21",
    image: "/assets/team-anel.jpg",
    bioKey: "bio.anel",
    services: ["it"],
  },
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  { slug: "general",           labelKey: "svc.general",            memberId: null },
  { slug: "fullteam",          labelKey: "svc.fullteam",           memberId: null },
  { slug: "staffing",          labelKey: "svc.staffing",           memberId: "fadi" },
  { slug: "recruitment",       labelKey: "svc.recruitment",        memberId: "anton" },
  { slug: "hire-to-permanent", labelKey: "svc.hireToPerm",         memberId: "anton" },
  { slug: "construction",      labelKey: "svc.construction",       memberId: "markus" },
  { slug: "logistics",         labelKey: "svc.logistics",          memberId: "markus" },
  { slug: "warehouse",         labelKey: "svc.warehouse",          memberId: "fadi" },
  { slug: "it",                labelKey: "svc.it",                 memberId: "anel" },
  { slug: "cleaning",          labelKey: "svc.cleaning",           memberId: "markus" },
  { slug: "moving",            labelKey: "svc.moving",             memberId: "markus" },
  { slug: "transport",         labelKey: "svc.transport",          memberId: "markus" },
  { slug: "workshop",          labelKey: "svc.workshop",           memberId: "markus" },
];

/**
 * Resolve a service slug to its assigned team member.
 * Returns undefined for "general" inquiry or unknown slugs.
 */
export function getTeamMemberForService(slug: string): TeamMember | undefined {
  const service = SERVICE_OPTIONS.find((s) => s.slug === slug);
  if (!service || !service.memberId) return undefined;
  return TEAM_MEMBERS.find((m) => m.id === service.memberId);
}

export function getServiceLabelKey(slug: string): string {
  const service = SERVICE_OPTIONS.find((s) => s.slug === slug);
  return service?.labelKey ?? "svc.general";
}

/**
 * Find a service slug by fuzzy-matching a labelKey (e.g., from URL params like "Construction & Building").
 * Falls back to "general" if no match found.
 */
export function resolveServiceSlug(input: string): string {
  if (!input) return "general";
  
  const normalized = input.toLowerCase().trim();
  
  // Direct slug match
  const directMatch = SERVICE_OPTIONS.find((s) => s.slug === normalized);
  if (directMatch) return directMatch.slug;
  
  // Partial match on slug
  const partialMatch = SERVICE_OPTIONS.find(
    (s) => normalized.includes(s.slug)
  );
  if (partialMatch) return partialMatch.slug;
  
  return "general";
}
