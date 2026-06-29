"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import {
  SERVICE_OPTIONS,
  getTeamMemberForService,
  getServiceLabelKey,
} from "@/lib/team-data";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactFormProps {
  defaultService?: string;
  defaultMessage?: string;
  onServiceChange?: (slug: string) => void;
}

export default function ContactForm({ defaultService = "general", defaultMessage = "", onServiceChange }: ContactFormProps) {
  const { language, t } = useLanguage();
  const [selectedService, setSelectedService] = useState(defaultService);
  const [message, setMessage] = useState(defaultMessage);
  const [prevDefaultService, setPrevDefaultService] = useState(defaultService);
  const [prevDefaultMessage, setPrevDefaultMessage] = useState(defaultMessage);

  if (defaultService !== prevDefaultService) {
    setPrevDefaultService(defaultService);
    setSelectedService(defaultService);
  }

  if (defaultMessage !== prevDefaultMessage) {
    setPrevDefaultMessage(defaultMessage);
    setMessage(defaultMessage);
  }

  const assignedMember = useMemo(
    () => getTeamMemberForService(selectedService),
    [selectedService]
  );

  const handleServiceChange = (slug: string) => {
    setSelectedService(slug);
    if (onServiceChange) {
      onServiceChange(slug);
    } else {
      // If no external handler, we still pre-fill a basic message
      if (slug !== "general") {
        setMessage(
          language === "sv" 
            ? `Hej, jag är intresserad av tjänsten ${t(getServiceLabelKey(slug))} och vill gärna få mer information.`
            : `Hello, I am interested in the ${t(getServiceLabelKey(slug))} service and would like to receive more information.`
        );
      } else {
        setMessage("");
      }
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="contact-form w-full"
    >
      <div className="grid-2-col mb-0">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">
            {t("contact.form.name")}
          </label>
          <input
            className="form-input"
            id="contact-name"
            type="text"
            placeholder={t("contact.form.phName")}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">
            {t("contact.form.email")}
          </label>
          <input
            className="form-input"
            id="contact-email"
            type="email"
            placeholder={t("contact.form.phEmail")}
            required
          />
        </div>
      </div>

      <div className="grid-2-col mb-0">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-company">
            {t("contact.form.company")}
          </label>
          <input
            className="form-input"
            id="contact-company"
            type="text"
            placeholder={t("contact.form.phCompany")}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">
            {t("contact.form.phone")}
          </label>
          <input
            className="form-input"
            id="contact-phone"
            type="tel"
            placeholder={t("contact.form.phPhone")}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-service">
          {t("contact.form.service")}
        </label>
        <select
          className="form-input cp-select"
          id="contact-service"
          value={selectedService}
          onChange={(e) => handleServiceChange(e.target.value)}
        >
          {SERVICE_OPTIONS.map((svc) => (
            <option key={svc.slug} value={svc.slug}>
              {t(svc.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Routing Badge */}
      {assignedMember && (
        <motion.div
          className="cp-routing-badge"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          key={assignedMember.id}
        >
          <div className="cp-routing-inner">
            <div className="cp-routing-avatar">
              <Image
                src={assignedMember.image}
                alt={assignedMember.name}
                width={44}
                height={44}
                className="cp-routing-img"
              />
            </div>
            <div className="cp-routing-info">
              <span className="cp-routing-name">
                {assignedMember.name}
              </span>
              <span className="cp-routing-title">
                {t(assignedMember.titleKey)}
              </span>
            </div>
            <span className="cp-routing-label">
              {t("contact.form.yourContact")}
            </span>
          </div>
        </motion.div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">
          {t("contact.form.message")}
        </label>
        <textarea
          className="form-textarea"
          id="contact-message"
          placeholder={t("contact.form.placeholderMsg")}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg cp-submit-btn"
      >
        <Send size={16} />
        {t("contact.btn.sendMsg")}
      </button>

      <style jsx global>{`
        .cp-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 44px;
        }

        .cp-submit-btn {
          width: 100%;
        }

        /* ─── Routing Badge ─── */
        .cp-routing-badge {
          overflow: hidden;
          margin-bottom: 20px;
        }
        .cp-routing-inner {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          background: var(--accent-soft);
          border: 1px solid var(--border);
        }
        .cp-routing-avatar {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--brand-primary);
        }
        .cp-routing-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .cp-routing-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }
        .cp-routing-name {
          font-family: var(--font-heading);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .cp-routing-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .cp-routing-label {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brand-primary);
          white-space: nowrap;
        }
      `}</style>
    </form>
  );
}
