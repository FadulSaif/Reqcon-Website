import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Example mock data just to render the shape
const SERVICES_DATA: Record<string, { title: string; label: string; desc: string; content: string; image: string }> = {
  "staffing": {
    title: "Temporary Staffing",
    label: "Fast & Flexible",
    desc: "Workforce support during peak periods.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/service-staffing.jpg",
  },
  "direct-recruitment": {
    title: "Direct Recruitment",
    label: "Permanent Placement",
    desc: "Find qualified professionals for long-term success.",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/assets/service-recruitment.jpg",
  },
  "hire-to-permanent": {
    title: "Hire-to-Permanent",
    label: "Try Before You Hire",
    desc: "Evaluate candidates in a real working environment.",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    image: "/assets/service-hirepurchase.jpg",
  },
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const data = SERVICES_DATA[params.slug];

  if (!data) {
    notFound();
  }

  return (
    <main style={{ paddingTop: 80, minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Hero Header with Image Background */}
      <section style={{ position: "relative", padding: "clamp(80px, 15vw, 160px) 0", overflow: "hidden", borderBottom: "1px solid var(--border-subtle)" }}>
        {/* Background Image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={data.image}
            alt={data.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Gradient Overlay for Text Readability */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))" }} />
        </div>

        <div className="container-wide" style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Link href="/" style={{ color: "var(--brand-primary)", fontWeight: 600, display: "inline-block", marginBottom: 24, textDecoration: "none" }}>
            ← Back to Home
          </Link>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="label mb-16" style={{ display: "block", color: "var(--text-overlay)", borderColor: "var(--border-subtle)" }}>
              {data.label}
            </span>
          </div>
          <h1 className="heading-display mb-24" style={{ color: "var(--text-overlay)" }}>{data.title}</h1>
          <p className="body-lg" style={{ color: "var(--text-overlay)", opacity: 0.8 }}>
            {data.desc}
          </p>
        </div>
      </section>

      {/* Content Body */}
      <section style={{ padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div className="container-wide" style={{ maxWidth: 800, margin: "0 auto" }}>
          
          <div style={{ padding: "clamp(32px, 5vw, 64px)", background: "var(--bg-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-subtle)", boxShadow: "0 24px 64px var(--border-subtle)", marginTop: "-120px", position: "relative", zIndex: 2 }}>
            <h2 className="heading-lg mb-24">Overview</h2>
            <p className="body-lg mb-32" style={{ lineHeight: 1.8 }}>
              {data.content}
            </p>

            {/* In-content Image Example */}
            <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 32 }}>
              <Image
                src="/assets/contact-team.jpg"
                alt="Agil Team"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <p className="body-lg mb-32" style={{ lineHeight: 1.8 }}>
              This is a placeholder for the blog/service detail content. By including rich imagery both in the hero header and within the content body, you can create highly engaging, premium reading experiences. The shape and structure are designed to match the flat aesthetic of the Agil landing page. You can add Rich Text or a headless CMS to populate this dynamically in the future.
            </p>

            <Link href="/#contact" className="btn btn-primary btn-lg" style={{ marginTop: 24, width: "100%", textAlign: "center", textDecoration: "none" }}>
              Get Started with {data.title}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
