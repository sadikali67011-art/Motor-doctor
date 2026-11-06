import React from "react";
import { Wrench, Stethoscope, PhoneCall, Mail, MapPin, MessageSquare, ShieldCheck, Linkedin, Heart } from "lucide-react";

interface FooterProps {
  onOpenUpload: (planId?: string) => void;
  onOpenTrack: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenUpload, onOpenTrack }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md">
                <Wrench className="w-4 h-4 -rotate-12 translate-x-[-1px] text-blue-200" />
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Motor<span className="text-blue-500">Doctor</span><span className="text-xs text-slate-500 font-semibold">.in</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              India's first independent automobile service bill review platform. We empower car owners to avoid bogus add-ons, inflated labor, and fake repairs by connecting them directly with veteran master mechanics.
            </p>

            {/* Founder and LinkedIn badge */}
            <div className="pt-2">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 max-w-sm">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Project Founder</div>
                  <div className="text-xs font-bold text-white">Sadik Ali</div>
                </div>
                <a
                  href="https://www.linkedin.com/in/sadik-ali-75a393294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#0077B5] hover:bg-[#006097] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-white" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> 100% Unbiased Advice
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Zero Dealer Commission</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a></li>
              <li><a href="#calculator" className="hover:text-blue-400 transition-colors">Scam & Savings Calculator</a></li>
              <li><a href="#common-scams" className="hover:text-blue-400 transition-colors">6 Common Dealership Scams</a></li>
              <li><a href="#case-studies" className="hover:text-blue-400 transition-colors">Real Invoices & Proof</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Consultation Plans</a></li>
              <li><a href="#mechanics" className="hover:text-blue-400 transition-colors">Our Master Mechanics</a></li>
            </ul>
          </div>

          {/* Popular Brands Serviced */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Brands We Audit</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Hyundai (Creta, Venue, i20)</li>
              <li>Maruti Suzuki (Swift, Baleno, Brezza)</li>
              <li>Tata Motors (Nexon, Punch, Harrier)</li>
              <li>Mahindra (XUV700, Thar, Scorpio)</li>
              <li>Kia (Seltos, Sonet, Carens)</li>
              <li>Honda, Toyota, VW & Skoda</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li>
                <a href="tel:+917534894896" className="flex items-center gap-2 hover:text-white transition-colors">
                  <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>+91 75348 94896</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/917534894896?text=Hi%20MotorDoctor,%20I%20need%20assistance%20with%20my%20car%20service%20bill." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Support</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sadik-ali-75a393294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5] shrink-0" />
                  <span>Sadik Ali (LinkedIn)</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>support@motordoctor.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Pan-India Service • Support across all Tier 1 & 2 cities</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 text-xs text-slate-500 space-y-4">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> MotorDoctor.in is an independent automotive diagnostic and bill advisory consultation platform. We are not officially affiliated with or endorsed by Maruti Suzuki, Hyundai, Tata Motors, Mahindra, Toyota, Honda, Kia, Volkswagen, or any other automobile manufacturer. All brand names, model names, and trademarks are used strictly for identification purposes. Our advice is based on standard OEM service manuals, professional industry practices, and independent engineering expertise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} Motor Doctor (India). Founded by Sadik Ali. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer" onClick={onOpenTrack}>Track Request</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
