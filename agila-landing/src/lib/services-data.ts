export interface ServiceData {
  slug: string;
  image: string;
  /** Indices into the positional `specs` arrays for roles that get a "most requested" tag. */
  popularSpecs?: number[];
  specs: {
    sv: string[];
    en: string[];
  };
  specDescriptions?: {
    sv: string[];
    en: string[];
  };
  faq?: {
    sv: Array<{ q: string; a: string }>;
    en: Array<{ q: string; a: string }>;
  };
}

export const SERVICES_CONFIG: Record<string, ServiceData> = {
  it: {
    slug: "it",
    image: "/assets/it-team-software-development.jpg",
    popularSpecs: [8, 7, 4],
    specs: {
      sv: [
        "Kravanalytiker",
        "Test Management",
        "Scrum Master",
        "Produktägare",
        "UX/UI",
        "Datasamordnare",
        "Projektingenjör",
        "Projektledning",
        "Systemutveckling",
        "Administration",
        "IT-arkitekt"
      ],
      en: [
        "Business Analyst",
        "Test Management",
        "Scrum Master",
        "Product Owner",
        "UX/UI",
        "Data Coordinator",
        "Project Engineer",
        "Project Management",
        "Software Development",
        "Administration",
        "IT Architect"
      ]
    },
    specDescriptions: {
      sv: [
        "En kravanalytiker kartlägger och dokumenterar verksamhetens behov och omsätter dem till konkreta systemkrav för utvecklingsteam. Vi hjälper dig rekrytera eller bemanna kravanalytiker med erfarenhet från IT-projekt inom privat och offentlig sektor i Sverige.",
        "Testledare och testspecialister ansvarar för att säkerställa kvaliteten i mjukvaruutveckling genom strukturerad testning och riskbaserad kvalitetskontroll. Agil Arbetskraft levererar testexperter med erfarenhet av manuell testning, testautomation och agila arbetsmetoder.",
        "En Scrum Master faciliterar agila team, röjer hinder och ser till att Scrum-processen följs effektivt. Vi rekryterar och bemannar Scrum Masters med dokumenterad erfarenhet av att leda agila team och driva verksamhetsförbättringar i svenska organisationer.",
        "En produktägare prioriterar produktbackloggen och säkerställer att affärsvärdet representeras tydligt gentemot utvecklingsteamet. Vi matchar dig med produktägare som kombinerar stark affärsförståelse med teknisk insikt och som passar din organisations produktstrategi.",
        "UX- och UI-designers skapar digitala upplevelser som är intuitiva att använda och tilltalande att se på. Vi matchar dig med erfarna designers med portfolios från applikationer, e-handel och digitala tjänster på den svenska marknaden.",
        "En datasamordnare hanterar datakvalitet, dataflöden och rapportering för att stödja välgrundade affärsbeslut. Vi levererar kandidater med praktisk erfarenhet av datahantering, BI-verktyg och databaserade beslutsprocesser.",
        "Projektingenjörer stödjer projektledare med teknisk uppföljning, dokumentation och koordinering av IT-leveranser. Vi bemannar projektingenjörer med erfarenhet från komplexa systemleveranser och IT-infrastrukturprojekt.",
        "En IT-projektledare planerar, genomför och levererar tekniska projekt enligt fastställd budget och tidsplan. Vi rekryterar projektledare med certifieringar inom PMP, PRINCE2 eller agila ramverk och med erfarenhet från IT-tunga miljöer i Sverige.",
        "Systemutvecklare och mjukvaruingenjörer bygger, underhåller och förbättrar digitala lösningar och applikationer. Agil Arbetskraft har tillgång till ett brett nätverk av backend-, frontend- och fullstackutvecklare som är verksamma på den svenska arbetsmarknaden.",
        "IT-administratörer hanterar system, nätverk, behörigheter och användarsupport inom organisationens IT-miljö. Vi levererar administrativa IT-specialister för stabila, säkra och välorganiserade driftsmiljöer.",
        "En IT-arkitekt designar och definierar teknisk infrastruktur och lösningsarkitektur för att stödja verksamhetens långsiktiga mål. Vi rekryterar seniora IT-arkitekter med bred teknikerfarenhet och strategisk kompetens anpassad för din organisations behov."
      ],
      en: [
        "A business analyst maps and documents business needs, translating them into concrete system requirements for development teams. We help you recruit or staff business analysts experienced in IT projects across both the private and public sectors in Sweden.",
        "Test managers and test specialists are responsible for ensuring software quality through structured testing and risk-based quality control. Agil Arbetskraft delivers test experts experienced in manual testing, test automation, and agile working methods.",
        "A Scrum Master facilitates agile teams, removes obstacles, and ensures the Scrum process is followed effectively. We recruit and staff Scrum Masters with documented experience leading agile teams and driving continuous improvements in Swedish organisations.",
        "A product owner prioritises the product backlog and ensures business value is clearly represented to the development team. We match you with product owners who combine strong business insight with technical understanding, fitting your organisation's product strategy.",
        "UX and UI designers create digital experiences that are intuitive to use and visually appealing. We match you with experienced designers with portfolios from applications, e-commerce platforms, and digital services in the Swedish market.",
        "A data coordinator manages data quality, data flows, and reporting to support informed business decisions. We deliver candidates with hands-on experience in data management, BI tools, and data-driven decision processes.",
        "Project engineers support project managers with technical follow-up, documentation, and coordination of IT deliveries. We staff project engineers experienced in complex system deliveries and IT infrastructure projects.",
        "An IT project manager plans, executes, and delivers technical projects within agreed budget and timeline. We recruit project managers certified in PMP, PRINCE2, or agile frameworks with experience in IT-intensive environments across Sweden.",
        "Systems developers and software engineers build, maintain, and improve digital solutions and applications. Agil Arbetskraft has access to a broad network of backend, frontend, and full-stack developers active in the Swedish job market.",
        "IT administrators manage systems, networks, user permissions, and support within the organisation's IT environment. We deliver IT administration specialists for stable, secure, and well-organised operational environments.",
        "An IT architect designs and defines technical infrastructure and solution architecture to support the organisation's long-term goals. We recruit senior IT architects with broad technical expertise and strategic capabilities tailored to your organisation's needs."
      ]
    },
    faq: {
      sv: [
        {
          q: "Hur snabbt kan ni leverera IT-personal?",
          a: "För standardroller som testare, junior systemutvecklare och IT-support kan vi vanligtvis presentera kandidater inom 24 till 72 timmar. För specialiserade eller seniora roller, exempelvis IT-arkitekter eller erfarna projektledare, räknar vi normalt med 1 till 2 veckors rekryteringstid."
        },
        {
          q: "Erbjuder ni både bemanning och direktrekrytering inom IT?",
          a: "Ja, vi erbjuder IT-bemanning för tidsbegränsade uppdrag och direktrekrytering för fasta tjänster. Vi kan även hantera hyrköpslösningar där kandidaten utvärderas under en bemanningsperiod innan ett eventuellt fast anställningserbjudande."
        },
        {
          q: "Kan ni hjälpa oss att hitta IT-personal i hela Sverige?",
          a: "Ja, vi arbetar med företag i hela Sverige och har starka kandidatnätverk i Stockholm, Göteborg, Malmö, Uppsala och Linköping. Vi levererar IT-kompetens oavsett var i landet ditt företag verkar."
        },
        {
          q: "Vilka IT-kompetenser har störst efterfrågan i Sverige just nu?",
          a: "Efterfrågan är för närvarande störst på systemutvecklare med erfarenhet av molntjänster, cybersäkerhetsspecialister, data- och AI-kompetenser samt erfarna Scrum Masters och produktägare. Vi håller löpande kontakt med kvalificerade kandidater inom dessa kompetensområden."
        },
        {
          q: "Kan vi anlita en enskild IT-specialist, eller måste vi beställa ett helt team?",
          a: "Vi hjälper dig oavsett om du behöver en enskild specialist för ett kortare uppdrag eller ett komplett projektteam. Det finns inga minimikrav på antalet beställda konsulter eller tjänster."
        }
      ],
      en: [
        {
          q: "How quickly can you deliver IT staff?",
          a: "For standard roles such as testers, junior developers, and IT support, we can typically present candidates within 24 to 72 hours. For specialised or senior roles, such as IT architects or experienced project managers, we normally allow 1 to 2 weeks for the recruitment process."
        },
        {
          q: "Do you offer both staffing and direct recruitment in IT?",
          a: "Yes, we offer IT staffing for time-limited assignments and direct recruitment for permanent positions. We can also handle hire-to-permanent arrangements, where a candidate is evaluated during a staffing period before any permanent employment offer is made."
        },
        {
          q: "Can you help us find IT staff across all of Sweden?",
          a: "Yes, we work with companies across Sweden and have strong candidate networks in Stockholm, Gothenburg, Malmö, Uppsala, and Linköping. We deliver IT expertise regardless of where your company is based."
        },
        {
          q: "Which IT competencies are in highest demand in Sweden right now?",
          a: "Demand is currently highest for systems developers with cloud experience, cybersecurity specialists, data and AI competencies, and experienced Scrum Masters and product owners. We maintain ongoing contact with qualified candidates across these competency areas."
        },
        {
          q: "Can we hire a single IT specialist, or do we need to order a full team?",
          a: "We help you whether you need a single specialist for a short assignment or a complete project team. There are no minimum requirements on the number of consultants or services ordered."
        }
      ]
    }
  },
  logistics: {
    slug: "logistics",
    image: "/assets/industry-warehous.jpg",
    popularSpecs: [0, 4],
    specs: {
      sv: [
        "Lagerarbete och orderplock",
        "Inleverans och varumottagning",
        "Utleverans och expedition",
        "Packning och emballering",
        "Truckkörning",
        "Terminalarbete",
        "Lastning och lossning",
        "Inventering",
        "Returhantering",
        "Teamledning och arbetsledning",
        "Lagerchefer och logistikchefer"
      ],
      en: [
        "Warehouse Work and Order Picking",
        "Inbound Deliveries and Goods Receiving",
        "Outbound Deliveries and Dispatch",
        "Packing and Packaging",
        "Forklift Operation",
        "Terminal Work",
        "Loading and Unloading",
        "Inventory Control",
        "Returns Handling",
        "Team Leadership and Supervision",
        "Warehouse Managers and Logistics Managers"
      ]
    },
    specDescriptions: {
      sv: [
        "Lagerarbetare och orderplockare ansvarar för plock, scanning och färdigställande av kundordrar i lager och distributionscentraler. Vi bemannar erfaren lagerpersonal till svenska e-handels- och logistikföretag, både för löpande drift och vid säsongstoppar.",
        "Personal inom inleverans och varumottagning tar emot, kontrollerar och registrerar inkommande gods mot följesedlar och affärssystem. Vi levererar noggranna medarbetare som säkerställer att lagersaldot stämmer redan från första ledet.",
        "Medarbetare inom utleverans och expedition packar, märker och förbereder gods för transport till kund i rätt tid. Vi bemannar expeditionspersonal som håller hög leveransprecision även under press.",
        "Packare och emballeringspersonal säkerställer att varor förpackas korrekt, skyddat och kostnadseffektivt inför vidare transport. Vi matchar dig med personal som arbetar snabbt utan att tumma på kvaliteten.",
        "Truckförare hanterar motviktstruck, ledstaplare och skjutstativtruck för förflyttning och lagring av gods. Vi bemannar truckförare med giltigt truckkort och dokumenterad erfarenhet från svenska lagermiljöer.",
        "Terminalarbetare sorterar, lastar och hanterar gods i logistik- och fraktterminaler i högt tempo. Vi levererar terminalpersonal till speditörer och transportföretag i hela Sverige.",
        "Personal för lastning och lossning hanterar gods vid lastkajer, containrar och fordon på ett säkert och effektivt sätt. Vi bemannar fysiskt vana medarbetare som känner till gällande arbetsmiljö- och säkerhetsrutiner.",
        "Inventeringspersonal genomför lagerräkning och avstämning för att säkerställa korrekta lagersaldon. Vi tillhandahåller personal för både löpande cykelinventering och stora årsinventeringar.",
        "Medarbetare inom returhantering tar emot, bedömer och registrerar returnerade varor enligt företagets rutiner. Vi bemannar personal som hanterar returflöden snabbt och korrekt, en allt viktigare del av e-handeln.",
        "Team- och arbetsledare planerar det dagliga arbetet, fördelar resurser och driver produktiviteten på lagergolvet. Vi rekryterar ledare med erfarenhet av att leda lagerteam och nå uppsatta mål.",
        "Lager- och logistikchefer ansvarar för hela lagerverksamheten, från bemanning och flöden till budget och leveransprecision. Vi rekryterar erfarna chefer som optimerar logistiken och sänker kostnaderna."
      ],
      en: [
        "Warehouse workers and order pickers are responsible for picking, scanning, and completing customer orders in warehouses and distribution centres. We staff experienced warehouse personnel for Swedish e-commerce and logistics companies, both for ongoing operations and seasonal peaks.",
        "Inbound and goods-receiving staff receive, inspect, and register incoming goods against delivery notes and ERP systems. We supply meticulous employees who ensure inventory accuracy from the very first step.",
        "Outbound and dispatch staff pack, label, and prepare goods for on-time delivery to the customer. We staff dispatch personnel who maintain high delivery precision even under pressure.",
        "Packers and packaging staff ensure goods are packed correctly, protectively, and cost-effectively ahead of onward transport. We match you with staff who work quickly without compromising on quality.",
        "Forklift operators handle counterbalance, reach, and stacker trucks for moving and storing goods. We staff forklift operators with a valid Swedish forklift licence and documented experience in Swedish warehouse environments.",
        "Terminal workers sort, load, and handle goods in logistics and freight terminals at high tempo. We deliver terminal staff to freight forwarders and transport companies across Sweden.",
        "Loading and unloading staff handle goods at loading docks, containers, and vehicles safely and efficiently. We staff physically capable employees who know current work-environment and safety routines.",
        "Inventory staff carry out stock counts and reconciliation to ensure accurate inventory balances. We provide personnel for both ongoing cycle counts and large annual inventories.",
        "Returns-handling staff receive, assess, and register returned goods according to company routines. We staff personnel who handle return flows quickly and accurately, an increasingly important part of e-commerce.",
        "Team leaders and supervisors plan daily work, allocate resources, and drive productivity on the warehouse floor. We recruit leaders experienced in leading warehouse teams and meeting targets.",
        "Warehouse and logistics managers are responsible for the entire warehouse operation, from staffing and flows to budget and delivery precision. We recruit experienced managers who optimise logistics and reduce costs."
      ]
    },
    faq: {
      sv: [
        {
          q: "Hur snabbt kan ni leverera lagerpersonal?",
          a: "För standardroller som lagerarbetare, orderplockare och truckförare kan vi ofta presentera kandidater inom 24 till 72 timmar. Inför kända säsongstoppar som Black Friday och julhandeln rekommenderar vi att planera bemanningen 4 till 6 veckor i förväg."
        },
        {
          q: "Har era truckförare giltiga truckkort?",
          a: "Ja, alla truckförare vi förmedlar har giltigt truckkort enligt svensk standard (TLP10) och behörighet för de trucktyper uppdraget kräver. Vi verifierar behörigheter och erfarenhet innan kandidaten presenteras."
        },
        {
          q: "Kan ni bemanna hela lagerteam, inte bara enstaka personer?",
          a: "Ja, vi bemannar allt från en enskild lagerarbetare till kompletta team med arbetsledare för terminaler och distributionscentraler. Vi skalar bemanningen efter dina volymer."
        },
        {
          q: "Erbjuder ni lagerbemanning i hela Sverige?",
          a: "Ja, vi levererar lager- och logistikpersonal i hela Sverige med särskilt starka nätverk i Stockholm, Göteborg och Malmö samt kring de stora logistiklägena."
        },
        {
          q: "Kan tillfällig lagerpersonal bli fast anställd hos oss?",
          a: "Ja, vi erbjuder hyrköp där du kan utvärdera medarbetaren under en bemanningsperiod innan en eventuell fast anställning. Det är ett tryggt sätt att rekrytera rätt person."
        }
      ],
      en: [
        {
          q: "How quickly can you deliver warehouse staff?",
          a: "For standard roles such as warehouse workers, order pickers, and forklift operators, we can often present candidates within 24 to 72 hours. Ahead of known seasonal peaks like Black Friday and Christmas, we recommend planning staffing 4 to 6 weeks in advance."
        },
        {
          q: "Do your forklift operators hold valid licences?",
          a: "Yes, every forklift operator we place holds a valid forklift licence to the Swedish standard (TLP10) and authorisation for the truck types the assignment requires. We verify authorisations and experience before presenting a candidate."
        },
        {
          q: "Can you staff entire warehouse teams, not just individuals?",
          a: "Yes, we staff everything from a single warehouse worker to complete teams with supervisors for terminals and distribution centres. We scale staffing to your volumes."
        },
        {
          q: "Do you offer warehouse staffing across all of Sweden?",
          a: "Yes, we deliver warehouse and logistics personnel throughout Sweden, with particularly strong networks in Stockholm, Gothenburg, and Malmö and around the major logistics hubs."
        },
        {
          q: "Can temporary warehouse staff become permanent employees with us?",
          a: "Yes, we offer hire-to-permanent arrangements where you can evaluate the employee during a staffing period before any permanent hire. It is a low-risk way to recruit the right person."
        }
      ]
    }
  },
  construction: {
    slug: "construction",
    image: "/assets/industry-construction.jpg",
    popularSpecs: [0, 3],
    specs: {
      sv: [
        "Snickare och träarbetare",
        "Betong och armering",
        "Mark och anläggning",
        "Maskinförare",
        "Målare, golv och plattsättning",
        "Tak och fasad",
        "Rivning och sanering",
        "Montörer",
        "Ställning och håltagning",
        "Arbetsledning och platschefer"
      ],
      en: [
        "Carpenters and Woodworkers",
        "Concrete and Reinforcement",
        "Groundwork and Civil Construction",
        "Machine Operators",
        "Painters, Flooring, and Tiling",
        "Roofing and Facades",
        "Demolition and Remediation",
        "Installers",
        "Scaffolding and Core Drilling",
        "Site Supervisors and Site Managers"
      ]
    },
    specDescriptions: {
      sv: [
        "Snickare och träarbetare utför stommontage, inredningssnickeri och formsättning på bygg- och renoveringsprojekt. Vi bemannar och rekryterar erfarna snickare till byggföretag i hela Sverige, för både ny- och ombyggnation.",
        "Betong- och armeringsarbetare gjuter, armerar och formsätter bärande konstruktioner enligt ritning. Vi levererar yrkesarbetare med erfarenhet av platsgjutning och prefab till svenska byggprojekt.",
        "Mark- och anläggningsarbetare utför schakt, ledningsarbete och markberedning inom infrastruktur och husbyggnad. Vi bemannar anläggningspersonal med rätt yrkes- och säkerhetsutbildning.",
        "Maskinförare kör grävmaskin, hjullastare och andra anläggningsmaskiner på bygg- och anläggningsprojekt. Vi rekryterar maskinförare med giltigt yrkesbevis och dokumenterad erfarenhet.",
        "Målare, golvläggare och plattsättare utför ytskikt och finish med hög kvalitet i både nyproduktion och renovering. Vi matchar dig med yrkesarbetare som levererar ett professionellt slutresultat.",
        "Tak- och fasadmontörer arbetar med tätskikt, plåt, fasadsystem och isolering på höjd. Vi bemannar personal med rätt fallskyddsutbildning och erfarenhet av säkert höghöjdsarbete.",
        "Rivnings- och saneringspersonal utför selektiv rivning, asbestsanering och miljösanering enligt gällande regelverk. Vi levererar certifierad personal för säker hantering av farliga material.",
        "Montörer monterar byggelement, inredning och system på plats enligt anvisningar och ritningar. Vi bemannar noggranna och händiga montörer för olika typer av byggprojekt.",
        "Ställningsbyggare och håltagningspersonal reser byggnadsställningar och utför borrning och sågning i betong och sten. Vi förmedlar personal med rätt utbildning för dessa säkerhetskritiska moment.",
        "Arbetsledare och platschefer planerar, samordnar och leder arbetet på byggarbetsplatsen med ansvar för tid, kvalitet och arbetsmiljö. Vi rekryterar erfarna ledare som håller projekt i tid och inom budget."
      ],
      en: [
        "Carpenters and woodworkers carry out frame construction, interior joinery, and formwork on construction and renovation projects. We staff and recruit experienced carpenters for construction companies across Sweden, for both new builds and renovations.",
        "Concrete and reinforcement workers pour, reinforce, and form load-bearing structures to drawing. We deliver skilled workers experienced in in-situ casting and precast for Swedish construction projects.",
        "Groundwork and civil construction workers carry out excavation, pipework, and site preparation across infrastructure and building projects. We staff civil construction personnel with the right vocational and safety training.",
        "Machine operators run excavators, wheel loaders, and other construction machinery on building and civil projects. We recruit machine operators with a valid vocational certificate and documented experience.",
        "Painters, floor layers, and tilers deliver high-quality surface finishes in both new production and renovation. We match you with skilled workers who deliver a professional end result.",
        "Roofing and facade installers work with waterproofing, sheet metal, facade systems, and insulation at height. We staff personnel with the right fall-protection training and experience in safe work at height.",
        "Demolition and remediation staff carry out selective demolition, asbestos abatement, and environmental remediation in line with current regulations. We deliver certified personnel for the safe handling of hazardous materials.",
        "Installers assemble building elements, fixtures, and systems on site according to instructions and drawings. We staff careful, skilled installers for various types of construction projects.",
        "Scaffolders and core-drilling staff erect scaffolding and carry out drilling and sawing in concrete and stone. We supply personnel with the correct training for these safety-critical tasks.",
        "Supervisors and site managers plan, coordinate, and lead work on the construction site, responsible for schedule, quality, and the work environment. We recruit experienced leaders who keep projects on time and on budget."
      ]
    },
    faq: {
      sv: [
        {
          q: "Vilka certifikat och utbildningar har era byggarbetare?",
          a: "Beroende på roll förmedlar vi personal med ID06, giltig säkerhetsutbildning, yrkesbevis, heta arbeten, fallskydd och maskinförarbevis. Vi verifierar alla intyg innan kandidaten börjar."
        },
        {
          q: "Hur lång framförhållning behöver ni för byggbemanning?",
          a: "För standardroller kan vi ofta leverera inom några dagar. För specialiserade kompetenser som certifierade maskinförare eller saneringspersonal rekommenderar vi 6 till 8 veckors framförhållning."
        },
        {
          q: "Kan ni bemanna både korta och långa byggprojekt?",
          a: "Ja, vi bemannar allt från enstaka dagsuppdrag och säsongstoppar till långa projekt som löper över flera månader eller år. Vi anpassar bemanningen efter projektets faser."
        },
        {
          q: "Tar ni hänsyn till arbetsmiljö och säkerhet?",
          a: "Ja, alla våra byggarbetare har relevant arbetsmiljö- och säkerhetsutbildning och följer arbetsplatsens rutiner. Säkerhet är en förutsättning, inte ett tillval."
        },
        {
          q: "I vilka delar av Sverige arbetar ni med byggbemanning?",
          a: "Vi levererar byggpersonal i hela Sverige, med starka kandidatnätverk i Stockholm, Göteborg, Malmö och övriga tillväxtregioner."
        }
      ],
      en: [
        {
          q: "What certifications and training do your construction workers hold?",
          a: "Depending on the role, we place personnel with ID06, valid safety training, vocational certificates, hot-work permits, fall protection, and machine-operator licences. We verify all credentials before a candidate starts."
        },
        {
          q: "How much lead time do you need for construction staffing?",
          a: "For standard roles we can often deliver within a few days. For specialised competencies such as certified machine operators or remediation staff, we recommend 6 to 8 weeks' lead time."
        },
        {
          q: "Can you staff both short and long construction projects?",
          a: "Yes, we staff everything from single-day assignments and seasonal peaks to long projects running over several months or years. We adapt staffing to the project's phases."
        },
        {
          q: "Do you account for the work environment and safety?",
          a: "Yes, all our construction workers hold relevant work-environment and safety training and follow site routines. Safety is a prerequisite, not an optional extra."
        },
        {
          q: "Which parts of Sweden do you cover for construction staffing?",
          a: "We deliver construction personnel across Sweden, with strong candidate networks in Stockholm, Gothenburg, Malmö, and other growth regions."
        }
      ]
    }
  },
  transport: {
    slug: "transport",
    image: "/assets/industry-transport.jpg",
    popularSpecs: [2, 4],
    specs: {
      sv: [
        "B-chaufförer",
        "C-chaufförer",
        "CE-chaufförer",
        "ADR-chaufförer",
        "Distributionschaufförer",
        "Fjärrchaufförer",
        "Kyl- och frystransport",
        "Anläggnings- och kranbilschaufförer",
        "Budbil & expressleveranser"
      ],
      en: [
        "Category B Drivers",
        "Category C Drivers",
        "Category CE Drivers",
        "ADR Drivers",
        "Distribution Drivers",
        "Long-Distance Drivers",
        "Refrigerated and Frozen Transport",
        "Construction and Crane Truck Drivers",
        "Courier and Express Deliveries"
      ]
    },
    specDescriptions: {
      sv: [
        "B-chaufförer kör lättare fordon för distribution, service och persontransport där behörighet B räcker. Vi bemannar pålitliga chaufförer för budbilar, servicebilar och lättare leveranser i hela Sverige.",
        "C-chaufförer kör lastbil över 3,5 ton för regional distribution och godstransport. Vi rekryterar chaufförer med giltig C-behörighet och YKB för uppdrag hos åkerier och distributörer.",
        "CE-chaufförer kör lastbil med släp och tunga ekipage för fjärr- och regionaltransport. Vi levererar erfarna CE-chaufförer med giltig YKB och digitalt färdskrivarkort.",
        "ADR-chaufförer transporterar farligt gods enligt gällande ADR-regelverk med rätt utbildning och dokumentation. Vi bemannar chaufförer med giltigt ADR-intyg för säkra transporter.",
        "Distributionschaufförer sköter leveranser till butiker, företag och privatpersoner med många stopp per dag. Vi matchar dig med serviceinriktade chaufförer som representerar ditt varumärke väl.",
        "Fjärrchaufförer kör längre sträckor inom Sverige och Norden med krav på planering och uthållighet. Vi rekryterar erfarna fjärrchaufförer som kör säkert och levererar i tid.",
        "Chaufförer inom kyl- och frystransport hanterar temperaturkänsligt gods med krav på obruten kylkedja. Vi bemannar chaufförer med erfarenhet av livsmedels- och läkemedelstransporter.",
        "Anläggnings- och kranbilschaufförer transporterar och lossar tungt material med kran och specialfordon. Vi levererar chaufförer med rätt behörighet, exempelvis kranbevis, för anläggningsuppdrag.",
        "Budbilschaufförer utför snabba express- och samma-dag-leveranser där tid och tillförlitlighet är avgörande. Vi bemannar effektiva chaufförer för e-handelns växande behov av snabba leveranser."
      ],
      en: [
        "Category B drivers operate lighter vehicles for distribution, service, and passenger transport where a B licence is sufficient. We staff reliable drivers for courier vans, service vehicles, and lighter deliveries across Sweden.",
        "Category C drivers operate trucks over 3.5 tonnes for regional distribution and goods transport. We recruit drivers with a valid C licence and Driver CPC (YKB) for assignments at hauliers and distributors.",
        "Category CE drivers operate trucks with trailers and heavy combinations for long-distance and regional transport. We deliver experienced CE drivers with a valid Driver CPC (YKB) and a digital tachograph card.",
        "ADR drivers transport dangerous goods in line with current ADR regulations, with the right training and documentation. We staff drivers with a valid ADR certificate for safe transport.",
        "Distribution drivers handle deliveries to shops, businesses, and private customers with many stops per day. We match you with service-minded drivers who represent your brand well.",
        "Long-distance drivers cover longer routes within Sweden and the Nordics, requiring planning and stamina. We recruit experienced long-distance drivers who drive safely and deliver on time.",
        "Refrigerated and frozen transport drivers handle temperature-sensitive goods that require an unbroken cold chain. We staff drivers experienced in food and pharmaceutical transport.",
        "Construction and crane-truck drivers transport and unload heavy material using cranes and specialised vehicles. We deliver drivers with the right authorisation, such as a crane licence, for construction assignments.",
        "Courier drivers carry out fast express and same-day deliveries where time and reliability are decisive. We staff efficient drivers for e-commerce's growing need for rapid delivery."
      ]
    },
    faq: {
      sv: [
        {
          q: "Har era chaufförer YKB och giltiga förarkort?",
          a: "Ja, alla chaufförer vi förmedlar har relevant körkortsbehörighet, giltig YKB (yrkeskompetensbevis) och digitalt färdskrivarkort. Vi kontrollerar alla behörigheter innan uppdraget startar."
        },
        {
          q: "Kan ni leverera chaufförer för farligt gods (ADR)?",
          a: "Ja, vi bemannar chaufförer med giltigt ADR-intyg för transport av farligt gods. Ange kraven i din förfrågan så matchar vi rätt behörighet."
        },
        {
          q: "Hur snabbt kan ni leverera en chaufför?",
          a: "Vid kortvariga behov, exempelvis sjukfrånvaro, kan vi ofta leverera en chaufför inom 24 timmar. För längre uppdrag rekommenderar vi att höra av sig i god tid."
        },
        {
          q: "Kan ni täcka både kortare vikariat och längre uppdrag?",
          a: "Ja, vi hjälper dig med allt från enstaka dagar och vikariat till längre och löpande chaufförsbehov. Vi anpassar lösningen efter din verksamhet."
        },
        {
          q: "Arbetar ni med åkerier i hela Sverige?",
          a: "Ja, vi samarbetar med åkerier och transportföretag i hela Sverige och har chaufförer tillgängliga i och kring Stockholm, Göteborg och Malmö."
        }
      ],
      en: [
        {
          q: "Do your drivers have Driver CPC (YKB) and valid licences?",
          a: "Yes, every driver we place holds the relevant licence category, a valid Driver CPC (YKB), and a digital tachograph card. We check all authorisations before the assignment starts."
        },
        {
          q: "Can you supply drivers for dangerous goods (ADR)?",
          a: "Yes, we staff drivers with a valid ADR certificate for the transport of dangerous goods. State the requirements in your enquiry and we will match the right authorisation."
        },
        {
          q: "How quickly can you deliver a driver?",
          a: "For short-notice needs such as sick leave, we can often deliver a driver within 24 hours. For longer assignments, we recommend getting in touch in good time."
        },
        {
          q: "Can you cover both short cover and longer assignments?",
          a: "Yes, we help with everything from single days and temporary cover to longer and ongoing driver needs. We adapt the solution to your operation."
        },
        {
          q: "Do you work with hauliers across Sweden?",
          a: "Yes, we partner with hauliers and transport companies throughout Sweden and have drivers available in and around Stockholm, Gothenburg, and Malmö."
        }
      ]
    }
  },
  moving: {
    slug: "moving",
    image: "/assets/industry-moving.jpg",
    popularSpecs: [0, 1],
    specs: {
      sv: [
        "Flyttpersonal",
        "Flyttchaufförer",
        "Packning & flyttlogistik",
        "Montörer",
        "Arbetsledare flytt & montage"
      ],
      en: [
        "Moving Staff",
        "Moving Drivers",
        "Packing and Moving Logistics",
        "Installers",
        "Moving and Assembly Supervisors"
      ]
    },
    specDescriptions: {
      sv: [
        "Flyttpersonal packar, bär och transporterar bohag och inventarier vid privat- och företagsflyttar. Vi bemannar stark och serviceinriktad flyttpersonal som hanterar kundens ägodelar varsamt.",
        "Flyttchaufförer kör flyttbil och ansvarar för säker lastning, transport och leverans av gods. Vi levererar chaufförer med rätt körkortsbehörighet och vana vid flyttuppdrag.",
        "Personal inom packning och flyttlogistik planerar och genomför packning, märkning och samordning av flytten. Vi matchar dig med strukturerade medarbetare som gör flytten smidig och effektiv.",
        "Montörer demonterar och återmonterar möbler, kontorsinredning och utrustning i samband med flytt. Vi bemannar händiga montörer för både hem- och kontorsflyttar.",
        "Arbetsledare inom flytt och montage planerar uppdraget, leder teamet och säkerställer att flytten genomförs i tid. Vi rekryterar erfarna ledare som håller hög kvalitet och nöjda kunder."
      ],
      en: [
        "Moving staff pack, carry, and transport household and office goods during private and corporate moves. We staff strong, service-minded movers who handle customers' belongings with care.",
        "Moving drivers operate the moving vehicle and are responsible for safe loading, transport, and delivery of goods. We deliver drivers with the right licence category and experience of moving assignments.",
        "Packing and moving-logistics staff plan and carry out packing, labelling, and coordination of the move. We match you with organised employees who make the move smooth and efficient.",
        "Installers disassemble and reassemble furniture, office fittings, and equipment in connection with a move. We staff skilled installers for both home and office relocations.",
        "Moving and assembly supervisors plan the assignment, lead the team, and ensure the move is completed on time. We recruit experienced leaders who maintain high quality and satisfied customers."
      ]
    },
    faq: {
      sv: [
        {
          q: "Bemannar ni både privat- och företagsflyttar?",
          a: "Ja, vi bemannar personal för allt från mindre privatflyttar till stora kontors- och verksamhetsflyttar. Vi anpassar teamets storlek efter uppdragets omfattning."
        },
        {
          q: "Kan ni leverera flyttpersonal med kort varsel?",
          a: "Ja, flyttbranschen har ofta snabba behov och vi kan vid behov leverera flyttpersonal med kort varsel. Hör av dig så löser vi bemanningen."
        },
        {
          q: "Ingår montörer som kan montera ned och upp möbler?",
          a: "Ja, vi bemannar montörer som demonterar och återmonterar möbler och inredning som en del av flyttuppdraget."
        },
        {
          q: "Har er flyttpersonal rätt behörighet och utbildning?",
          a: "Personalen vi förmedlar arbetar enligt uppdragsgivarens rutiner och försäkringar. Vi säkerställer att chaufförer har rätt körkortsbehörighet för aktuellt fordon."
        },
        {
          q: "Arbetar ni med flytt och montage i hela Sverige?",
          a: "Ja, vi bemannar flytt- och montagepersonal i hela Sverige med särskilt god tillgänglighet i storstadsregionerna."
        }
      ],
      en: [
        {
          q: "Do you staff both private and corporate moves?",
          a: "Yes, we staff personnel for everything from smaller private moves to large office and business relocations. We adapt the team size to the scope of the assignment."
        },
        {
          q: "Can you deliver moving staff at short notice?",
          a: "Yes, the moving industry often has urgent needs and we can deliver moving staff at short notice when required. Get in touch and we will arrange the staffing."
        },
        {
          q: "Do you include installers who can dismantle and reassemble furniture?",
          a: "Yes, we staff installers who disassemble and reassemble furniture and fittings as part of the moving assignment."
        },
        {
          q: "Does your moving staff have the right authorisation and training?",
          a: "The personnel we place work according to the client's routines and insurance. We ensure drivers hold the correct licence category for the vehicle in question."
        },
        {
          q: "Do you work with moving and assembly across all of Sweden?",
          a: "Yes, we staff moving and assembly personnel throughout Sweden, with particularly good availability in the metropolitan regions."
        }
      ]
    }
  }
};

export const SERVICES_LIST = Object.values(SERVICES_CONFIG);
