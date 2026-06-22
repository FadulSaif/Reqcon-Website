"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";
import { Clock, Briefcase, Settings } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="about-page-wrapper">
        
        {/* Section 1: About Hero (Text separated from image) */}
        <section id="about-hero" className="hero-section">
          <div className="container-wide text-center">
            <motion.div
              className="hero-text-block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="eyebrow d-block mb-16">OUR STORY</span>
              <h1 className="heading-xl mb-24">
                Building Stronger Businesses Through Precision and Trust.
              </h1>
              <p className="body-lg text-secondary mx-auto" style={{ maxWidth: "800px" }}>
                We believe a company’s greatest asset is its people. Agila was founded with a singular mission: to bridge the gap between progressive companies and elite professionals across Sweden.
              </p>
            </motion.div>
          </div>

          <div className="container-wide mt-32">
            <motion.div
              className="hero-image-banner"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Image
                src="/assets/contact-team.jpg"
                alt="Agila Professional Team"
                fill
                priority
                className="hero-image-content"
              />
            </motion.div>
          </div>
        </section>

        {/* Section 2: Vision & History */}
        <section className="about-vision-section section pt-0">
          <div className="container-wide">
            <div className="vision-grid">
              
              {/* Left: Expanded Corporate Story */}
              <motion.div
                className="vision-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h2 className="heading-lg mb-32">
                  Driving Swedish Industry Forward.
                </h2>
                <div className="body-punchy">
                  <p>
                    Since our inception, Agila has operated on a foundational principle: modern business requires a workforce that is not only highly skilled but relentlessly adaptable. The days of static, rigid hiring models are over. Today’s market demands agility.
                  </p>
                  <br />
                  <p>
                    We have positioned ourselves as the premier strategic staffing partner for companies across Sweden. By deeply analyzing the unique operational DNA of every client we serve, we deploy specialized talent that seamlessly integrates into existing teams and immediately accelerates productivity.
                  </p>
                  <br />
                  <p>
                    Whether supporting rapid industrial scaling, executing critical IT deployments, or managing complex logistics, our commitment remains absolute: we deliver the exact expertise you need, precisely when you need it, ensuring your business never misses a beat.
                  </p>
                </div>
              </motion.div>

              {/* Right: Integrated Images */}
              <motion.div
                className="vision-visual"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <div className="vision-image-grid">
                  <div className="vision-img-1 glass-panel">
                    <Image
                      src="/assets/worker-portrait-01.jpg"
                      alt="Agila Professional"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="vision-image"
                    />
                  </div>
                  <div className="vision-img-2 glass-panel">
                    <Image
                      src="/assets/worker-portrait-03.jpg"
                      alt="Agila Worker"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="vision-image"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Section 3: Why Choose Us */}
        <section className="about-pillars-section section section-bg-muted">
          <div className="container-wide">
            <motion.div 
              className="text-center mb-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="heading-lg">Why Choose Us</h2>
              <p className="body-lg text-secondary mx-auto mt-16" style={{ maxWidth: "600px" }}>
                The Right People at the Right Time.
              </p>
            </motion.div>
            
            <div className="pillars-grid">
              <motion.div 
                className="pillar-card glass-panel hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3 }}
              >
                <div className="pillar-icon">
                  <Clock size={32} />
                </div>
                <h3 className="heading-md mb-16">Fast Response Times</h3>
                <p className="body-md text-secondary">
                  We understand that downtime is costly. Our streamlined recruitment processes and extensive talent network allow us to source and deploy qualified professionals rapidly to meet urgent operational demands.
                </p>
              </motion.div>

              <motion.div 
                className="pillar-card glass-panel hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="pillar-icon">
                  <Briefcase size={32} />
                </div>
                <h3 className="heading-md mb-16">Flexible Solutions</h3>
                <p className="body-md text-secondary">
                  Whether you need short-term cover during peak seasons, direct recruitment for key roles, or hire-to-permanent arrangements, our models adapt flawlessly to your business cycle.
                </p>
              </motion.div>

              <motion.div 
                className="pillar-card glass-panel hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="pillar-icon">
                  <Settings size={32} />
                </div>
                <h3 className="heading-md mb-16">Industry Expertise</h3>
                <p className="body-md text-secondary">
                  From construction and warehousing to IT and complex industrial operations, our recruiters possess deep sector-specific knowledge, ensuring precise placements every time.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4: Location & Info */}
        <section className="about-info-section section">
          <div className="container-wide">
            <div className="info-grid">
              
              <motion.div 
                className="info-details"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="heading-lg mb-32">Visit Us</h2>
                
                <div className="info-block mb-32">
                  <h3 className="heading-sm mb-8 text-brand">Address</h3>
                  <p className="body-md text-secondary">
                    Agile Workforce<br />
                    Tullgårdsgatan 10<br />
                    116 68 Stockholm, Sweden
                  </p>
                </div>

                <div className="info-block mb-32">
                  <h3 className="heading-sm mb-8 text-brand">Opening Hours</h3>
                  <ul className="hours-list body-md text-secondary">
                    <li><span>Sunday</span> <span>Closed</span></li>
                    <li><span>Monday - Friday</span> <span>09:00 - 17:00</span></li>
                    <li><span>Saturday</span> <span>Closed</span></li>
                  </ul>
                </div>

                <div className="info-block">
                  <h3 className="heading-sm mb-8 text-brand">Follow Us</h3>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Facebook">Facebook</a>
                    <a href="#" className="social-link" aria-label="LinkedIn">LinkedIn</a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="info-map glass-panel"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <iframe 
                  src="https://maps.google.com/maps?q=Tullgårdsgatan%2010,%20116%2068%20Stockholm,%20Sweden&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: "400px", borderRadius: "calc(var(--radius-lg) - 4px)" }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Agile Workforce Location"
                ></iframe>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* Section 5: Conversion CTA */}
        <section className="about-cta-section">
          {/* Background Image */}
          <div className="cta-bg-image">
            <Image
              src="/assets/industry-warehous.jpg"
              alt="Agila Operations"
              fill
              className="cta-bg-img"
            />
            <div className="cta-overlay" />
          </div>

          <div className="container-wide relative z-10">
            <motion.div 
              className="about-cta-content text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="heading-xl mb-16 text-white">Ready to scale your team?</h2>
              <p className="body-lg mb-40 text-white opacity-80 mx-auto" style={{ maxWidth: "600px" }}>
                Let us handle the recruitment so you can focus on running your business.
              </p>
              <div className="cta-button-group">
                <a href="/services" className="btn btn-primary hover-lift">
                  View Services
                </a>
                <a href="/#contact" className="btn btn-outline hover-lift dark-invert-btn">
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingCTA />

      <style jsx global>{`
        /* Page Level */
        .about-page-wrapper {
          width: 100%;
        }

        /* Hero */
        .hero-section {
          width: 100%;
          background: var(--background);
          padding-top: clamp(100px, 12vh, 120px);
          padding-bottom: clamp(20px, 4vw, 40px);
        }

        .hero-text-block {
          padding: 0 16px;
        }

        .mt-32 { margin-top: 32px; }

        .hero-image-banner {
          position: relative;
          width: 100%;
          height: 60vh;
          min-height: 400px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .hero-image-content {
          object-fit: cover;
          object-position: center;
        }

        .eyebrow {
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-primary);
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }

        .mb-8 { margin-bottom: 8px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-24 { margin-bottom: 24px; }
        .mb-32 { margin-bottom: 32px; }
        .mb-40 { margin-bottom: 40px; }

        .d-block { display: block; }
        .text-center { text-align: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-white { color: #ffffff !important; }
        .text-brand { color: var(--brand-primary); }
        .opacity-80 { opacity: 0.8; }
        .relative { position: relative; }
        .z-10 { z-index: 10; }

        /* Vision Section */
        .pt-0 { padding-top: 0 !important; }

        .vision-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 60px);
          align-items: center;
        }

        @media (min-width: 1024px) {
          .vision-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .vision-content {
          max-width: 600px;
        }

        .body-punchy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .vision-visual {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .vision-image-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          max-width: 500px;
        }

        .vision-img-1,
        .vision-img-2 {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding: 0;
        }

        .vision-img-2 {
          transform: translateY(32px);
        }

        .vision-image {
          object-fit: cover;
        }

        /* Pillars Section */
        .section {
          padding: clamp(60px, 6vw, 80px) 0; /* Reduced white space */
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .pillars-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .pillar-card {
          padding: 32px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
        }

        .pillar-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          background: rgba(242, 104, 62, 0.1);
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        /* Info & Location Section */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: flex-start;
        }

        @media (min-width: 1024px) {
          .info-grid {
            grid-template-columns: 1fr 1.5fr;
          }
        }

        .info-details {
          max-width: 400px;
        }

        .hours-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .hours-list li {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }

        .hours-list li:last-child {
          border-bottom: none;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          color: var(--text-primary);
          font-weight: 500;
          text-decoration: underline;
          text-decoration-color: transparent;
          transition: all 0.2s ease-in-out;
        }

        .social-link:hover {
          color: var(--brand-primary);
          text-decoration-color: var(--brand-primary);
        }

        .info-map {
          width: 100%;
          height: 100%;
          min-height: 400px;
          padding: 8px; /* Frame around map */
        }

        /* CTA Section */
        .about-cta-section {
          position: relative;
          padding: clamp(80px, 10vw, 120px) 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cta-bg-image {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .cta-bg-img {
          object-fit: cover;
          object-position: center;
        }

        .cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(17, 17, 19, 0.9) 0%, rgba(17, 17, 19, 0.7) 100%);
        }

        .about-cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-button-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        @media (min-width: 640px) {
          .cta-button-group {
            flex-direction: row;
            gap: 24px;
          }
        }

        .dark-invert-btn {
          border-color: rgba(255, 255, 255, 0.4) !important;
          color: #FAFAFA !important;
        }
        
        .dark-invert-btn:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: #FAFAFA !important;
        }
      `}</style>
    </>
  );
}
