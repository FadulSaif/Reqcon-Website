# ReqCon Marketing Site — Content & IA Proposal

Status: **Draft for review — no Next.js components have been changed.**

Approved fork folder name: `Reqcon-Website-prototype_updated_folder`. The Next.js source to be copied into that approved fork is `agila-landing/` inside the supplied archive.

## 1. Positioning

ReqCon is an AI copilot for construction companies. It brings requirements from tender documents, legislation, and industry standards into one place, then continuously identifies compliance risks as a project develops.

Primary audience:

- Calculation and estimation teams preparing tenders.
- Tender, bid, and pre-construction teams.
- Team leads responsible for risk, margin, and delivery quality.

Primary conversion: **Contact Us**.

Messaging guardrails:

- Lead with the operational problem: requirements scattered across long, evolving source material.
- Describe the product as decision support and continuous verification; do not imply legal advice or guaranteed compliance.
- Do not present customer, investor, accelerator, or savings claims as factual until supplied or approved by ReqCon.
- Treat the proposed “15%” overrun statement as an evidence-required industry claim, not launch copy.

## 2. Proposed homepage flow

```text
Hero: requirements are scattered and easy to miss
  ↓
Product overview: ReqCon Copilot + ReqCon Compliance
  ↓
How it works: ingest → structure → verify → act
  ↓
Proof: approved partner logos or clearly-labelled placeholders
  ↓
Who it is for: calculation, tender, and construction leadership
  ↓
Contact request: short, qualification-friendly form
  ↓
Why ReqCon: AI-powered, current, traceable, scalable
  ↓
Final contact CTA
```

This replaces the staffing funnel. It removes portfolio/industry workforce content, worker imagery, hiring language, and “request staff” CTAs.

## 3. Section-by-section content direction

### 3.1 Hero — `HeroSection.tsx`

**Purpose:** Make the tender-document problem instantly recognisable and direct visitors to contact ReqCon.

- Eyebrow: `AI REQUIREMENTS INTELLIGENCE FOR CONSTRUCTION`
- Headline: `Every requirement. One clear source of truth.`
- Supporting copy: `ReqCon turns tender documents, legislation, and industry standards into a structured project requirement set — then helps your team spot compliance risks before they become costly surprises.`
- Primary CTA: `Contact Us`
- Secondary CTA: `See How It Works`
- Visual direction: product/workflow interface or abstract document-to-insight motion; never the staffing/worker imagery from Agila.

### 3.2 Product overview — replace `ServicesBrief.tsx`

**Purpose:** Explain the platform before discussing company story or generic benefits.

Section title: `One platform for requirements and compliance confidence.`

Product pillars:

1. **ReqCon Copilot**
   - `Bring requirements together from tender documents, appendices, legislation, and standards.`
   - Outcome: a searchable, shared requirement baseline for the project.
2. **ReqCon Compliance**
   - `Continuously compare project information with the requirement baseline and surface items that need attention.`
   - Outcome: earlier visibility of potential omissions and conflicts.
3. **ReqCon Traceability**
   - `See where a requirement came from, who owns it, and what has changed.`
   - Outcome: defensible decisions and clearer handovers from bid to delivery.

CTA: `Explore ReqCon` or `See ReqCon in Action`.

### 3.3 How it works — repurpose `ServiceBlocks.tsx`

**Purpose:** Show a concrete workflow, not a list of SaaS features.

1. **Connect the source material** — Upload or connect tender documents, appendices, standards, and project material.
2. **Create the requirement baseline** — ReqCon identifies, structures, and links requirements to their original source.
3. **Verify continuously** — Teams review potential compliance gaps as designs, estimates, and documents evolve.
4. **Act with context** — Assign owners, resolve questions, and preserve the decision trail.

CTA: `Contact Us`.

### 3.4 Proof — retain `CompanyLogoStrip.tsx` mechanism

**Purpose:** Add credibility without misrepresenting customer relationships.

- Translation label: `Our Partners`.
- Retain the existing marquee, fade mask, two-row scroll, and hover-pause behavior.
- Replace the Agila client array and all logos with either:
  - approved ReqCon accelerator/investor/partner logos, with relationship labels where necessary; or
  - neutral, text-only placeholder entries: `Partner logo — pending approval`.
- Do **not** ship Saab, H&M, Vattenfall, public-authority, or any other Agila customer logo.

### 3.5 Who it is for — replace staffing `Industries`/portfolio emphasis

**Purpose:** Qualify visitors by workflow and responsibility, rather than by employment sector.

Three cards:

- **Calculation teams** — Build estimates from a requirement set your whole team can inspect.
- **Tender teams** — Keep tender commitments, appendices, and clarifications connected.
- **Construction leaders** — Monitor requirement risk and project readiness across teams.

CTA: `Talk to ReqCon`.

### 3.6 Contact request — rewrite `ContactForm.tsx` and `forms.ts`

**Purpose:** Replace staffing qualification with a concise product-discovery request.

Fields:

- Full name
- Work email
- Company name
- Role or team function
- Team size (select: `1–5`, `6–20`, `21–50`, `51+`)
- Current tender/requirement-management challenge (textarea)
- Optional: `When are you next bidding or starting a project?`

Required service/role selectors, requested-headcount fields, and staffing-specific language are removed.

Success state: `Thanks — we’ll be in touch shortly.`

### 3.7 Why ReqCon — rename `WhyAgil.tsx`

**Purpose:** Explain why the product changes the work, after the workflow is understood.

- **Built for construction source material** — Designed around tenders, appendices, standards, and requirement dependencies.
- **Continuous, not one-off** — Re-check the requirement baseline as project material evolves.
- **Traceable by design** — Return to the source, owner, and decision context behind every item.
- **Made for team adoption** — Begin with one tender team, then roll out a common requirement process across the business.
- **Protect margin before work starts** — Help teams find missing or conflicting requirements earlier. Any numerical overrun claim requires an approved, citable source.

### 3.8 Final CTA — retain final-CTA motion pattern

- Headline: `See every requirement before it becomes a risk.`
- Copy: `Request a tailored ReqCon walkthrough for your tender or project workflow.`
- CTA: `Contact Us`
- Secondary option: `Learn how ReqCon works`

## 4. Page-level IA

| Current page/component | ReqCon decision | Proposed purpose |
| --- | --- | --- |
| Landing page | Full rewrite/restructure | Product-led conversion funnel above. |
| `/services` + service details | Full rewrite | Product pillars: Copilot, Compliance, Traceability; no staffing services or roles. |
| `/about` | Full rewrite | ReqCon story: founded 2024, Antwerp-based, construction-tech focus. Company facts require approval. |
| `/contact` | Full rewrite | Contact request and product-focused contact information. |
| `FullTeamSection.tsx` | Repurpose | `Start with one team. Scale across every project.` Rollout/adoption narrative. Remove if it cannot support this story cleanly. |
| Articles | Hold for review | Existing staffing articles must not remain under ReqCon. Either hide/unpublish or replace with construction-requirements insights before launch. |
| Navbar/footer | Rewrite labels and links | Product, How it works, Who it’s for, About, Contact Us. Remove vacancies and staffing/navigation terminology. |

## 5. Component and data mapping

| Existing unit | ReqCon replacement |
| --- | --- |
| `HeroSection.tsx` | Requirement-chaos hero and contact CTA. |
| `ServicesBrief.tsx` | Product-pillar summary. |
| `ServiceBlocks.tsx` / `services-data.ts` | Product workflow and Copilot/Compliance/Traceability data. |
| `WhyAgil.tsx` | `WhyReqCon.tsx` or renamed component; product differentiators. |
| `AboutBrief.tsx` / `AboutPage.tsx` | Antwerp construction-tech story. |
| `FullTeamSection.tsx` | Product rollout section, subject to design fit. |
| `ContactForm.tsx` / `forms.ts` | Contact request fields and validation. |
| `company-logos.ts` | Approved partner data or explicit temporary placeholders only. |
| `translations.ts` | Full rewrite of Agila/staffing terminology, including trusted-partner/customer and office copy. |
| `team-data.ts` | Hold until ReqCon leadership/team details are supplied; do not carry Agila biographies. |

## 6. Locale recommendation

ReqCon is Antwerp-based, so the current `en` + `sv` locale pair should not be assumed to be final.

Recommended launch decision:

- **English** as the source/primary locale.
- Confirm whether **Dutch (`nl`)**, **French (`fr`)**, or both are required for the Belgian launch.
- Remove Swedish from public navigation if it is not a supported ReqCon market; do not translate only part of the new information architecture.

Until confirmed, the component implementation should preserve the `LanguageContext` pattern but not finalize copy beyond English.

## 7. Inputs required before implementation

1. Confirm launch locales: English only, English + Dutch, English + French, or all three.
2. Supply or approve a ReqCon logo and product visuals; Agila logo and worker imagery cannot carry over.
3. Supply approved partner/accelerator/investor logos and the precise relationship label for each, or approve text placeholders.
4. Confirm whether the `~15%` construction overrun statement has an approved source and exact wording.
5. Confirm names, roles, bios, contact details, legal entity name, and privacy/terms copy for the About and Contact pages.
6. Confirm whether staffing articles should be removed from the public site at launch.

## 8. Approval gate

After approval of this document and the locale decision, implementation can start in the archived Next.js project. No section components, translations, logos, or pages have been altered at this stage.
