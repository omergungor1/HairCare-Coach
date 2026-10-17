import { z } from "zod";

export const routineValues = [
  "medications",
  "natural_care",
  "post_transplant",
  "just_starting",
];

export const tierValues = ["free", "pro_early_bird"];

export const WaitlistSubmissionSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  routineType: z.enum(routineValues, {
    error: "Please select your current routine",
  }),
  selectedTier: z.enum(tierValues).default("pro_early_bird"),
});
