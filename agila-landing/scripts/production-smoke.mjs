const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";

const routes = [
  "/", "/about", "/services", "/services/it", "/services/logistics",
  "/services/construction", "/services/transport", "/services/moving",
  "/articles", "/articles/future-flexible-it-staffing",
  "/articles/optimizing-warehouse-operations",
  "/articles/skills-shortage-construction-sweden",
  "/articles/recruiting-cleaning-staff-sweden", "/contact",
  "/robots.txt", "/sitemap.xml",
];

const failures = [];
for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  if (response.status !== 200) failures.push(`${route}: expected 200, received ${response.status}`);
}

const notFound = await fetch(`${baseUrl}/this-route-must-not-exist`, { redirect: "manual" });
if (notFound.status !== 404) failures.push(`/this-route-must-not-exist: expected 404, received ${notFound.status}`);

const missingToken = await fetch(`${baseUrl}/api/submit`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Smoke test" }),
});
if (missingToken.status !== 400) failures.push(`/api/submit missing token: expected 400, received ${missingToken.status}`);

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Production smoke test passed for ${routes.length} routes, 404 handling, and missing-token rejection.`);
