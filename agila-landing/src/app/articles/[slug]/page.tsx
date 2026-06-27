"use client";

import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/sections/FloatingCTA";
import Link from "next/link";

// Static data generation for prototype
interface ArticleData {
  title: string;
  category: string;
  date: string;
  heroImage: string;
  author: string;
  content: React.ReactNode;
}
const ARTICLES_DATA: Record<string, ArticleData> = {
  "future-flexible-it-staffing": {
    title: "The Future of Flexible IT Staffing in 2026",
    category: "Technology",
    date: "June 15, 2026",
    heroImage: "/assets/it_staffing_hero.png",
    author: "Elena Rostova, Chief Strategy Officer",
    content: (
      <>
        <p className="lead-text">
          As digital transformation accelerates, companies are moving away from rigid hiring models. The year 2026 has brought unprecedented challenges to the tech sector, demanding not just raw talent, but the ability to scale specialized teams up and down with pinpoint accuracy.
        </p>

        <h2>The End of the Traditional IT Department</h2>
        <p>
          For decades, the standard approach to corporate IT was the monolithic department—a massive, static team of generalists handling everything from password resets to enterprise architecture. Today, that model is failing. The sheer velocity of technological advancement, particularly in artificial intelligence and edge computing, means that holding onto permanent generalists is less effective than deploying temporary specialists.
        </p>
        <p>
          We are seeing a massive shift. Organizations are reducing their core IT headcount by up to 30%, instead choosing to partner with agile staffing agencies to inject high-level expertise exactly when a project demands it. This isn&apos;t downsizing; it&apos;s right-sizing.
        </p>

        <figure className="inline-figure">
          <div className="inline-image-container">
            <Image src="/assets/contact-team.jpg" alt="Agile IT Team collaborating" fill className="inline-img" />
          </div>
          <figcaption>Agile teams can be deployed rapidly to tackle complex infrastructure projects.</figcaption>
        </figure>

        <h2>Artificial Intelligence as a Catalyst</h2>
        <p>
          The integration of AI into enterprise software isn&apos;t just a trend—it&apos;s a fundamental restructuring of business operations. However, the engineers capable of building and maintaining these systems are rare and expensive. A rigid hiring model attempts to secure these engineers full-time, often leading to massive overhead when the heavy lifting of the integration is complete.
        </p>
        <blockquote>
          &quot;Agility is no longer a buzzword. In 2026, it is the fundamental metric of survival. If your workforce cannot pivot in 30 days, your technology will be obsolete in 60.&quot;
        </blockquote>
        <p>
          Flexible IT staffing solves this problem perfectly. Companies can bring in an elite strike team of machine learning engineers for a 6-month sprint. Once the models are trained and integrated, the team rolls off, leaving a lean, permanent operations crew to manage the day-to-day. This optimizes both the budget and the technological output.
        </p>

        <h2>Building the Agile Tech Ecosystem</h2>
        <p>
          How do you transition to this model? It requires a strategic partner. You need an agency that doesn&apos;t just read resumes, but understands technical stacks. At Agila, our IT recruitment division is staffed by former developers and system architects. When a client needs a Kubernetes expert, we don&apos;t send them a general sysadmin—we send exactly what the infrastructure requires.
        </p>
        <p>
          The future belongs to the flexible. As we look toward the end of the decade, the companies that thrive will be those that view their workforce not as a static resource, but as a dynamic, scalable tool.
        </p>
      </>
    )
  },
  "optimizing-warehouse-operations": {
    title: "Optimizing Warehouse Operations with Agile Talent",
    category: "Logistics",
    date: "May 28, 2026",
    heroImage: "/assets/warehouse_agile_hero.png",
    author: "Marcus Lindberg, VP of Industrial Operations",
    content: (
      <>
        <p className="lead-text">
          In today’s hyper-competitive e-commerce landscape, warehouse operations are under relentless pressure to deliver speed, accuracy, and scalability. Peak seasons—such as Black Friday, Cyber Monday, and year-end holidays—often push logistics networks to their limits. During these critical periods, rigid workforce structures can become a major bottleneck, leading to delayed shipments, operational inefficiencies, and employee burnout.
        </p>

        <p>
          To address these challenges, leading logistics centers are turning to <strong>agile talent deployment</strong>—a flexible, responsive workforce strategy designed to dynamically align labor resources with fluctuating demand. This approach is transforming how warehouses operate, enabling them to maintain exceptionally high throughput while preserving workforce well-being.
        </p>

        <h2>The Challenge of Peak Season Volatility</h2>
        <p>
          Warehouse operations are inherently complex, involving inventory management, order picking, packing, sorting, and shipping. During peak periods, order volumes can surge by 2–5x normal levels. Traditional staffing models, which rely on fixed schedules and static roles, struggle to adapt to such rapid changes.
        </p>
        
        <p>Common challenges include:</p>
        <ul>
          <li><strong>Labor shortages</strong> during demand spikes</li>
          <li><strong>Inefficient task allocation</strong>, leading to idle time or overwork</li>
          <li><strong>Bottlenecks in critical zones</strong> such as picking or packing</li>
          <li><strong>Increased error rates</strong> due to fatigue and rushed processes</li>
          <li><strong>Employee burnout and high turnover</strong></li>
        </ul>
        <p>These issues not only impact operational efficiency but also directly affect customer satisfaction and brand reputation.</p>

        <figure className="inline-figure">
          <div className="inline-image-container">
            <Image src="/assets/industry-transport.jpg" alt="Warehouse congestion" fill className="inline-img" />
          </div>
          <figcaption>Surging volumes demand dynamic labor allocation to prevent bottlenecks.</figcaption>
        </figure>

        <h2>What Is Agile Talent Deployment?</h2>
        <p>
          Agile talent deployment refers to a workforce strategy that emphasizes <strong>flexibility, scalability, and responsiveness</strong>. Instead of assigning workers to fixed roles, employees are trained and managed as a dynamic pool of talent that can be redeployed based on real-time operational needs.
        </p>
        
        <p>Key principles include:</p>
        <ul>
          <li><strong>Cross-functional training</strong>: Workers are skilled in multiple tasks</li>
          <li><strong>Real-time workforce allocation</strong>: Labor is shifted dynamically to high-demand areas</li>
          <li><strong>On-demand staffing models</strong>: Temporary or gig workers supplement core teams</li>
          <li><strong>Data-driven decision-making</strong>: Workforce deployment is guided by analytics and forecasting</li>
        </ul>
        <p>This approach mirrors agile methodologies in software development—prioritizing adaptability, continuous improvement, and rapid response to change.</p>

        <h2>How Agile Talent Boosts Warehouse Performance</h2>
        
        <h3>1. Dynamic Resource Allocation</h3>
        <p>
          With agile talent systems, warehouse managers can quickly reassign workers to areas experiencing high demand. For example, if order picking becomes a bottleneck, additional staff can be redirected from less critical tasks.
        </p>
        <blockquote>
          &quot;In logistics, a bottleneck is a death sentence. The ability to drop 50 trained operators into a facility within 48 hours is the ultimate competitive advantage.&quot;
        </blockquote>

        <h3>2. Enhanced Throughput During Spikes</h3>
        <p>
          By scaling labor resources up or down in real time, warehouses can maintain consistent throughput even during extreme demand surges, handling peak volumes without infrastructure expansion and improving service level agreements.
        </p>

        <h3>3. Reduced Bottlenecks</h3>
        <p>
          Agile deployment minimizes congestion in specific operational zones by ensuring that labor supply matches task demand, resulting in smoother end-to-end operations and lower cycle times.
        </p>

        <h3>4. Workforce Resilience and Reduced Burnout</h3>
        <p>
          Rigid systems often overload specific workers while underutilizing others. Agile models distribute workloads more evenly and provide task variety, which lowers physical and mental fatigue and increases job satisfaction.
        </p>

        <h3>5. Improved Accuracy and Quality</h3>
        <p>
          Fatigue and stress are major contributors to operational errors. By maintaining balanced workloads and adequate staffing, agile systems help preserve accuracy, reducing picking and packing errors.
        </p>

        <h2>Enabling Technologies</h2>
        <p>Agile talent deployment is powered by a combination of advanced technologies:</p>
        <ul>
          <li><strong>Workforce Management Systems (WMS):</strong> Track employee performance, availability, and skill sets.</li>
          <li><strong>Real-Time Analytics:</strong> Continuously analyze data to identify bottlenecks and predict surges.</li>
          <li><strong>AI and Machine Learning:</strong> Forecast order volumes and recommend optimal staffing levels.</li>
          <li><strong>Mobile Task Management:</strong> Handheld devices provide workers with real-time updates and task assignments.</li>
        </ul>

        <figure className="inline-figure">
          <div className="inline-image-container">
            <Image src="/assets/industry-warehous.jpg" alt="Advanced WMS in use" fill className="inline-img" />
          </div>
          <figcaption>Modern workforce management systems enable real-time tracking and deployment.</figcaption>
        </figure>

        <h2>Implementation Strategies</h2>
        <p>For organizations looking to adopt agile talent deployment, the following steps are essential:</p>
        <ol>
          <li><strong>Invest in Cross-Training:</strong> Develop a workforce capable of performing multiple roles.</li>
          <li><strong>Build a Flexible Talent Pool:</strong> Incorporate part-time, temporary, or gig workers for peak periods.</li>
          <li><strong>Leverage Data and Forecasting:</strong> Use historical data to anticipate demand.</li>
          <li><strong>Adopt Technology Platforms:</strong> Enable real-time visibility and dynamic task allocation.</li>
          <li><strong>Foster an Agile Culture:</strong> Encourage adaptability and continuous learning.</li>
        </ol>

        <h2>Case Insight: High-Performance Logistics Centers</h2>
        <p>
          Top-performing logistics hubs have demonstrated that agile talent deployment can increase throughput by up to <strong>30–50% during peak periods</strong>, reduce processing time significantly, and maintain high accuracy rates even under pressure.
        </p>

        <h2>Future Outlook & Conclusion</h2>
        <p>
          As e-commerce continues to grow, the need for flexible and resilient warehouse operations will only intensify. Agile talent deployment is expected to evolve further with greater integration of AI-driven orchestration, robot-human collaboration, and an enhanced focus on well-being.
        </p>
        <p>
          Peak seasons no longer have to be synonymous with chaos and inefficiency. By embracing agile talent deployment, warehouses can transform volatility into a competitive advantage. In a world where speed and reliability define success, agility is no longer optional—it is essential.
        </p>
      </>
    )
  },
  "sustainable-practices-construction": {
    title: "Sustainable Practices in Modern Construction",
    category: "Construction",
    date: "April 12, 2026",
    heroImage: "/assets/industry-construction.jpg",
    author: "Jane Doe, Senior Architect",
    content: (
      <>
        <p className="lead-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <h2>Mauris commodo quis imperdiet</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
        </p>
        <blockquote>
          &quot;Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.&quot;
        </blockquote>
        <h2>Ut enim ad minima veniam</h2>
        <p>
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
      </>
    )
  },
  "evolution-commercial-cleaning": {
    title: "The Evolution of Commercial Cleaning Standards",
    category: "Facilities",
    date: "March 05, 2026",
    heroImage: "/assets/industry-cleaning.jpg",
    author: "John Smith, Facilities Manager",
    content: (
      <>
        <p className="lead-text">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2>Sed ut perspiciatis unde omnis</h2>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>
        <figure className="inline-figure">
          <div className="inline-image-container">
            <Image src="/assets/industry-workshop.jpg" alt="Industrial cleaning" fill className="inline-img" />
          </div>
          <figcaption>Et harum quidem rerum facilis est et expedita distinctio.</figcaption>
        </figure>
        <p>
          Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
        </p>
      </>
    )
  }
};

import { use } from "react";

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const article = ARTICLES_DATA[resolvedParams.slug];

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="article-not-found">
          <div className="container text-center">
            <h1>Article Not Found</h1>
            <Link href="/" className="btn btn-primary mt-32">Return Home</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="article-page">
        {/* Article Hero */}
        <header className="article-hero">
          <div className="container-wide">
            <div className="article-hero-content">
              <span className="eyebrow">{article.category} • {article.date}</span>
              <h1 className="article-title-main">{article.title}</h1>
              <p className="article-author">By {article.author}</p>
            </div>
          </div>
          
          <div className="container-wide mt-32">
            <div className="article-hero-image-wrapper">
              <Image 
                src={article.heroImage} 
                alt={article.title} 
                fill 
                priority
                className="article-hero-img"
              />
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="article-body section">
          <div className="container article-content-container">
            <div className="rich-text-content">
              {article.content}
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <FloatingCTA />

      <style jsx global>{`
        .article-page {
          width: 100%;
          background: var(--background);
        }

        .article-not-found {
          padding: 200px 0;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hero */
        .article-hero {
          padding-top: clamp(88px, 10vh, 110px);
          padding-bottom: 40px;
        }

        .article-hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .eyebrow {
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-primary);
          letter-spacing: 0.1em;
          font-size: 0.875rem;
          display: block;
          margin-bottom: 24px;
        }

        .article-title-main {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .article-author {
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .article-hero-image-wrapper {
          position: relative;
          width: 100%;
          height: clamp(300px, 45vh, 500px);
          min-height: 400px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .article-hero-img {
          object-fit: cover;
          object-position: center;
        }

        /* Body Content */
        .article-content-container {
          max-width: 800px; /* Optimal reading width */
          margin: 0 auto;
        }

        .rich-text-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .rich-text-content .lead-text {
          font-size: 1.35rem;
          line-height: 1.6;
          color: var(--text-primary);
          font-weight: 500;
          margin-bottom: 48px;
        }

        .rich-text-content h2 {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 64px;
          margin-bottom: 24px;
          line-height: 1.3;
        }

        .rich-text-content p {
          margin-bottom: 24px;
        }

        .rich-text-content blockquote {
          margin: 48px 0;
          padding: 32px;
          border-left: 4px solid var(--brand-primary);
          background: var(--bg-elevated);
          font-size: 1.5rem;
          font-style: italic;
          line-height: 1.5;
          color: var(--text-primary);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
        }

        .inline-figure {
          margin: 48px 0;
          width: 100%;
        }

        .inline-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 16px;
        }

        .inline-img {
          object-fit: cover;
        }

        .inline-figure figcaption {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          text-align: center;
          font-style: italic;
        }

        .mt-32 { margin-top: 32px; }
      `}</style>
    </>
  );
}
