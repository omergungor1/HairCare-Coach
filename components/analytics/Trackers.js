"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

let pageViewSent = false;

export function Trackers() {
  useEffect(() => {
    if (!pageViewSent) {
      pageViewSent = true;
      track("page_view", { path: window.location.pathname });
    }

    const target = document.getElementById("problems");
    if (!target) return undefined;

    let sent = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || sent) return;
        sent = true;
        track("scroll_50_depth");
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return null;
}
