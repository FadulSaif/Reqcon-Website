// ─── Central Data Map: Team Members & Service Routing ───
// This is the single source of truth for mapping services to team members.
// Used by the /contact page for dynamic form routing.

export interface TeamMember {
  id: string;
  name: string;
  titleKey: string;
  email: string;
  phone: string;
  linkedin: string;
  image: string;
  bioKey: string;
  services: string[]; // URL-safe slugs matching SERVICE_OPTIONS
}

export interface ServiceOption {
  slug: string;
  labelKey: string;
  memberId: string | null; // null = general inbox
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "lars",
    name: "Lars Eriksson",
    titleKey: "role.ops",
    email: "lars@agilarbetskraft.se",
    phone: "+46 8 123 4567",
    linkedin: "https://linkedin.com/in/lars-eriksson",
    image: "/assets/team-lars.jpg",
    bioKey: "bio.lars",
    services: ["staffing", "warehouse"],
  },
  {
    id: "ebba",
    name: "Ebba Lindgren",
    titleKey: "role.recruitment",
    email: "ebba@agilarbetskraft.se",
    phone: "+46 8 234 5678",
    linkedin: "https://linkedin.com/in/ebba-lindgren",
    image: "/assets/team-ebba.jpg",
    bioKey: "bio.ebba",
    services: ["recruitment", "hire-to-permanent"],
  },
  {
    id: "johan",
    name: "Johan Bergström",
    titleKey: "role.industry",
    email: "johan@agilarbetskraft.se",
    phone: "+46 8 345 6789",
    linkedin: "https://linkedin.com/in/johan-bergstrom",
    image: "/assets/team-johan.jpg",
    bioKey: "bio.johan",
    services: ["construction", "logistics", "it", "cleaning", "moving", "workshop"],
  },
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  { slug: "general",           labelKey: "svc.general",            memberId: null },
  { slug: "fullteam",          labelKey: "svc.fullteam",           memberId: null },
  { slug: "staffing",          labelKey: "svc.staffing",           memberId: "lars" },
  { slug: "recruitment",       labelKey: "svc.recruitment",        memberId: "ebba" },
  { slug: "hire-to-permanent", labelKey: "svc.hireToPerm",         memberId: "ebba" },
  { slug: "construction",      labelKey: "svc.construction",       memberId: "johan" },
  { slug: "logistics",         labelKey: "svc.logistics",          memberId: "johan" },
  { slug: "warehouse",         labelKey: "svc.warehouse",          memberId: "lars" },
  { slug: "it",                labelKey: "svc.it",                 memberId: "johan" },
  { slug: "cleaning",          labelKey: "svc.cleaning",           memberId: "johan" },
  { slug: "moving",            labelKey: "svc.moving",             memberId: "johan" },
  { slug: "transport",         labelKey: "svc.transport",          memberId: null },
  { slug: "workshop",          labelKey: "svc.workshop",           memberId: "johan" },
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
