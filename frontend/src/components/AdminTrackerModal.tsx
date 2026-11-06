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
  Car,
  Navigation,
  CheckCircle,
  Eye
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
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);

  const fetchTrackerData = async () => {
    setLoading(true);
    try {
      // Fetch visitors
      const visRes = await fetch("http://localhost:5000/api/visitors");
      if (visRes.ok) {
        const visJson = await visRes.json();
        setVisitorData(visJson);
        if (visJson.visitors && visJson.visitors.length > 0 && !selectedVisitor) {
          setSelectedVisitor(visJson.visitors[0]);
        }
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

  // Interactive OpenStreetMap embed URL
  const mapLat = selectedVisitor?.latitude || 19.076;
  const mapLon = selectedVisitor?.longitude || 72.8777;
  const mapBbox = `${mapLon - 0.05},${mapLat - 0.05},${mapLon + 0.05},${mapLat + 0.05}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBbox}&layer=mapnik&marker=${mapLat},${mapLon}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl p-0 overflow-hidden rounded-3xl border-slate-200 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Location & Visitor Surveillance</span>
              </div>
              <DialogTitle className="text-xl font-extrabold text-white mt-1">
                Real-Time Visitor Location & User Tracker
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Live GPS Coordinates, Reverse Geocoded Addresses, and Registered Car Owners.
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
              <div className="text-[11px] font-bold text-slate-400 uppercase">Total Visits Logged</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {visitorData?.totalVisits || 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
              <div className="text-[11px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Live Active
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
              <div className="text-[11px] font-bold text-slate-400 uppercase">Top Cities</div>
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
            <div className="space-y-4">
              
              {/* LIVE MAP PREVIEW OF SELECTED VISITOR */}
              {selectedVisitor && (
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden p-4">
                  <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-200 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                      <span className="font-extrabold text-sm text-slate-900">
                        Live Map Pin for: {selectedVisitor.city}, {selectedVisitor.region || "India"}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {selectedVisitor.latitude?.toFixed(4)}, {selectedVisitor.longitude?.toFixed(4)}
                      </span>
                    </div>

                    <a
                      href={`https://www.google.com/maps?q=${mapLat},${mapLon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Open in Full Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Interactive Map Iframe */}
                  <div className="w-full h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                    <iframe
                      title="Live Visitor Location Map"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={mapUrl}
                    />
                  </div>
                </div>
              )}

              {/* Visitors List Cards */}
              <div className="space-y-2.5">
                {visitors.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No visitor logs recorded yet. Visit the website to see your location ping here!
                  </div>
                ) : (
                  visitors.map((v: any, idx: number) => {
                    const hasCoords = v.latitude && v.longitude;
                    const isSelected = selectedVisitor?.id === v.id;

                    return (
                      <div
                        key={v.id || idx}
                        onClick={() => setSelectedVisitor(v)}
                        className={`bg-white rounded-2xl border p-4 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs cursor-pointer ${
                          isSelected
                            ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
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
                          <Button
                            size="sm"
                            variant={isSelected ? "default" : "outline"}
                            className="text-xs h-8 gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{isSelected ? "Viewing Pin" : "View On Map"}</span>
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
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
