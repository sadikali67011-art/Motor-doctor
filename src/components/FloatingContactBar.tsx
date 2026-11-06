import React from "react";
import { MessageSquare, PhoneCall, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingContactBarProps {
  onOpenUpload: (planId?: string) => void;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({ onOpenUpload }) => {
  return (
    <>
      {/* Desktop Floating WhatsApp Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        <a
          href="https://wa.me/917534894896?text=Hi%20MotorDoctor,%20I%20am%20at%20the%20service%20center%20and%20need%20urgent%20review%20of%20my%20car%20estimate."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20ba59] transition-all hover:scale-105"
        >
          <div className="text-right hidden group-hover:block transition-all">
            <div className="text-xs font-bold leading-none">Chat With Doctor</div>
            <div className="text-[10px] text-green-100 mt-0.5">Instant WhatsApp reply</div>
          </div>
          <MessageSquare className="w-6 h-6 fill-white" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl flex items-center gap-2">
        <a
          href="tel:+917534894896"
          className="flex-1"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs font-bold border-slate-300 text-slate-800 gap-1.5 h-11"
          >
            <PhoneCall className="w-4 h-4 text-blue-600" />
            <span>Call Hotline</span>
          </Button>
        </a>

        <a
          href="https://wa.me/917534894896?text=Hi%20MotorDoctor,%20I%20am%20at%20the%20service%20center%20and%20need%20urgent%20review%20of%20my%20car%20estimate."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button
            variant="whatsapp"
            size="sm"
            className="w-full text-xs font-bold gap-1.5 h-11"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </Button>
        </a>

        <Button
          onClick={() => onOpenUpload()}
          size="sm"
          className="flex-[1.2] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1 h-11 rounded-xl shadow-md"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Review Bill</span>
        </Button>
      </div>
    </>
  );
};

