"use client";

import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/sections/FloatingCTA";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface ArticleLocale {
  title: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  content: React.ReactNode;
}

interface ArticleData {
  heroImage: string;
  sv: ArticleLocale;
  en: ArticleLocale;
}

const ARTICLES_DATA: Record<string, ArticleData> = {

  "future-flexible-it-staffing": {
    heroImage: "/assets/it_staffing_hero.png",
    sv: {
      title: "Framtiden för flexibel IT-bemanning i Sverige 2026",
      category: "Teknik",
      date: "15 juni 2026",
      author: "Johan Eriksson",
      authorRole: "Chef för Branschlösningar, Agil Arbetskraft",
      content: (
        <>
          <p className="lead-text">
            I takt med att den digitala transformationen accelererar rör sig svenska företag bort från stela anställningsmodeller. År 2026 har inneburit ökade krav på IT-kompetens — inte bara råtalang, utan förmågan att snabbt skala upp och ned med rätt specialister vid rätt tillfälle.
          </p>
          <h2>Slutet på den traditionella IT-avdelningen</h2>
          <p>
            Under decennier var standardmodellen en stor, statisk IT-avdelning av generalister som hanterade allt från lösenordsbyten till enterprise-arkitektur. I dag fungerar inte den modellen. Den snabba teknikutvecklingen — framför allt inom AI och molntjänster — innebär att det är mer effektivt att ta in tillfälliga specialister exakt när projektet kräver det, snarare än att hålla en fast personalstyrka av generalister.
          </p>
          <p>
            Vi ser en tydlig förskjutning på den svenska arbetsmarknaden. Organisationer väljer i allt större utsträckning att samarbeta med bemanningsföretag för att injicera hög IT-kompetens exakt när ett projekt kräver det. Det handlar inte om nedskärningar — det handlar om att dimensionera rätt.
          </p>
          <figure className="inline-figure">
            <div className="inline-image-container">
              <Image src="/assets/contact-team.jpg" alt="IT-team arbetar agilt på ett modernkontor i Sverige" fill className="inline-img" />
            </div>
            <figcaption>Agil Arbetskrafts IT-team kan sättas in snabbt för att hantera komplexa infrastrukturprojekt.</figcaption>
          </figure>
          <h2>Artificiell intelligens som katalysator</h2>
          <p>
            AI-integreringen i företagssystem omstrukturerar hur svenska organisationer arbetar. Men ingenjörerna som kan bygga och underhålla dessa system är sällsynta. En stel anställningsmodell försöker säkra dessa ingenjörer på heltid — med stora overheadkostnader när den tunga integreringen är klar.
          </p>
          <blockquote>
            &quot;Agilitet är inte längre ett modeord. Det är den grundläggande faktorn som avgör om ett företag hänger med i utvecklingen eller inte.&quot;
          </blockquote>
          <p>
            Flexibel IT-bemanning löser detta problem effektivt. Företag kan ta in ett specialiserat team av maskininlärningsexperter för ett sex månaders projekt. När modellerna är tränade och integrerade rullar teamet av — och lämnar en lean, permanent driftgrupp att hantera den löpande verksamheten.
          </p>
          <h2>Vilka IT-kompetenser är svårast att rekrytera i Sverige?</h2>
          <p>
            Enligt Agil Arbetskrafts erfarenhet på den svenska marknaden är de svårast att besätta rollerna systemutvecklare med erfarenhet av molntjänster som AWS och Azure, cybersäkerhetsspecialister med praktisk erfarenhet, erfarna Scrum Masters och produktägare, samt data- och AI-kompetenser. Gemensamt för dessa är att efterfrågan vida överstiger tillgången på kvalificerade kandidater i Sverige.
          </p>
          <h2>Hur Agil Arbetskraft arbetar med IT-bemanning</h2>
          <p>
            Vår IT-rekryterings- och bemanningsavdelning består av specialister med bakgrund i teknikbranschen. När en kund behöver en Kubernetes-expert skickar vi inte en generell systemadministratör — vi levererar exakt den kompetens infrastrukturen kräver. Vi arbetar med företag i Stockholm, Göteborg, Malmö och övriga Sverige.
          </p>
        </>
      )
    },
    en: {
      title: "The Future of Flexible IT Staffing in Sweden 2026",
      category: "Technology",
      date: "June 15, 2026",
      author: "Johan Eriksson",
      authorRole: "Head of Industry Solutions, Agil Arbetskraft",
      content: (
        <>
          <p className="lead-text">
            As digital transformation accelerates, Swedish companies are moving away from rigid hiring models. 2026 has brought unprecedented demands for IT expertise — not just raw talent, but the ability to scale specialised teams up and down with pinpoint accuracy.
          </p>
          <h2>The End of the Traditional IT Department</h2>
          <p>
            For decades, the standard approach was a large, static IT department of generalists handling everything from password resets to enterprise architecture. Today, that model is failing. The velocity of technological advancement — particularly in AI and cloud computing — means that deploying temporary specialists exactly when a project demands them is far more effective than maintaining a permanent generalist team.
          </p>
          <p>
            We are seeing a clear shift in the Swedish labour market. Organisations are increasingly choosing to partner with staffing agencies to inject high-level IT expertise precisely when a project requires it. This is not downsizing — it is right-sizing.
          </p>
          <figure className="inline-figure">
            <div className="inline-image-container">
              <Image src="/assets/contact-team.jpg" alt="Agile IT team collaborating in a modern Swedish office" fill className="inline-img" />
            </div>
            <figcaption>Agile IT teams can be deployed rapidly to tackle complex infrastructure projects.</figcaption>
          </figure>
          <h2>Artificial Intelligence as a Catalyst</h2>
          <p>
            AI integration into enterprise software is restructuring how Swedish organisations operate. However, the engineers capable of building and maintaining these systems are rare. A rigid hiring model attempts to secure these engineers full-time — creating massive overhead once the heavy integration work is complete.
          </p>
          <blockquote>
            &quot;Agility is no longer a buzzword. It is the fundamental metric that determines whether a company keeps up with the pace of change.&quot;
          </blockquote>
          <p>
            Flexible IT staffing solves this perfectly. Companies can bring in a specialised team of machine learning engineers for a six-month project. Once models are trained and integrated, the team rolls off — leaving a lean, permanent operations crew to manage day-to-day work.
          </p>
          <h2>Which IT competencies are hardest to recruit in Sweden?</h2>
          <p>
            Based on Agil Arbetskraft’s experience in the Swedish market, the hardest roles to fill are systems developers with cloud experience (AWS, Azure), cybersecurity specialists with hands-on expertise, experienced Scrum Masters and product owners, and data and AI competencies. What these share is that demand far exceeds the supply of qualified candidates in Sweden.
          </p>
          <h2>How Agil Arbetskraft approaches IT staffing</h2>
          <p>
            Our IT recruitment and staffing team consists of specialists with backgrounds in the technology sector. When a client needs a Kubernetes expert, we do not send a general systems administrator — we deliver exactly the competency the infrastructure requires. We work with companies in Stockholm, Gothenburg, Malmö, and across Sweden.
          </p>
        </>
      )
    }
  },

  "optimizing-warehouse-operations": {
    heroImage: "/assets/warehouse_agile_hero.png",
    sv: {
      title: "Optimera lagerdriften med agil personalhantering",
      category: "Logistik",
      date: "28 maj 2026",
      author: "Lars Bergström",
      authorRole: "Verksamhetschef, Agil Arbetskraft",
      content: (
        <>
          <p className="lead-text">
            I det moderna e-handelslandskapet är lager- och logistikverksamheter under konstant press att leverera snabbt, korrekt och skalbart. Högsäsonger som Black Friday och julhandeln testar personalstyrkan till det yttersta. För svenska logistikföretag med stela personalmodeller kan dessa perioder snabbt bli ett problem.
          </p>
          <p>
            Allt fler ledande logistikföretag i Sverige vänder sig till <strong>agil personalhantering</strong> — en flexibel strategi som innebär att arbetsresurser dynamiskt anpassas efter den faktiska efterfrågan.
          </p>
          <h2>Utmaningen med säsongstopp</h2>
          <p>
            Under högsäsonger kan ordervolymerna öka med 2–5 gånger jämfört med normalnivån. Traditionella personalmodeller har svårt att hantera en sådan snabb förändring. Vanliga utmaningar inkluderar personalbrist under behovspikar, ineffektiv arbetsfördelning, flaskhalsar i kritiska zoner och ökad felprocent till följd av trötthet.
          </p>
          <figure className="inline-figure">
            <div className="inline-image-container">
              <Image src="/assets/industry-transport.jpg" alt="Lagerarbetare och truckförare i ett modernt lager i Sverige" fill className="inline-img" />
            </div>
            <figcaption>Ökande volymer kräver dynamisk personalallokering för att undvika flaskhalsar.</figcaption>
          </figure>
          <h2>Vad är agil personalhantering?</h2>
          <p>
            Agil personalhantering innebär en strategi som prioriterar <strong>flexibilitet, skalbarhet och snabb respons</strong>. I stället för att tilldela medarbetare fasta roller hanteras personalen som en dynamisk resurspool som kan omdirigeras baserat på verkliga operativa behov i realtid.
          </p>
          <blockquote>
            &quot;En flaskhals i logistiken kostar mer än du tror. Förmågan att sätta in 30 utbildade lagerarbetare inom 48 timmar är en konkurrensavgörande faktor.&quot;
          </blockquote>
          <h2>Hur Agil Arbetskraft stödjer svenska logistikföretag</h2>
          <p>
            Vi levererar lager- och logistikpersonal till svenska företag i hela landet — från enstaka lagerarbetare till hela bemanningsteam för terminaler och distributionscentraler. Våra kandidater är erfarna och kan arbeta med truckkörning, orderplock, inleverans, utleverans och terminalarbete.
          </p>
        </>
      )
    },
    en: {
      title: "Optimizing Warehouse Operations with Agile Talent",
      category: "Logistics",
      date: "May 28, 2026",
      author: "Lars Bergström",
      authorRole: "Director of Operations, Agil Arbetskraft",
      content: (
        <>
          <p className="lead-text">
            In today’s competitive e-commerce landscape, warehouse operations are under constant pressure to deliver speed, accuracy, and scalability. Peak seasons such as Black Friday and Christmas push workforce capacity to its limits. For Swedish logistics companies using rigid staffing models, these periods can quickly become a major operational problem.
          </p>
          <p>
            Leading logistics companies in Sweden are increasingly turning to <strong>agile talent deployment</strong> — a flexible strategy that dynamically aligns labour resources with real operational demand.
          </p>
          <h2>The Challenge of Peak Season Volatility</h2>
          <p>
            During peak periods, order volumes can surge by 2–5 times normal levels. Traditional staffing models struggle to adapt. Common challenges include labour shortages during demand spikes, inefficient task allocation, bottlenecks in critical zones such as picking or packing, and increased error rates due to fatigue.
          </p>
          <figure className="inline-figure">
            <div className="inline-image-container">
              <Image src="/assets/industry-transport.jpg" alt="Warehouse worker and forklift operator in a modern Swedish distribution centre" fill className="inline-img" />
            </div>
            <figcaption>Surging volumes demand dynamic labour allocation to prevent bottlenecks.</figcaption>
          </figure>
          <h2>What is Agile Talent Deployment?</h2>
          <p>
            Agile talent deployment refers to a workforce strategy that emphasises <strong>flexibility, scalability, and responsiveness</strong>. Instead of assigning workers to fixed roles, employees are managed as a dynamic resource pool that can be redeployed based on real-time operational needs.
          </p>
          <blockquote>
            &quot;A bottleneck in logistics costs more than you think. The ability to place 30 trained warehouse workers within 48 hours is a decisive competitive advantage.&quot;
          </blockquote>
          <h2>How Agil Arbetskraft supports Swedish logistics companies</h2>
          <p>
            We deliver warehouse and logistics staff to Swedish companies nationwide — from individual warehouse workers to complete staffing teams for terminals and distribution centres. Our candidates are experienced in forklift operation, order picking, inbound, outbound, and terminal work.
          </p>
        </>
      )
    }
  },

  "skills-shortage-construction-sweden": {
    heroImage: "/assets/industry-construction.jpg",
    sv: {
      title: "Kompetensbristen inom byggsektorn i Sverige — och hur du löser den",
      category: "Bygg & Anläggning",
      date: "12 april 2026",
      author: "Johan Eriksson",
      authorRole: "Chef för Branschlösningar, Agil Arbetskraft",
      content: (
        <>
          <p className="lead-text">
            Den svenska byggsektorn upplever en påtaglig kompetensbrist, framför allt inom yrkeskvalificerade roller som betong- och armeringsarbetare, maskinförare och platschefer. För byggföretag är det inte längre tillräckligt att hoppas på att rätt kandidat dyker upp — du behöver en aktiv rekryteringsstrategi och en pålitlig personalpartner.
          </p>
          <h2>Varför är kompetensbristen ett problem just nu?</h2>
          <p>
            Byggsektorn i Sverige har under de senaste åren sett en stadigt ökande efterfrågan, driven av bostadsbyggande, infrastrukturprojekt och renoveringsarbeten. Samtidigt har tillströmningen av yrkesutbildade hantverkare inte hållit jämna steg. Antagningen till gymnasieskolans byggprogram har stagnerat, och många erfarna yrkesarbetare är på väg att pensionera sig under det kommande decenniet.
          </p>
          <figure className="inline-figure">
            <div className="inline-image-container">
              <Image src="/assets/industry-construction.jpg" alt="Yrkesarbetare på en byggarbetsplats i Sverige med skyddsutrustning" fill className="inline-img" />
            </div>
            <figcaption>Erfarna yrkesarbetare är en bristvara på den svenska byggmarknaden.</figcaption>
          </figure>
          <h2>Vilka roller är svårast att rekrytera?</h2>
          <p>
            De svårast att besätta rollerna inkluderar betongarbetare med formarbetarkunskaper, mark- och anläggningsarbetare med maskinkompetens, erfarna platschefer och arbetsledare samt specialister inom rivning och sanering. Dessa kräver en kombination av teknisk kompetens, certifieringar och praktisk erfarenhet som inte kan ersättas av kort utbildning.
          </p>
          <h2>Hur kan bemanning lösa problemet?</h2>
          <p>
            Agil Arbetskraft har ett etablerat nätverk av yrkeskvalificerade byggarbetare i hela Sverige. Vi matchar kandidater baserat på certifieringar, erfarenhet och regional tillgänglighet.
          </p>
          <blockquote>
            &quot;En bemanningsstrategi är inte ett alternativ när rekryteringen misslyckas — det är en integrerad del av en professionell projektplanering.&quot;
          </blockquote>
          <h2>Planera personalbehovet innan projektet startar</h2>
          <p>
            För komplexa projekt bör personalplaneringen starta minst 6–8 veckor innan projektet kräver bemanning. Ju mer specifik och sällsynt kompetensen är — exempelvis certifierade maskinförare — desto längre tid behövs. Kontakta oss i god tid för att diskutera ditt kommande personalbehov i Stockholm, Göteborg, Malmö eller övriga Sverige.
          </p>
        </>
      )
    },
    en: {
      title: "The Skills Shortage in Sweden's Construction Sector — and How to Solve It",
      category: "Construction",
      date: "April 12, 2026",
      author: "Johan Eriksson",
      authorRole: "Head of Industry Solutions, Agil Arbetskraft",
      content: (
        <>
          <p className="lead-text">
            Sweden’s construction sector is experiencing a significant skills shortage, particularly in qualified trade roles such as concrete workers, machine operators, and site managers. Waiting for the right candidate to appear is no longer a viable strategy — you need an active recruitment approach and a reliable staffing partner.
          </p>
          <h2>Why is the skills shortage a problem right now?</h2>
          <p>
            Sweden’s construction industry has seen steadily increasing demand driven by residential construction, infrastructure projects, and renovation work. At the same time, the supply of qualified tradespeople has not kept pace. Enrolment in upper secondary construction programmes has stagnated, and many experienced workers are approaching retirement in the coming decade.
          </p>
          <figure className="inline-figure">
            <div className="inline-image-container">
              <Image src="/assets/industry-construction.jpg" alt="Skilled tradespeople on a construction site in Sweden with safety equipment" fill className="inline-img" />
            </div>
            <figcaption>Experienced tradespeople are a scarce resource in the Swedish construction market.</figcaption>
          </figure>
          <h2>Which roles are hardest to recruit?</h2>
          <p>
            The hardest roles to fill include concrete workers with formwork skills, groundwork and civil construction workers with machine competency, experienced site managers and supervisors, and demolition and remediation specialists. These require a combination of technical competency, certifications, and hands-on experience that cannot be replaced by short-term training.
          </p>
          <h2>How can staffing solve the problem?</h2>
          <p>
            Agil Arbetskraft has an established network of qualified construction workers across Sweden. We match candidates based on certifications, experience, and regional availability.
          </p>
          <blockquote>
            &quot;A staffing strategy is not a fallback when recruitment fails — it is an integral part of professional project planning.&quot;
          </blockquote>
          <h2>Plan your workforce needs before the project starts</h2>
          <p>
            For complex projects, workforce planning should begin at least 6–8 weeks before staffing is needed. The more specific and rare the competency — such as certified machine operators — the more lead time is required. Contact us to discuss your upcoming workforce needs in Stockholm, Gothenburg, Malmö, or elsewhere in Sweden.
          </p>
        </>
      )
    }
  },

  "recruiting-cleaning-staff-sweden": {
    heroImage: "/assets/industry-cleaning.jpg",
    sv: {
      title: "Att rekrytera städpersonal i Sverige — krav, utmaningar och smarta lösningar",
      category: "Städ & Fastighet",
      date: "5 mars 2026",
      author: "Ebba Lindgren",
      authorRole: "Senior Rekryteringskonsult, Agil Arbetskraft",
      content: (
        <>
          <p className="lead-text">
            Att rekrytera städpersonal kan verka enkelt — men i praktiken kämpar många fastighetsbolag och städföretag med hög personalomsättning, svårigheter att hitta pålitliga kandidater med kort varsel och ökade krav på kompetens och hållbarhet.
          </p>
          <h2>Kraven på städpersonal ökar</h2>
          <p>
            Moderna städuppdrag kräver ofta specifik kunskap om kemikalier och deras miljöpåverkan, förmåga att arbeta i känsliga miljöer som sjukhus och kontor, erfarenhet av industriell städning och sanering, samt tillgänglighet utanför ordinarie kontorstider. Det räcker inte längre att söka &quot;städare&quot;.
          </p>
          <figure className="inline-figure">
            <div className="inline-image-container">
              <Image src="/assets/industry-cleaning.jpg" alt="Professionell städpersonal i arbete på en kommersiell fastighet i Sverige" fill className="inline-img" />
            </div>
            <figcaption>Kvalificerad städpersonal är en förutsättning för välskötta fastigheter och höga servicenivåer.</figcaption>
          </figure>
          <h2>Hög personalomsättning — ett strukturellt problem</h2>
          <p>
            Städbranschen har historiskt sett hög personalomsättning. Det beror delvis på tidiga arbetstider, fysiskt krävande arbete och ibland låg timlön. För fastighetsbolag innebär det konstant rekryteringsstress och ökade administrativa kostnader.
          </p>
          <blockquote>
            &quot;Att ständigt rekrytera ny personal kostar mer än att investera i en strukturerad bemanningslösning. Vi hjälper dig hitta kandidater som stannar.&quot;
          </blockquote>
          <h2>Vilka roller kan Agil Arbetskraft hjälpa er att bemanna?</h2>
          <p>
            Vi hjälper företag att rekrytera och bemanna städare och fastighetsskötare för kommersiella lokaler, bostadsfastigheter och offentliga miljöer. Vi arbetar också med platsledare och teamledare inom städ, samt saneringsspecialister och industristädare.
          </p>
          <h2>Varför räcker inte vanlig annonsering?</h2>
          <p>
            Traditionell annonsering ger ofta många ansökningar men ett litet antal relevanta kandidater. Agil Arbetskraft sköter gallringen åt dig — vi kontaktar, intervjuar och kvalitetssäkrar kandidaterna. Du träffar bara dem som faktiskt passar dina krav. Kontakta oss för ett förutsättningslöst samtal om ditt personalbehov.
          </p>
        </>
      )
    },
    en: {
      title: "Recruiting Cleaning Staff in Sweden — Demands, Challenges, and Smart Solutions",
      category: "Cleaning & Facilities",
      date: "March 5, 2026",
      author: "Ebba Lindgren",
      authorRole: "Senior Recruitment Consultant, Agil Arbetskraft",
      content: (
        <>
          <p className="lead-text">
            Recruiting cleaning staff may seem straightforward — but in practice, many property companies and cleaning firms struggle with high turnover, difficulty finding reliable candidates at short notice, and increasing demands on competency and sustainability.
          </p>
          <h2>The demands on cleaning staff are increasing</h2>
          <p>
            Modern cleaning assignments often require specific knowledge of chemicals and their environmental impact, the ability to work in sensitive environments such as hospitals and offices, experience in industrial cleaning and remediation, and availability outside standard working hours. Simply advertising for a &quot;cleaner&quot; is no longer enough.
          </p>
          <figure className="inline-figure">
            <div className="inline-image-container">
              <Image src="/assets/industry-cleaning.jpg" alt="Professional cleaning staff working in a commercial property in Sweden" fill className="inline-img" />
            </div>
            <figcaption>Qualified cleaning staff are a prerequisite for well-maintained properties and high service levels.</figcaption>
          </figure>
          <h2>High staff turnover — a structural problem</h2>
          <p>
            The cleaning industry has historically experienced high turnover due to early working hours, physically demanding work, and often low hourly wages. For property companies, this means constant recruitment pressure and increased administrative costs.
          </p>
          <blockquote>
            &quot;Constantly recruiting new staff costs more than investing in a structured staffing solution. We help you find candidates who stay.&quot;
          </blockquote>
          <h2>Which roles can Agil Arbetskraft help you staff?</h2>
          <p>
            We help companies recruit and staff cleaners and property caretakers for commercial premises, residential properties, and public facilities, as well as supervisors, team leaders, remediation specialists, and industrial cleaners.
          </p>
          <h2>Why is standard advertising not enough?</h2>
          <p>
            Traditional advertising often generates many applications but few relevant, qualified candidates. Agil Arbetskraft handles the screening for you — we contact, interview, and quality-assure candidates. You only meet those who genuinely fit your requirements. Contact us for a no-obligation conversation about your staffing needs.
          </p>
        </>
      )
    }
  }
};

export default function ArticleClientPage({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const articleEntry = ARTICLES_DATA[slug];

  if (!articleEntry) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "200px 0", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h1>{language === "sv" ? "Artikel hittades inte" : "Article Not Found"}</h1>
            <Link href="/" className="btn btn-primary" style={{ marginTop: 32, display: "inline-block" }}>
              {language === "sv" ? "Tillbaka till startsidan" : "Return Home"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const article = articleEntry[language] ?? articleEntry["sv"];

  return (
    <>
      <Navbar />
      <main className="article-page">
        <header className="article-hero">
          <div className="container-wide">
            <div className="article-hero-content">
              <span className="eyebrow">{article.category} • {article.date}</span>
              <h1 className="article-title-main">{article.title}</h1>
              <p className="article-author">{article.author} — {article.authorRole}</p>
            </div>
          </div>
          <div className="container-wide mt-32">
            <div className="article-hero-image-wrapper">
              <Image
                src={articleEntry.heroImage}
                alt={article.title}
                fill
                priority
                className="article-hero-img"
              />
            </div>
          </div>
        </header>

        <article className="article-body section">
          <div className="container article-content-container">
            <div className="rich-text-content">
              {article.content}
            </div>
            <div className="article-back-row">
              <Link href="/" className="btn btn-outline btn-sm inline-flex">
                ← {language === "sv" ? "Tillbaka till startsidan" : "Back to home"}
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <FloatingCTA />

      <style jsx global>{`
        .article-page { width: 100%; background: var(--background); }
        .article-hero { padding-top: clamp(88px, 10vh, 110px); padding-bottom: 40px; }
        .article-hero-content { max-width: 800px; margin: 0 auto; text-align: center; }
        .eyebrow { font-weight: 700; text-transform: uppercase; color: var(--brand-primary); letter-spacing: 0.1em; font-size: 0.875rem; display: block; margin-bottom: 24px; }
        .article-title-main { font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.15; color: var(--text-primary); margin-bottom: 20px; }
        .article-author { font-size: 1rem; color: var(--text-secondary); font-style: italic; }
        .article-hero-image-wrapper { position: relative; width: 100%; height: clamp(300px, 45vh, 500px); min-height: 400px; border-radius: var(--radius-xl); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .article-hero-img { object-fit: cover; object-position: center; }
        .article-content-container { max-width: 760px; margin: 0 auto; }
        .rich-text-content { font-size: 1.0625rem; line-height: 1.85; color: var(--text-secondary); }
        .rich-text-content .lead-text { font-size: 1.3rem; line-height: 1.65; color: var(--text-primary); font-weight: 500; margin-bottom: 48px; padding-bottom: 48px; border-bottom: 1px solid var(--border-subtle); }
        .rich-text-content h2 { font-family: var(--font-heading); font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-top: 56px; margin-bottom: 20px; line-height: 1.3; }
        .rich-text-content p { margin-bottom: 22px; }
        .rich-text-content ul, .rich-text-content ol { margin: 0 0 24px 24px; display: flex; flex-direction: column; gap: 8px; }
        .rich-text-content li { line-height: 1.7; }
        .rich-text-content strong { color: var(--text-primary); font-weight: 600; }
        .rich-text-content blockquote { margin: 48px 0; padding: 28px 32px; border-left: 4px solid var(--brand-primary); background: var(--bg-elevated); font-size: 1.3rem; font-style: italic; line-height: 1.55; color: var(--text-primary); border-radius: 0 var(--radius-lg) var(--radius-lg) 0; }
        .inline-figure { margin: 48px 0; width: 100%; }
        .inline-image-container { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 14px; }
        .inline-img { object-fit: cover; }
        .inline-figure figcaption { font-size: 0.9rem; color: var(--text-secondary); text-align: center; font-style: italic; }
        .article-back-row { margin-top: 64px; padding-top: 40px; border-top: 1px solid var(--border-subtle); }
        .mt-32 { margin-top: 32px; }
        .inline-flex { display: inline-flex; align-items: center; gap: 8px; }
      `}</style>
    </>
  );
}
