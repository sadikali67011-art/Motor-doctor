import React, { useState } from "react";
import { 
  ShieldCheck, 
  UploadCloud, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MessageSquare,
  AlertTriangle,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

interface HeroSectionProps {
  onOpenUpload: (brand?: string, amount?: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenUpload }) => {
  const [selectedBrand, setSelectedBrand] = useState("Hyundai");
  const [quotedAmount, setQuotedAmount] = useState<string>("18500");

  const numAmount = parseInt(quotedAmount, 10) || 0;
  const estimatedSavings = Math.round(numAmount * 0.38);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 hero-glow bg-gradient-to-b from-blue-50/60 via-white to-slate-50 border-b border-slate-200/60">
      {/* Decorative background blur blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/15 via-indigo-400/10 to-teal-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200/80 text-blue-900 rounded-full px-3.5 py-1 text-xs font-semibold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>India's #1 Independent Car Service Bill Audit Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Don't Pay for <span className="text-red-600 underline decoration-red-300 decoration-wavy decoration-2">Bogus</span> Car Repairs.
              <br />
              <span className="gradient-heading">
                Audit Your Service Bill
              </span> Before You Pay.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Authorized service centers routinely pad <strong className="text-slate-900 font-bold">35% to 60% unnecessary add-ons</strong> into your job estimate. Send your estimate to our independent veteran master mechanics — we strike off fake charges and save you <strong className="text-blue-700 font-bold">₹3,000 to ₹18,000</strong> within 30 minutes!
            </p>

            {/* Key benefits tick list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0 text-left text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Line-by-line strike-off of fake items</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero impact on car warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Audited by 15+ yr veteran engineers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Quick WhatsApp report in 20-30 mins</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Button
                size="lg"
                onClick={() => onOpenUpload(selectedBrand, numAmount)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 h-13 px-8 rounded-xl group"
              >
                <span>Upload Estimate for Review</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <a
                href="https://wa.me/919819912166?text=Hi%20MotorDoctor,%20I%20am%20at%20the%20service%20center%20and%20need%20urgent%20review%20of%20my%20car%20estimate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button 
                  size="lg"
                  variant="whatsapp"
                  className="w-full sm:w-auto h-13 px-6 rounded-xl font-bold text-sm gap-2"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>WhatsApp Your Bill Now</span>
                </Button>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 text-slate-600">
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">₹48.5L+</div>
                <div className="text-xs text-slate-500 font-medium">Customer Savings</div>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">8,850+</div>
                <div className="text-xs text-slate-500 font-medium">Bills Audited</div>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 18 Mins
                </div>
                <div className="text-xs text-slate-500 font-medium">Avg Review Time</div>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-500">4.9 ★★★★★</div>
                <div className="text-xs text-slate-500 font-medium">1,420+ Verified Reviews</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Audit Widget */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 space-y-5">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">Quick Bill Estimator</h3>
                    <p className="text-xs text-slate-500">Check how much you could save instantly</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Free Check
                </span>
              </div>

              {/* Form inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Car Brand:
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full h-11 px-3 text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    <option value="Hyundai">Hyundai (Creta, Venue, i20, Verna)</option>
                    <option value="Maruti Suzuki">Maruti Suzuki (Swift, Baleno, Brezza)</option>
                    <option value="Tata Motors">Tata Motors (Nexon, Punch, Harrier)</option>
                    <option value="Mahindra">Mahindra (XUV700, Thar, Scorpio-N)</option>
                    <option value="Kia">Kia (Seltos, Sonet, Carens)</option>
                    <option value="Honda">Honda (City, Amaze, Elevate)</option>
                    <option value="Toyota">Toyota (Innova, Fortuner, Hyryder)</option>
                    <option value="Volkswagen / Skoda">Volkswagen / Skoda (Taigun, Kushaq, Virtus)</option>
                    <option value="Other">Other Car / Luxury Brand</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Workshop Quoted Estimate:
                    </label>
                    <span className="text-xs font-bold text-blue-600">{formatINR(numAmount)}</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      step="500"
                      min="2000"
                      max="200000"
                      value={quotedAmount}
                      onChange={(e) => setQuotedAmount(e.target.value)}
                      className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      placeholder="e.g. 18500"
                    />
                  </div>
                </div>

                {/* Instant savings forecast box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                        Estimated Bogus Charges We Can Cut:
                      </div>
                      <div className="text-2xl font-black text-emerald-700 mt-0.5">
                        {formatINR(estimatedSavings)} <span className="text-xs font-bold text-emerald-600">(~38%)</span>
                      </div>
                    </div>
                    <span className="text-xl">💰</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    Based on 1,840+ audited {selectedBrand} invoices, typically 4 to 7 items (engine flush, unnecessary decarb, caliper lube, cabin sprays) are inflated.
                  </p>
                </div>

                {/* Dropzone trigger */}
                <div
                  onClick={() => onOpenUpload(selectedBrand, numAmount)}
                  className="border-2 border-dashed border-blue-300 hover:border-blue-600 bg-blue-50/40 hover:bg-blue-50/80 rounded-2xl p-4 text-center cursor-pointer transition-colors group"
                >
                  <UploadCloud className="w-8 h-8 text-blue-500 mx-auto group-hover:scale-110 transition-transform mb-1.5" />
                  <p className="text-xs font-bold text-blue-900">
                    Click to attach Bill Photo or Estimate PDF
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Job sheet, WhatsApp quote screenshot, or paper invoice
                  </p>
                </div>

                {/* Primary Button */}
                <Button
                  onClick={() => onOpenUpload(selectedBrand, numAmount)}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/20"
                >
                  Get Doctor Review Now (From ₹499)
                </Button>

                {/* Security and reassurance badge */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    100% Confidential
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    No OEM Conflict
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
