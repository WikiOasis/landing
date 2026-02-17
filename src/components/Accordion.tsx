"use client";

import { ChevronDown } from "lucide-react";
import { memo, useState } from "react";

const AccordionItem = memo(function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 px-6 sm:px-8 text-left focus:outline-none group"
      >
        <span className="font-medium text-white text-base sm:text-lg">{title}</span>
        <ChevronDown
          className={`h-5 w-5 transition-all duration-300 text-white/60 group-hover:text-white/80 flex-shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-6 sm:px-8 pb-5 sm:pb-6 text-base text-white/60 leading-relaxed">{children}</div>
      </div>
    </div>
  );
});

const Accordion = memo(function Accordion({
  items,
}: {
  items: readonly { title: string; content: React.ReactNode }[];
}) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
});

export default Accordion;