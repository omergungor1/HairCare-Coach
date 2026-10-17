import { GUIDE_URL, WAITLIST_START } from "@/lib/options";
import { WaitlistSubmissionSchema } from "@/lib/validations";

const leads = [];

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Validation failed", details: { formErrors: ["Send a JSON body."], fieldErrors: {} } },
      { status: 400 },
    );
  }

  const result = WaitlistSubmissionSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 400 },
    );
  }

  const { email, routineType, selectedTier } = result.data;
  const existing = leads.find((lead) => lead.email === email);

  if (existing) {
    return Response.json(
      {
        success: true,
        alreadyJoined: true,
        message: "This email is already on the early access list.",
        waitlistPosition: existing.position,
        guideUrl: GUIDE_URL,
      },
      { status: 200 },
    );
  }

  const entry = {
    email,
    routineType,
    selectedTier,
    position: WAITLIST_START + leads.length + 1,
    createdAt: new Date().toISOString(),
  };

  leads.push(entry);

  return Response.json(
    {
      success: true,
      message: "Successfully reserved your early access spot",
      waitlistPosition: entry.position,
      guideUrl: GUIDE_URL,
    },
    { status: 201 },
  );
}
