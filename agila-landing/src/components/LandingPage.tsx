"use client";

import Navbar from "./sections/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutBrief from "./sections/AboutBrief";
import ServicesBrief from "./sections/ServicesBrief";
import ArticlesBrief from "./sections/ArticlesBrief";
import WhyAgil from "./sections/WhyAgil";
import Footer from "./sections/Footer";
import FloatingCTA from "./sections/FloatingCTA";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutBrief />
        <ServicesBrief />
        <WhyAgil />
        <ArticlesBrief />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
