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
    <div className="border-b border-line">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between gap-4 py-6 text-left focus:outline-none focus-visible:focus-ring"
      >
        <span className="font-serif text-lg font-semibold text-body sm:text-xl">
          {title}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-body/60 transition-transform duration-300 group-hover:text-body ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-3xl pb-6 text-base leading-relaxed text-body/80">
            {children}
          </div>
        </div>
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
    <div className="border-t border-line">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
});

export default Accordion;
