import React from "react";
import { EXPERT_MECHANICS } from "@/data/mockData";
import { Award, CheckCircle, Wrench, Shield, Car } from "lucide-react";

export const MechanicsTeamSection: React.FC = () => {
  return (
    <section id="mechanics" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 rounded-full px-3.5 py-1 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Independent Automotive Doctors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Audited by Veteran Master Mechanics, <br className="hidden sm:inline" />
            Not Sales Agents
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Our technical experts have spent 15+ years managing OEM dealership floors and workshops. They know every trick, markup, and shortcut in the trade.
          </p>
        </div>

        {/* Mechanics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {EXPERT_MECHANICS.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Photo & verified badge */}
                <div className="relative mb-4">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md mx-auto"
                  />
                  <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified OEM Tech
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mt-3">
                  <h3 className="font-extrabold text-lg text-slate-900">{doc.name}</h3>
                  <div className="text-xs font-semibold text-blue-600">{doc.title}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{doc.experience}</div>
                </div>

                {/* Background info */}
                <div className="mt-5 space-y-3 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">Background:</span>
                    <span className="font-semibold text-slate-700">{doc.pastCompany}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">Key Expertise:</span>
                    <span className="text-slate-600 leading-relaxed">{doc.specialization}</span>
                  </div>
                </div>
              </div>

              {/* Footer Stat */}
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-800">
                  <Car className="w-3.5 h-3.5 text-blue-600" /> {doc.carsInspected.toLocaleString()}+ Cars Audited
                </span>
                <span className="text-emerald-600 font-bold">Available Today</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
