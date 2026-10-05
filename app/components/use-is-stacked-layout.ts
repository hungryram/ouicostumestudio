"use client";

import { useSyncExternalStore } from "react";

// Matches the breakpoint where the hero stacks into a single column in globals.css.
const query = "(max-width: 1000px)";

export default function useIsStackedLayout() {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
