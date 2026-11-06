import React from "react";
import { Camera, SearchCheck, CheckSquare, Banknote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksSectionProps {
  onOpenUpload: (planId?: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenUpload }) => {
  const steps = [
    {
      step: "01",
      title: "Snap & Upload Estimate",
      time: "Takes 1 Minute",
      description: "Take a photo of your job sheet or workshop estimate paper using your phone, or upload the PDF/WhatsApp quote.",
      icon: <Camera className="w-6 h-6 text-blue-600" />,
      color: "blue"
    },
    {
      step: "02",
      title: "Master Tech Audit",
      time: "Within 20-30 Mins",
      description: "Our certified veteran automotive engineer examines every line item against OEM service manuals and genuine spare part prices.",
      icon: <SearchCheck className="w-6 h-6 text-indigo-600" />,
      color: "indigo"
    },
    {
      step: "03",
      title: "Get Clear Strike-off Checklist",
      time: "Delivered to WhatsApp",
      description: "Receive a simple Red/Yellow/Green list: exactly what must be removed, what can be delayed, and what is safe to approve.",
      icon: <CheckSquare className="w-6 h-6 text-emerald-600" />,
      color: "emerald"
    },
    {
      step: "04",
      title: "Pay Only Genuine Cost",
      time: "Save ₹3,000 - ₹18,000",
      description: "Show our checklist to the service advisor or let our doctor speak directly on a 3-way conference call. Pay only what your car actually needs!",
      icon: <Banknote className="w-6 h-6 text-teal-600" />,
      color: "teal"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 rounded-full px-3.5 py-1 text-xs font-semibold mb-3">
            <span>Fast & Seamless Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            How Motor Doctor Protects You <br className="hidden sm:inline" />
            in 4 Simple Steps
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Designed for car owners waiting right inside service center customer lounges. Fast, stress-free, and straightforward.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="relative bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">
                  {item.step}
                </span>
                <span className="text-[11px] font-bold bg-white text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                  {item.time}
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Learn more &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold">
              Sitting at the workshop right now?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200">
              Don't approve the service estimate before getting an independent second opinion.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => onOpenUpload()}
            className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-7 rounded-xl shadow-md shrink-0 gap-2"
          >
            <span>Upload Your Bill Now</span>
            <ArrowRight className="w-4 h-4 text-blue-900" />
          </Button>
        </div>

      </div>
    </section>
  );
};
