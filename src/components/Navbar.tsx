import React, { useState } from "react";
import { Wrench, Stethoscope, PhoneCall, MessageSquare, Menu, X, ShieldCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenUpload: (planId?: string) => void;
  onOpenTrack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenUpload, onOpenTrack }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top emergency announcement bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center justify-center bg-red-600 text-white rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase animate-pulse">
              Live Garage Helpline
            </span>
            <span>At the dealership right now? Get audit report before signing job sheet!</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <a 
              href="tel:+919819912166" 
              className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span>+91 98199 12166</span>
            </a>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-emerald-400 font-medium">⚡ Avg turnaround: 18 mins</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5 absolute -rotate-12 translate-x-[-2px] translate-y-[-1px] text-blue-200" />
            <Stethoscope className="w-5 h-5 text-white z-10" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Motor<span className="text-blue-600">Doctor</span><span className="text-xs text-slate-400 font-semibold">.in</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-200">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                VERIFIED
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 -mt-0.5">
              Automobile Bill Audit & Scam Shield
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#calculator" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <span>Bill Calculator</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.2 rounded-full">New</span>
          </a>
          <a href="#common-scams" className="hover:text-blue-600 transition-colors">Common Scams</a>
          <a href="#case-studies" className="hover:text-blue-600 transition-colors">Real Cases</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#mechanics" className="hover:text-blue-600 transition-colors">Our Doctors</a>
          <a href="#faqs" className="hover:text-blue-600 transition-colors">FAQs</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenTrack}
            className="text-xs text-slate-600 hover:text-blue-600 font-medium"
          >
            <Search className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Track Audit
          </Button>

          <a
            href="https://wa.me/919819912166?text=Hi%20MotorDoctor,%20I%20am%20at%20the%20service%20center%20and%20need%20urgent%20review%20of%20my%20car%20estimate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="sm" className="gap-1.5 shadow-sm text-xs">
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Audit</span>
            </Button>
          </a>

          <Button
            onClick={() => onOpenUpload()}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 text-xs font-bold"
          >
            Review My Bill
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-2.5 text-sm font-medium text-slate-700">
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              How It Works
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600 flex items-center justify-between"
            >
              <span>Savings Calculator & Scam Detector</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Popular</span>
            </a>
            <a 
              href="#common-scams" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              Common Dealer Scams
            </a>
            <a 
              href="#case-studies" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              Real Invoices Saved
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              Audit Plans & Pricing
            </a>
            <a 
              href="#mechanics" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              Meet Master Technicians
            </a>
            <a 
              href="#faqs" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              FAQs
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrack();
              }}
              className="w-full text-xs"
            >
              <Search className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Track Existing Audit
            </Button>

            <a
              href="https://wa.me/919819912166?text=Hi%20MotorDoctor,%20I%20am%20at%20the%20service%20center%20and%20need%20urgent%20review%20of%20my%20car%20estimate"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="whatsapp" className="w-full gap-2 text-xs">
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Review (+91 98199 12166)</span>
              </Button>
            </a>

            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUpload();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              Upload Service Estimate Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
