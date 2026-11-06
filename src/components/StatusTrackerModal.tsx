import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, Clock, Car, PhoneCall, AlertCircle } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface StatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatusTrackerModal: React.FC<StatusTrackerModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    // Look in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("motordoctor_audits") || "[]");
      const cleanQ = searchQuery.trim().toLowerCase();
      
      const found = stored.find((item: any) => 
        (item.id && item.id.toLowerCase().includes(cleanQ)) ||
        (item.phoneNumber && item.phoneNumber.includes(cleanQ))
      );

      if (found) {
        setResult(found);
        return;
      }
    } catch (err) {
      console.error(err);
    }

    // If not found in localStorage, simulate active lookup for demo
    if (searchQuery.trim().length > 3) {
      setResult({
        id: searchQuery.toUpperCase().startsWith("MD-") ? searchQuery.toUpperCase() : `MD-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName: "Registered Customer",
        phoneNumber: searchQuery,
        carBrand: "Hyundai",
        carModel: "Creta 1.5",
        estimatedQuotation: 18500,
        status: "UNDER_REVIEW",
        createdAt: new Date().toISOString()
      });
    } else {
      setResult(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 rounded-3xl border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Search className="w-3.5 h-3.5" />
            <span>Audit Tracking Portal</span>
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Track Your Service Bill Review
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Enter your 5-digit Ticket ID (e.g. MD-48219) or WhatsApp mobile number.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSearch} className="flex gap-2 mt-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ticket ID or Mobile Number"
            className="text-xs"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 px-4">
            Track Status
          </Button>
        </form>

        {hasSearched && !result && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs text-center mt-3">
            <AlertCircle className="w-5 h-5 mx-auto mb-1 text-amber-600" />
            No audit found for "{searchQuery}". Please check your Ticket ID or start a new bill review.
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Ticket ID</span>
                <div className="font-extrabold text-sm text-slate-900">{result.id}</div>
              </div>
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3 animate-spin" />
                Under Review
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="font-bold">{result.carBrand} {result.carModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimate Amount:</span>
                <span className="font-bold text-red-600">{formatINR(result.estimatedQuotation)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Expert:</span>
                <span className="font-bold text-blue-600">Sunil Verma (Master Tech)</span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="space-y-2 pt-2 border-t border-slate-200 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Job Sheet Received & Logged</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                <span>Comparing with OEM Periodic Service Schedule</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                <span>WhatsApp Strike-off Checklist Dispatch</span>
              </div>
            </div>

            <a
              href={`https://wa.me/919819912166?text=Hi%20MotorDoctor,%20checking%20status%20for%20Ticket%20${result.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block pt-2"
            >
              <Button variant="whatsapp" size="sm" className="w-full text-xs font-bold gap-1.5">
                Chat With Assigned Doctor on WhatsApp
              </Button>
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

