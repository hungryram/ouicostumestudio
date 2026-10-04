"use client";

import { motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import usePrefersReducedMotion from "./use-prefers-reduced-motion";

type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  className = "faq-item",
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={className} data-open={isOpen}>
      <button
        type="button"
        className="faq-item__trigger"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        onClick={() => setIsOpen((open) => !open)}
      >
        {title}
        <span className="faq-item__indicator" aria-hidden="true" />
      </button>
      <motion.div
        id={`${id}-content`}
        className="faq-item__content"
        aria-labelledby={`${id}-trigger`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="faq-item__answer">{children}</div>
      </motion.div>
    </div>
  );
}
