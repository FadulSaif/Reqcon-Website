const required = [
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
];

const placeholderPatterns = [/^your_/i, /example\.com$/i];
const missing = required.filter((name) => {
  const value = process.env[name]?.trim();
  return !value || placeholderPatterns.some((pattern) => pattern.test(value));
});

if (missing.length > 0) {
  console.error(`Missing or placeholder production environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

if (process.env.NODE_ENV !== "production") {
  console.error("NODE_ENV must be production for the standalone service.");
  process.exit(1);
}

if (process.env.HOSTNAME !== "127.0.0.1") {
  console.error("HOSTNAME must be 127.0.0.1 so the Next.js process is not publicly exposed.");
  process.exit(1);
}

if (process.env.PORT !== "3000") {
  console.error("PORT must be 3000 so Nginx and the private health checks use the documented upstream.");
  process.exit(1);
}

console.log("Production environment validation passed.");
