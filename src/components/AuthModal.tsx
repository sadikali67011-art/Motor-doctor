import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { getVisitorLocation } from "@/services/visitorTracking";
import { POPULAR_CAR_BRANDS } from "@/data/mockData";
import { LogIn, UserPlus, MapPin, Eye, EyeOff, ShieldCheck, Sparkles, Car } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "login"
}) => {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regBrand, setRegBrand] = useState("Hyundai");
  const [regModel, setRegModel] = useState("Creta");

  React.useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  const handleAutoDetectCity = async () => {
    setIsDetectingLocation(true);
    try {
      const loc = await getVisitorLocation();
      if (loc.city) {
        setRegCity(loc.city);
        toast.success(`Location detected: ${loc.city}, ${loc.region || "India"}`);
      } else {
        setRegCity("Mumbai");
      }
    } catch {
      setRegCity("Delhi NCR");
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      toast.error("Please enter both phone/email and password");
      return;
    }

    setIsSubmitting(true);
    const success = await login(loginIdentifier, loginPassword);
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regPassword) {
      toast.error("Please fill in Name, Phone number, and Password");
      return;
    }

    setIsSubmitting(true);
    const success = await register({
      fullName: regName,
      phoneNumber: regPhone,
      email: regEmail,
      password: regPassword,
      city: regCity || "India",
      carBrand: regBrand,
      carModel: regModel
    });
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  // Demo 1-click accounts for testing
  const handleQuickLogin = (role: "admin" | "demo") => {
    if (role === "admin") {
      setLoginIdentifier("admin@motordoctor.in");
      setLoginPassword("admin");
    } else {
      setLoginIdentifier("9876543210");
      setLoginPassword("password123");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-3xl border-slate-200">
        
        {/* Header with Switcher Tabs */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 relative">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Motor Doctor Member Portal</span>
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-black text-white">
            {tab === "login" ? "Welcome Back to Motor Doctor" : "Create Your Free Account"}
          </DialogTitle>
          <DialogDescription className="text-xs text-blue-100 mt-1">
            {tab === "login" 
              ? "Access your saved bill audits and master technician consultations."
              : "Save up to 45% on car services with verified independent mechanic reviews."}
          </DialogDescription>

          {/* Tab switcher buttons */}
          <div className="flex bg-blue-950/60 p-1 rounded-xl mt-4 border border-blue-400/20">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                tab === "login" ? "bg-white text-blue-800 shadow-sm" : "text-blue-200 hover:text-white"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In (Login)</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                tab === "register" ? "bg-white text-blue-800 shadow-sm" : "text-blue-200 hover:text-white"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register (New User)</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {tab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Label className="text-xs font-bold text-slate-700">Mobile Number or Email *</Label>
                <Input
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="e.g. 9819912166 or rahul@gmail.com"
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-slate-700">Password *</Label>
                  <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative mt-1">
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/20"
              >
                {isSubmitting ? "Signing in..." : "Sign In to My Account"}
              </Button>

              {/* Quick 1-click test credentials */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1.5 text-center">
                  Quick Demo Login (One-Click):
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("demo")}
                    className="flex-1 text-[11px] font-semibold"
                  >
                    User Login
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("admin")}
                    className="flex-1 text-[11px] font-semibold border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
                  >
                    Admin Login
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <Label className="text-xs font-bold text-slate-700">Full Name *</Label>
                <Input
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold text-slate-700">WhatsApp Mobile *</Label>
                  <Input
                    required
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="e.g. 9819912166"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">Email Address</Label>
                  <Input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-slate-700">Password *</Label>
                <div className="relative mt-1">
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* City with Auto-Detect GPS Location Button */}
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-slate-700">Your City</Label>
                  <button
                    type="button"
                    onClick={handleAutoDetectCity}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{isDetectingLocation ? "Detecting GPS..." : "Auto-Detect My Location"}</span>
                  </button>
                </div>
                <Input
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                  placeholder="e.g. Mumbai / Delhi NCR / Bengaluru"
                  className="mt-1"
                />
              </div>

              {/* Car details */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <Label className="text-xs font-bold text-slate-700">Car Brand</Label>
                  <select
                    value={regBrand}
                    onChange={(e) => setRegBrand(e.target.value)}
                    className="w-full h-11 px-2.5 mt-1 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  >
                    {POPULAR_CAR_BRANDS.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">Car Model</Label>
                  <Input
                    value={regModel}
                    onChange={(e) => setRegModel(e.target.value)}
                    placeholder="e.g. Creta / Swift"
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/20 mt-2"
              >
                {isSubmitting ? "Creating Account..." : "Create Free Account"}
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Confidential • Zero Spam Guarantee</span>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

