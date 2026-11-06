import React, { useState } from "react";
import { 
  Wrench, 
  Stethoscope, 
  PhoneCall, 
  MessageSquare, 
  Menu, 
  X, 
  ShieldCheck, 
  Search, 
  User, 
  LogIn, 
  LogOut, 
  Activity, 
  MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onOpenUpload: (planId?: string) => void;
  onOpenTrack: () => void;
  onOpenAuth: (defaultTab?: "login" | "register") => void;
  onOpenAdminTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenUpload, 
  onOpenTrack, 
  onOpenAuth,
  onOpenAdminTracker 
}) => {
  const { user, isAuthenticated, logout } = useAuth();
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
            <button
              onClick={onOpenAdminTracker}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold px-2 py-0.5 rounded border border-slate-700 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Visitor Location Tracker</span>
            </button>
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
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-600">
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
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenTrack}
            className="text-xs text-slate-600 hover:text-blue-600 font-medium h-9"
          >
            <Search className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Track Audit
          </Button>

          {/* User Auth state button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {user.fullName.split(" ")[0]}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5 text-red-500" />
                  {user.city || "Member"}
                </span>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenAuth("login")}
              className="text-xs font-bold h-9 gap-1.5 border-slate-300"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-600" />
              <span>Login / Register</span>
            </Button>
          )}

          <a
            href="https://wa.me/919819912166?text=Hi%20MotorDoctor,%20I%20am%20at%20the%20service%20center%20and%20need%20urgent%20review%20of%20my%20car%20estimate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="sm" className="gap-1.5 shadow-sm text-xs h-9">
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </Button>
          </a>

          <Button
            onClick={() => onOpenUpload()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 text-xs font-bold h-9"
          >
            Review My Bill
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          
          {/* Mobile Auth bar */}
          <div className="pb-2 border-b border-slate-100">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-2.5 bg-blue-50/70 rounded-xl">
                <div>
                  <div className="text-xs font-extrabold text-blue-950">Logged in as {user.fullName}</div>
                  <div className="text-[11px] text-slate-500">{user.phoneNumber} • {user.city}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-xs text-red-600">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("login");
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs font-bold"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("register");
                  }}
                  size="sm"
                  className="flex-1 bg-blue-600 text-white text-xs font-bold"
                >
                  Register Free
                </Button>
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              How It Works
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 flex items-center justify-between"
            >
              <span>Savings Calculator & Scam Detector</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Popular</span>
            </a>
            <a 
              href="#common-scams" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              Common Dealer Scams
            </a>
            <a 
              href="#case-studies" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              Real Invoices Saved
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              Audit Plans & Pricing
            </a>
            <a 
              href="#mechanics" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              Meet Master Technicians
            </a>
            <a 
              href="#faqs" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              FAQs
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminTracker();
              }}
              className="w-full text-xs text-emerald-700 bg-emerald-50 border-emerald-200 font-bold gap-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Visitor Location Tracker (Admin)</span>
            </Button>

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
