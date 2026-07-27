// Use environment variables for sensitive or environment-specific data.
// Fallback to a default if the env variable isn't found.
export const FORM_CONFIG = {
  // Base URL for FormSubmit
  endpoint: "https://formsubmit.co",
  
  // Target email address
  targetEmail: process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL || "info@agilarbetskraft.se",
  
  // Global settings
  ajax: true, // Use AJAX for submission to prevent page reloads
  captcha: false, // Set to true if you want FormSubmit's default captcha
};
