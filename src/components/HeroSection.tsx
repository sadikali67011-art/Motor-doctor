import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  UploadCloud, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MessageSquare,
  AlertTriangle,
  Car,
  MapPin,
  Linkedin,
  UserCheck,
  UserPlus,
  LogIn,
  Eye,
  EyeOff,
  Navigation,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { getLiveGPSLocation, VisitorLocation } from "@/services/visitorTracking";
import { toast } from "sonner";
import { POPULAR_CAR_BRANDS } from "@/data/mockData";

interface HeroSectionProps {
  onOpenUpload: (brand?: string, amount?: number) => void;
  onOpenAdminTracker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenUpload, onOpenAdminTracker }) => {
  const { user, isAuthenticated, login, register, logout } = useAuth();
  
  // Right card tab: "register" | "login" | "estimate"
  const [activeTab, setActiveTab] = useState<"register" | "login" | "estimate">("register");

  // Live Location State
  const [liveLocation, setLiveLocation] = useState<VisitorLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Quick Registration Form State
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regCarBrand, setRegCarBrand] = useState("Hyundai");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);

  // Quick Login Form State
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Quick Estimate State
  const [selectedBrand, setSelectedBrand] = useState("Hyundai");
  const [quotedAmount, setQuotedAmount] = useState<string>("18500");

  const numAmount = parseInt(quotedAmount, 10) || 0;
  const estimatedSavings = Math.round(numAmount * 0.38);

  // Automatically fetch live GPS location on mount
  useEffect(() => {
    fetchLiveLocation();
  }, []);

  const fetchLiveLocation = async () => {
    setIsLocating(true);
    try {
      const loc = await getLiveGPSLocation();
      setLiveLocation(loc);
      if (loc.city && !regCity) {
        setRegCity(loc.city);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLocating(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regPassword) {
      toast.error("Please fill Name, WhatsApp Mobile, and Password");
      return;
    }

    setIsSubmittingReg(true);
    const success = await register({
      fullName: regName,
      phoneNumber: regPhone,
      password: regPassword,
      city: regCity || liveLocation?.city || "India",
      carBrand: regCarBrand,
      carModel: "Car"
    });
    setIsSubmittingReg(false);

    if (success) {
      toast.success("Account registered! You can now upload your bill.");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone.trim() || !loginPassword) {
      toast.error("Please enter your Phone/Email and Password");
      return;
    }

    setIsSubmittingLogin(true);
    const success = await login(loginPhone, loginPassword);
    setIsSubmittingLogin(false);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-16 hero-glow bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/60">
      
      {/* Decorative background blur blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-400/15 via-indigo-400/10 to-teal-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Top Bar Banner: Live Detected Location & Founder LinkedIn Profile */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xs">
          
          {/* Live Location Pill */}
          <div className="flex items-center gap-2 text-xs">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              Live Visitor Location:
            </span>
            {liveLocation ? (
              <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200 flex items-center gap-1">
                {liveLocation.city}, {liveLocation.region}
                {liveLocation.latitude && (
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                    ({liveLocation.latitude.toFixed(2)}°, {liveLocation.longitude?.toFixed(2)}°)
                  </span>
                )}
              </span>
            ) : (
              <span className="text-slate-500 italic flex items-center gap-1">
                {isLocating ? "Detecting GPS live..." : "India"}
              </span>
            )}
            <button
              onClick={fetchLiveLocation}
              title="Refresh Live Location"
              className="text-[11px] text-blue-600 hover:text-blue-800 underline font-semibold ml-1 cursor-pointer"
            >
              Update GPS
            </button>
          </div>

          {/* Founder Profile & LinkedIn link */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="font-semibold text-slate-700">Project Lead & Founder:</span>
              <strong className="text-slate-900 font-bold">Sadik Ali</strong>
            </div>

            <a
              href="https://www.linkedin.com/in/sadik-ali-75a393294"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#0077B5] hover:bg-[#006097] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs transition-transform hover:scale-105"
            >
              <Linkedin className="w-3.5 h-3.5 fill-white" />
              <span>LinkedIn Profile</span>
            </a>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Value Proposition & Information */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200/80 text-blue-900 rounded-full px-3.5 py-1 text-xs font-semibold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Independent Car Service Bill Review Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Don't Pay for <span className="text-red-600 underline decoration-red-300 decoration-wavy decoration-2">Bogus</span> Car Repairs.
              <br />
              <span className="gradient-heading">
                Audit Your Service Bill
              </span> Before You Pay.
            </h1>

            {/* Subtitle */}
            <p className="text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Dealerships routinely pad <strong className="text-slate-900 font-bold">35% to 60% unnecessary add-ons</strong> into your job estimate. Send your estimate to our independent veteran master mechanics — we strike off fake charges and save you <strong className="text-blue-700 font-bold">₹3,000 to ₹18,000</strong> within 30 minutes!
            </p>

            {/* Key benefits tick list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-w-xl mx-auto lg:mx-0 text-left text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Line-by-line strike-off of fake items</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero impact on manufacturer warranty</span>
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
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <Button
                size="lg"
                onClick={() => onOpenUpload(selectedBrand, numAmount)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 h-12 px-7 rounded-xl group"
              >
                <span>Upload Estimate for Review</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <a
                href="https://wa.me/917534894896?text=Hi%20MotorDoctor,%20I%20am%20at%20the%20service%20center%20and%20need%20urgent%20review%20of%20my%20car%20estimate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button 
                  size="lg"
                  variant="whatsapp"
                  className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold text-xs sm:text-sm gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Instant WhatsApp Review</span>
                </Button>
              </a>

              <Button
                size="lg"
                variant="outline"
                onClick={onOpenAdminTracker}
                className="w-full sm:w-auto h-12 px-5 rounded-xl font-bold text-xs gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span>View Live Tracker</span>
              </Button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-8 text-slate-600">
              <div>
                <div className="text-xl font-black text-slate-900">₹48.5L+</div>
                <div className="text-[11px] text-slate-500 font-medium">Customer Savings</div>
              </div>
              <div className="w-px h-7 bg-slate-200 hidden sm:block" />
              <div>
                <div className="text-xl font-black text-slate-900">8,850+</div>
                <div className="text-[11px] text-slate-500 font-medium">Bills Audited</div>
              </div>
              <div className="w-px h-7 bg-slate-200 hidden sm:block" />
              <div>
                <div className="text-xl font-black text-emerald-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 18 Mins
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Avg Review Time</div>
              </div>
              <div className="w-px h-7 bg-slate-200 hidden sm:block" />
              <div>
                <div className="text-xl font-black text-amber-500">4.9 ★★★★★</div>
                <div className="text-[11px] text-slate-500 font-medium">1,420+ Reviews</div>
              </div>
            </div>

          </div>

          {/* Right Column: TOP DIRECT REGISTRATION / LOGIN & ESTIMATE CARD */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl border-2 border-blue-500/30 shadow-2xl overflow-hidden">
              
              {/* Card Top Banner with Tabs */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Instant Access Portal
                  </span>
                  {liveLocation && (
                    <span className="text-[10px] bg-blue-900/60 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                      📍 {liveLocation.city}
                    </span>
                  )}
                </div>

                {/* 3 Interactive Tabs right at the top */}
                <div className="grid grid-cols-3 gap-1 bg-blue-950/60 p-1 rounded-xl border border-blue-400/20 text-xs font-bold">
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                      activeTab === "register" ? "bg-white text-blue-900 shadow-sm" : "text-blue-200 hover:text-white"
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("login")}
                    className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                      activeTab === "login" ? "bg-white text-blue-900 shadow-sm" : "text-blue-200 hover:text-white"
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("estimate")}
                    className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                      activeTab === "estimate" ? "bg-white text-blue-900 shadow-sm" : "text-blue-200 hover:text-white"
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Bill Check</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                
                {/* LOGGED IN USER PROFILE STATE */}
                {isAuthenticated && user ? (
                  <div className="space-y-4 py-2">
                    <div className="flex items-center gap-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                      <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">
                          Welcome, {user.fullName}!
                        </div>
                        <div className="text-xs text-slate-500">
                          📞 +91 {user.phoneNumber} • {user.city}
                        </div>
                        {user.carBrand && (
                          <div className="text-[11px] font-semibold text-blue-700">
                            🚗 {user.carBrand} {user.carModel}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-slate-700 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>Live Location Verified:</span>
                      </div>
                      <p>
                        Your consultations are linked to <strong>{liveLocation?.city || user.city || "India"}</strong> for localized spare-part rate checks.
                      </p>
                    </div>

                    <Button
                      onClick={() => onOpenUpload(user.carBrand || selectedBrand, numAmount)}
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md"
                    >
                      Upload Car Estimate for Audit
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="w-full text-xs text-red-600 hover:bg-red-50"
                    >
                      Logout of Account
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* TAB 1: DIRECT ON-PAGE REGISTRATION FORM */}
                    {activeTab === "register" && (
                      <form onSubmit={handleRegisterSubmit} className="space-y-3">
                        <div className="text-xs font-bold text-slate-800 pb-1 border-b border-slate-100 flex items-center justify-between">
                          <span>Quick Registration:</span>
                          <span className="text-[10px] text-emerald-600 font-bold">Takes 30 seconds</span>
                        </div>

                        <div>
                          <Label className="text-[11px] font-bold text-slate-700">Full Name *</Label>
                          <Input
                            required
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            placeholder="e.g. Amit Verma"
                            className="h-10 text-xs mt-0.5"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-[11px] font-bold text-slate-700">WhatsApp Mobile *</Label>
                            <Input
                              required
                              type="tel"
                              value={regPhone}
                              onChange={(e) => setRegPhone(e.target.value)}
                              placeholder="e.g. 7534894896"
                              className="h-10 text-xs mt-0.5"
                            />
                          </div>

                          <div>
                            <Label className="text-[11px] font-bold text-slate-700">Password *</Label>
                            <div className="relative mt-0.5">
                              <Input
                                required
                                type={showRegPassword ? "text" : "password"}
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                placeholder="Create password"
                                className="h-10 text-xs pr-8"
                              />
                              <button
                                type="button"
                                onClick={() => setShowRegPassword(!showRegPassword)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                              >
                                {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* City with Live GPS Detection */}
                        <div>
                          <div className="flex items-center justify-between">
                            <Label className="text-[11px] font-bold text-slate-700">Your City</Label>
                            <button
                              type="button"
                              onClick={fetchLiveLocation}
                              className="text-[10px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                            >
                              <Navigation className="w-2.5 h-2.5 text-blue-600" />
                              <span>{isLocating ? "Locating..." : "Auto-Detect GPS"}</span>
                            </button>
                          </div>
                          <Input
                            value={regCity}
                            onChange={(e) => setRegCity(e.target.value)}
                            placeholder="e.g. Mumbai / Delhi NCR"
                            className="h-10 text-xs mt-0.5"
                          />
                        </div>

                        {/* Car Brand */}
                        <div>
                          <Label className="text-[11px] font-bold text-slate-700">Your Car Brand</Label>
                          <select
                            value={regCarBrand}
                            onChange={(e) => setRegCarBrand(e.target.value)}
                            className="w-full h-10 px-2.5 mt-0.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                          >
                            {POPULAR_CAR_BRANDS.map(b => (
                              <option key={b.name} value={b.name}>{b.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isSubmittingReg}
                          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/25 mt-1"
                        >
                          {isSubmittingReg ? "Registering..." : "Submit & Create Account"}
                        </Button>
                      </form>
                    )}

                    {/* TAB 2: DIRECT ON-PAGE LOGIN FORM */}
                    {activeTab === "login" && (
                      <form onSubmit={handleLoginSubmit} className="space-y-3.5 py-1">
                        <div className="text-xs font-bold text-slate-800 pb-1 border-b border-slate-100 flex items-center justify-between">
                          <span>Sign In to Existing Account:</span>
                        </div>

                        <div>
                          <Label className="text-[11px] font-bold text-slate-700">WhatsApp Mobile or Email</Label>
                          <Input
                            required
                            value={loginPhone}
                            onChange={(e) => setLoginPhone(e.target.value)}
                            placeholder="e.g. 7534894896 or email"
                            className="h-10 text-xs mt-0.5"
                          />
                        </div>

                        <div>
                          <Label className="text-[11px] font-bold text-slate-700">Password</Label>
                          <div className="relative mt-0.5">
                            <Input
                              required
                              type={showLoginPassword ? "text" : "password"}
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Your password"
                              className="h-10 text-xs pr-8"
                            />
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                              {showLoginPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmittingLogin}
                          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/25"
                        >
                          {isSubmittingLogin ? "Signing in..." : "Submit & Sign In"}
                        </Button>

                        <div className="pt-2 border-t border-slate-100 flex gap-2">
                          <button
                            type="button"
                            onClick={() => { setLoginPhone("9876543210"); setLoginPassword("password123"); }}
                            className="flex-1 py-1.5 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                          >
                            Quick Demo Member
                          </button>
                          <button
                            type="button"
                            onClick={() => { setLoginPhone("admin@motordoctor.in"); setLoginPassword("admin"); }}
                            className="flex-1 py-1.5 text-[10px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg border border-amber-200"
                          >
                            Quick Admin Login
                          </button>
                        </div>
                      </form>
                    )}

                    {/* TAB 3: QUICK BILL CHECK */}
                    {activeTab === "estimate" && (
                      <div className="space-y-3.5">
                        <div>
                          <Label className="text-[11px] font-bold text-slate-700">Car Brand</Label>
                          <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full h-10 px-2.5 mt-0.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                          >
                            {POPULAR_CAR_BRANDS.map(b => (
                              <option key={b.name} value={b.name}>{b.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <div className="flex justify-between items-center">
                            <Label className="text-[11px] font-bold text-slate-700">Workshop Quoted Estimate</Label>
                            <span className="text-xs font-bold text-blue-600">{formatINR(numAmount)}</span>
                          </div>
                          <div className="relative mt-0.5">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                              type="number"
                              step="500"
                              value={quotedAmount}
                              onChange={(e) => setQuotedAmount(e.target.value)}
                              className="w-full h-10 pl-7 pr-3 text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl"
                            />
                          </div>
                        </div>

                        {/* Savings preview */}
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase block">Expected Savings:</span>
                          <span className="text-lg font-black text-emerald-700">
                            {formatINR(estimatedSavings)} (~38%)
                          </span>
                        </div>

                        <Button
                          onClick={() => onOpenUpload(selectedBrand, numAmount)}
                          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md"
                        >
                          Review My Estimate Sheet
                        </Button>
                      </div>
                    )}
                  </>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
