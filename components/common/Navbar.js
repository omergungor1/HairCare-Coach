"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useWaitlist } from "@/components/providers/WaitlistProvider";
import { Button } from "@/components/common/Button";
import { VitalLoopLogo } from "@/components/common/VitalLoopLogo";

const LINKS = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Core Features" },
  { href: "/#evidence", label: "Evidence & Science" },
  { href: "/#comparison", label: "Comparison" },
  { href: "/#pricing", label: "Pricing" },
];

export function Navbar() {
  const { openWaitlist } = useWaitlist();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function claim() {
    setOpen(false);
    openWaitlist({ tier: "pro_early_bird", source: "navbar" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex min-h-12 items-center gap-2.5" aria-label="HairCare Coach home">
          <VitalLoopLogo className="h-10 w-16" />
          <span className="font-display text-xl leading-none text-brand-ink">
            <span className="font-bold">HairCare</span>{" "}
            <span className="font-normal">Coach</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm font-semibold text-content-secondary transition hover:text-content-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button onClick={claim}>Claim Early Access</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md text-content-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          ref={menuRef}
          className="border-t border-surface-border bg-surface-card px-5 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-12 items-center font-display text-base font-semibold text-content-primary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button className="mt-2 w-full" onClick={claim}>
            Claim Early Access
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
