import React, { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import ProjectShowcase from "./components/sections/ProjectShowcase";
import AnimatedSection from "./components/ui/AnimatedSection";
import FAQ from "./components/sections/FAQ";
import StatsBar from "./components/sections/StatsBar";
import SideNav from "./components/layout/SideNav";
import Dashboard from "./components/Dashboard";
import LoaderScreen from "./components/ui/LoaderScreen";
import Onboarding from "./components/Onboarding";
import Features from "./components/sections/Features";
import Reviews from "./components/sections/Reviews";
import AuthRequired from "./components/auth/AuthRequired";
import Login from "./components/auth/Login";


function App() {
  const [loading, setLoading] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
      <div className="relative min-h-screen overflow-hidden bg-black text-white">


  <div className="pointer-events-none fixed inset-0 z-0 ..."></div>

  
      
      

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.20),transparent_35%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_30%)]" />

      <div className="pointer-events-none fixed left-10 top-24 z-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 right-10 z-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

     <div className="relative z-10">
  <Navbar />

        <SideNav />

        <main className="mx-auto w-full max-w-7xl px-5 pb-12 lg:px-8">
          <section id="home">
            <Hero />
          </section>

          <section id="stats" className="mt-8">
            <StatsBar />
          </section>

          <AnimatedSection>
            <section id="features" className="scroll-mt-28">
              <Features />
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="onboarding" className="scroll-mt-28">
              <Onboarding />
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="dashboard" className="scroll-mt-28">
              <Dashboard />
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="projects" className="scroll-mt-28">
              <ProjectShowcase />
            </section>
          </AnimatedSection>

      

          <AnimatedSection>
            <section id="faq" className="scroll-mt-28">
              <FAQ />
            </section>
          </AnimatedSection>

    <AnimatedSection>
  <Reviews />
</AnimatedSection>
       

          <section className="mt-14 rounded-2xl border border-cyan-300/10 bg-white/[0.03] px-5 py-4 text-center text-xs leading-6 text-slate-400">
            AI guidance is general and should be checked with official UK
            sources before making important decisions.
          </section>

          <footer className="py-8 text-center text-sm text-slate-500">
            Built by Anish • AI Student Survival Assistant
          </footer>
        </main>
        {showAuthPopup && <AuthRequired />}
      </div>
    </div>
  );
}

export default App;