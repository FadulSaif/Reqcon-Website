import ContactPage from "@/components/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Agil Workforce",
  description:
    "Get in touch with the Agil Arbetskraft team. Whether you need temporary staffing, direct recruitment, or a specialized workforce solution — we're here to help.",
};

export default function Contact() {
  return <ContactPage />;
}
