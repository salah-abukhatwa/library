// app/api/workflow/route.ts
import { serve } from "@upstash/workflow/nextjs";
import config from "@/lib/config";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

type InitialData = {
  email: string;
  fullName?: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // ✅ 1) Welcome email (NO context.run here)
  await sendResendEmail(context, {
    step: "welcome-email",
    to: email,
    subject: "Welcome to NextLibrary 👋",
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Welcome${fullName ? `, ${fullName}` : ""}!</h2>
        <p>Your account was created successfully.</p>
      </div>
    `,
  });

  // ✅ 2) Wait 3 days
  await context.sleep("wait-3-days", 60 * 60 * 24 * 3);

  // ✅ 3) Check activity
  const isActive = await context.run("check-user-activity", async () => {
    const result = await db
      .select({ lastActivityDate: users.lastActivityDate })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const last = result[0]?.lastActivityDate;
    if (!last) return false;

    // last is usually "YYYY-MM-DD"
    const lastDate = new Date(`${last}T00:00:00Z`);
    const diffDays = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays < 3;
  });

  // ✅ 4) Follow-up only if non-active
  if (!isActive) {
    await sendResendEmail(context, {
      step: "followup-email",
      to: email,
      subject: "Still there? 🙂",
      html: `
        <div style="font-family:Arial,sans-serif">
          <p>We noticed you haven’t been active lately.</p>
          <p>Come back and explore the Library page!</p>
        </div>
      `,
    });
  }
});

async function sendResendEmail(
  context: any,
  params: { step: string; to: string; subject: string; html: string }
) {
  const token = config.env.resend.apiKey;
  const from = config.env.resend.from;

  if (!token) throw new Error("Missing RESEND_API_KEY");
  if (!from) throw new Error("Missing RESEND_FROM");

  const { status, body } = await context.api.resend.call(params.step, {
    token,
    body: {
      from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
    },
    headers: {
      "content-type": "application/json",
    },
  });

  if (status >= 400) {
    throw new Error(
      `Resend failed: status=${status}, body=${JSON.stringify(body)}`
    );
  }

  return body;
}
