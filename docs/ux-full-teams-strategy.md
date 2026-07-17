# UX Strategy: Full Teams, Custom Role Requests & Specialisations Redesign

Status: **implemented** in the prototype (branch `prototype_updated_folder`).
This document explains where each message lives, why, and the copy used, so the decisions can be reviewed at a glance.

---

## 1. "We provide full teams" — placement strategy

Goal: a visitor should understand within seconds that Agil Arbetskraft can assemble a complete cross-functional team, not only individual specialists.

| Location | Treatment | Depth | Why there |
|---|---|---|---|
| **Homepage hero** | One added phrase in the subtitle: "…as individual specialists or complete teams." | Minimal | Plants the message in the first 3 seconds without new UI or clutter. |
| **Homepage, new "Full Teams" section** (between the services overview and "Why Agil") | Full `FullTeamSection`: headline, 2-line description, 3 value points, team-composition visual, CTA | Medium | The hero states the core promise and the services overview lists engagement models (incl. project-based teams); this section immediately elevates the strongest differentiator before the trust arguments. |
| **/services**, directly under the hero (above the five category blocks) | Compact banner variant: eyebrow, headline, description, 3 checkmark value points, CTA | Short–medium | High visibility at the top of the page: the visitor learns "you can take the whole team" before scanning the individual categories. |
| **/services/[slug]** (IT, Logistics, Construction, Transport, Moving), dark strip directly under the specialisations grid | One-liner + "Request a full team" button that scrolls to the on-page request form | Short | Reinforcement at the exact moment the user is mentally composing needs from individual roles. Same strip on all five categories keeps the message consistent. |
| **Specialisations section itself** | Covered by the strip + the custom-role card | One line | Avoids crowding the role grid. |

**Consistency model:** introduced in the hero (one phrase) → developed on the homepage (dedicated section) → re-stated on /services (banner) → reinforced on every sub-service page (strip). Same headline vocabulary ("Bygg ditt team" / "Build your team") everywhere.

### Copy (SV primary / EN)

- **Eyebrow:** KOMPLETTA TEAM / FULL TEAMS
- **Headline:** Bygg hela ditt team med oss / Build your entire team with us
- **Description:** Vi levererar inte bara enskilda specialister, vi bygger kompletta, tvärfunktionella team anpassade efter era mål. Från planering och samordning till utveckling och leverans är våra team redo att snabbt komma på plats och skapa värde från dag ett. / We don't just provide individual specialists, we build complete, cross-functional teams tailored to your goals. From planning and coordination to development and delivery, our teams are ready to integrate quickly and start delivering value from day one.
- **Value points:**
  - Flexibilitet – Skala teamet upp eller ner i takt med projektet. / Flexibility – Scale the team up or down as the project evolves.
  - Snabbhet – Ett komplett team på plats på veckor, inte månader. / Speed – A complete team in place in weeks, not months.
  - Skalbarhet – Börja med en roll och väx till ett helt team, med samma partner hela vägen. / Scalability – Start with one role and grow into a full team, with one partner throughout.
- **CTAs:** Bygg ditt team / Build your team (homepage + /services); Begär ett helt team / Request a full team (service pages)
- **Request flow:** every full-team CTA leads to a form in full-team mode. The contact page's Service Requested dropdown has a "Bygg Ditt Team" option (pre-selected when arriving via a full-team CTA); on service pages the form shows a locked "Bygg Ditt Team: [service]" field. The message pre-fills a structured template (roles needed, number of people, desired start, assignment length) and the email is tagged with a request_type of "Komplett team".
- **Strip:** Behöver du mer än en roll? Vi sätter ihop hela teamet åt dig: kompetenserna ovan och allt däremellan. / Need more than one role? We'll assemble the entire team for you: the roles above and everything in between.

### Visual: team composition

A card canvas labelled "Exempel: ett komplett IT-projektteam" holding six role chips in a 2-column cluster: Projektledare, Produktägare, UX/UI-designer, Systemutvecklare, Testledare, plus a dashed orange **"+ Din roll?"** chip. The dashed chip does double duty: it completes the "any team shape" story and foreshadows the custom-role request feature. Chips float in with a light stagger; on mobile the cluster stacks below the text and wraps to one column on very narrow screens. Reads in 3–5 seconds: a group of roles = a team.

---

## 2. "Request custom specialisation" feature

**Problem:** users could only pick predefined roles; no path existed for anything else.

**Entry points (implemented):**
1. **Custom card at the end of every specialisations grid** — dashed orange border, plus icon, "Hittar du inte rollen du söker?". Chosen because it sits exactly where users discover the gap ("my role isn't in this list") and reads as part of the list rather than a separate feature.
2. **"Annan roll…" item in the request form's role dropdown** — catches users who reach the form first and only then notice their role is missing.

**Flow:** card/dropdown CTA → page scrolls to the existing on-page request form → a highlighted, autofocused "Vilken roll söker du?" input appears above the message with the reassurance hint "Vi kan tillsätta vilken roll du än behöver…" → submit → success panel ("Tack för din förfrågan!" with a 24-hour response promise). No modal and no separate page: the request rides the form the user already trusts, and company/contact fields are collected in the same step.

**Copy:**
- Card title: Hittar du inte rollen du söker? / Can't find the role you're looking for?
- Card text: Listan täcker inte allt. Vi kan tillsätta i princip vilken roll som helst inom det här området och angränsande fält. Berätta vad du behöver, så återkommer vi inom 24 timmar. / The list doesn't cover everything. We can source virtually any role within this area and adjacent fields. Tell us what you need and we'll get back to you within 24 hours.
- CTA: Begär en annan roll / Request a custom role
- Field label: Vilken roll söker du? (placeholder: T.ex. DevOps-utvecklare, kranförare…)
- Success: Tack för din förfrågan! Vi har tagit emot ditt meddelande och återkommer till dig inom 24 timmar på vardagar.

**Delivery:** the form now actually submits (Web3Forms). The typed role arrives in the email as a dedicated `custom_role` field. **Action needed:** create a free Web3Forms access key for the destination inbox and put it in `agila-landing/.env.local` (`NEXT_PUBLIC_WEB3FORMS_KEY`); until then the form shows a graceful error state.

---

## 3. "Specialisations we support" redesign

### Concepts considered

| Concept | Description | Verdict |
|---|---|---|
| **A. Summary card grid** ✅ | 1/2/3-column responsive grid; every card shows number, role name, full description, and a per-role CTA. Nothing hidden. | **Chosen.** Best scannability, zero interaction cost, scales to more roles, strongest SEO. |
| B. Hover-expand cards | Denser grid revealing the description on hover/tap. | Rejected: still hides content (the core complaint about the accordion) and hover is unreliable on touch. |
| C. Full-width detail rows | The accordion permanently opened and restyled. | Rejected: very long pages at 11 roles per category and weak visual rhythm. |

### What was built (Concept A)

- Responsive grid (1 col mobile / 2 ≥768px / 3 ≥1200px), replacing the accordion on all five service pages.
- Card anatomy: index number → role name (h3) → full two-sentence description, always visible → "Begär denna roll" CTA that pre-selects the role in the request form and scrolls to it.
- **"Mest efterfrågad"** tags on 2–3 staple roles per category (data-driven via `popularSpecs`, easy to retune).
- The dashed **custom-role card** closes every grid, and the **full-team strip** sits directly below: individual role → any role → whole team, in one screen.
- Typography and interaction follow the existing system (glass panels, 20px radius, orange hover lift), so dark mode and brand consistency come for free. Adding roles = adding array entries; the grid just grows.
- Deep links like `/services/it#kravanalytiker` still work (anchor ids preserved).

---

## 4. SEO/GEO impact (Swedish-primary)

- **Strongly positive:** the accordion kept closed descriptions *out of the DOM*; the grid makes all 46 Swedish role descriptions permanently crawlable, each under an `h3` in a clean hierarchy. Better coverage for role-level queries ("kravanalytiker bemanning", "truckförare bemanning" etc.).
- **Positive:** the full-team sections add Swedish keyword surface ("bygga komplett team", "tvärfunktionella team") on `/` and `/services`.
- **Neutral:** hero subtitle keeps all existing keywords and adds "kompletta team". No route, sitemap, or structured-data changes.
- Optional future enhancement: `ItemList` JSON-LD for the specialisations grid.
