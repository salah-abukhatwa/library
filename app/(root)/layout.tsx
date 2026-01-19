import { auth } from "@/auth";
import { Header } from "@/components/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  after(async () => {
    const userId = session?.user?.id;
    if (!userId) return;

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const result = await db
      .select({ lastActivityDate: users.lastActivityDate })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const last = result[0]?.lastActivityDate;
    if (last === today) return; // already updated today

    await db
      .update(users)
      .set({ lastActivityDate: today })
      .where(eq(users.id, userId));
  });

  return (
    <main className="root-container">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
