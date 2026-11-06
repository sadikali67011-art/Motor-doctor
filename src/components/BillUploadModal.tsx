import React, { useState } from "react";
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  Car, 
  FileText, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  MessageSquare,
  Sparkles,
  PhoneCall
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { POPULAR_CAR_BRANDS, SERVICE_PLANS } from "@/data/mockData";
import { ConsultationRequest } from "@/types";
import { formatINR } from "@/lib/utils";
import { toast } from "sonner";

interface BillUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBrand?: string;
  initialAmount?: number;
  initialPlanId?: string;
}

export const BillUploadModal: React.FC<BillUploadModalProps> = ({
  isOpen,
  onClose,
  initialBrand = "Hyundai",
  initialAmount = 15000,
  initialPlanId = "quick-review"
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ConsultationRequest>({
    fullName: "",
    phoneNumber: "",
    city: "",
    carBrand: initialBrand,
    carModel: "Creta",
    carFuelType: "Petrol",
    carYear: "2021",
    odometerReading: "42000",
    serviceCenterName: "Authorized Dealership",
    estimatedQuotation: initialAmount,
    selectedPlan: initialPlanId,
    notes: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [ticketId, setTicketId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync initial props
  React.useEffect(() => {
    if (initialBrand) {
      setFormData(prev => ({ ...prev, carBrand: initialBrand }));
    }
    if (initialAmount) {
      setFormData(prev => ({ ...prev, estimatedQuotation: initialAmount }));
    }
    if (initialPlanId) {
      setFormData(prev => ({ ...prev, selectedPlan: initialPlanId }));
    }
  }, [initialBrand, initialAmount, initialPlanId]);

  const handleBrandChange = (brand: string) => {
    const brandObj = POPULAR_CAR_BRANDS.find(b => b.name === brand);
    const defaultModel = brandObj && brandObj.models.length > 0 ? brandObj.models[0] : "";
    setFormData(prev => ({
      ...prev,
      carBrand: brand,
      carModel: defaultModel
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} document(s) attached successfully!`);
    }
  };

  const handleSimulateDragDrop = () => {
    const dummyFile = `Service_Estimate_${formData.carBrand}_${Date.now().toString().slice(-4)}.pdf`;
    setUploadedFiles(prev => [...prev, dummyFile]);
    toast.success("Sample bill attached!");
  };

  const selectedPlanDetails = SERVICE_PLANS.find(p => p.id === formData.selectedPlan) || SERVICE_PLANS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
      toast.error("Please fill in your name and phone number");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `MD-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketId(generatedId);

      const newRecord = {
        ...formData,
        id: generatedId,
        billFiles: uploadedFiles.length > 0 ? uploadedFiles : ["Car_Job_Card_Uploaded.jpg"],
        status: "UNDER_REVIEW",
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem("motordoctor_audits") || "[]");
        localStorage.setItem("motordoctor_audits", JSON.stringify([newRecord, ...existing]));
      } catch (err) {
        console.error("Localstorage save error", err);
      }

      setIsSubmitting(false);
      setStep(4); // Confirmation step
      toast.success(`Audit Ticket #${generatedId} generated! Doctor assigned.`);
    }, 600);
  };

  const currentBrandModels = POPULAR_CAR_BRANDS.find(b => b.name === formData.carBrand)?.models || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-3xl border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 relative">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Independent Car Service Bill Review</span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black text-white">
            {step === 4 ? "Audit Assigned to Master Mechanic!" : "Submit Your Estimate for Review"}
          </DialogTitle>
          <DialogDescription className="text-xs text-blue-100 mt-1">
            {step === 4 
              ? "Your bill is currently being analyzed against OEM standards."
              : "Save up to 45% on unnecessary dealer add-ons & inflated labor charges."}
          </DialogDescription>

          {/* Stepper Progress bar */}
          {step < 4 && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/20 text-[11px] font-bold">
              <span className={`px-2 py-0.5 rounded-full ${step >= 1 ? "bg-white text-blue-800" : "bg-blue-800 text-blue-300"}`}>
                1. Vehicle
              </span>
              <span className="text-blue-300">&rarr;</span>
              <span className={`px-2 py-0.5 rounded-full ${step >= 2 ? "bg-white text-blue-800" : "bg-blue-800 text-blue-300"}`}>
                2. Bill Upload
              </span>
              <span className="text-blue-300">&rarr;</span>
              <span className={`px-2 py-0.5 rounded-full ${step >= 3 ? "bg-white text-blue-800" : "bg-blue-800 text-blue-300"}`}>
                3. Plan & Contact
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Vehicle Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand" className="text-xs font-bold text-slate-700">Car Brand</Label>
                  <select
                    id="brand"
                    value={formData.carBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full h-11 px-3 mt-1 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    {POPULAR_CAR_BRANDS.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="model" className="text-xs font-bold text-slate-700">Car Model</Label>
                  {currentBrandModels.length > 0 ? (
                    <select
                      id="model"
                      value={formData.carModel}
                      onChange={(e) => setFormData(p => ({ ...p, carModel: e.target.value }))}
                      className="w-full h-11 px-3 mt-1 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    >
                      {currentBrandModels.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id="model"
                      value={formData.carModel}
                      onChange={(e) => setFormData(p => ({ ...p, carModel: e.target.value }))}
                      placeholder="e.g. Creta / Swift / Nexon"
                      className="mt-1"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-bold text-slate-700">Fuel Type</Label>
                  <select
                    value={formData.carFuelType}
                    onChange={(e) => setFormData(p => ({ ...p, carFuelType: e.target.value as any }))}
                    className="w-full h-11 px-2 mt-1 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">EV</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">Year</Label>
                  <input
                    type="number"
                    min="2005"
                    max="2026"
                    value={formData.carYear}
                    onChange={(e) => setFormData(p => ({ ...p, carYear: e.target.value }))}
                    className="w-full h-11 px-3 mt-1 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">Odometer KM</Label>
                  <input
                    type="text"
                    value={formData.odometerReading}
                    onChange={(e) => setFormData(p => ({ ...p, odometerReading: e.target.value }))}
                    placeholder="e.g. 40,000"
                    className="w-full h-11 px-3 mt-1 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-slate-700">Quoted Estimate Amount (₹)</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    step="500"
                    value={formData.estimatedQuotation}
                    onChange={(e) => setFormData(p => ({ ...p, estimatedQuotation: Number(e.target.value) }))}
                    className="w-full h-11 pl-8 pr-3 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Expected savings: ~{formatINR(Math.round(formData.estimatedQuotation * 0.38))}
                </p>
              </div>

              <div className="pt-3 flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl gap-2"
                >
                  <span>Continue to Bill Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Bill Upload & Symptoms */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-bold text-slate-700 mb-1.5 block">
                  Upload Service Estimate, Job Sheet or WhatsApp Quote:
                </Label>
                <div
                  onClick={handleSimulateDragDrop}
                  className="border-2 border-dashed border-blue-300 hover:border-blue-600 bg-blue-50/40 rounded-2xl p-6 text-center cursor-pointer transition-colors"
                >
                  <UploadCloud className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-800">
                    Click to select photo / PDF file
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clear photos of each page or job card estimate sheet
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-input"
                  />
                </div>

                {/* Uploaded files list */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Attached Files:</span>
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-100 text-xs text-slate-700">
                        <span className="truncate max-w-[280px] font-medium">{file}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-xs font-bold text-slate-700">
                  Any specific sounds, vibrations, or reasons for this visit? (Optional)
                </Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))}
                  placeholder="e.g., Brake squealing at low speed, or Service advisor insisting on changing all 4 shock absorbers..."
                  className="mt-1 text-xs"
                />
              </div>

              <div className="pt-3 flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-xs gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </Button>

                <Button
                  onClick={() => setStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl gap-2"
                >
                  <span>Choose Plan & Contact</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Plan selection and Contact info */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-xs font-bold text-slate-700 mb-1.5 block">
                  Select Consultation Tier:
                </Label>
                <div className="grid grid-cols-3 gap-2.5">
                  {SERVICE_PLANS.map(plan => {
                    const isSelected = formData.selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setFormData(p => ({ ...p, selectedPlan: plan.id }))}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          isSelected
                            ? "bg-blue-50 border-blue-600 ring-2 ring-blue-600 text-blue-950 font-bold"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className="text-xs font-bold truncate">{plan.name}</div>
                        <div className="text-base font-black text-blue-600 mt-0.5">
                          {formatINR(plan.price)}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">
                          {plan.turnaroundTime}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <Label className="text-xs font-bold text-slate-700">Full Name *</Label>
                  <Input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                    placeholder="e.g. Rahul Sharma"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">WhatsApp / Phone Number *</Label>
                  <Input
                    required
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(p => ({ ...p, phoneNumber: e.target.value }))}
                    placeholder="e.g. 9819912166"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold text-slate-700">Your City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                    placeholder="e.g. Mumbai / Delhi NCR"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">Workshop Name</Label>
                  <Input
                    value={formData.serviceCenterName}
                    onChange={(e) => setFormData(p => ({ ...p, serviceCenterName: e.target.value }))}
                    placeholder="e.g. Shivam Hyundai, Andheri"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(2)}
                  className="text-xs gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-7 rounded-xl shadow-md shadow-blue-500/20"
                >
                  {isSubmitting ? "Connecting to Doctor..." : `Start Audit (${formatINR(selectedPlanDetails.price)})`}
                </Button>
              </div>
            </form>
          )}

          {/* STEP 4: Success / Ticket Confirmation Screen */}
          {step === 4 && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tracking Ticket ID
                </span>
                <div className="text-2xl font-black text-slate-900 tracking-wider">
                  #{ticketId}
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Assigned to <strong className="text-slate-900">Chief Auditor Sunil Verma</strong>. Your service estimate of {formatINR(formData.estimatedQuotation)} for {formData.carBrand} {formData.carModel} is under review.
                </p>
              </div>

              {/* Status info box */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" /> Expected Response:
                  </span>
                  <span className="font-extrabold text-blue-700">Within ~20 Minutes</span>
                </div>
                <div className="text-slate-600 leading-relaxed">
                  We are cross-referencing your items with the official OEM Periodic Maintenance Schedule. You will receive an itemized strike-off report on WhatsApp (+91 {formData.phoneNumber}).
                </div>
              </div>

              {/* Instant WhatsApp Connect Button */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/919819912166?text=Hi%20MotorDoctor,%20I%20just%20submitted%20Audit%20Ticket%20%23${ticketId}%20for%20my%20${encodeURIComponent(formData.carBrand)}%20${encodeURIComponent(formData.carModel)}%20(Quoted%20Amount:%20${formData.estimatedQuotation}).%20Please%20review.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="whatsapp" className="w-full h-12 text-sm font-bold rounded-xl gap-2">
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send Bill Direct on WhatsApp (+91 98199 12166)</span>
                  </Button>
                </a>

                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full h-11 text-xs text-slate-600 rounded-xl"
                >
                  Close & Wait for Audit
                </Button>
              </div>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};

