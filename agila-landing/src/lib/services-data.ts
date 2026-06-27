export interface ServiceData {
  slug: string;
  image: string;
  specs: {
    sv: string[];
    en: string[];
  };
}

export const SERVICES_CONFIG: Record<string, ServiceData> = {
  it: {
    slug: "it",
    image: "/assets/industry-it.jpg",
    specs: {
      sv: [
        "Kravanalytiker",
        "Test management",
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
        "Requirements Analyst",
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
    }
  },
  logistics: {
    slug: "logistics",
    image: "/assets/industry-warehous.jpg",
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
    }
  },
  construction: {
    slug: "construction",
    image: "/assets/industry-construction.jpg",
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
    }
  },
  transport: {
    slug: "transport",
    image: "/assets/industry-transport.jpg",
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
    }
  },
  moving: {
    slug: "moving",
    image: "/assets/industry-moving.jpg",
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
    }
  }
};

export const SERVICES_LIST = Object.values(SERVICES_CONFIG);
