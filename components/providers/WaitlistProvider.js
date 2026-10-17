"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

const WaitlistContext = createContext(null);

export function WaitlistProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState("pro_early_bird");
  const [session, setSession] = useState(0);
  const triggerRef = useRef(null);

  function openWaitlist({ tier: nextTier = "pro_early_bird", source = "unknown" } = {}) {
    triggerRef.current = document.activeElement;
    setTier(nextTier);
    setSession((value) => value + 1);
    setOpen(true);
    track("waitlist_modal_open", { source, tier: nextTier });
  }

  function closeWaitlist() {
    setOpen(false);
    const trigger = triggerRef.current;
    requestAnimationFrame(() => {
      if (trigger && typeof trigger.focus === "function") trigger.focus();
    });
  }

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <WaitlistContext.Provider value={{ open, tier, session, openWaitlist, closeWaitlist }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return context;
}
