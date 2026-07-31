import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, CheckCircle2,
  Briefcase, Target, Award
} from 'lucide-react';
import Section from '../components/Section';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import SEO from '../components/SEO';
import SubpageHero from '../components/SubpageHero';
import { SITE_URL } from '../config/site';

// Detailed data configuration for Swedish and English languages
interface DetailData {
  title: string;
  intro: string;
  extendedDescription: string;
  benefitsTitle: string;
  benefits: Array<{ title: string; desc: string }>;
  processTitle: string;
  process: Array<{ step: string; title: string; desc: string }>;
  whyChooseUsTitle: string;
  whyChooseUs: string[];
  useCasesTitle: string;
  useCases: Array<{ industry: string; desc: string }>;
  keywords: string[];
  schemaDescription: string;
}

const serviceDetails: Record<string, Record<'sv' | 'en', DetailData>> = {
  'requirements-analysis': {
    sv: {
      title: 'Kravanalys & verksamhetsanalys',
      intro: 'Grunden för varje framgångsrikt IT-projekt ligger i att översätta komplexa visioner till konkreta, validerade kravspecifikationer. Vi bygger bron mellan verksamhet och IT.',
      extendedDescription: 'Många IT-projekt misslyckas eller drar över budget på grund av otydlig kommunikation och svaga kravbilder. Våra seniora kravanalytiker och affärsanalytiker arbetar metodiskt för att samla in, strukturera, visualisera och förankra era funktionella och icke-funktionella krav. Vi underlättar kommunikationen mellan alla intressenter, minimerar missförstånd och säkerställer att utvecklingsteamet bygger exakt det verksamheten behöver.',
      benefitsTitle: 'Viktiga fördelar med vår kravanalys',
      benefits: [
        { title: 'Eliminera scope creep', desc: 'Genom att sätta tydliga avgränsningar tidigt undviker ni skenande utvecklingskostnader.' },
        { title: 'Bättre budgetkontroll', desc: 'När kraven är tydliga kan utvecklingstider och kostnader estimeras med hög precision.' },
        { title: 'Smidigare utveckling', desc: 'Utvecklingsteamet får färdiga, genomtänkta user stories och slipper gissa sig fram.' },
        { title: 'Korrekt verksamhetsvärde', desc: 'Vi säkerställer att systemet faktiskt löser era faktiska affärsutmaningar.' }
      ],
      processTitle: 'Så arbetar vi med kravanalys',
      process: [
        { step: '01', title: 'Kravinsamling (elicitation)', desc: 'Vi håller workshops, intervjuer och analyserar befintliga system för att fånga alla intressenters behov.' },
        { step: '02', title: 'Strukturering & modellering', desc: 'Vi ritar processkartor, skapar datamodeller och formulerar tydliga användningsfall (use cases) och användarberättelser.' },
        { step: '03', title: 'Validering & förankring', desc: 'Vi går igenom kraven med produktägare, utvecklare och testledare för att säkerställa att allt är tekniskt genomförbart.' },
        { step: '04', title: 'Kravhantering över tid', desc: 'Vi agerar stöd till produktägaren för att prioritera backloggen under hela utvecklingsfasen.' }
      ],
      whyChooseUsTitle: 'Varför välja REQCON för kravanalys?',
      whyChooseUs: [
        'Våra analytiker har över 10 års erfarenhet från både offentlig sektor och privata storföretag.',
        'Vi behärskar moderna verktyg som Jira, Confluence, Azure DevOps och Enterprise Architect.',
        'Vi kombinerar kravanalys med UX-tänkande för att sätta slutanvändaren i fokus.',
        'Vi är certifierade enligt internationella standarder som IREB och IIBA.'
      ],
      useCasesTitle: 'Branscher och användningsfall',
      useCases: [
        { industry: 'Offentlig sektor & myndigheter', desc: 'Kravställning inför komplexa systemupphandlingar (LOU) och digitalisering av medborgartjänster.' },
        { industry: 'Fintech & bank', desc: 'Strukturering av regulatoriska krav, säkerhetsprotokoll och integrationer mot externa API-plattformar.' },
        { industry: 'Transport & logistik', desc: 'Optimering av bokningssystem, ruttplanering och hantering av stora realtidsdataflöden.' }
      ],
      keywords: ['kravanalytiker', 'verksamhetsanalys', 'business analyst Stockholm', 'Jira kravhantering', 'IREB certifierad IT-konsult', 'kravspecifikation systemutveckling'],
      schemaDescription: 'Seniora kravanalytiker och affärsanalytiker i Stockholm och Göteborg. Vi hjälper myndigheter och företag med systemkrav, upphandlingar och agila backloggar.'
    },
    en: {
      title: 'Requirements analysis & business analysis',
      intro: 'The foundation of every successful IT project lies in translating complex visions into concrete, validated requirements specifications. We bridge the gap between business and IT.',
      extendedDescription: 'Many IT projects fail or exceed their budgets due to unclear communication and weak requirements specifications. Our senior requirements analysts and business analysts work methodically to gather, structure, visualize, and establish your functional and non-functional requirements. We facilitate communication between all stakeholders, minimizing misunderstandings and ensuring that the development team builds exactly what the business needs.',
      benefitsTitle: 'Key benefits of our requirements analysis',
      benefits: [
        { title: 'Eliminate scope creep', desc: 'By setting clear boundaries early, you avoid runaway development costs.' },
        { title: 'Better budget control', desc: 'When requirements are clear, development times and costs can be estimated with high precision.' },
        { title: 'Smoother development', desc: 'The development team receives ready, well-thought-out user stories and avoids guesswork.' },
        { title: 'Real business value', desc: 'We ensure that the system actually solves your business challenges.' }
      ],
      processTitle: 'Our requirements process',
      process: [
        { step: '01', title: 'Elicitation', desc: 'We hold workshops, interviews, and analyze existing systems to capture all stakeholder needs.' },
        { step: '02', title: 'Structuring & modeling', desc: 'We map processes, create data models, and formulate clear use cases and user stories.' },
        { step: '03', title: 'Validation & alignment', desc: 'We review requirements with product owners, developers, and QA leads to verify technical feasibility.' },
        { step: '04', title: 'Backlog management', desc: 'We support the product owner in prioritizing the backlog throughout the development lifecycle.' }
      ],
      whyChooseUsTitle: 'Why choose REQCON for requirements?',
      whyChooseUs: [
        'Our analysts possess over 10 years of experience across public sectors and large enterprises.',
        'We master modern tools including Jira, Confluence, Azure DevOps, and Enterprise Architect.',
        'We combine requirements management with UX methodologies to keep end-users in focus.',
        'We hold international certifications such as IREB and IIBA.'
      ],
      useCasesTitle: 'Industries and use cases',
      useCases: [
        { industry: 'Public sector & authorities', desc: 'Requirements engineering for complex public procurements and digital citizen services.' },
        { industry: 'Fintech & banking', desc: 'Structuring regulatory requirements, security protocols, and integrations with external APIs.' },
        { industry: 'Transport & logistics', desc: 'Optimizing booking platforms, route planning, and managing large real-time data flows.' }
      ],
      keywords: ['requirements analyst', 'business analysis', 'business analyst Stockholm', 'Jira requirements management', 'IREB certified IT consultant', 'requirements engineering'],
      schemaDescription: 'Senior requirements analysts and business analysts in Stockholm and Gothenburg. We support public agencies and enterprises with systems engineering and agile backlogs.'
    }
  },
  'testing-qa': {
    sv: {
      title: 'Testning & kvalitetssäkring (QA)',
      intro: 'Kvalitet är ingen eftertanke – det är en röd tråd genom hela systemutvecklingen. Vi säkrar att era system är snabba, stabila och felfria.',
      extendedDescription: 'Att upptäcka buggar först efter driftsättning är dyrt och skadar varumärket. Våra seniora testledare och testare integreras tidigt i utvecklingsprocessen. Vi tar fram teststrategier, skriver automatiserade testskript och genomför omfattande funktionella, integrations- och acceptanstester. Vi ser till att era releaser sker med full kontroll och högsta möjliga kvalitet.',
      benefitsTitle: 'Fördelar med professionell kvalitetssäkring',
      benefits: [
        { title: 'Säkrare driftsättningar', desc: 'Undvik obehagliga överraskningar och krascher i produktionsmiljön.' },
        { title: 'Tids- och kostnadsvinst', desc: 'Att åtgärda fel under utveckling är upp till 10 gånger billigare än efter release.' },
        { title: 'Ökad användarnöjdhet', desc: 'Användare får en snabb, buggfri och pålitlig digital upplevelse.' },
        { title: 'Strukturerad uppföljning', desc: 'Tydliga felrapporter (bug tracking) ger utvecklarna direkt feedback.' }
      ],
      processTitle: 'Vår arbetsprocess inom test',
      process: [
        { step: '01', title: 'Testplanering', desc: 'Vi analyserar kraven och bygger en testplan med definierade acceptanskriterier.' },
        { step: '02', title: 'Testdesign', desc: 'Vi skapar testfall, förbereder testdata och ställer in automatiserade testmiljöer.' },
        { step: '03', title: 'Exekvering', desc: 'Vi genomför manuella och automatiserade tester och rapporterar avvikelser löpande.' },
        { step: '04', title: 'Acceptans & stängning', desc: 'Vi koordinerar användaracceptanstester (UAT) och levererar slutrapport inför driftsättning.' }
      ],
      whyChooseUsTitle: 'Varför välja REQCON för QA?',
      whyChooseUs: [
        'ISTQB-certifierade testledare med mångårig vana av komplexa systemmiljöer.',
        'Expertis inom testautomatisering med verktyg som Selenium, Cypress och Playwright.',
        'Erfarenhet av testning inom både molnlösningar och äldre legacy-system.',
        'Vi bygger strukturerade testprocesser som lever kvar i er organisation.'
      ],
      useCasesTitle: 'Branscher och användningsfall',
      useCases: [
        { industry: 'E-handel & webblösningar', desc: 'Prestandatestning inför högsäsonger och validering av betalningsflöden under tung belastning.' },
        { industry: 'Medicinteknik & hälsa', desc: 'Kvalitetssäkring enligt stränga regulatoriska krav och standarder för patientdata.' },
        { industry: 'Telekom & integrationer', desc: 'End-to-end-testning av distribuerade system med hundratals mikrotjänster.' }
      ],
      keywords: ['testledare Stockholm', 'QA engineer', 'kvalitetssäkring programvara', 'Playwright testautomatisering', 'ISTQB testare', 'användaracceptanstest UAT'],
      schemaDescription: 'ISTQB-certifierade testledare och QA-ingenjörer. Vi säkrar kvaliteten i era IT-system genom testplanering, testautomatisering och UAT.'
    },
    en: {
      title: 'Testing & quality assurance (QA)',
      intro: 'Quality is not an afterthought – it is a continuous thread throughout software development. We secure fast, stable, and bug-free releases.',
      extendedDescription: 'Discovering bugs after deployment is expensive and damages your brand. Our senior test managers and QA engineers integrate early in the development lifecycle. We design test strategies, write automated test scripts, and perform thorough functional, integration, and user acceptance tests. We ensure that your releases happen under full control and with the highest quality standards.',
      benefitsTitle: 'Benefits of professional quality assurance',
      benefits: [
        { title: 'Secure deployments', desc: 'Avoid critical downtime and unexpected crashes in your production environment.' },
        { title: 'Time and cost efficiency', desc: 'Fixing bugs during development is up to 10 times cheaper than fixing them post-release.' },
        { title: 'Increased user satisfaction', desc: 'Users get a fast, responsive, and seamless digital experience.' },
        { title: 'Structured bug tracking', desc: 'Clear defect reports provide developers with actionable feedback instantly.' }
      ],
      processTitle: 'Our testing process',
      process: [
        { step: '01', title: 'Test planning', desc: 'We analyze system requirements and compile a test plan with defined acceptance criteria.' },
        { step: '02', title: 'Test design', desc: 'We draft test scenarios, prepare test data, and configure automated test pipelines.' },
        { step: '03', title: 'Execution', desc: 'We run manual and automated tests, logging issues and regressions systematically.' },
        { step: '04', title: 'Acceptance & sign-off', desc: 'We coordinate user acceptance testing (UAT) and deliver final QA reports for release.' }
      ],
      whyChooseUsTitle: 'Why choose REQCON for QA?',
      whyChooseUs: [
        'ISTQB-certified test managers with extensive experience in complex enterprise architectures.',
        'Expertise in test automation frameworks like Selenium, Cypress, and Playwright.',
        'Experienced in QA for cloud applications as well as legacy on-premise platforms.',
        'We build sustainable test processes that remain in your organization.'
      ],
      useCasesTitle: 'Industries and use cases',
      useCases: [
        { industry: 'E-commerce & web applications', desc: 'Performance and load testing prior to peak seasons, validating transactions under high traffic.' },
        { industry: 'Medtech & healthcare', desc: 'Quality assurance under strict regulatory frameworks and patient data compliance standards.' },
        { industry: 'Telecom & microservices', desc: 'End-to-end integration testing of distributed architectures and external system APIs.' }
      ],
      keywords: ['test manager Stockholm', 'QA engineer', 'software quality assurance', 'Playwright automation', 'ISTQB tester', 'user acceptance testing UAT'],
      schemaDescription: 'ISTQB-certified test managers and QA engineers in Sweden. We secure system quality through strategic test planning, automation, and user validation.'
    }
  },
  'project-management': {
    sv: {
      title: 'Teknisk & agil projektledning',
      intro: 'Vi leder era digitala initiativ i mål. Med ett strukturerat och målinriktat ledarskap säkerställer vi kontroll över tidplan, budget och kvalitet.',
      extendedDescription: 'Att styra IT-projekt kräver mer än bara administrativ uppföljning; det kräver förståelse för teknik, arkitektur och agila flöden. Våra seniora projektledare, Scrum masters och release train engineers (RTE) har djup teknisk förståelse och lång erfarenhet av att leda tvärfunktionella team. Vi koordinerar intressenter, minimerar risker och skapar transparens så att alla drar åt samma håll.',
      benefitsTitle: 'Fördelar med vår projektledning',
      benefits: [
        { title: 'Tydlig målstyrning', desc: 'Vi bryter ner övergripande mål till konkreta milstolpar som teamet faktiskt kan leverera.' },
        { title: 'Effektiv resursanvändning', desc: 'Vi tar bort hinder (blockers) och optimerar teamets arbetsbelastning.' },
        { title: 'Stark riskhantering', desc: 'Vi identifierar risker tidigt och sätter in åtgärder innan de blir till faktiska problem.' },
        { title: 'Transparens & rapportering', desc: 'Löpande rapportering ger ledningen full insyn i budget och framdrift.' }
      ],
      processTitle: 'Så leder vi era projekt',
      process: [
        { step: '01', title: 'Etablering & planering', desc: 'Vi definierar projektets omfattning, sätter upp styrgrupper och tar fram en realistisk projektplan.' },
        { step: '02', title: 'Löpande styrning', desc: 'Vi leder dagliga avstämningar, koordinerar leveranser och hanterar eventuella resursförändringar.' },
        { step: '03', title: 'Kvalitetssäkring', desc: 'Vi ser till att alla leveranser testas och godkänns enligt överenskomna kriterier.' },
        { step: '04', title: 'Avslut & överlämning', desc: 'Vi dokumenterar lärdomar, stänger projektet ekonomiskt och lämnar över till förvaltning.' }
      ],
      whyChooseUsTitle: 'Varför välja REQCON för projektledning?',
      whyChooseUs: [
        'Våra ledare är certifierade inom Scrum, SAFe, PMP och PRINCE2.',
        'Vi har djup teknisk förståelse och pratar utvecklarnas språk.',
        'Lång erfarenhet av komplexa migrationsprojekt och molnimplementeringar.',
        'Vi är vana vid att leda både distribuerade och samlokaliserade team.'
      ],
      useCasesTitle: 'Branscher och användningsfall',
      useCases: [
        { industry: 'IT-infrastruktur & cloud', desc: 'Migrering av legacy-system till molnplattformar (AWS/Azure) med minimal driftpåverkan.' },
        { industry: 'Systemintegrationer', desc: 'Projektledning vid sammanslagning av IT-miljöer i samband med företagsförvärv.' },
        { industry: 'Produktutveckling', desc: 'Agil projektledning vid framtagning av nya konsumentnära digitala tjänster.' }
      ],
      keywords: ['projektledare IT Stockholm', 'Scrum master', 'agil projektledning', 'SAFe release train engineer', 'PRINCE2 IT-konsult', 'teknisk projektledare'],
      schemaDescription: 'Seniora agila och tekniska projektledare. Vi leder era komplexa IT-projekt, systembyten och molnmigreringar i mål med full kontroll.'
    },
    en: {
      title: 'Technical & agile project management',
      intro: 'We guide your digital initiatives to the finish line. With structured and goal-oriented leadership, we ensure control over schedule, budget, and quality.',
      extendedDescription: 'Steering IT projects requires more than just administrative follow-ups; it demands an understanding of technology, architecture, and agile delivery. Our senior project managers, Scrum masters, and release train engineers (RTE) possess technical expertise and years of experience leading cross-functional teams. We coordinate stakeholders, mitigate risks, and build transparency so that everyone aligns on the same goals.',
      benefitsTitle: 'Benefits of our project management',
      benefits: [
        { title: 'Clear goal setting', desc: 'We break down high-level visions into concrete milestones that the team can deliver.' },
        { title: 'Optimal resource allocation', desc: 'We remove roadblocks and streamline team velocity.' },
        { title: 'Proactive risk management', desc: 'We identify potential bottlenecks early and implement mitigation strategies before they impact timelines.' },
        { title: 'Transparency & reporting', desc: 'Continuous dashboards provide leadership with full insights into budget and progress.' }
      ],
      processTitle: 'Our management process',
      process: [
        { step: '01', title: 'Initiation & planning', desc: 'We define project scope, set up steering committees, and outline a realistic roadmap.' },
        { step: '02', title: 'Sprint & execution', desc: 'We facilitate daily standups, coordinate releases, and manage dependencies.' },
        { step: '03', title: 'Quality audits', desc: 'We ensure deliverables are properly tested and verified against acceptance criteria.' },
        { step: '04', title: 'Closure & handover', desc: 'We conduct retrospectives, settle financials, and transfer systems to operations.' }
      ],
      whyChooseUsTitle: 'Why choose REQCON for management?',
      whyChooseUs: [
        'Our leaders hold certifications in Scrum, SAFe, PMP, and PRINCE2.',
        'We possess technical backgrounds and speak the developers\' language.',
        'Extensive experience with large-scale system migrations and cloud transformations.',
        'We are highly skilled in managing remote, hybrid, and onsite teams.'
      ],
      useCasesTitle: 'Industries and use cases',
      useCases: [
        { industry: 'IT infrastructure & cloud', desc: 'Migrating legacy architectures to modern cloud platforms (AWS/Azure) with zero downtime.' },
        { industry: 'System integrations', desc: 'Managing IT consolidations and data migrations during mergers and acquisitions.' },
        { industry: 'Digital product development', desc: 'Steering agile teams in building and launching customer-facing mobile and web products.' }
      ],
      keywords: ['IT project manager Stockholm', 'Scrum master', 'agile project management', 'SAFe release train engineer', 'PRINCE2 consultant', 'technical project lead'],
      schemaDescription: 'Senior agile and technical IT project managers in Stockholm and Gothenburg. We lead complex software and migration projects with high predictability.'
    }
  },
  'information-management': {
    sv: {
      title: 'Informationshantering & datasamordning',
      intro: 'Skapa ordning, säkerhet och spårbarhet i era dokument- och dataflöden. Vi hjälper er att strukturera er information så att den blir sökbar och tillförlitlig.',
      extendedDescription: 'I stora projekt och komplexa organisationer är bristen på strukturerad information en stor tidstjuv och säkerhetsrisk. Våra specialister inom informationshantering och dokumentkontroll (document control) bygger upp effektiva strukturer i SharePoint, sätter upp regler för metadata och behörigheter samt digitaliserar äldre arkiv. Vi ser till att rätt person har tillgång till rätt information i exakt rätt tid.',
      benefitsTitle: 'Vikten av god informationshantering',
      benefits: [
        { title: 'Spara värdefull tid', desc: 'Minska tiden personalen lägger på att leta efter ritningar, avtal och kravdokument.' },
        { title: 'Hög informationssäkerhet', desc: 'Rätt behörighetsstruktur skyddar känslig data från obehöriga.' },
        { title: 'Versionskontroll', desc: 'Säkerställ att alla arbetar med den senaste, godkända filversionen.' },
        { title: 'Enkel sökbarhet', desc: 'Med genomtänkta metadataklassificeringar blir filer sökbara direkt.' }
      ],
      processTitle: 'Vårt arbetssätt inom data- och dokumentkontroll',
      process: [
        { step: '01', title: 'Analys & inventering', desc: 'Vi kartlägger era nuvarande informationsflöden, filstrukturer och identifierar flaskhalsar.' },
        { step: '02', title: 'Struktur & metadata', desc: 'Vi tar fram gemensamma riktlinjer, metadata-scheman och behörighetsmatriser.' },
        { step: '03', title: 'Implementering', desc: 'Vi konfigurerar systemet (t.ex. SharePoint) och migrerar filer till den nya miljön.' },
        { step: '04', title: 'Utbildning & förvaltning', desc: 'Vi utbildar personalen och sätter upp långsiktiga förvaltningsplaner för informationsmiljön.' }
      ],
      whyChooseUsTitle: 'Varför välja REQCON för informationshantering?',
      whyChooseUs: [
        'Lång erfarenhet av storskaliga infrastrukturprojekt (t.ex. hos Trafikverket).',
        'Djup expertis inom SharePoint-arkitektur och behörighetsstyrning.',
        'Vi kombinerar arkivvetenskap med modern molnteknik.',
        'Vi är vana vid sekretessprövningar och säkerhetsskyddad dokumentation.'
      ],
      useCasesTitle: 'Branscher och användningsfall',
      useCases: [
        { industry: 'Infrastruktur & samhällsbyggnad', desc: 'Dokumentkontroll (document control) av ritningar och tekniska underlag i miljardprojekt.' },
        { industry: 'Medicinteknik', desc: 'Strukturering av produktbeskrivningar, certifieringsdokument och QC-rapporter.' },
        { industry: 'Kommuner & myndigheter', desc: 'Digitalisering av pappersarkiv och införande av lagstadgade gallringsrutiner.' }
      ],
      keywords: ['informationshantering', 'SharePoint specialist Stockholm', 'document control IT', 'dokumentkontrollant', 'metadatastruktur', 'datasamordnare Trafikverket'],
      schemaDescription: 'Specialister inom informationshantering, SharePoint-arkitektur och dokumentkontroll. Vi hjälper er att strukturera era dataflöden.'
    },
    en: {
      title: 'Information management & data coordination',
      intro: 'Build structure, security, and traceability in your document and data flows. We help organize your assets so they are searchable and reliable.',
      extendedDescription: 'In large-scale projects and complex organizations, the lack of structured information is a major time-drain and security vulnerability. Our specialists in information management and document control design efficient data taxonomies in SharePoint, configure metadata schemes, manage access controls, and digitize legacy archives. We ensure that the right individual accesses the correct file at the perfect time.',
      benefitsTitle: 'Benefits of structured information',
      benefits: [
        { title: 'Save valuable time', desc: 'Reduce the time staff spends searching for technical drawings, contracts, and requirements.' },
        { title: 'Robust data security', desc: 'Role-based access controls protect sensitive records from unauthorized access.' },
        { title: 'Version control', desc: 'Ensure everyone collaborates on the latest, approved file version.' },
        { title: 'Instant searchability', desc: 'With strategic metadata mapping, files are indexed and searchable instantly.' }
      ],
      processTitle: 'Our information process',
      process: [
        { step: '01', title: 'Audit & inventory', desc: 'We map your existing document flows, directory configurations, and bottlenecks.' },
        { step: '02', title: 'Taxonomy & metadata', desc: 'We design unified classification policies, metadata schemas, and access matrices.' },
        { step: '03', title: 'Configuration & migration', desc: 'We configure the platform (e.g. SharePoint) and migrate records into the structured space.' },
        { step: '04', title: 'Enablement & governance', desc: 'We onboard your staff and define long-term governance plans for data maintenance.' }
      ],
      whyChooseUsTitle: 'Why choose REQCON for info management?',
      whyChooseUs: [
        'Extensive track record in major infrastructure projects (e.g. with Trafikverket).',
        'Deep expertise in SharePoint administration and permission configurations.',
        'We combine information science with modern cloud management.',
        'Experienced in managing confidential and classified documentation.'
      ],
      useCasesTitle: 'Industries and use cases',
      useCases: [
        { industry: 'Infrastructure & construction', desc: 'Document control of complex drawings and technical records in multi-million dollar projects.' },
        { industry: 'Medtech & regulatory', desc: 'Structuring product files, certification documents, and quality assurance logs.' },
        { industry: 'Public agencies & municipalities', desc: 'Digitizing physical archives and establishing legal archiving and disposal routines.' }
      ],
      keywords: ['information management', 'SharePoint consultant Stockholm', 'document control IT', 'document controller', 'metadata structure', 'data coordinator Sweden'],
      schemaDescription: 'Specialists in information management, SharePoint architecture, and document control. We bring order and security to your enterprise file systems.'
    }
  },
  'ux-design': {
    sv: {
      title: 'UX-design & användarupplevelse',
      intro: 'Användarvänliga system skapas inte av en slump. Vi kombinerar djupgående användarinsikter med modern visuell design för att skapa gränssnitt som engagerar.',
      extendedDescription: 'Ett system som är svårt att förstå leder till ineffektivitet, supportkostnader och missnöjda kunder. Våra seniora UX/UI-designers sätter användaren i centrum genom hela produktresan. Vi genomför användarintervjuer, skapar klickbara prototyper och designar moderna gränssnitt som är både estetiskt tilltalande och lätta att navigera. Vi testar tidigt på riktiga användare för att spara utvecklingstid.',
      benefitsTitle: 'Fördelarna med professionell UX-design',
      benefits: [
        { title: 'Högre konvertering', desc: 'Tydliga flöden gör det enkelt för användarna att slutföra sina uppgifter.' },
        { title: 'Minskade supportkostnader', desc: 'När gränssnittet är självförklarande minskar behovet av kundtjänst.' },
        { title: 'Lägre utvecklingskostnader', desc: 'Att testa och justera prototyper är 100 gånger billigare än att skriva om kod.' },
        { title: 'Starkare varumärke', desc: 'En modern, responsiv och polerad användarupplevelse bygger stark lojalitet.' }
      ],
      processTitle: 'Vår designprocess',
      process: [
        { step: '01', title: 'Användarresearch', desc: 'Vi kartlägger användarnas behov och problemområden genom intervjuer och enkäter.' },
        { step: '02', title: 'Wireframes & flöden', desc: 'Vi ritar upp grova skisser och flödesscheman för att bestämma logik och struktur.' },
        { step: '03', title: 'UI-design & prototyping', desc: 'Vi skapar högupplösta gränssnitt och interaktiva klickbara prototyper i Figma.' },
        { step: '04', title: 'Användartestning', desc: 'Vi testar prototypen på målgruppen, identifierar friktion och finjusterar designen.' }
      ],
      whyChooseUsTitle: 'Varför välja REQCON för UX?',
      whyChooseUs: [
        'Våra designers behärskar Figma, Adobe XD och moderna designsystem till fullo.',
        'Vi har bred vana av att arbeta tätt ihop med frontend-utvecklare.',
        'Vi sätter tillgänglighet (WCAG) som standard i alla våra designer.',
        'Vi baserar våra designbeslut på data och riktiga användartester.'
      ],
      useCasesTitle: 'Branscher och användningsfall',
      useCases: [
        { industry: 'SaaS & webapps', desc: 'UX-redesign av komplexa administrationspaneler och dashboards för att öka användbarheten.' },
        { industry: 'B2C mobilappar', desc: 'Skapande av intuitiva och snabba köpflöden för e-handel och finansiella tjänster.' },
        { industry: 'Interna affärssystem', desc: 'Användarvänlig design av verksamhetsspecifika verktyg för att effektivisera de anställdas vardag.' }
      ],
      keywords: ['UX designer Stockholm', 'Figma UI design', 'användarvänlighet system', 'klickbar prototyp', 'interaktionsdesign', 'WCAG tillgänglig webbdesign'],
      schemaDescription: 'Seniora UX/UI-designers. Vi skapar intuitiva, tillgängliga och konverterande användargränssnitt genom användarresearch, wireframes och prototyper.'
    },
    en: {
      title: 'UX design & user experience',
      intro: 'User-friendly systems do not happen by accident. We combine deep user insights with modern interface design to build engaging digital products.',
      extendedDescription: 'A system that is difficult to navigate leads to user frustration, high support costs, and lost customers. Our senior UX/UI designers place users at the heart of the product journey. We conduct user research, compile wireframes, and design modern interfaces that are both aesthetically stunning and effortless to navigate. We validate early with real users to save development cycles.',
      benefitsTitle: 'Benefits of strategic UX design',
      benefits: [
        { title: 'Higher conversion rates', desc: 'Streamlined user flows make it simple for users to complete tasks and checkouts.' },
        { title: 'Lower support overhead', desc: 'When the interface is self-explanatory, support requests decrease significantly.' },
        { title: 'Cheaper iterations', desc: 'Testing and adjusting clickable prototypes is 100 times cheaper than rewrites.' },
        { title: 'Brand loyalty', desc: 'A polished, responsive, and seamless user experience drives user retention and growth.' }
      ],
      processTitle: 'Our design process',
      process: [
        { step: '01', title: 'User research', desc: 'We discover user needs, motivations, and pain points via interviews and observations.' },
        { step: '02', title: 'Wireframes & user flows', desc: 'We draw schematic layouts and flows to map the structural skeleton of the app.' },
        { step: '03', title: 'UI design & prototyping', desc: 'We build high-fidelity interface screens and interactive clickable prototypes in Figma.' },
        { step: '04', title: 'Usability validation', desc: 'We test prototypes with target audiences, identify friction, and refine the design.' }
      ],
      whyChooseUsTitle: 'Why choose REQCON for UX?',
      whyChooseUs: [
        'Our designers possess deep mastery of Figma, design systems, and prototyping tools.',
        'We work closely with frontend developers to ensure smooth design handoffs.',
        'We implement digital accessibility (WCAG compliance) as a baseline standard.',
        'We base design decisions on user data and structured usability testing.'
      ],
      useCasesTitle: 'Industries and use cases',
      useCases: [
        { industry: 'SaaS & web applications', desc: 'UX redesign of complex administrator panels and reporting dashboards to optimize work efficiency.' },
        { industry: 'B2C mobile apps', desc: 'Designing fast user journeys and checkout flows for e-commerce and retail banking applications.' },
        { industry: 'Enterprise business tools', desc: 'Simplifying employee-facing software interfaces to increase operational speed and reduce input errors.' }
      ],
      keywords: ['UX designer Stockholm', 'Figma UI design', 'usability software', 'clickable prototype', 'interaction designer', 'WCAG accessible web design'],
      schemaDescription: 'Senior UX/UI designers in Stockholm. We build intuitive, accessible, and high-converting user interfaces based on solid user research and Figma prototyping.'
    }
  },
  'agile-methods': {
    sv: {
      title: 'Agila metoder & coachning',
      intro: 'Vi hjälper er organisation att anpassa agila principer efter era unika behov. Vi bygger högpresterande, självorganiserande team.',
      extendedDescription: 'Att arbeta agilt handlar inte om att strikt följa en regelbok; det handlar om att skapa en kultur av snabb återkoppling, kontinuerliga förbättringar och samarbete. Våra seniora agila coacher, Scrum masters och SAFe-konsulter guidar er genom transformationen. Vi utbildar teamen, faciliterar agila ceremonier och stöttar ledningen för att skapa ett transparent och flexibelt arbetssätt.',
      benefitsTitle: 'Fördelar med ett fungerande agilt arbetssätt',
      benefits: [
        { title: 'Hög anpassningsförmåga', desc: 'Ni kan snabbt styra om utvecklingen när marknaden eller era behov förändras.' },
        { title: 'Kortare time-to-market', desc: 'Genom att leverera i små steg når ni era användare mycket snabbare.' },
        { title: 'Engagerade medarbetare', desc: 'Självstyrande team ökar motivationen och minskar personalomsättningen.' },
        { title: 'Mindre spill & högre värde', desc: 'Kontinuerlig prioritering minskar risken för att bygga funktioner som inte behövs.' }
      ],
      processTitle: 'Vår agila coachningsmodell',
      process: [
        { step: '01', title: 'Mognadsanalys', desc: 'Vi analyserar era nuvarande processer, strukturer och samarbetskultur.' },
        { step: '02', title: 'Skräddarsydd plan', desc: 'Vi tar fram en plan för vilka ramverk (Scrum, Kanban, SAFe) som bäst löser era utmaningar.' },
        { step: '03', title: 'Praktisk coachning', desc: 'Vi går in i rollen som Scrum master eller coach för att stötta teamen i vardagen.' },
        { step: '04', title: 'Hållbar självständighet', desc: 'Vi etablerar agila roller internt så att arbetssättet lever vidare utan oss.' }
      ],
      whyChooseUsTitle: 'Varför välja REQCON för agilt stöd?',
      whyChooseUs: [
        'Våra coacher har gedigen vana av både teamnivå (Scrum/Kanban) och skalad nivå (SAFe).',
        'Vi fokuserar på den agila kulturen och människorna, inte bara processerna.',
        'Vi har framgångsrikt stöttat stora agila transformationer inom bank och industri.',
        'Vi anpassar ramverken efter er verklighet, inte tvärtom.'
      ],
      useCasesTitle: 'Branscher och användningsfall',
      useCases: [
        { industry: 'Traditionella organisationer', desc: 'Stöd vid övergång från vattenfallsmodell (waterfall) till ett agilt produktfokus.' },
        { industry: 'Stora organisationer & koncerner', desc: 'Etablering av SAFe (Scaled Agile Framework) med release trains och gemensam PI-planering.' },
        { industry: 'Nystartade utvecklingsteam', desc: 'Uppstart av nya utvecklingsteam för att snabbt sätta Scrum-rutiner och arbetskultur.' }
      ],
      keywords: ['agil coach Stockholm', 'Scrum master konsult', 'SAFe PI planering', 'agil transformation', 'Kanban tavla systemutveckling', 'agila metoder coaching'],
      schemaDescription: 'Erfarna agila coacher och Scrum masters. Vi hjälper er organisation att implementera agila arbetssätt som ökar effektiviteten och motivationen.'
    },
    en: {
      title: 'Agile methods & coaching',
      intro: 'We help your organization adapt agile principles to your unique needs. We build high-performing, self-organizing teams.',
      extendedDescription: 'Working agiley is not about strictly following a textbook; it is about building a culture of rapid feedback, continuous improvement, and collaboration. Our senior agile coaches, Scrum masters, and SAFe consultants guide you through the transformation. We train teams, facilitate agile ceremonies, and support management to establish a transparent, adaptable work environment.',
      benefitsTitle: 'Benefits of a mature agile model',
      benefits: [
        { title: 'High adaptability', desc: 'Quickly pivot your development priorities when user needs or market conditions change.' },
        { title: 'Faster time-to-market', desc: 'Delivering increments continuously puts features into your users\' hands much faster.' },
        { title: 'Motivated employees', desc: 'Self-organizing teams enjoy higher autonomy, which reduces employee churn.' },
        { title: 'Reduced waste', desc: 'Continuous grooming and alignment prevent building features that carry no value.' }
      ],
      processTitle: 'Our agile enablement model',
      process: [
        { step: '01', title: 'Maturity assessment', desc: 'We analyze your current workflows, communication layers, and collaboration patterns.' },
        { step: '02', title: 'Roadmap & framework', desc: 'We compile a custom roadmap choosing the best fit frameworks (Scrum, Kanban, SAFe).' },
        { step: '03', title: 'Hands-on coaching', desc: 'We step in as Scrum masters or coaches, active in daily standups and sprint cycles.' },
        { step: '04', title: 'Sustainable independence', desc: 'We build internal capability so your agile processes thrive long after our assignment.' }
      ],
      whyChooseUsTitle: 'Why choose REQCON for agile support?',
      whyChooseUs: [
        'Our coaches possess deep experience at team levels (Scrum/Kanban) and scaled levels (SAFe).',
        'We focus on the agile mindset and culture, not just rules and ticking boxes.',
        'Proven track record supporting major agile transformations in banking and heavy industry.',
        'We adapt the frameworks to fit your organizational reality, never the other way around.'
      ],
      useCasesTitle: 'Industries and use cases',
      useCases: [
        { industry: 'Legacy transitions', desc: 'Supporting enterprises in moving from traditional waterfall models to agile product ownership.' },
        { industry: 'Scale enterprises', desc: 'Setting up SAFe (Scaled Agile Framework) with release trains and PI planning cadence.' },
        { industry: 'Fresh product teams', desc: 'Spinning up new software development teams, setting agile routines and collaborative team values.' }
      ],
      keywords: ['agile coach Stockholm', 'Scrum master consultant', 'SAFe PI planning', 'agile transformation', 'Kanban boards', 'agile consulting Sweden'],
      schemaDescription: 'Senior agile coaches and Scrum masters in Stockholm and Gothenburg. We support agile transformations, SAFe scaling, and team-level enablement.'
    }
  }
};

const ServiceDetail: React.FC = () => {
  const { lng, serviceId } = useParams<{ lng: string; serviceId: string }>();

  const activeLang = (lng === 'en' || lng === 'sv') ? lng : 'sv';
  const details = serviceId ? serviceDetails[serviceId]?.[activeLang] : undefined;

  // If service ID is invalid, redirect back to main services list
  if (!details) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 bg-bg-page text-center">
        <h2 className="text-3xl font-extrabold text-text-primary">Tjänsten hittades inte / Service not found</h2>
        <p className="text-text-secondary text-sm max-w-md leading-relaxed">
          Vi kunde inte hitta den specifika tjänstesidan du letade efter. Du kan gå tillbaka till översikten för att läsa mer.
        </p>
        <Link to={`/${activeLang}/services`}>
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Tillbaka till tjänster
          </Button>
        </Link>
      </div>
    );
  }

  const contactPath = `/${activeLang}/contact?service=${encodeURIComponent(serviceId!)}`;

  const getServiceImage = (id: string) => {
    switch (id) {
      case 'requirements-analysis': return '/images/services/kravanalys.jpg';
      case 'testing-qa': return '/images/services/testning.jpg';
      case 'project-management': return '/images/services/projektledning.jpg';
      case 'information-management': return '/images/services/informationshantering.jpg';
      case 'ux-design': return '/images/services/uxdesign.jpg';
      case 'agile-methods': return '/images/services/agilametoder.jpg';
      default: return '';
    }
  };

  // Structured Data Schema for GEO and SEO
  const serviceSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": details.title,
    "description": details.schemaDescription,
    "provider": {
      "@type": "Organization",
      "name": "REQCON AB",
      "url": SITE_URL
    },
    "areaServed": {
      "@type": "Country",
      "name": "Sverige"
    },
    "category": "IT consulting & professional services"
  };

  return (
    <div className="flex flex-col w-full text-left">
      <SEO
        title={details.title}
        description={details.intro}
        schema={serviceSchemaMarkup}
      />

      {/* 1. HERO HEADER */}
      <SubpageHero
        backgroundImage={getServiceImage(serviceId!)}
        backgroundAlt={details.title}
        imageClassName="opacity-35 brightness-90 contrast-105"
        contentClassName="gap-4 md:gap-5"
      >
        <div className="flex w-full justify-start">
          <Link
            to={`/${activeLang}/services`}
            className="group inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-secondary transition-colors hover:text-white select-none"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {activeLang === 'sv' ? 'Tillbaka till tjänster' : 'Back to services'}
          </Link>
        </div>

        <div className="flex w-full min-w-0 flex-col items-center gap-2">
          <h1
            lang={activeLang}
            className="w-full min-w-0 text-center text-[clamp(1.75rem,7.5vw,3.75rem)] font-black leading-tight tracking-tight text-white [overflow-wrap:break-word] hyphens-auto"
          >
            {details.title.split('(')[0].trim()}
          </h1>
          <Eyebrow margin="none">
            {activeLang === 'sv' ? 'Specialistkompetens' : 'Specialist competence'}
          </Eyebrow>
        </div>

        <p className="max-w-2xl text-center text-sm font-medium leading-relaxed text-zinc-300 md:text-base">
          {details.intro}
        </p>

        <Link to={contactPath}>
          <Button variant="primary" size="lg" className="font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
            {activeLang === 'sv' ? 'Diskutera behov' : 'Discuss your needs'}
          </Button>
        </Link>
      </SubpageHero>

      {/* 2. SERVICE OVERVIEW */}
      <Section background="default" className="py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-6xl mx-auto items-center">
          <div className="flex flex-col items-start gap-5 text-left">
            <Eyebrow margin="none">
              {activeLang === 'sv' ? 'Tjänsteöversikt' : 'Service overview'}
            </Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              {details.title}
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              {details.schemaDescription}
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border-custom shadow-sm">
            <img
              src={getServiceImage(serviceId!)}
              alt={details.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* 3. DESCRIPTION & BENEFITS SECTION */}
      <Section background="default" className="py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Detailed text */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
              {activeLang === 'sv' ? 'Fördjupning' : 'Detailed overview'}
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              {details.extendedDescription}
            </p>
            <div className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-white via-white to-accent-primary/[0.14] dark:from-zinc-950 dark:via-bg-surface dark:to-accent-primary/[0.08] border border-border-custom flex gap-4 items-start">
              <Target className="w-6 h-6 text-brand-secondary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-text-primary text-sm mb-1">
                  {activeLang === 'sv' ? 'Målinriktat resultat' : 'Goal-oriented results'}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {activeLang === 'sv' 
                    ? 'Vi går direkt in i din organisation för att leverera omedelbart värde, utan startsträcka. Vi är vana vid komplexa dataflöden och tuffa deadlines.'
                    : 'We integrate directly into your organization to deliver immediate value, with zero ramp-up time. We are experienced in complex data flows and strict deadlines.'}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <h3 className="text-xl font-bold text-text-primary tracking-tight">
              {details.benefitsTitle}
            </h3>
            <div className="flex flex-col gap-4">
              {details.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm">{benefit.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed mt-0.5">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 4. PROCESS TIMELINE */}
      <Section background="alt" className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
              {details.processTitle}
            </h2>
            <p className="text-sm text-text-secondary max-w-lg leading-relaxed">
              {activeLang === 'sv' 
                ? 'En strukturerad och välbeprövad process minimerar risker och ger full förutsägbarhet.'
                : 'A structured and battle-tested methodology minimizes risks and secures total predictability.'}
            </p>
          </div>

          <div className="relative flex flex-col gap-8 md:gap-0 mt-4 w-full text-left">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border-custom -translate-x-1/2 z-0" />

            {details.process.map((p, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center w-full md:py-6 z-10">
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-bg-page bg-brand-secondary text-white font-bold flex items-center justify-center shadow-lg hidden md:flex text-sm z-20 select-none">
                    {p.step}
                  </div>

                  <div className={`w-full md:w-1/2 flex flex-col gap-1.5 ${
                    isEven
                      ? 'md:pr-16 md:text-right md:items-end'
                      : 'md:pl-16 md:text-left md:items-start md:ml-auto'
                  }`}>
                    <span className="text-xs font-bold text-brand-secondary md:hidden">{p.step}. {p.title}</span>
                    <h4 className="font-extrabold text-text-primary text-lg hidden md:block">{p.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-sm">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 5. WHY CHOOSE US & USE CASES */}
      <Section background="default" className="py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Why choose us */}
          <div className="flex flex-col gap-6 text-left">
            <h3 className="text-2xl font-extrabold text-text-primary tracking-tight">
              {details.whyChooseUsTitle}
            </h3>
            <ul className="flex flex-col gap-4">
              {details.whyChooseUs.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <div className="p-1 rounded-full bg-brand-secondary/15 text-brand-secondary mt-0.5 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Use cases */}
          <div className="flex flex-col gap-6 text-left bg-slate-50 dark:bg-slate-900/30 border border-border-custom rounded-3xl p-8">
            <h3 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-secondary" />
              {details.useCasesTitle}
            </h3>
            <div className="flex flex-col gap-6 mt-2">
              {details.useCases.map((uc, idx) => (
                <div key={idx} className="flex flex-col gap-1 border-l-2 border-l-brand-secondary/40 pl-4">
                  <h4 className="font-bold text-sm text-text-primary">{uc.industry}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mt-0.5">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6. CONVERSION CTA BANNER */}
      <Section background="dark" className="py-16 md:py-20 text-center !bg-gradient-to-b !from-[#001724] !to-[#000a10] text-zinc-100 rounded-3xl mx-6 my-12 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-secondary/10 via-transparent to-transparent pointer-events-none select-none z-0" />
        
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {activeLang === 'sv' ? 'Redo att förstärka ditt projekt?' : 'Ready to reinforce your project?'}
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {activeLang === 'sv'
              ? 'Våra konsulter är tillgängliga för uppdrag i Stockholm, Göteborg och på distans. Kontakta oss idag för ett förutsättningslöst samtal om era behov.'
              : 'Our consultants are available for roles in Stockholm, Gothenburg, and hybrid. Contact us today to discuss your technical and project requirements.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <Link to={contactPath}>
              <Button variant="secondary" size="lg" className="!bg-[#001724] border-white/30 !text-white hover:!bg-[#002536] hover:!border-white/60" rightIcon={<ArrowRight className="w-5 h-5" />}>
                {activeLang === 'sv' ? 'Kontakta oss' : 'Contact us'}
              </Button>
            </Link>
            <Link to={`/${activeLang}/services`}>
              <Button variant="secondary" size="lg" className="!bg-transparent border-white/30 !text-white hover:!bg-white/10 hover:!border-white/60 transition-all duration-200">
                {activeLang === 'sv' ? 'Se alla kompetenser' : 'View all competences'}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ServiceDetail;
