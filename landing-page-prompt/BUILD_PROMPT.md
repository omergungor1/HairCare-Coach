# AI Kodlama Ajanı Geliştirme Talimatı — HairCare Coach Landing Page (`BUILD_PROMPT.md`)

> **Hedef:** Bu dosya, Cursor, Antigravity, Claude Code veya Codex gibi bir yapay zeka kodlama ajanına doğrudan verilmek üzere hazırlanmış eksiksiz, uçtan uca Next.js landing page geliştirme promptudur.  
> **Referans Marka Kılavuzu:** [projects/haircare-coach/brand-kit/BRAND_GUIDELINES.md](file:///d:/dev/AI-Factory/projects/haircare-coach/brand-kit/BRAND_GUIDELINES.md) (✅ FINAL APPROVED)  
> **Dil Kuralı:** Kullanıcıya dönük tüm web arayüz metinleri **İngilizce** olmalıdır.

---

```markdown
# MISSION: BUILD THE OFFICIAL "HAIRCARE COACH" VALIDATION LANDING PAGE

You are an expert Principal Frontend Engineer and UI/UX Designer.
Your objective is to build a high-converting, accessible, and responsive validation landing page for **HairCare Coach** using **Next.js 14/15 App Router**, **TypeScript**, and **Tailwind CSS**.

---

## 1. CORE BRAND IDENTITY & STRICT DESIGN SYSTEM RULES

You must strictly implement the **FINAL APPROVED Brand Kit** without deviations:

### 1.1 Brand Philosophy & Grounding
- **Product:** HairCare Coach
- **Tagline:** The Habit & Consistency Companion for Men's Hair Health
- **Positioning:** We do NOT sell miracle hair regrowth drugs or unverified oils. We engineer the daily discipline, standardized photo progress tracking, and smart routines required for treatments to work.
- **Tone:** Scientific, calm, empathetic, direct, non-judgmental.

### 1.2 Approved Color Tokens (Tailwind & CSS Variables)
- **Primary Brand (Authority / Botanical Depth):** `Deep Forest Emerald` (`#0F3A2E`)
- **Secondary Brand (Structure):** `Sage Forest` (`#2D6A4F`)
- **Primary Conversion Accent (CTAs / Streaks):** `Vibrant Mint` (`#10B981`)
- **Accent Hover:** `#059669`
- **Background Canvas:** `Clean Off-White` (`#F8FAFC`) — Do NOT use plain #FFFFFF for page background.
- **Card Surfaces:** `Pure Card White` (`#FFFFFF`) with 1px border `#E2E8F0` and `rounded-2xl` (16px).
- **Text Primary (WCAG AAA 15.8:1 contrast):** `Midnight Slate` (`#0F172A`)
- **Text Muted / Secondary:** `Muted Slate` (`#475569`)
- **Dark Mode Palette:**
  - Background: `Obsidian Forest` (`#0B1311`)
  - Cards: `Pine Charcoal` (`#142420`) with border `#1F3830`
  - Text: `Frost White` (`#F1F5F9`)
  - Accent: `Electric Mint` (`#6EE7B7`)

### 1.3 Typography System (Google Fonts)
- **Headings & Display:** `Plus Jakarta Sans` (Bold 700 with `-0.03em` letter-spacing for H1, SemiBold 600 for H2/H3).
- **Body & Data:** `Inter` (Regular 400 with 1.6 line-height).
- **Timers & Numeric Stats:** Must use `tabular-nums` (`font-feature-settings: 'tnum' on`).

### 1.4 Approved Logo: Konsept A — "The Vital Loop"
Render an inline SVG logo combining an upward organic hair strand with a continuous infinity-style habit loop:
```tsx
export function VitalLoopLogo({ className = "w-8 h-8", isDark = false }: { className?: string; isDark?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="HairCare Coach Logo">
      <path
        d="M20 36C12 36 6 29.5 6 21.5C6 14.5 11 9 17 8C19 7.7 20 9.2 20 10.5C20 14 17.5 17 15 19.5C12.5 22 11 25 14 27.5C17 30 21 28.5 23.5 26C26 23.5 28 19 28 14C28 8.5 23 4 18 4"
        stroke={isDark ? "#34D399" : "#0F3A2E"}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="14" r="3.5" fill="#10B981" />
    </svg>
  );
}
```

---

## 2. DIRECTORY STRUCTURE & FILES TO CREATE

Create the following file hierarchy:

```text
├── app/
│   ├── layout.tsx                # Google Fonts, SEO metadata, open graph tags
│   ├── page.tsx                  # Landing page composition
│   ├── globals.css               # CSS design tokens, tabular-nums, custom animations
│   └── api/
│       └── waitlist/
│           └── route.ts          # Zod-validated serverless lead intake
├── components/
│   ├── common/
│   │   ├── VitalLoopLogo.tsx     # The Vital Loop vector brandmark
│   │   ├── Navbar.tsx            # Sticky header with logo, anchor links, and CTA
│   │   └── Footer.tsx            # Regulatory medical disclaimer, copyright, privacy links
│   ├── sections/
│   │   ├── TopBanner.tsx         # Beta access announcement pill
│   │   ├── HeroSection.tsx       # H1, subhead, dual CTAs, app mockup, and live spot counter
│   │   ├── TrustStatsBar.tsx     # 180-day biological cycle, 68% drop-off stat, 0% magic
│   │   ├── ProblemSection.tsx    # 3 friction cards (Invisible progress, Lighting bias, Protocol friction)
│   │   ├── SolutionOverview.tsx  # Value proposition transition banner
│   │   ├── FeaturesGrid.tsx      # 5 core MVP modules with pill badges
│   │   ├── GhostCameraDemo.tsx   # Interactive Before/After split slider widget
│   │   ├── ScalpTimerPreview.tsx # Interactive 4-minute acoustic timer preview widget
│   │   ├── ComparisonTable.tsx   # Detailed feature matrix vs. competitors
│   │   ├── PricingCards.tsx      # Pioneer Free ($0) vs. Early Supporter Pro ($2.99/mo)
│   │   ├── FaqAccordion.tsx      # Accessible keyboard-navigable FAQ
│   │   └── WaitlistCtaCard.tsx   # Bottom conversion card with inline email form
│   └── modals/
│       └── WaitlistModal.tsx     # Fast modal dialog triggered by header and hero buttons
├── lib/
│   └── validations.ts            # Zod validation schema for waitlist leads
└── types/
    └── index.ts                  # TypeScript definitions
```

---

## 3. COMPONENT IMPLEMENTATION DETAILS

### 3.1 `app/layout.tsx` (SEO & Fonts)
- Load `Plus_Jakarta_Sans` (`--font-display`) and `Inter` (`--font-body`) via `next/font/google` with `display: 'swap'`.
- Define comprehensive Next.js `metadata`:
  - Title: `HairCare Coach — Habit & Consistency App for Men's Hair Health`
  - Description: `Build an unbreakable hair routine. Track Finasteride, Minoxidil, scalp care, and progress with standardized ghost-overlay photos. Zero false promises.`
  - OpenGraph tags with title, description, and canonical URL `https://haircarecoach.app`.

### 3.2 `components/sections/TopBanner.tsx`
- Background: Deep Forest Emerald (`bg-brand-primary` `#0F3A2E`).
- Text: Luminous white & mint.
- Content: `⚡ PRIVATE BETA ACCESS: First 500 members lock in 50% lifetime discount + receive the free 18-Page Evidence Handbook.`
- Link: `Claim Your Spot →` triggering the waitlist modal.

### 3.3 `components/common/Navbar.tsx`
- Sticky navbar with backdrop blur (`backdrop-blur-md bg-surface-bg/90 border-b border-surface-border`).
- Left: `VitalLoopLogo` + "HairCare Coach" text (`font-display font-bold text-xl text-brand-primary`).
- Center: Anchor navigation links (`How It Works`, `Core Features`, `Evidence & Science`, `Comparison`, `Pricing`).
- Right: Primary CTA button (`Claim Early Access`) in `bg-brand-accent text-brand-primary font-semibold px-5 py-2.5 rounded-md hover:bg-brand-accent-hover shadow-accent transition-all`).

### 3.4 `components/sections/HeroSection.tsx`
- Top Badge: `🛡️ Zero Miracle Claims. 100% Habit Science.` (Pill container with subtle border).
- Main Headline (H1):  
  **Stop Quitting Your Hair Routine.**  
  <span className="text-brand-secondary">Build the Daily Consistency That Actually Works.</span>
- Subheadline:  
  *Minoxidil, Finasteride, microneedling, and scalp care take 3 to 6 months of relentless daily discipline to show real biological change. HairCare Coach turns grueling multi-step regimens into effortless streaks—complete with standardized ghost-overlay progress photos, smart dosage reminders, and zero false promises.*
- Dual Action Buttons:
  - Primary: `Join the Early Access Waitlist` (opens modal).
  - Secondary: `Explore the Science First ↓` (smooth scrolls to `#features`).
- Trust Indicators:  
  🔒 *100% Free to join • Zero spam guarantee • Strictly local photo privacy • 412 / 500 spots claimed*
- Interactive App Mockup Graphic:
  - Realistic smartphone container showing a "Day 42 Streak 🔥", active daily task checkboxes (`[x] Morning Minoxidil Spray 1ml`, `[ ] 4-Min Scalp Massage Timer`, `[ ] Monthly Ghost Photo Due in 3 Days`), and a consistency score ring (`96%`).

### 3.5 `components/sections/TrustStatsBar.tsx`
- 3-column stats ribbon with subtle dividing borders:
  1. **180 Days** — Minimum biological cycle required to observe clinically meaningful changes in follicular density.
  2. **68% of Men** — Prematurely abandon oral or topical regimens within the first 90 days due to lack of immediate feedback.
  3. **0% Miracle Claims** — Every method in the app is graded by peer-reviewed dermatological studies (PubMed indexed).

### 3.6 `components/sections/ProblemSection.tsx`
- Heading (H2): `The 3 Invisible Friction Points That Kill Your Hair Goals Before Month 4`
- Render 3 high-contrast cards:
  1. **The "Invisible Progress" Valley:** Hair grows ~1.25 cm/month. When looking twice daily in the mirror, microscopic progress is invisible, leading to premature surrender right before shedding stabilizes.
  2. **The Bathroom Lighting Illusion:** Inconsistent angles and harsh fluorescent lights distort your perception, triggering false hope or needless anxiety.
  3. **The Daily Protocol Friction:** Multi-step protocols (morning spray, evening pill, weekly microneedle) collapse without smart contextual reminders.

### 3.7 `components/sections/FeaturesGrid.tsx`
- Showcase the 5 core MVP modules with icons, badges, and benefit descriptions:
  1. **Smart Routine & Compliance Engine:** Multi-profile alerts for topical, oral, and mechanical steps with snooze logic.
  2. **Standardized Ghost-Overlay Photo Diary:** Silhouette overlay of previous photos for identical angles. 100% local device storage.
  3. **Guided Scalp Care Companion Timer:** 4-minute acoustic timer with haptic vibration prompts for circular massage.
  4. **Streak Gamification & Freeze Shields:** XP points, milestone badges, and streak freeze shields to protect progress during travel.
  5. **The Transparent Evidence Hub:** Unbiased Tier 1 / Tier 2 / Tier 3 grading with PubMed research citations.

### 3.8 `components/sections/GhostCameraDemo.tsx` (Interactive Widget)
- Interactive before/after split slider widget letting the user drag a vertical handle to demonstrate how the ghost-overlay camera aligns Month 1 and Month 4 photos with pinpoint accuracy.
- Toggle between "Hairline Alignment" and "Crown Vertex Alignment".

### 3.9 `components/sections/ScalpTimerPreview.tsx` (Interactive Widget)
- Interactive 4-minute circular countdown timer widget with a "Start / Pause" button.
- Shows zones switching every 60 seconds (`Zone 1: Temples`, `Zone 2: Crown`, `Zone 3: Vertex`, `Zone 4: Neck Base`) with smooth animated progress ring.

### 3.10 `components/sections/ComparisonTable.tsx`
- Render the full responsive comparison matrix comparing HairCare Coach vs. Generic Habit Trackers vs. Telehealth Drug Sellers vs. AI Scanner Apps across 6 criteria (protocols, ghost-overlay, gamification, timer, vendor neutrality, photo privacy).

### 3.11 `components/sections/PricingCards.tsx`
- Two interactive pricing cards:
  - **Pioneer Free ($0 / Forever):** 3 daily reminders, 4-min timer, basic streaks, local photos, Tier 1 evidence summaries.
  - **Early Supporter Pro ($2.99 / mo — 50% Off Launch Price):** Highlighted card with `Featured` badge. Unlimited routines, advanced ghost-overlay with angle guidelines, side-by-side exports, 2 streak freeze shields/mo, 30/60/90 cohort challenges, complete PubMed deep dives.

### 3.12 `components/sections/FaqAccordion.tsx`
- Accessible accordion component answering the 5 critical questions:
  1. Does HairCare Coach promise to regrow hair? (Honest answer: No, consistency software, not magic).
  2. Is scalp massage a standalone cure? (Honest answer: Wellness companion, not standalone cure).
  3. Where are progress photos stored? (100% local smartphone storage).
  4. Can post-transplant patients use it? (Yes, tailored milestone schedules).
  5. When does beta launch? (Next cohort rolling out to first 500 waitlist supporters).

### 3.13 `components/sections/WaitlistCtaCard.tsx` & `components/modals/WaitlistModal.tsx`
- High-conversion lead capture form with:
  - Email input field (with instant Zod validation).
  - Routine dropdown selector (`Prescription (Finasteride/Minoxidil)`, `Scalp Care & Natural Wellness`, `Post-Transplant Recovery`, `Just Starting to Notice Thinning`).
  - Tier selector state (`Early Supporter Pro $2.99/mo` pre-selected).
  - Submit button with loading spinner state.
  - Success screen displaying:
    - User's waitlist position (e.g. `#413`).
    - Instant PDF download link for the "18-Page Evidence-Based Hair Routine Guide".
    - 1-click share buttons for Twitter/X and WhatsApp.

### 3.14 `components/common/Footer.tsx`
- Clean footer with copyright, links, and the **MANDATORY MEDICAL DISCLAIMER**:
  > *IMPORTANT MEDICAL DISCLAIMER: HairCare Coach is a digital habit tracking, routine reminder, and wellness documentation tool. It does not provide medical diagnoses, clinical treatment plans, or pharmaceutical prescriptions. The content provided in the Evidence Hub is for educational purposes only and must not replace professional advice from a qualified dermatologist or trichologist. Always consult your healthcare provider before starting or modifying any hair loss regimen.*

---

## 4. SERVERLESS API ROUTE (`app/api/waitlist/route.ts`)

Implement a Next.js serverless route:
- Validate input using `lib/validations.ts` (`z.object({ email: z.string().email(), routineType: z.string(), selectedTier: z.string() })`).
- Return HTTP 201 with `{ success: true, waitlistPosition: 413, guideUrl: "/downloads/guide.pdf" }`.
- Return HTTP 400 on invalid email with descriptive error messages.

---

## 5. TECHNICAL CONSTRAINTS & ACCESSIBILITY CHECKLIST

1. **Strictly Mobile-First:** Ensure all cards stack gracefully on mobile screens (< 640px). Buttons must have a minimum touch target of 48px.
2. **Accessibility (WCAG AA):**
   - Headings must follow strict H1 -> H2 -> H3 hierarchy.
   - All interactive elements must have clear focus-visible outlines (`focus-visible:ring-2 focus-visible:ring-brand-accent`).
   - SVG icons must have `aria-hidden="true"`, buttons must have accessible names.
3. **No Unverified Health Claims:** Never write "cures baldness", "regrows full head of hair in 3 weeks", or "doctor approved". Stick to "daily discipline companion", "evidence-based tracking", and "consistency streaks".
4. **Clean Code:** Use TypeScript strict mode, functional components, and modular Tailwind classes. Zero runtime console errors.
```
