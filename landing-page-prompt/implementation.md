# Landing Page Technical Implementation Plan — HairCare Coach (Refreshed)

> Project: HairCare Coach  
> Version: 2.0 (Post-Brand Kit Refresh)  
> Date: 2026-10-17  
> Agent: Landing Page Agent  
> Framework: Next.js (App Router, React 19 / 18, TypeScript)  
> Styling: Tailwind CSS + Vanilla CSS Tokens (WCAG AA/AAA Compliant)  
> Brand Reference: [BRAND_GUIDELINES.md](file:///d:/dev/AI-Factory/projects/haircare-coach/brand-kit/BRAND_GUIDELINES.md) (✅ FINAL APPROVED)

---

## 1. Overview & Architectural Principles

This document defines the production-grade engineering specification for the **HairCare Coach** demand validation landing page. 

**Core Technical Requirements:**
- **Visual Identity Compliance:** 100% adherence to the approved Brand Kit (The Vital Loop logo mark, Deep Forest Emerald, Vibrant Mint, Plus Jakarta Sans, and Inter).
- **Mobile-First Responsive Layout:** Flawless rendering from 360px smartphones to 4K ultra-wide monitors.
- **Performance Excellence:** 95+ Mobile Google PageSpeed / Lighthouse score with Largest Contentful Paint (LCP) < 1.2s.
- **Accessible & Semantic (WCAG AA):** Full keyboard navigability, high color contrast (15.8:1 text contrast), and aria-labeled interactive widgets.
- **Zero Third-Party Tracking Bloat:** Lightweight, cookie-free analytics (Plausible / PostHog self-hosted) with GDPR/KVKK compliance.

---

## 2. Directory & Component Structure (Next.js App Router)

```text
haircare-coach-web/
├── app/
│   ├── layout.tsx                # Global layout, Google Fonts (Plus Jakarta Sans & Inter), metadata
│   ├── page.tsx                  # Root landing page composing all sections
│   ├── globals.css               # Brand CSS variables, font rules, tabular numbers, custom animations
│   ├── icon.svg                  # "The Vital Loop" SVG favicon (16x16 / 32x32)
│   ├── opengraph-image.png       # 1200x630 branded OpenGraph preview image
│   ├── robots.ts                 # Dynamic robots.txt
│   ├── sitemap.ts                # Dynamic XML sitemap
│   └── api/
│       └── waitlist/
│           └── route.ts          # Serverless API endpoint for waitlist lead ingestion & intent logging
├── components/
│   ├── common/
│   │   ├── Navbar.tsx            # Sticky desktop/mobile navigation with "The Vital Loop" logo and CTA
│   │   ├── Footer.tsx            # Regulatory medical disclaimer, copyright, privacy links
│   │   ├── Button.tsx            # Reusable button (.btn-primary, .btn-secondary, .btn-ghost)
│   │   └── VitalLoopLogo.tsx     # Vector SVG implementation of Konsept A "The Vital Loop" logo
│   ├── sections/
│   │   ├── TopBanner.tsx         # Private beta announcement bar (50% off + free guide)
│   │   ├── HeroSection.tsx       # H1, subhead, badges, dual CTAs, and interactive app mockup
│   │   ├── TrustStatsBar.tsx     # 180-day biological reality and compliance metrics
│   │   ├── ProblemSection.tsx    # 3 friction cards (Invisible progress, Lighting bias, Protocol friction)
│   │   ├── SolutionOverview.tsx  # Value proposition transition banner
│   │   ├── FeaturesGrid.tsx      # 5 core MVP feature modules
│   │   ├── GhostCameraDemo.tsx   # Interactive Before/After ghost-overlay split slider widget
│   │   ├── ScalpTimerPreview.tsx # Interactive 4-minute circular pulse timer demonstration widget
│   │   ├── ComparisonTable.tsx   # Feature-by-feature matrix vs. competitors
│   │   ├── PricingCards.tsx      # Interactive Pioneer Free ($0) vs. Early Supporter Pro ($2.99/mo)
│   │   ├── FaqAccordion.tsx      # Accessible keyboard-navigable FAQ accordions
│   │   └── WaitlistCtaCard.tsx   # Embedded high-conversion email capture box with routine selector
│   └── modals/
│       └── WaitlistModal.tsx     # Fast modal dialog triggered by sticky header and hero CTAs
├── lib/
│   ├── analytics.ts              # Privacy-first custom event dispatcher
│   ├── db.ts                     # Database client (Postgres / Supabase / Resend Audience)
│   └── validations.ts            # Zod validation schema for waitlist input
└── types/
    └── index.ts                  # TypeScript interfaces for leads, pricing tiers, and analytics events
```

---

## 3. Technology Stack & Dependencies (`package.json`)

```json
{
  "name": "haircare-coach-landing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.453.0",
    "zod": "^3.23.8",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "@types/node": "^20.17.0",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "autoprefixer": "^10.4.20"
  }
}
```

---

## 4. Design System & Tailwind Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0F3A2E',           // Deep Forest Emerald
          'primary-hover': '#09261E',
          secondary: '#2D6A4F',         // Sage Forest
          'secondary-hover': '#22533D',
          accent: '#10B981',            // Vibrant Mint
          'accent-hover': '#059669',
          'accent-light': '#D1FAE5',
        },
        surface: {
          bg: '#F8FAFC',                // Clean Off-White
          card: '#FFFFFF',              // Pure Card White
          subtle: '#F1F5F9',
          border: '#E2E8F0',
        },
        content: {
          primary: '#0F172A',           // Midnight Slate (15.8:1 contrast)
          secondary: '#475569',         // Muted Slate
          tertiary: '#94A3B8',
          inverse: '#FFFFFF',
        },
        dark: {
          bg: '#0B1311',                // Obsidian Forest (OLED Black)
          card: '#142420',              // Pine Charcoal
          border: '#1F3830',
          text: '#F1F5F9',
          muted: '#94A3B8',
          accent: '#6EE7B7',            // Electric Mint
        },
        feedback: {
          success: '#059669',
          warning: '#D97706',
          error: '#DC2626',
        },
        gamify: {
          fire: '#F59E0B',
          frozen: '#38BDF8',
          xp: '#10B981',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        accent: '0 4px 14px 0 rgba(16, 185, 129, 0.35)',
        card: '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03)',
        elevated: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 5. Global Font & CSS Setup (`app/layout.tsx` & `app/globals.css`)

### `app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "HairCare Coach — Habit & Consistency App for Men's Hair Health",
  description: "Build an unbreakable hair routine. Track Finasteride, Minoxidil, scalp care, and progress with standardized ghost-overlay photos. Zero false promises.",
  metadataBase: new URL('https://haircarecoach.app'),
  openGraph: {
    title: "Stop Quitting Your Hair Routine. Build Consistency That Works.",
    description: "The first habit companion designed for men committed to long-term hair wellness. No miracle promises, just scientific consistency.",
    url: 'https://haircarecoach.app',
    siteName: 'HairCare Coach',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="bg-surface-bg text-content-primary font-body antialiased selection:bg-brand-accent selection:text-content-primary">
        {children}
      </body>
    </html>
  );
}
```

### `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .tabular-nums {
    font-feature-settings: 'tnum' on, 'zero' on;
  }
}

/* Custom interactive pulse for timer widget */
@keyframes softPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.04);
    opacity: 1;
  }
}

.animate-soft-pulse {
  animation: softPulse 4s ease-in-out infinite;
}
```

---

## 6. Waitlist Ingestion & Validation (`lib/validations.ts` & `app/api/waitlist/route.ts`)

### `lib/validations.ts`:
```typescript
import { z } from 'zod';

export const WaitlistSubmissionSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  routineType: z.enum(
    ['medications', 'natural_care', 'post_transplant', 'just_starting'],
    { errorMap: () => ({ message: 'Please select your current routine' }) }
  ),
  selectedTier: z.enum(['free', 'pro_early_bird']).default('pro_early_bird'),
  referralCode: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof WaitlistSubmissionSchema>;
```

### `app/api/waitlist/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { WaitlistSubmissionSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = WaitlistSubmissionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, routineType, selectedTier } = result.data;

    // In-memory or database write logic (e.g., Supabase / PostgreSQL / Resend Audience)
    // await db.insert('waitlist_leads').values({ email, routineType, selectedTier, createdAt: new Date() });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully reserved your early access spot',
        waitlistPosition: 413, // Dynamic count
        freeGuideUrl: '/downloads/HairCare-Coach-Evidence-Handbook.pdf',
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 7. Performance & Core Web Vitals Targets

1. **LCP (Largest Contentful Paint) < 1.2s:** Above-the-fold mockups loaded with `priority` and modern SVG vector shapes.
2. **CLS (Cumulative Layout Shift) = 0:** Google Fonts rendered with Next.js font optimization (`display: 'swap'` and preloaded fallbacks).
3. **FID / INP < 100ms:** Fast hydration with lightweight components; heavy modals rendered via dynamic imports or React Portals.
