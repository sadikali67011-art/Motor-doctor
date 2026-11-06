import React from "react";
import { SERVICE_PLANS } from "@/data/mockData";
import { formatINR } from "@/lib/utils";
import { Check, Zap, Clock, ShieldCheck, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 rounded-full px-3.5 py-1 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Transparent Consultation Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Choose Your Protection Plan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Our customers save an average of ₹6,400 per service. The consultation fee pays for itself multiple times over!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {SERVICE_PLANS.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all ${
                  isPopular
                    ? "bg-slate-900 text-white shadow-2xl ring-2 ring-blue-600 scale-[1.03] z-10"
                    : "bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-lg"
                }`}
              >
                {/* Popular Pill */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Description */}
                  <div>
                    <h3 className={`text-xl font-black ${isPopular ? "text-white" : "text-slate-900"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-1.5 leading-relaxed ${isPopular ? "text-slate-300" : "text-slate-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pb-4 border-b border-slate-200/40">
                    <span className="text-4xl font-black tracking-tight">
                      {formatINR(plan.price)}
                    </span>
                    <span className={`text-sm line-through ${isPopular ? "text-slate-500" : "text-slate-400"}`}>
                      {formatINR(plan.originalPrice)}
                    </span>
                    <span className={`text-xs font-semibold ${isPopular ? "text-emerald-400" : "text-emerald-600"}`}>
                      Save 50%
                    </span>
                  </div>

                  {/* Turnaround Time */}
                  <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl ${
                    isPopular ? "bg-slate-800 text-blue-300" : "bg-blue-50 text-blue-700"
                  }`}>
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Response: {plan.turnaroundTime}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <div className={`text-xs font-bold uppercase tracking-wider ${isPopular ? "text-slate-400" : "text-slate-500"}`}>
                      What's Included:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs leading-normal">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? "text-emerald-400" : "text-emerald-600"}`} />
                          <span className={isPopular ? "text-slate-200" : "text-slate-700"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best for */}
                  <div className={`p-3 rounded-xl text-[11px] leading-snug border ${
                    isPopular 
                      ? "bg-slate-800/80 border-slate-700 text-slate-300" 
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}>
                    <strong>Best for:</strong> {plan.bestFor}
                  </div>
                </div>

                {/* Card Button */}
                <div className="mt-8 pt-4 space-y-2">
                  <Button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full h-12 rounded-xl font-bold text-sm shadow-md transition-all ${
                      isPopular
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>

                  <a
                    href={`https://wa.me/917534894896?text=Hi%20MotorDoctor,%20I%20want%20to%20book%20the%20${encodeURIComponent(plan.name)}%20plan%20(${formatINR(plan.price)}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full text-xs font-semibold ${
                        isPopular ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-slate-600"
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                      Book via WhatsApp
                    </Button>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Money-Back Guarantee Note */}
        <div className="mt-14 max-w-xl mx-auto text-center p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <p className="text-xs text-slate-700 text-left">
            <strong>100% Value Guarantee:</strong> If our audit does not identify at least double our fee in savings or prevent unnecessary work, we will happily refund your consultation charge.
          </p>
        </div>

      </div>
    </section>
  );
};

