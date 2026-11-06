import React, { useState } from "react";
import { Calculator, Check, X, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

interface ScamCheckItem {
  id: string;
  name: string;
  cost: number;
  category: "Bogus Add-on" | "Overpriced Labor" | "Premature Part";
  recommended: boolean; // true = keep, false = cut
  explanation: string;
}

const DEFAULT_ADDONS: ScamCheckItem[] = [
  {
    id: "eng-flush",
    name: "Engine Flush Chemical Treatment",
    cost: 1650,
    category: "Bogus Add-on",
    recommended: false,
    explanation: "Modern synthetic engine oils have full detergents. Chemical flushes can damage oil seals."
  },
  {
    id: "ac-disinfect",
    name: "AC Evaporator Foam & Disinfection Bomb",
    cost: 1850,
    category: "Bogus Add-on",
    recommended: false,
    explanation: "Dealer spray can that costs ₹120. Just replace the ₹400 cabin filter."
  },
  {
    id: "caliper-grease",
    name: "Brake Caliper Pin Greasing & Spray",
    cost: 850,
    category: "Overpriced Labor",
    recommended: false,
    explanation: "Takes 2 mins during wheel rotation; inflated labor charge."
  },
  {
    id: "throttle-clean",
    name: "Throttle Body & Injector Cleaning",
    cost: 2100,
    category: "Premature Part",
    recommended: false,
    explanation: "Not required before 60,000 km unless engine check light or rough idling is present."
  },
  {
    id: "silencer-coat",
    name: "Silencer Anti-Rust High Temp Coating",
    cost: 1950,
    category: "Bogus Add-on",
    recommended: false,
    explanation: "Stainless steel silencers rust from internal condensation, not outside water."
  },
  {
    id: "disc-skimming",
    name: "Brake Rotor Disc Lathe Skimming",
    cost: 2400,
    category: "Premature Part",
    recommended: false,
    explanation: "Rotors should only be cut if brake shuddering is felt and thickness permits."
  },
  {
    id: "battery-protect",
    name: "Battery Terminal Gel & Distilled Additives",
    cost: 550,
    category: "Bogus Add-on",
    recommended: false,
    explanation: "Petroleum jelly does the same for ₹10; modern batteries are sealed."
  }
];

interface SavingsCalculatorProps {
  onOpenUpload: (planId?: string) => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ onOpenUpload }) => {
  const [baseServiceCost, setBaseServiceCost] = useState<number>(5500); // Genuine oil, filters, basic labor
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "eng-flush",
    "ac-disinfect",
    "caliper-grease",
    "throttle-clean",
    "silencer-coat"
  ]);

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const addonsTotal = DEFAULT_ADDONS.filter((item) =>
    selectedItems.includes(item.id)
  ).reduce((acc, curr) => acc + curr.cost, 0);

  const totalQuotedBill = baseServiceCost + addonsTotal;
  const genuineBill = baseServiceCost;
  const savings = addonsTotal;
  const savingsPercent = totalQuotedBill > 0 ? Math.round((savings / totalQuotedBill) * 100) : 0;

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-400/20 text-blue-400 rounded-full px-3.5 py-1 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Scam Detector</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Calculate How Much Bogus Add-ons <br className="hidden sm:inline" />
            Inflate Your Car Service Bill
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Select the line items written on your service estimate sheet. See which items are genuine maintenance vs dealership upselling.
          </p>
        </div>

        {/* Main interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Checklist of Common Add-ons */}
          <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
              <div>
                <h3 className="font-bold text-base text-white">Select Items Quoted on Your Job Sheet:</h3>
                <p className="text-xs text-slate-400">Click to tick items mentioned by your service advisor</p>
              </div>
              <span className="text-xs font-semibold text-blue-400 bg-blue-900/40 border border-blue-500/30 px-2.5 py-1 rounded-full">
                {selectedItems.length} items flagged
              </span>
            </div>

            <div className="space-y-3">
              {DEFAULT_ADDONS.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-red-950/30 border-red-500/40 shadow-sm"
                        : "bg-slate-800/40 border-slate-700/60 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-red-500 text-white"
                            : "border border-slate-600 bg-slate-700"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-bold ${isSelected ? "text-white" : "text-slate-300"}`}>
                            {item.name}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-700 text-amber-300 border border-slate-600">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-snug">
                          {item.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-extrabold text-white">
                        +{formatINR(item.cost)}
                      </div>
                      <span className="text-[10px] text-red-400 font-semibold">
                        {isSelected ? "Unnecessary" : "Unchecked"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Base Service Cost Slider */}
            <div className="mt-6 pt-5 border-t border-slate-700">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Base Genuine Service (Engine Oil, Oil Filter, Air Filter, Labor):</span>
                <span className="text-blue-400 font-bold text-sm">{formatINR(baseServiceCost)}</span>
              </div>
              <input
                type="range"
                min="2500"
                max="15000"
                step="500"
                value={baseServiceCost}
                onChange={(e) => setBaseServiceCost(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Hatchback (₹2,500)</span>
                <span>Sedan / C-SUV (₹5,500)</span>
                <span>Big SUV / German (₹15,000)</span>
              </div>
            </div>
          </div>

          {/* Right: Savings Breakdown Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-850 border border-blue-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Audit Summary</span>
              </h3>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                Live Analysis
              </span>
            </div>

            {/* Price Compare Table */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-slate-300">
                <span>Dealer Quoted Total:</span>
                <span className="text-base font-bold text-red-400 line-through">
                  {formatINR(totalQuotedBill)}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>Genuine Necessary Cost:</span>
                <span className="text-base font-bold text-blue-400">
                  {formatINR(genuineBill)}
                </span>
              </div>

              <div className="h-px bg-slate-700 my-2" />

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  You Can Save By Rejecting:
                </div>
                <div className="text-3xl font-black text-emerald-300 mt-1">
                  {formatINR(savings)}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  That's <strong className="text-emerald-400">{savingsPercent}% of the entire bill</strong> that is pure dealer upselling!
                </div>
              </div>
            </div>

            {/* Warning Note */}
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
              💡 <strong>Pro Tip:</strong> Service advisors get 10% to 15% incentive on selling chemicals and flush packs. They will tell you it's "company mandatory" — it is NOT!
            </p>

            {/* Call to action */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={() => onOpenUpload()}
                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-500/25 gap-2"
              >
                <span>Upload My Real Bill for Doctor Review</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <a
                href={`https://wa.me/919819912166?text=Hi%20MotorDoctor,%20I%20used%20the%20savings%20calculator%20and%20quoted%20estimate%20is%20${totalQuotedBill}.%20Please%20help%20me%20verify%20my%20bill.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="whatsapp"
                  className="w-full h-11 text-xs font-bold rounded-xl"
                >
                  Share With Doctor on WhatsApp
                </Button>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
