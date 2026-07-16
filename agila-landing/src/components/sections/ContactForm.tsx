"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Send, Check, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SERVICE_OPTIONS,
  getTeamMemberForService,
  getServiceLabelKey,
} from "@/lib/team-data";
import { submitWeb3Form } from "@/lib/forms";
import { useLanguage } from "@/contexts/LanguageContext";

type SubmitStatus = "idle" | "sending" | "success" | "error";

interface ContactFormProps {
  defaultService?: string;
  defaultMessage?: string;
  onServiceChange?: (slug: string) => void;
  lockedService?: boolean;
  specializations?: string[];
  preSelectedSpecs?: string[];
  /** If true, the service dropdown is completely hidden. */
  hideServiceDropdown?: boolean;
  /** If true, the routing badge is hidden. */
  hideRoutingBadge?: boolean;
  /** Set to true by the parent to reveal the custom-role input (e.g. from a "request a custom role" CTA). */
  requestCustomRole?: boolean;
}

export default function ContactForm({
  defaultService = "general",
  defaultMessage = "",
  onServiceChange,
  lockedService = false,
  specializations,
  preSelectedSpecs,
  hideServiceDropdown = false,
  hideRoutingBadge = false,
  requestCustomRole = false,
}: ContactFormProps) {
  const { language, t } = useLanguage();
  const [selectedService, setSelectedService] = useState(defaultService);
  const [message, setMessage] = useState(defaultMessage);
  const [checkedSpecs, setCheckedSpecs] = useState<Set<string>>(new Set());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [customRoleActive, setCustomRoleActive] = useState(requestCustomRole);
  const [customRole, setCustomRole] = useState("");
  const [prevDefaultService, setPrevDefaultService] = useState(defaultService);
  const [prevDefaultMessage, setPrevDefaultMessage] = useState(defaultMessage);
  const [prevPreSelectedSpecs, setPrevPreSelectedSpecs] = useState(preSelectedSpecs);
  const [prevRequestCustomRole, setPrevRequestCustomRole] = useState(requestCustomRole);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const customRoleInputRef = useRef<HTMLInputElement>(null);

  if (defaultService !== prevDefaultService) {
    setPrevDefaultService(defaultService);
    setSelectedService(defaultService);
  }

  if (defaultMessage !== prevDefaultMessage) {
    setPrevDefaultMessage(defaultMessage);
    setMessage(defaultMessage);
  }

  if (preSelectedSpecs !== prevPreSelectedSpecs) {
    setPrevPreSelectedSpecs(preSelectedSpecs);
    if (preSelectedSpecs && preSelectedSpecs.length > 0) {
      setCheckedSpecs(new Set(preSelectedSpecs));
    }
  }

  if (requestCustomRole !== prevRequestCustomRole) {
    setPrevRequestCustomRole(requestCustomRole);
    if (requestCustomRole) {
      setCustomRoleActive(true);
    }
  }

  useEffect(() => {
    if (customRoleActive) {
      customRoleInputRef.current?.focus({ preventScroll: true });
    }
  }, [customRoleActive]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buildSpecsSummary = useCallback((specs: Set<string>) => {
    if (specs.size === 0) return "";
    const prefix = t("contact.form.specsSummaryPrefix");
    const items = Array.from(specs).map((s) => `• ${s}`).join("\n");
    return `\n\n${prefix}\n${items}`;
  }, [t]);

  useEffect(() => {
    if (!specializations || specializations.length === 0) return;
    const baseMsg = defaultMessage || (
      selectedService !== "general"
        ? (language === "sv"
          ? `Hej, jag är intresserad av tjänsten ${t(getServiceLabelKey(selectedService))} och vill gärna få mer information.`
          : `Hello, I am interested in the ${t(getServiceLabelKey(selectedService))} service and would like to receive more information.`)
        : ""
    );
    const specsSummary = buildSpecsSummary(checkedSpecs);
    setMessage(baseMsg + specsSummary);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedSpecs]);

  const assignedMember = useMemo(
    () => getTeamMemberForService(selectedService),
    [selectedService]
  );

  const handleServiceChange = (slug: string) => {
    setSelectedService(slug);
    if (onServiceChange) {
      onServiceChange(slug);
    } else {
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

  const handleToggleSpec = (spec: string) => {
    setCheckedSpecs((prev) => {
      const next = new Set(prev);
      if (next.has(spec)) next.delete(spec);
      else next.add(spec);
      return next;
    });
  };

  const handleToggleAll = () => {
    if (!specializations) return;
    if (checkedSpecs.size === specializations.length) {
      setCheckedSpecs(new Set());
    } else {
      setCheckedSpecs(new Set(specializations));
    }
  };

  const allChecked = specializations ? checkedSpecs.size === specializations.length : false;

  // Summary text for the trigger button
  const triggerLabel = (() => {
    if (checkedSpecs.size === 0) {
      return t("contact.form.selectSpecs");
    }
    if (allChecked) {
      return language === "sv"
        ? `Alla ${specializations!.length} tjänster valda`
        : `All ${specializations!.length} services selected`;
    }
    return language === "sv"
      ? `${checkedSpecs.size} tjänst${checkedSpecs.size > 1 ? "er" : ""} vald${checkedSpecs.size > 1 ? "a" : ""}`
      : `${checkedSpecs.size} service${checkedSpecs.size > 1 ? "s" : ""} selected`;
  })();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return; // honeypot tripped — silently drop
    setStatus("sending");
    const serviceLabel = t(getServiceLabelKey(selectedService));
    const { success } = await submitWeb3Form({
      subject: `${language === "sv" ? "Ny förfrågan via webbplatsen" : "New website enquiry"} – ${serviceLabel}`,
      from_name: "Agil Arbetskraft",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      service: serviceLabel,
      ...(customRole.trim() ? { custom_role: customRole.trim() } : {}),
      message,
    });
    setStatus(success ? "success" : "error");
  };

  const resetForm = () => {
    setStatus("idle");
    setCheckedSpecs(new Set());
    setMessage(defaultMessage);
    setCustomRole("");
    setCustomRoleActive(false);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form w-full">
      {status === "success" ? (
      <motion.div
        className="cf-success"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="cf-success-icon">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="cf-success-title">{t("contact.form.successTitle")}</h3>
        <p className="cf-success-desc">{t("contact.form.successDesc")}</p>
        <button type="button" className="btn btn-secondary" onClick={resetForm}>
          {t("contact.form.sendAnother")}
        </button>
      </motion.div>
      ) : (
      <>
      <input
        type="checkbox"
        name="botcheck"
        className="cf-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid-2-col mb-0">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">
            {t("contact.form.name")}
          </label>
          <input className="form-input" id="contact-name" name="name" type="text" placeholder={t("contact.form.phName")} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">
            {t("contact.form.email")}
          </label>
          <input className="form-input" id="contact-email" name="email" type="email" placeholder={t("contact.form.phEmail")} required />
        </div>
      </div>

      <div className="grid-2-col mb-0">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-company">
            {t("contact.form.company")}
          </label>
          <input className="form-input" id="contact-company" name="company" type="text" placeholder={t("contact.form.phCompany")} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">
            {t("contact.form.phone")}
          </label>
          <input className="form-input" id="contact-phone" name="phone" type="tel" placeholder={t("contact.form.phPhone")} />
        </div>
      </div>

      {/* Service dropdown */}
      {!hideServiceDropdown && (
        <div className="form-group">
          <label className="form-label" htmlFor="contact-service">
            {t("contact.form.service")}
          </label>
          <select
            className={`form-input cp-select${lockedService ? " cp-select-locked" : ""}`}
            id="contact-service"
            value={selectedService}
            onChange={(e) => handleServiceChange(e.target.value)}
            disabled={lockedService}
          >
            {SERVICE_OPTIONS.map((svc) => (
              <option key={svc.slug} value={svc.slug}>{t(svc.labelKey)}</option>
            ))}
          </select>
        </div>
      )}

      {/* Routing Badge */}
      {!hideRoutingBadge && assignedMember && (
        <motion.div
          className="cp-routing-badge"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          key={assignedMember.id}
        >
          <div className="cp-routing-inner">
            <div className="cp-routing-avatar">
              <Image src={assignedMember.image} alt={assignedMember.name} width={44} height={44} className="cp-routing-img" />
            </div>
            <div className="cp-routing-info">
              <span className="cp-routing-name">{assignedMember.name}</span>
              <span className="cp-routing-title">{t(assignedMember.titleKey)}</span>
            </div>
            <span className="cp-routing-label">{t("contact.form.yourContact")}</span>
          </div>
        </motion.div>
      )}

      {/* Multi-select dropdown for specializations */}
      {specializations && specializations.length > 0 && (
        <div className="form-group" ref={dropdownRef}>
          <label className="form-label">
            {t("contact.form.selectSpecs")}
          </label>
          <button
            type="button"
            className={`form-input cp-multiselect-trigger${isDropdownOpen ? " cp-ms-open" : ""}${checkedSpecs.size > 0 ? " cp-ms-active" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="cp-ms-label">{triggerLabel}</span>
            <ChevronDown size={16} className={`cp-ms-chevron${isDropdownOpen ? " cp-ms-chevron-open" : ""}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className="cp-ms-dropdown"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {/* Select all / Clear all */}
                <button type="button" className="cp-ms-item cp-ms-item-all" onClick={handleToggleAll}>
                  <span className={`cp-ms-check${allChecked ? " cp-ms-checked" : ""}`}>
                    {allChecked && <Check size={12} />}
                  </span>
                  <span>{allChecked ? (language === "sv" ? "Rensa alla" : "Clear all") : t("contact.form.selectAll")}</span>
                </button>
                <div className="cp-ms-divider" />

                {/* Spec items */}
                {specializations.map((spec, idx) => {
                  const isChecked = checkedSpecs.has(spec);
                  return (
                    <button key={idx} type="button" className="cp-ms-item" onClick={() => handleToggleSpec(spec)}>
                      <span className={`cp-ms-check${isChecked ? " cp-ms-checked" : ""}`}>
                        {isChecked && <Check size={12} />}
                      </span>
                      <span>{spec}</span>
                    </button>
                  );
                })}

                {/* Custom role entry */}
                <div className="cp-ms-divider" />
                <button
                  type="button"
                  className="cp-ms-item cp-ms-item-all"
                  onClick={() => {
                    setCustomRoleActive(true);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className="cp-ms-plus">＋</span>
                  <span>{t("contact.form.customRoleOption")}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Custom role input */}
      <AnimatePresence initial={false}>
        {customRoleActive && (
          <motion.div
            className="form-group cf-custom-role"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <label className="form-label" htmlFor="contact-custom-role">
              {t("contact.form.customRoleLabel")}
            </label>
            <input
              ref={customRoleInputRef}
              className="form-input cf-custom-role-input"
              id="contact-custom-role"
              type="text"
              placeholder={t("contact.form.customRolePh")}
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
            />
            <span className="cf-custom-role-hint">{t("contact.form.customRoleHint")}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">
          {t("contact.form.message")}
        </label>
        <textarea
          className="form-textarea form-textarea-compact"
          id="contact-message"
          placeholder={t("contact.form.placeholderMsg")}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {status === "error" && (
        <div className="cf-error-banner" role="alert">
          <AlertCircle size={16} />
          <span>{t("contact.form.errorMsg")}</span>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-lg cp-submit-btn"
        disabled={status === "sending"}
      >
        <Send size={16} />
        {status === "sending" ? t("contact.form.sending") : t("contact.btn.sendMsg")}
      </button>
      </>
      )}

      <style jsx global>{`
        .cp-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 44px;
        }

        .cp-select-locked {
          opacity: 0.7;
          cursor: not-allowed;
          background-color: var(--bg-elevated, #f3f4f6);
        }

        .cp-submit-btn { width: 100%; }

        .cp-submit-btn:disabled {
          opacity: 0.65;
          cursor: wait;
          transform: none;
        }

        .cf-honeypot {
          display: none !important;
        }

        /* ─── Custom Role Input ─── */
        .cp-ms-plus {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: 700;
        }

        .cf-custom-role-input {
          border-color: rgba(250, 166, 50, 0.45) !important;
          background: var(--accent-soft);
        }

        .cf-custom-role-hint {
          display: block;
          margin-top: 6px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* ─── Submit Feedback ─── */
        .cf-error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          margin-bottom: 16px;
          border-radius: var(--radius-sm);
          background: rgba(220, 53, 69, 0.08);
          border: 1px solid rgba(220, 53, 69, 0.25);
          color: #c0392b;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .cf-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 8px;
          padding: 48px 24px;
        }

        .cf-success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent-soft);
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .cf-success-title {
          font-family: var(--font-heading);
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cf-success-desc {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          line-height: 1.7;
          max-width: 420px;
          margin-bottom: 16px;
        }

        .form-textarea-compact {
          min-height: 120px !important;
          max-height: 180px;
        }

        /* Tighter spacing inside service page form */
        .cp-form-wrapper .form-group {
          margin-bottom: 14px;
        }

        .cp-form-wrapper .grid-2-col {
          gap: 14px;
        }

        .cp-form-wrapper .cp-routing-badge {
          margin-bottom: 14px;
        }

        /* ─── Multi-Select Trigger ─── */
        .cp-multiselect-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          text-align: left;
          background: var(--bg-input);
        }

        .cp-ms-label {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-muted);
          font-size: 0.9375rem;
        }

        .cp-ms-active .cp-ms-label {
          color: var(--text-primary);
          font-weight: 500;
        }

        .cp-ms-chevron {
          flex-shrink: 0;
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .cp-ms-chevron-open {
          transform: rotate(180deg);
        }

        .cp-ms-open {
          border-color: var(--brand-orange) !important;
          box-shadow: 0 0 0 3px rgba(250, 166, 50, 0.1);
        }

        /* ─── Multi-Select Dropdown ─── */
        .cp-ms-dropdown {
          position: absolute;
          left: 0;
          right: 0;
          margin-top: 4px;
          max-height: 220px;
          overflow-y: auto;
          background: var(--bg-card, #fff);
          border: 1px solid var(--border, #e5e7eb);
          border-radius: var(--radius-md, 8px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          z-index: 50;
        }

        .cp-ms-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          text-align: left;
          padding: 9px 14px;
          font-size: 0.8125rem;
          color: var(--text-primary);
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.12s ease;
        }

        .cp-ms-item:hover {
          background: rgba(250, 166, 50, 0.06);
        }

        .cp-ms-item-all {
          font-weight: 600;
          color: var(--brand-primary);
          font-size: 0.8125rem;
        }

        .cp-ms-divider {
          height: 1px;
          background: var(--border-subtle, #f0f0f0);
        }

        .cp-ms-check {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 2px solid var(--border, #d1d5db);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }

        .cp-ms-checked {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #fff;
        }

        /* Ensure the form-group holding the dropdown has relative positioning */
        .form-group {
          position: relative;
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
