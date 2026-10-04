"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode } from "react";
import usePrefersReducedMotion from "./use-prefers-reduced-motion";

type ScrollFrameProps = {
  children: ReactNode;
  className: string;
  "aria-hidden"?: boolean;
};

type IntroRevealProps = {
  as: "article" | "div" | "figure";
  children: ReactNode;
  className: string;
  delay?: number;
};

export function IntroReveal({
  as,
  children,
  className,
  delay = 0,
}: IntroRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const animationProps = {
    initial: reducedMotion ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25, margin: "0px 0px -20% 0px" },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
    className,
  };

  if (as === "figure") {
    return <motion.figure {...animationProps}>{children}</motion.figure>;
  }

  if (as === "article") {
    return <motion.article {...animationProps}>{children}</motion.article>;
  }

  return <motion.div {...animationProps}>{children}</motion.div>;
}

export function HeroCopyParallax({
  children,
  className,
  "aria-hidden": ariaHidden,
}: ScrollFrameProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 42]);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      aria-hidden={ariaHidden}
      initial={reducedMotion ? false : { opacity: 0, x: -14 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.12,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      style={{ y: reducedMotion ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}

export function HeroImageParallax({
  children,
  className,
  "aria-hidden": ariaHidden,
}: ScrollFrameProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -36]);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      aria-hidden={ariaHidden}
      initial={
        reducedMotion
          ? false
          : { opacity: 0, x: 12, clipPath: "inset(0 0 7% 0)" }
      }
      animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0% 0)" }}
      transition={{
        duration: 1.1,
        delay: 0.24,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      style={{ y: reducedMotion ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}

export function HeroCaptionParallax({ children, className }: ScrollFrameProps) {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 600], [0, 16]);
  const y = useTransform(scrollY, [0, 600], [0, 54]);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      style={{
        x: reducedMotion ? 0 : x,
        y: reducedMotion ? 0 : y,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FabricScrollFrame({
  children,
  className,
  "aria-hidden": ariaHidden,
}: ScrollFrameProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 350], [0.2, 1]);
  const y = useTransform(scrollY, [0, 350], [48, 0]);
  const scaleY = useTransform(scrollY, [0, 350], [0.55, 1]);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      aria-hidden={ariaHidden}
      style={{
        opacity: reducedMotion ? 1 : opacity,
        y: reducedMotion ? 0 : y,
        scaleY: reducedMotion ? 1 : scaleY,
        transformOrigin: "top",
      }}
    >
      {children}
    </motion.div>
  );
}
