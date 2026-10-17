# Landing Page Technical Implementation Plan — HairCare Coach

> Project: HairCare Coach  
> Date: 2026-10-16  
> Agent: Landing Page Agent  
> Framework: Next.js (App Router, React 19 / 18, TypeScript)  
> Status: Architectural & Setup Specification (Pre-Coding Phase)  

---

## 1. Overview & Architecture Goals

This document specifies the exact technical architecture, component hierarchy, database/lead capture schema, and deployment configuration for the **HairCare Coach** global validation landing page. 

**Core Technical Requirements:**
- **Performance:** 95+ Mobile Google PageSpeed / Lighthouse score.
- **Conversion Readiness:** Instant interactive feedback on waitlist form submission without page reload.
- **Privacy & Security:** Zero third-party trackers leaking sensitive PII; GDPR & KVKK compliant email capture.
- **Aesthetic Excellence:** Modern dark-mode palette (`#0B0F17` canvas with Emerald `#10B981` accents, glassmorphic cards, and fluid micro-animations).

---

## 2. Recommended Directory Structure (Next.js App Router)

```text
haircare-coach-web/
├── app/
│   ├── layout.tsx                # Global layout, fonts, SEO metadata & analytics script
│   ├── page.tsx                  # Root landing page composing all sections
│   ├── globals.css               # Design tokens, custom utilities, glassmorphism
│   ├── icon.svg                  # SVG favicon with vibrant green pulse
│   ├── opengraph-image.png       # 1200x630 branded OpenGraph preview card
│   ├── robots.ts                 # Dynamic robots.txt configuration
│   ├── sitemap.ts                # Dynamic XML sitemap generator
│   └── api/
│       └── waitlist/
│           └── route.ts          # Serverless API endpoint for email capture & intent logging
├── components/
│   ├── common/
│   │   ├── Navbar.tsx            # Sticky desktop/mobile navigation with CTA
│   │   ├── Footer.tsx            # Links, copyright, and medical disclaimer
│   │   └── Button.tsx            # Reusable accessible button with ripple/hover states
│   ├── sections/
│   │   ├── HeroSection.tsx       # H1, subhead, badges, dual CTAs, and interactive app mockup
│   │   ├── TrustStatsBar.tsx     # 180-day biological reality and compliance stats
│   │   ├── ProblemSection.tsx    # 3 friction cards (Invisible progress, Lighting bias, Complex protocols)
│   │   ├── SolutionOverview.tsx  # Value proposition transition banner
│   │   ├── FeaturesGrid.tsx      # 5 core features with interactive tabs/visual previews
│   │   ├── GhostCameraDemo.tsx   # Interactive Before/After ghost-overlay slider widget
│   │   ├── ComparisonTable.tsx   # Feature-by-feature matrix vs. competitors
│   │   ├── PricingCards.tsx      # Interactive Pioneer Free vs. Early Supporter Pro cards
│   │   ├── FaqAccordion.tsx      # Accessible keyboard-navigable FAQ accordions
│   │   └── WaitlistCtaCard.tsx   # Embedded high-conversion email capture box
│   └── modals/
│       └── WaitlistModal.tsx     # Fast modal triggered by floating and header CTAs
├── lib/
│   ├── analytics.ts              # Custom privacy-first event dispatch helpers
│   ├── db.ts                     # Database client (Supabase, Postgres, or Airtable/Resend)
│   └── validations.ts            # Zod validation schema for waitlist input
├── types/
│   └── index.ts                  # TypeScript definitions for waitlist leads and tier selections
└── public/
    └── assets/                   # Vector icons, optimized WebP mockups, and logos
```

---

## 3. Technology Stack & Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0 || ^15.0.0",
    "react": "^18.3.0 || ^19.0.0",
    "react-dom": "^18.3.0 || ^19.0.0",
    "lucide-react": "^0.400.0",
    "zod": "^3.23.0",
    "@vercel/analytics": "^1.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 4. Design System & CSS Tokens

```css
/* app/globals.css Design System Extract */
:root {
  --bg-primary: #0B0F17;
  --bg-surface: #141B26;
  --bg-surface-elevated: #1B2433;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-emerald: rgba(16, 185, 129, 0.3);
  
  --accent-emerald: #10B981;
  --accent-emerald-glow: rgba(16, 185, 129, 0.15);
  --accent-cyan: #06B6D4;
  
  --text-primary: #F9FAFB;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
}

/* Glassmorphism card container */
.glass-panel {
  background: rgba(20, 27, 38, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}
```

---

## 5. Waitlist Data Handling & Backend Logic

### 5.1 Zod Validation Schema (`lib/validations.ts`)
```typescript
import { z } from 'zod';

export const WaitlistSubmissionSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  selectedTier: z.enum(['free', 'pro_early_bird']).default('pro_early_bird'),
  routineType: z.enum(['medications', 'natural_care', 'post_transplant', 'just_starting']).optional(),
  referralSource: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof WaitlistSubmissionSchema>;
```

### 5.2 Serverless API Route (`app/api/waitlist/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { WaitlistSubmissionSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const result = WaitlistSubmissionSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, selectedTier, routineType, referralSource } = result.data;

    // Database insertion logic (e.g. Supabase, Postgres, or Resend Audience API)
    // Example: await db.insert('waitlist_leads').values({ email, selectedTier, routineType, createdAt: new Date() })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        waitlistPosition: 412 // Dynamic query count + 1
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

## 6. Performance & Core Web Vitals (CWV) Optimization

1. **Font Optimization:** Use `next/font/google` with `display: 'swap'` for `Inter` and `Plus_Jakarta_Sans` to ensure zero layout shift (CLS: 0).
2. **Next-Gen Images:** All mockups converted to `.webp` or `.avif`, using `<Image priority />` exclusively on above-the-fold hero mockups to guarantee Largest Contentful Paint (LCP < 1.2s).
3. **No Heavy UI Component Libraries:** Zero runtime bloat from heavy external UI frameworks. Pure CSS utilities and lightweight SVG icons (`lucide-react`).
4. **Server Components by Default:** Page sections (Problem, Solution, FAQ, Comparison) are 100% React Server Components (RSC); only interactive elements (`GhostCameraDemo`, `FaqAccordion`, `WaitlistModal`) use `'use client'`.

---

## 7. Analytics & Privacy Integration

To ensure zero third-party cookie banners are required while gathering clean behavioral analytics:
- Integrate **Plausible Analytics** or **PostHog Cloud**:
  ```tsx
  // in app/layout.tsx
  <script 
    defer 
    data-domain="haircarecoach.app" 
    src="https://plausible.io/js/script.tagged-events.js">
  </script>
  ```
- Trigger custom tagged events on tier selection (`plausible('SelectProTier')`) and successful waitlist submission (`plausible('JoinWaitlistSuccess')`).

---

## 8. Deployment & Environment Setup

- **Platform:** Vercel or Cloudflare Pages.
- **Environment Variables Required:**
  - `DATABASE_URL` (or `SUPABASE_SERVICE_ROLE_KEY` / `RESEND_API_KEY`)
  - `NEXT_PUBLIC_APP_URL=https://haircarecoach.app`
  - `NEXT_PUBLIC_ANALYTICS_DOMAIN=haircarecoach.app`
- **Build Command:** `next build`
- **Output:** Fully static HTML export with dynamic Edge runtime for `/api/waitlist`.
