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
    <div className="border-b border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 px-4 text-left md:text-sm focus:outline-none"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4 md:text-sm text-gray-100">{children}</div>
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
    <div className="divide-y divide-gray-800 rounded-md">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
});

export default Accordion;