import React from "react";
import { COMMON_SCAMS } from "@/data/mockData";
import { 
  AlertTriangle, 
  Droplets, 
  Wind, 
  Disc, 
  Gauge, 
  ShieldAlert, 
  Zap, 
  Quote, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";

interface CommonScamsSectionProps {
  onOpenUpload: (planId?: string) => void;
}

export const CommonScamsSection: React.FC<CommonScamsSectionProps> = ({ onOpenUpload }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Droplets":
        return <Droplets className="w-5 h-5 text-blue-600" />;
      case "Wind":
        return <Wind className="w-5 h-5 text-cyan-600" />;
      case "Disc":
        return <Disc className="w-5 h-5 text-rose-600" />;
      case "Gauge":
        return <Gauge className="w-5 h-5 text-amber-600" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <section id="common-scams" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-red-100 border border-red-200 text-red-700 rounded-full px-3.5 py-1 text-xs font-semibold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Exposing Dealership Upsells</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            The 6 Most Common Service Center Scams <br className="hidden sm:inline" />
            Pushed on Indian Car Owners
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Service advisors often receive sales targets for chemical treatments and non-OEM accessories. Here is what they say and why you should say NO.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMON_SCAMS.map((scam, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header of card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    {getIcon(scam.iconName)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    {scam.verdict}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{scam.title}</h3>
                  <div className="text-xs font-extrabold text-blue-600 mt-0.5">
                    Typical Cost: {scam.quotedPrice}
                  </div>
                </div>

                {/* Dealer Excuse Quote */}
                <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 text-xs text-amber-900 italic relative">
                  <Quote className="w-3.5 h-3.5 text-amber-500 mb-1" />
                  <p>{scam.dealerExcuse}</p>
                </div>

                {/* Behind the scenes reality */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-600">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">The Reality: </strong>
                      {scam.whyItsPushed}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-700">Doctor's Advice: </strong>
                      {scam.whatYouShouldDo}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Zero impact on warranty</span>
                <button
                  onClick={() => onOpenUpload()}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Verify my bill &rarr;
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

