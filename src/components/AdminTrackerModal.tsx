import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MapPin, 
  Smartphone, 
  Monitor, 
  RefreshCw, 
  ExternalLink, 
  ShieldAlert, 
  Activity,
  Globe,
  Clock,
  Car
} from "lucide-react";
import { toast } from "sonner";

interface AdminTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminTrackerModal: React.FC<AdminTrackerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"visitors" | "users">("visitors");
  const [visitorData, setVisitorData] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrackerData = async () => {
    setLoading(true);
    try {
      // Fetch visitors
      const visRes = await fetch("http://localhost:5000/api/visitors");
      if (visRes.ok) {
        const visJson = await visRes.json();
        setVisitorData(visJson);
      }

      // Fetch registered users
      const usersRes = await fetch("http://localhost:5000/api/users");
      if (usersRes.ok) {
        const usersJson = await usersRes.json();
        setUsersList(usersJson.users || []);
      }
    } catch (err) {
      console.error("Tracker fetch error:", err);
      toast.error("Could not reach backend tracker API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTrackerData();
    }
  }, [isOpen]);

  const visitors = visitorData?.visitors || [];
  const cityBreakdown = visitorData?.cityBreakdown || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden rounded-3xl border-slate-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Admin Tracking Center</span>
              </div>
              <DialogTitle className="text-xl font-extrabold text-white mt-1">
                Real-Time Visitor Location & Registered Users
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Monitor user traffic, IP geolocation, GPS coordinates, and accounts.
              </DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchTrackerData}
                disabled={loading}
                className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white text-xs h-9 gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh Live</span>
              </Button>
            </div>
          </div>

          {/* Metric cards bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Total Visits</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {visitorData?.totalVisits || 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
              <div className="text-[11px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Active Now
              </div>
              <div className="text-2xl font-black text-emerald-300 mt-0.5">
                {visitorData?.activeVisitorsNow || 1}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30">
              <div className="text-[11px] font-bold text-blue-400 uppercase flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Registered Users
              </div>
              <div className="text-2xl font-black text-blue-300 mt-0.5">
                {usersList.length}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Top Detected Cities</div>
              <div className="text-xs font-bold text-slate-200 mt-1 truncate">
                {Object.keys(cityBreakdown).slice(0, 3).join(", ") || "Mumbai, Delhi"}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 pt-2">
            <button
              onClick={() => setActiveTab("visitors")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "visitors"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Live Visitor Location Logs ({visitors.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "users"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Registered Users Database ({usersList.length})
            </button>
          </div>
        </div>

        {/* Content table (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {activeTab === "visitors" ? (
            <div className="space-y-3">
              {visitors.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No visitor logs recorded yet. Visit the website to see your location ping here!
                </div>
              ) : (
                visitors.map((v: any, idx: number) => {
                  const hasCoords = v.latitude && v.longitude;
                  const mapsUrl = hasCoords 
                    ? `https://www.google.com/maps?q=${v.latitude},${v.longitude}`
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.city + " " + v.country)}`;

                  return (
                    <div
                      key={v.id || idx}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                            {v.city}, {v.region || v.country}
                          </span>
                          <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border">
                            IP: {v.ip}
                          </span>
                          {v.user && v.user !== "Guest" && (
                            <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                              👤 {v.user}
                            </span>
                          )}
                        </div>

                        <div className="text-slate-500 flex items-center gap-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            {v.device?.includes("Mobile") ? (
                              <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                            ) : (
                              <Monitor className="w-3.5 h-3.5 text-slate-600" />
                            )}
                            {v.device} • {v.browser} ({v.os})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                          <span>•</span>
                          <span className="text-slate-400">Page: {v.page}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {hasCoords && (
                          <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border">
                            {v.latitude.toFixed(4)}, {v.longitude.toFixed(4)}
                          </span>
                        )}
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline" className="text-xs h-8 gap-1 text-blue-600 border-blue-200 hover:bg-blue-50">
                            <ExternalLink className="w-3 h-3" />
                            <span>View on Map</span>
                          </Button>
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {usersList.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No registered users yet.
                </div>
              ) : (
                usersList.map((u: any, idx: number) => (
                  <div
                    key={u.id || idx}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-sm">{u.fullName}</span>
                        {u.role === "admin" && (
                          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px] border border-amber-300">
                            ADMIN
                          </span>
                        )}
                        <span className="text-slate-500">📞 +91 {u.phoneNumber}</span>
                        {u.email && <span className="text-slate-500">✉️ {u.email}</span>}
                      </div>

                      <div className="flex items-center gap-3 text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          City: {u.city || "India"}
                        </span>
                        {u.carBrand && (
                          <span className="flex items-center gap-1 text-blue-700 font-medium">
                            <Car className="w-3.5 h-3.5" />
                            Car: {u.carBrand} {u.carModel}
                          </span>
                        )}
                        <span className="text-slate-400">
                          Registered: {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/91${u.phoneNumber.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(u.fullName)},%20welcome%20to%20MotorDoctor.in!`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="whatsapp" className="text-xs h-8 gap-1">
                        <span>WhatsApp User</span>
                      </Button>
                    </a>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
};
