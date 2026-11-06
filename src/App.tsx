import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { CommonScamsSection } from "@/components/CommonScamsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { PricingSection } from "@/components/PricingSection";
import { MechanicsTeamSection } from "@/components/MechanicsTeamSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { FloatingContactBar } from "@/components/FloatingContactBar";
import { BillUploadModal } from "@/components/BillUploadModal";
import { StatusTrackerModal } from "@/components/StatusTrackerModal";
import { Toaster } from "sonner";

export function App() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<string>("Hyundai");
  const [activeAmount, setActiveAmount] = useState<number>(18500);
  const [activePlanId, setActivePlanId] = useState<string>("quick-review");

  const handleOpenUpload = (brand?: string, amount?: number, planId?: string) => {
    if (brand) setActiveBrand(brand);
    if (amount) setActiveAmount(amount);
    if (planId) setActivePlanId(planId);
    setUploadModalOpen(true);
  };

  const handleSelectPlan = (planId: string) => {
    setActivePlanId(planId);
    setUploadModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-slate-900 pb-16 sm:pb-0">
      <Toaster position="top-center" richColors />
      
      {/* Top sticky navbar */}
      <Navbar
        onOpenUpload={() => handleOpenUpload()}
        onOpenTrack={() => setTrackerModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenUpload={(brand, amount) => handleOpenUpload(brand, amount)}
        />

        {/* How It Works */}
        <HowItWorksSection
          onOpenUpload={() => handleOpenUpload()}
        />

        {/* Interactive Scam Detector / Savings Calculator */}
        <SavingsCalculator
          onOpenUpload={() => handleOpenUpload()}
        />

        {/* 6 Common Scams Pushed by Dealers */}
        <CommonScamsSection
          onOpenUpload={() => handleOpenUpload()}
        />

        {/* Real Customer Case Studies & Saved Invoices */}
        <CaseStudiesSection
          onOpenUpload={() => handleOpenUpload()}
        />

        {/* Pricing & Consultation Plans */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
        />

        {/* Meet Master Technicians */}
        <MechanicsTeamSection />

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenUpload={() => handleOpenUpload()}
        onOpenTrack={() => setTrackerModalOpen(true)}
      />

      {/* Floating Call & WhatsApp Bar */}
      <FloatingContactBar
        onOpenUpload={() => handleOpenUpload()}
      />

      {/* Interactive Bill Upload Modal */}
      <BillUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        initialBrand={activeBrand}
        initialAmount={activeAmount}
        initialPlanId={activePlanId}
      />

      {/* Status Tracker Modal */}
      <StatusTrackerModal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
      />
    </div>
  );
}

export default App;
