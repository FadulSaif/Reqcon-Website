"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Facebook, Map } from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const serviceName = searchParams.get("service");
    if (serviceName) {
      setMessage(`I want the ${serviceName} service. Please provide me with more information on how we can proceed.`);
    }
  }, [searchParams]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="contact-form">
      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input className="form-input" id="name" type="text" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="company">Company</label>
          <input className="form-input" id="company" type="text" placeholder="Your Company" required />
        </div>
      </div>
      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input className="form-input" id="email" type="email" placeholder="john@company.com" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input className="form-input" id="phone" type="tel" placeholder="+46 XX XXX XXXX" />
        </div>
      </div>
      <div className="form-group mb-24">
        <label className="form-label" htmlFor="message">How can we help?</label>
        <textarea
          className="form-textarea"
          id="message"
          placeholder="Tell us about your staffing needs..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg w-full hover-lift">
        Send Message
      </button>
    </form>
  );
}

export default function LandingContact() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="contact" className="section landing-contact-section">
      <div className="container-wide">
        <div className="text-center mb-64">
          <span className="eyebrow d-block mb-16">GET IN TOUCH</span>
          <h2 className="heading-xl">Contact Us</h2>
        </div>

        <div className="contact-grid">
          {/* Left Side: Contact Form */}
          <motion.div
            className="contact-form-wrapper glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Suspense fallback={<div className="p-8">Loading form...</div>}>
              <ContactFormInner />
            </Suspense>
          </motion.div>

          {/* Right Side: Contact Information / Map Flip Card */}
          <motion.div
            className={`contact-flip-container ${isFlipped ? "flipped" : ""}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="contact-flipper">
              
              {/* Front Side: Contact Info */}
              <div className="contact-front info-card">
                <h3 className="heading-lg mb-32 text-white">Contact Information</h3>
                <p className="body-lg mb-40 text-white opacity-90">
                  Ready to optimize your workforce? Reach out to our team directly or visit our office.
                </p>

                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon">
                      <MapPin size={24} />
                    </div>
                    <div className="info-text-group">
                      <h4 className="info-label">Head Office</h4>
                      <p className="info-text">Kungsgatan 15, 111 43 Stockholm, Sweden</p>
                      <button 
                        onClick={() => setIsFlipped(true)} 
                        className="btn btn-secondary btn-sm map-btn hover-lift mt-12"
                      >
                        <Map size={16} /> View in Map
                      </button>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="info-label">Email Us</h4>
                      <p className="info-text">
                        <a href="mailto:info@agil.se" className="text-white hover:opacity-80 transition-colors">
                          info@agil.se
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="social-links mt-auto pt-40">
                  <h4 className="info-label mb-16">Follow Us</h4>
                  <div className="social-icons">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn hover-lift">
                      <Linkedin size={24} />
                      <span>LinkedIn</span>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn hover-lift">
                      <Facebook size={24} />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Back Side: Map */}
              <div className="contact-back">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.0390234123515!2d18.06821817743516!3d59.33230621063688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5c48b29f79%3A0xc3317f22312d8a0d!2sKungsgatan%2015%2C%20111%2043%20Stockholm!5e0!3m2!1sen!2sse!4v1716900000000!5m2!1sen!2sse"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map-iframe"
                />
                <button 
                  onClick={() => setIsFlipped(false)} 
                  className="btn btn-primary btn-sm absolute-back-btn hover-lift"
                >
                  Back to Contact Info
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .landing-contact-section {
          background-color: var(--background);
          padding: clamp(80px, 10vw, 120px) 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 60px);
          align-items: stretch;
          min-height: 650px;
        }

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1.2fr 1fr;
          }
        }

        .contact-form-wrapper {
          padding: clamp(32px, 5vw, 48px);
          border-radius: var(--radius-xl);
          background: var(--bg-elevated);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
          z-index: 2;
        }

        /* Form Layout */
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        @media (min-width: 640px) {
          .form-grid-2 {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-textarea {
          min-height: 140px;
          resize: vertical;
        }

        /* 3D Flip Container */
        .contact-flip-container {
          position: relative;
          perspective: 1500px;
          border-radius: var(--radius-xl);
          z-index: 2;
        }

        .contact-flipper {
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
          position: relative;
          min-height: 600px;
        }

        .contact-flip-container.flipped .contact-flipper {
          transform: rotateY(180deg);
        }

        .contact-flip-container.flipped .contact-front {
          pointer-events: none;
        }

        .contact-flip-container:not(.flipped) .contact-back {
          pointer-events: none;
        }

        .contact-front,
        .contact-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        /* Front Styling */
        .contact-front {
          /* Premium dark blue-gray or brand-primary slate */
          background: linear-gradient(145deg, #1A1F2B 0%, #11151D 100%);
          display: flex;
          flex-direction: column;
          padding: clamp(32px, 5vw, 48px);
          transform: rotateY(0deg);
          z-index: 2;
        }

        .contact-front::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(242, 104, 62, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Back Styling */
        .contact-back {
          background: var(--bg-elevated);
          transform: rotateY(180deg);
        }

        .map-iframe {
          filter: grayscale(20%) contrast(1.1);
        }

        .absolute-back-btn {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        /* Info Content */
        .text-white { color: #ffffff !important; }
        .opacity-90 { opacity: 0.9; }
        
        .info-list {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .info-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .info-text-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(242, 104, 62, 0.2);
          color: var(--brand-red-orange);
          flex-shrink: 0;
        }

        .info-label {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
        }

        .info-text {
          font-size: 1.125rem;
          color: #ffffff;
          line-height: 1.5;
        }

        .map-btn {
          background: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }

        .map-btn:hover {
          background: var(--brand-primary) !important;
          border-color: var(--brand-primary) !important;
        }

        /* Socials */
        .social-icons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          transform: translateY(-2px);
        }

        .mt-12 { margin-top: 12px; }
        .mt-auto { margin-top: auto; }
        .pt-40 { padding-top: 40px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-24 { margin-bottom: 24px; }
        .mb-32 { margin-bottom: 32px; }
        .mb-40 { margin-bottom: 40px; }
        .mb-64 { margin-bottom: 64px; }
        .w-full { width: 100%; }
        .d-block { display: block; }
        .text-center { text-align: center; }
        .eyebrow {
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-primary);
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  );
}
