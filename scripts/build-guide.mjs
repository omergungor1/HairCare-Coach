import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pages = [
  {
    title: "Evidence-Based Hair Routine Guide",
    paras: [
      "HairCare Coach. An educational companion for men who already have a routine and need to stay with it.",
      "This handbook is not a diagnosis, a prescription, or a promise that hair will regrow. It explains how to keep a plan long enough for biology to be comparable.",
    ],
  },
  {
    title: "How to read this guide",
    paras: [
      "Read it as a planning document. The treatments you use, if any, are decisions for you and a qualified clinician.",
      "When a page names finasteride, minoxidil, microneedling, or massage, it is naming categories of evidence. It is not telling you to start them.",
    ],
  },
  {
    title: "The 180-day window",
    paras: [
      "Follicular changes that a person can compare usually take months. A weekend of perfect compliance does not show a new hairline.",
      "Use 180 days as the minimum horizon before you decide a routine has failed. That horizon is a planning rule, not a guarantee that change will appear.",
    ],
  },
  {
    title: "Why the mirror misleads",
    paras: [
      "You see your scalp many times a day. Day-to-day differences are smaller than the eye can judge, so the brain fills the gap with mood.",
      "A bad meeting and a harsh bulb can look like sudden loss. A kind window can look like recovery. Neither is a measurement.",
    ],
  },
  {
    title: "Invisible progress",
    paras: [
      "Scalp hair grows on the order of about a centimeter a month. Inspecting twice a day makes stabilization look like nothing.",
      "People often quit in the stretch where shedding is settling and nothing photogenic has happened yet. The job of a habit tool is to carry you across that stretch.",
    ],
  },
  {
    title: "Lighting and angle bias",
    paras: [
      "Bathroom LEDs, a wet hairline, and a tilted chin change the photo more than a month of treatment does.",
      "Pick one distance, one head angle, and one light. Repeat them. The ghost overlay in the app exists to make that repetition mechanical.",
    ],
  },
  {
    title: "Protocol friction",
    paras: [
      "A routine collapses when the steps live in different places: a morning topical, an evening tablet, a weekly mechanical session, a short massage.",
      "Missed days cluster. Two skipped weeks are not a moral failure. They are a design failure. Put every step on one checklist.",
    ],
  },
  {
    title: "What consistency means",
    paras: [
      "Consistency is the share of planned doses you actually take, not a feeling of discipline.",
      "Track done, skipped, and snoozed. A visible skip is more useful than a fake perfect streak.",
    ],
  },
  {
    title: "A simple daily shape",
    paras: [
      "Many regimens have a morning step, an evening step, and a weekly step. Write those down before you worry about badges.",
      "Reminders should fire when you are in the room where the step happens. A ping on the train is easy to dismiss.",
    ],
  },
  {
    title: "Standardized photos",
    paras: [
      "Once a month is enough. More often feeds anxiety without adding a comparable image.",
      "Same wall, same distance, hair dry, no new hat-hair. Label the frame hairline, temples, or crown so you do not mix angles later.",
    ],
  },
  {
    title: "The ghost overlay",
    paras: [
      "The overlay is a faint copy of last month, placed on the camera so you can match the outline.",
      "It does not predict future hair and it does not diagnose loss. It only reduces the chance that you compare two different photographs.",
    ],
  },
  {
    title: "Scalp massage, stated honestly",
    paras: [
      "A short massage can be a relaxing ritual and a way to touch the scalp on a schedule. Small studies discuss blood flow and mechanical stretch. They do not show that massage reverses advanced pattern hair loss on its own.",
      "If you use the 4-minute timer, treat it as a wellness companion beside whatever clinical plan you already have.",
    ],
  },
  {
    title: "How we grade evidence",
    paras: [
      "Tier 1: high clinical evidence. Tier 2: emerging and uneven data. Tier 3: limited or anecdotal reports.",
      "The grade is a reading aid. It is not a personal recommendation, and we do not sell the products being graded.",
    ],
  },
  {
    title: "Tier 1 examples",
    paras: [
      "Finasteride and minoxidil are the usual examples of widely studied medical treatments for pattern hair loss.",
      "Whether they are appropriate for you is a clinical question. The app, if you use it, only stores the schedule you and your clinician already chose.",
    ],
  },
  {
    title: "Tier 2 examples",
    paras: [
      "Microneedling and low-level laser therapy have a growing but mixed literature. Results are not uniform, and protocols differ.",
      "Log the session if it is part of your plan. Do not let an app badge turn an emerging method into a sure thing.",
    ],
  },
  {
    title: "Tier 3 examples",
    paras: [
      "Scalp massage and botanical oils, including rosemary, sit in the limited-evidence group.",
      "They can be part of a calming routine. They are not a replacement for treatments with stronger evidence, and they are not a cure.",
    ],
  },
  {
    title: "Photo privacy",
    paras: [
      "Scalp photos are intimate medical images. The product is designed to keep them on the phone that took them.",
      "This website does not accept photo uploads. Do not email a scalp photo to support.",
    ],
  },
  {
    title: "Disclaimer and next step",
    paras: [
      "HairCare Coach does not diagnose, prescribe, or replace a dermatologist or trichologist. Always talk with a qualified clinician before you start or change a regimen.",
      "If you joined the early list, your next step is the beta invite when TestFlight and Google Play beta open. Until then, keep the routine you already trust, on a calendar you can actually see.",
    ],
  },
];

function esc(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text, max = 82) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function pageStream(page, index) {
  const lines = ["0.059 0.227 0.180 rg", "0 748 612 44 re f", "1 1 1 rg", "BT /F2 11 Tf 48 766 Td (HairCare Coach  ·  Evidence Handbook) Tj ET"];
  lines.push("0.059 0.090 0.161 rg");
  lines.push(`BT /F2 20 Tf 48 700 Td (${esc(page.title)}) Tj ET`);
  lines.push("0.278 0.333 0.412 rg");
  let y = 660;
  for (const para of page.paras) {
    for (const line of wrap(para)) {
      lines.push(`BT /F1 12 Tf 48 ${y} Td (${esc(line)}) Tj ET`);
      y -= 18;
    }
    y -= 12;
  }
  lines.push("0.580 0.639 0.722 rg");
  lines.push(`BT /F1 10 Tf 48 46 Td (${esc(`Educational only. Not medical advice. Page ${index + 1} of ${pages.length}`)}) Tj ET`);
  return lines.join("\n");
}

function buildPdf() {
  const objects = [];
  const pageObjectIds = [];
  const fontRegularId = 3;
  const fontBoldId = 4;

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[fontRegularId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[fontBoldId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  let nextId = 5;
  const kids = [];

  pages.forEach((page, index) => {
    const contentId = nextId++;
    const pageId = nextId++;
    const stream = pageStream(page, index);
    objects[contentId] = `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`;
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> >>`;
    kids.push(`${pageId} 0 R`);
    pageObjectIds.push(pageId);
  });

  objects[2] = `<< /Type /Pages /Count ${pages.length} /Kids [${kids.join(" ")}] >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = Buffer.byteLength(pdf);
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";
  for (let id = 1; id < objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf);
}

const here = dirname(fileURLToPath(import.meta.url));
const target = join(here, "..", "public", "downloads", "HairCare-Coach-Evidence-Handbook.pdf");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, buildPdf());
console.log(`Wrote ${target}`);
