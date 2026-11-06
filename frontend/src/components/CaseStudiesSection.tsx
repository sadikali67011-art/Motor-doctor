import React from "react";
import { REAL_CASE_STUDIES } from "@/data/mockData";
import { formatINR } from "@/lib/utils";
import { TrendingDown, Star, CheckCircle, MapPin, Calendar, FileText } from "lucide-react";

interface CaseStudiesSectionProps {
  onOpenUpload: (planId?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenUpload }) => {
  return (
    <section id="case-studies" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 rounded-full px-3.5 py-1 text-xs font-semibold mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Proven Real Invoices</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Real Car Service Bills Audited & Reduced
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            See actual case studies from vehicle owners across Delhi NCR, Mumbai, Bengaluru, and Pune who saved thousands on dealership invoices.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REAL_CASE_STUDIES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between"
            >
              <div className="space-y-5">
                
                {/* Header: Car model + metadata */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{item.carModel}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {item.year}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {item.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                    {item.serviceType}
                  </span>
                </div>

                {/* Before vs After Price Comparison Box */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Original Estimate</div>
                    <div className="text-base sm:text-lg font-black text-red-500 line-through mt-0.5">
                      {formatINR(item.originalBill)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Final Paid</div>
                    <div className="text-base sm:text-lg font-black text-blue-600 mt-0.5">
                      {formatINR(item.finalPaidBill)}
                    </div>
                  </div>

                  <div className="bg-emerald-100/80 rounded-xl py-1 px-2 border border-emerald-300">
                    <div className="text-[10px] font-bold text-emerald-800 uppercase">Total Saved</div>
                    <div className="text-base sm:text-lg font-black text-emerald-700 mt-0.5">
                      {formatINR(item.totalSaved)}
                    </div>
                  </div>
                </div>

                {/* Items removed */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    Bogus Line Items Struck Off:
                  </h4>
                  <ul className="space-y-1.5">
                    {item.bogusItemsRemoved.map((itemStr, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="text-red-500 font-bold shrink-0">✕</span>
                        <span>{itemStr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer feedback */}
                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/80 text-xs text-slate-700 leading-relaxed italic">
                  "{item.customerFeedback}"
                </div>

              </div>

              {/* Card footer: Customer info + stars */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {item.ownerName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.ownerName}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified Owner
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

