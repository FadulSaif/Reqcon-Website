import { SITE_CONFIG } from "@/lib/site-config";

export const FORM_CONFIG = {
  endpoint: "https://formsubmit.co",
  targetEmail: process.env.FORMSUBMIT_EMAIL || SITE_CONFIG.email,
};
