import React from "react";
import { FAQS } from "@/data/mockData";
import { HelpCircle, PhoneCall, MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const FaqSection: React.FC = () => {
  return (
    <section id="faqs" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 rounded-full px-3.5 py-1 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Everything you need to know about getting your car service bill reviewed.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-3">
          {FAQS.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-slate-200/90 rounded-2xl px-5 py-1 bg-slate-50/50 data-[state=open]:bg-white data-[state=open]:border-blue-200 data-[state=open]:shadow-sm transition-all"
            >
              <AccordionTrigger className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Still have questions card */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Have a custom question or unusual repair issue?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Call or WhatsApp our team directly. We are here to help!</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a href="tel:+919819912166" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                <span>+91 98199 12166</span>
              </Button>
            </a>
            <a 
              href="https://wa.me/919819912166?text=Hi%20MotorDoctor,%20I%20have%20a%20question%20about%20my%20car%20service." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="whatsapp" size="sm" className="w-full sm:w-auto text-xs gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Us</span>
              </Button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
